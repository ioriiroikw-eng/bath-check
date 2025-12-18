import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icons } from './components/Icons';
import { STATUS_MESSAGES, BASE_RATE_PER_HOUR, BASE_SLEEP_DAMAGE, STORAGE_KEY_HP, STORAGE_KEY_LAST_BATH, STORAGE_KEY_DAMAGE, STORAGE_KEY_LOGS, STORAGE_KEY_HISTORY, STORAGE_KEY_WEATHER, STORAGE_KEY_IS_SLEEPING, STORAGE_KEY_SLEEP_TYPE, STORAGE_KEY_SLEEP_START, STORAGE_KEY_SAVED_MINUTES, SE_POP_URL, SE_KIRA_URL, BGM_URL } from './constants';
import { generateFortune, getLocalDateStr, calculateLevel } from './utils';


import OutingActionModal from './components/modals/OutingActionModal';
import BathConfirmModal from './components/modals/BathConfirmModal';
import SleepConfirmModal from './components/modals/SleepConfirmModal';
import HelpModal from './components/modals/HelpModal';
import DayDetailModal from './components/modals/DayDetailModal';
import CalendarModal from './components/modals/CalendarModal';
import FortuneModal from './components/modals/FortuneModal';
import SavingsModal from './components/modals/SavingsModal';
import InAppBrowserWarning from './components/modals/InAppBrowserWarning';
import InstallGuide from './components/modals/InstallGuide';

import SleepModeView from './components/SleepModeView';
import SplashScreen from './components/SplashScreen';
import ActionButton from './components/ActionButton';

const App = () => {
    const [hp, setHp] = useState(100);
    const [lastBathTime, setLastBathTime] = useState(new Date());
    const [eventDamageTotal, setEventDamageTotal] = useState(0);
    const [logs, setLogs] = useState([]);
    const [bathEvents, setBathEvents] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [isBgmPlaying, setIsBgmPlaying] = useState(true);
    const isBgmPlayingRef = useRef(true);

    // 新機能用のState
    const [isSleeping, setIsSleeping] = useState(false);
    const [sleepType, setSleepType] = useState('normal'); // 'normal' or 'skip'
    const [sleepStartTime, setSleepStartTime] = useState(null);
    const [savedMinutes, setSavedMinutes] = useState(0);
    const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
    const [showSleepConfirmModal, setShowSleepConfirmModal] = useState(false); // 寝る確認用

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isFortuneOpen, setIsFortuneOpen] = useState(false);
    const [isHelpOpen, setIsHelp] = useState(false);
    const [fortuneResult, setFortuneResult] = useState(null);

    const [selectedDateDetails, setSelectedDateDetails] = useState(null);


    const [showInAppWarning, setShowInAppWarning] = useState(false);
    const [showInstallGuide, setShowInstallGuide] = useState(false);
    const [showBathConfirmModal, setShowBathConfirmModal] = useState(false);
    const [showOutingActionModal, setShowOutingActionModal] = useState(false);

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isFetchingWeather, setIsFetchingWeather] = useState(false);

    const audioRef = useRef(null);
    const sePopRef = useRef(null);
    const seKiraRef = useRef(null);
    const [showSplash, setShowSplash] = useState(true);

    // Plan C: Tap-to-Speak State
    const [showBubble, setShowBubble] = useState(false);
    const [bubbleText, setBubbleText] = useState("");
    const bubbleTimeoutRef = useRef(null);

    // BGM処理
    useEffect(() => {
        isBgmPlayingRef.current = isBgmPlaying;
        if (audioRef.current) {
            if (isBgmPlaying && !isSleeping) { // 睡眠中はBGM停止
                audioRef.current.play().catch(() => { });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isBgmPlaying, isSleeping]);

    useEffect(() => {
        audioRef.current = new Audio(BGM_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        sePopRef.current = new Audio(SE_POP_URL);
        seKiraRef.current = new Audio(SE_KIRA_URL);

        if (isBgmPlayingRef.current && !isSleeping) {
            audioRef.current.play().catch(() => { });
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (audioRef.current) audioRef.current.pause();
            } else {
                if (isBgmPlayingRef.current && audioRef.current && !isSleeping) {
                    audioRef.current.play().catch(e => console.log("Resume error", e));
                }
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
        };
    }, []);

    const toggleBgm = () => { setIsBgmPlaying(prev => !prev); };
    const playSe = (type) => {
        const audio = type === 'kira' ? seKiraRef.current : sePopRef.current;
        if (audio) { audio.currentTime = 0; audio.play().catch(e => { }); }
    };

    const addLog = (text, icon, type = 'system') => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        setLogs(prev => [{ timestamp: now.toISOString(), time: timeStr, text, icon: icon || "📱", type }, ...prev].slice(0, 150));
    };

    const fetchWeather = useCallback(() => {
        playSe('pop');
        setIsFetchingWeather(true);
        const handleWeatherData = (temp, isFallback = false) => {
            setWeatherData({ temperature: temp, updated: new Date().toISOString() });
            if (isFallback) { addLog(`位置情報が取れないため東京の気温(${temp}°C)を取得しました`, "🗼", 'system'); }
            else { addLog(`天気取得完了！現在${temp}°C`, "🌤️", 'system'); }
            setIsFetchingWeather(false);
        };
        const fetchTokyoWeather = async () => {
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`);
                if (!res.ok) throw new Error('API Error');
                const data = await res.json();
                handleWeatherData(data.current_weather.temperature, true);
            } catch (e) { addLog("天気の取得に失敗しました💦", "❌", 'system'); setIsFetchingWeather(false); }
        };
        if (!navigator.geolocation) { fetchTokyoWeather(); return; }
        const options = { timeout: 10000, maximumAge: 0 };
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                if (!res.ok) throw new Error('API Error');
                const data = await res.json();
                handleWeatherData(data.current_weather.temperature, false);
            } catch (e) { fetchTokyoWeather(); }
        }, (err) => { console.warn(`Geolocation Error(${err.code}): ${err.message}`); fetchTokyoWeather(); }, options);
    }, []);

    useEffect(() => {
        const load = (k) => localStorage.getItem(k);
        if (load(STORAGE_KEY_HP)) setHp(parseFloat(load(STORAGE_KEY_HP)));
        if (load(STORAGE_KEY_LAST_BATH)) setLastBathTime(new Date(load(STORAGE_KEY_LAST_BATH)));
        if (load(STORAGE_KEY_DAMAGE)) setEventDamageTotal(parseFloat(load(STORAGE_KEY_DAMAGE)));
        if (load(STORAGE_KEY_LOGS)) setLogs(JSON.parse(load(STORAGE_KEY_LOGS)));

        // 新機能のロード
        if (load(STORAGE_KEY_IS_SLEEPING)) setIsSleeping(JSON.parse(load(STORAGE_KEY_IS_SLEEPING)));
        if (load(STORAGE_KEY_SLEEP_TYPE)) setSleepType(load(STORAGE_KEY_SLEEP_TYPE));
        if (load(STORAGE_KEY_SLEEP_START)) setSleepStartTime(new Date(load(STORAGE_KEY_SLEEP_START)));
        if (load(STORAGE_KEY_SAVED_MINUTES)) setSavedMinutes(parseInt(load(STORAGE_KEY_SAVED_MINUTES), 10));

        if (load(STORAGE_KEY_HISTORY)) {
            const loadedHistory = JSON.parse(load(STORAGE_KEY_HISTORY));
            if (Array.isArray(loadedHistory)) {
                if (loadedHistory.length > 0 && typeof loadedHistory[0] === 'string') {
                    const migrated = loadedHistory.map(dStr => ({ dateStr: dStr, time: new Date(dStr).toISOString(), preBathHp: '?', hoursSince: '?', fortune: null, type: 'bath' }));
                    setBathEvents(migrated);
                } else { setBathEvents(loadedHistory); }
            }
        }

        if (load(STORAGE_KEY_WEATHER)) {
            const savedWeather = JSON.parse(load(STORAGE_KEY_WEATHER));
            setWeatherData(savedWeather);
            const lastUpdate = new Date(savedWeather.updated);
            if ((new Date() - lastUpdate) > 1000 * 60 * 60) fetchWeather();
        } else { fetchWeather(); }

        const ua = navigator.userAgent.toLowerCase();
        if (/line|instagram|twitter|fbav|fban/.test(ua)) { setShowInAppWarning(true); }
        else {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
            if (!isStandalone) setTimeout(() => setShowInstallGuide(true), 2000);
        }
        const lastLogin = localStorage.getItem('hq_last_login');
        const now = new Date();
        if (lastLogin && !isSleeping) { // 睡眠中は帰宅モーダルを出さない
            const diff = (now - new Date(lastLogin)) / (1000 * 60 * 60);
            if (diff >= 1) { // 1時間以上ぶりなら外出アクション確認
                setShowOutingActionModal(true);
            }

        }
        localStorage.setItem('hq_last_login', now.toISOString());
    }, [fetchWeather]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_HP, hp.toString());
        localStorage.setItem(STORAGE_KEY_LAST_BATH, lastBathTime.toISOString());
        localStorage.setItem(STORAGE_KEY_DAMAGE, eventDamageTotal.toString());
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(bathEvents));
        if (weatherData) localStorage.setItem(STORAGE_KEY_WEATHER, JSON.stringify(weatherData));

        // 新機能のセーブ
        localStorage.setItem(STORAGE_KEY_IS_SLEEPING, JSON.stringify(isSleeping));
        localStorage.setItem(STORAGE_KEY_SLEEP_TYPE, sleepType);
        if (sleepStartTime) localStorage.setItem(STORAGE_KEY_SLEEP_START, sleepStartTime.toISOString());
        localStorage.setItem(STORAGE_KEY_SAVED_MINUTES, savedMinutes.toString());
    }, [hp, lastBathTime, eventDamageTotal, logs, bathEvents, weatherData, isSleeping, sleepType, sleepStartTime, savedMinutes]);

    const getWeatherDamageRate = () => { if (!weatherData) return 1.0; const t = weatherData.temperature; if (t >= 30) return 1.5; if (t >= 25) return 1.2; if (t <= 10) return 0.8; return 1.0; };
    const weatherRate = getWeatherDamageRate();

    // --- 睡眠機能の実装 ---
    const handleSleepButtonPress = () => {
        // 直近3時間以内に入浴記録があるかチェック
        const now = new Date();
        const diffMs = now - lastBathTime;
        const hoursSince = diffMs / (1000 * 60 * 60);

        if (hoursSince < 3) {
            // 直近で入ってるなら即座に通常睡眠
            startSleep('normal');
        } else {
            // 入ってないなら確認
            setShowSleepConfirmModal(true);
        }
    };

    const startSleep = (type) => {
        const now = new Date();
        setIsSleeping(true);
        setSleepType(type);
        setSleepStartTime(now);
        setShowSleepConfirmModal(false);

        if (type === 'skip') {
            setSavedMinutes(prev => prev + 30); // 30分貯金
            // 履歴に追加 (type: 'sleep')
            const newEvent = { dateStr: getLocalDateStr(now), time: now.toISOString(), hoursSince: '-', preBathHp: '-', fortune: null, type: 'sleep' };
            setBathEvents(prev => [newEvent, ...prev]);
            addLog("今日は寝る！（スキップ）30分貯金しました💰", "💤", 'action');
        } else {
            addLog("おやすみモードを開始しました💤", "🛌", 'system');
        }

        playSe('pop');
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleWakeUp = () => {
        const now = new Date();
        setIsSleeping(false);

        // ダメージ計算: (経過時間 * 基本ダメージ * 天候倍率)
        if (sleepStartTime) {
            const diffMs = now - new Date(sleepStartTime);
            const hours = diffMs / (1000 * 60 * 60);
            const damage = Math.floor(hours * BASE_SLEEP_DAMAGE * weatherRate); // 天候倍率を適用
            setEventDamageTotal(prev => prev + damage);
            addLog(`おはよう！よく寝たね✨ (睡眠ダメージ: -${damage})`, "☀️", 'action');
        }
        setSleepStartTime(null);
        playSe('kira');
    };

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 5000); return () => clearInterval(timer); }, []);

    useEffect(() => {
        if (isSleeping) return; // 睡眠中はHPの自動減少を行わない（起きた時にまとめて計算）
        const diffMs = new Date() - lastBathTime;
        const hours = diffMs / (1000 * 60 * 60);
        const timeDamage = hours * BASE_RATE_PER_HOUR * weatherRate;
        const totalDamage = timeDamage + eventDamageTotal;
        setHp(Math.max(0, Math.min(100, 100 - totalDamage)));
    }, [currentTime, lastBathTime, eventDamageTotal, weatherRate, isSleeping]);

    const handleManualDamage = (damage, logText, icon) => {
        setEventDamageTotal(prev => prev + damage);
        addLog(logText, icon, 'action');
        setShowOutingActionModal(false);
        playSe('pop');
    };

    const handleBath = () => {
        setShowBathConfirmModal(false);
        const now = new Date();
        const diffMs = now - lastBathTime;
        const hoursSince = (diffMs / (1000 * 60 * 60));
        const fortune = generateFortune();
        // 履歴に追加 (type: 'bath')
        const newEvent = { dateStr: getLocalDateStr(now), time: now.toISOString(), hoursSince: hoursSince.toFixed(1), preBathHp: Math.floor(hp), fortune: fortune, type: 'bath' };
        setBathEvents(prev => [newEvent, ...prev]);
        setLastBathTime(now);
        setEventDamageTotal(0);
        setHp(100);
        addLog("お風呂入って復活！今日も私が一番カワイイ💖", "🛁", 'action');
        setFortuneResult(fortune);
        setTimeout(() => { playSe('kira'); setIsFortuneOpen(true); }, 500);
        if (navigator.vibrate) navigator.vibrate([0, 100, 50, 100]);
    };

    const drawRoundedRect = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };

    const generateShareImage = async () => {
        playSe('pop');
        setIsGenerating(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const W = 800; const H = 1200;
        canvas.width = W; canvas.height = H;
        try {
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, '#fce7f3'); grad.addColorStop(0.5, '#fbcfe8'); grad.addColorStop(1, '#ffffff');
            ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
            for (let i = 0; i < 30; i++) { const x = Math.random() * W; const y = Math.random() * H; const r = Math.random() * 50 + 10; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`; ctx.fill(); }
            const currentStatus = getStatus(hp);
            const cx = W / 2;
            ctx.shadowColor = "rgba(236, 72, 153, 0.3)"; ctx.shadowBlur = 10; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4;
            ctx.fillStyle = '#ec4899'; ctx.font = '900 70px "Mochiy Pop One"'; ctx.textAlign = 'center'; ctx.fillText('フロハイッタ？', cx, 150);
            ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
            const cardY = 220; const cardH = 750; const cardW = 680;
            ctx.shadowColor = "rgba(0,0,0,0.1)"; ctx.shadowBlur = 20; ctx.shadowOffsetY = 10;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; drawRoundedRect(ctx, (W - cardW) / 2, cardY, cardW, cardH, 40); ctx.fill();
            ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
            try {
                const img = new Image(); img.src = currentStatus.avatar;
                await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = resolve; });
                const maxImgW = 400; const maxImgH = 400; const imgY = cardY + 50;
                const scale = Math.min(maxImgW / img.naturalWidth, maxImgH / img.naturalHeight);
                const drawW = img.naturalWidth * scale; const drawH = img.naturalHeight * scale;
                ctx.drawImage(img, cx - drawW / 2, imgY + (maxImgH - drawH) / 2, drawW, drawH);
            } catch (e) { ctx.font = '200px sans-serif'; ctx.fillText('🛁', cx, cardY + 250); }
            const infoStartY = cardY + 480;
            ctx.fillStyle = '#db2777'; ctx.font = 'bold 30px "Zen Maru Gothic"'; ctx.fillText('現在の清潔度', cx, infoStartY);
            ctx.fillStyle = '#ec4899'; ctx.font = '900 120px "Mochiy Pop One"'; ctx.fillText(`${Math.floor(hp)}%`, cx, infoStartY + 110);
            const badgeY = infoStartY + 160;
            ctx.fillStyle = '#fce7f3'; drawRoundedRect(ctx, cx - 180, badgeY, 360, 60, 30); ctx.fill();
            ctx.fillStyle = '#be185d'; ctx.font = 'bold 32px "Zen Maru Gothic"'; ctx.fillText(`お風呂に入らず ${hoursSince} 時間`, cx, badgeY + 42);
            ctx.fillStyle = '#374151'; ctx.font = 'bold 40px "Yomogi"'; ctx.fillText(`「${status.shareMsg}」`, W / 2, 1080);
            ctx.fillStyle = '#9ca3af'; ctx.font = 'bold 24px "Mochiy Pop One"'; ctx.fillText('#入浴タイミング可視化中', W / 2, 1150);
            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error("Canvas Error");
                const file = new File([blob], "share.png", { type: "image/png" });
                const dataUrl = URL.createObjectURL(blob);
                setGeneratedImage(dataUrl);
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try { const url = 'https://app.bath-check.com/'; const title = 'フロハイッタ？'; const text = `清潔度チェック！ #フロハイッタ\n${url}`; await navigator.share({ title: title, text: text, url: url, files: [file] }); } catch (err) { console.log("Share canceled"); }
                }
            }, 'image/png');
        } catch (e) { console.error(e); alert("画像生成に失敗しました💦"); } finally { setIsGenerating(false); }
    };

    const getStatus = (hp) => {
        if (hp >= 80) return { avatar: "./char_80.png", label: "大勝利", deco: "👑", glow: "bg-pink-400", msgList: STATUS_MESSAGES.high };
        if (hp >= 50) return { avatar: "./char_50.png", label: "天使", deco: "✨", glow: "bg-yellow-200", msgList: STATUS_MESSAGES.mid };
        if (hp >= 20) return { avatar: "./char_20.png", label: "限界", deco: "💦", glow: "bg-purple-300", msgList: STATUS_MESSAGES.low };
        return { avatar: "./char_00.png", label: "終了", deco: "💀", glow: "bg-gray-500", msgList: STATUS_MESSAGES.bad };
    };

    const status = useMemo(() => {
        const s = getStatus(hp);
        const randomMsg = s.msgList[Math.floor(Math.random() * s.msgList.length)];
        return { ...s, shareMsg: randomMsg };
    }, [Math.floor(hp / 10)]);

    // 経過時間を時間:分形式でフォーマット
    const elapsedMs = new Date() - lastBathTime;
    const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const elapsedFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const hoursSince = (elapsedMs / (1000 * 60 * 60)).toFixed(1); // 共有用に残す

    if (isSleeping) {
        return <SleepModeView onWakeUp={handleWakeUp} savedMinutes={savedMinutes} status={status} sleepType={sleepType} />;
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-pink-50 relative overflow-hidden text-gray-800 font-sans">
            {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

            {showInAppWarning && <InAppBrowserWarning onClose={() => setShowInAppWarning(false)} />}
            {showInstallGuide && <InstallGuide onClose={() => setShowInstallGuide(false)} />}

            <OutingActionModal isOpen={showOutingActionModal} onClose={() => setShowOutingActionModal(false)} onAction={handleManualDamage} />
            <BathConfirmModal isOpen={showBathConfirmModal} onClose={() => setShowBathConfirmModal(false)} onConfirm={handleBath} />
            <SleepConfirmModal
                isOpen={showSleepConfirmModal}
                onClose={() => setShowSleepConfirmModal(false)}
                onConfirm={() => startSleep('skip')}
                onForgot={() => {
                    handleBath(); // 入浴処理を実行
                    startSleep('normal'); // その後通常睡眠へ
                }}
            />
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelp(false)} />
            <FortuneModal isOpen={isFortuneOpen} onClose={() => setIsFortuneOpen(false)} result={fortuneResult} />
            <DayDetailModal isOpen={!!selectedDateDetails} onClose={() => setSelectedDateDetails(null)} details={selectedDateDetails} logs={logs} onOpenFortune={(result) => { setFortuneResult(result); setIsFortuneOpen(true); }} />

            <SavingsModal isOpen={isSavingsModalOpen} onClose={() => setIsSavingsModalOpen(false)} savedMinutes={savedMinutes} />

            {/* --- TOP: Past / Premise (突きつける) --- */}
            <div className="flex-none pt-safe px-6 pb-4 flex flex-col items-center relative z-10 w-full mt-4">
                {/* Helper ButtonsRow */}
                <div className="w-full flex justify-between items-center mb-6 px-2">
                    <button onClick={() => { playSe('pop'); setIsCalendarOpen(true); }} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors"><Icons.Calendar size={20} /></button>
                    <button onClick={toggleBgm} className={`p-2 rounded-full transition-colors ${isBgmPlaying ? 'text-pink-500' : 'text-gray-300'}`}><Icons.Music size={20} /></button>
                </div>

                {/* Weather (Minimal) */}
                {!weatherData ? (
                    <button onClick={fetchWeather} disabled={isFetchingWeather} className="text-xs font-bold text-blue-400 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1 mb-2">
                        {isFetchingWeather ? "..." : <><Icons.Cloud size={12} /> 天気を取得</>}
                    </button>
                ) : (
                    <div className="flex items-center gap-2 mb-2 animate-fade-in">
                        <span className="text-2xl">{weatherData.temperature >= 25 ? '🥵' : weatherData.temperature <= 10 ? '🥶' : '🌤️'}</span>
                        <span className="text-lg font-black font-pop text-gray-600">{weatherData.temperature}°C</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${weatherRate > 1.0 ? 'bg-red-100 text-red-500' : weatherRate < 1.0 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'}`}>
                            x{weatherRate}
                        </span>
                    </div>
                )}

                {/* Status Avatar (The "Subject") & Tap-to-Speak (Plan C) */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-2 z-30">
                    {/* Tap Area */}
                    <div
                        onClick={() => {
                            const s = getStatus(hp);
                            // Pick a random message
                            const msgs = s.msgList;
                            // Simple random for now, can be improved to avoid repeats later if needed
                            const msg = msgs[Math.floor(Math.random() * msgs.length)];
                            setBubbleText(msg);
                            setShowBubble(true);
                            playSe('pop');
                            // Auto hide
                            if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
                            bubbleTimeoutRef.current = setTimeout(() => setShowBubble(false), 3000);
                        }}
                        className="absolute inset-0 z-50 cursor-pointer rounded-full active:scale-95 transition-transform"
                    ></div>

                    <div className={`absolute inset-4 rounded-full opacity-40 blur-xl ${status.glow}`}></div>
                    <img src={status.avatar} alt={status.label} className="relative z-10 w-36 h-36 object-contain drop-shadow-sm pointer-events-none" />

                    {/* Dynamic Speech Bubble */}
                    {showBubble && (
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-max max-w-[200px] z-40 animate-bounce-in pointer-events-none">
                            <div className="bg-indigo-50/90 backdrop-blur-md border border-indigo-100 px-4 py-2 rounded-2xl shadow-sm text-center relative">
                                <p className="text-xs font-bold text-indigo-800 leading-tight">{bubbleText}</p>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-50 border-b border-r border-indigo-100 rotate-45"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Elapsed Time & HP (The "Truth") */}
                <div className="w-full">
                    <p className={`font-black text-gray-900 tracking-tight font-mono text-center ${hours >= 100 ? 'text-4xl' : 'text-5xl'}`}>
                        {elapsedFormatted}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                        <div style={{ width: `${hp}%` }} className={`h-full rounded-full ${hp > 50 ? 'bg-pink-400' : hp > 20 ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <span className={`text-sm font-bold font-pop ${hp > 50 ? 'text-pink-500' : 'text-gray-500'}`}>HP {Math.floor(hp)}%</span>
                </div>
            </div>

            {/* --- CENTER: Present / Action (促す) --- */}
            <div className="flex-none flex flex-col items-center px-6 gap-4 relative z-20 w-full mt-8">
                {/* Main Action: Bath */}
                <button
                    onClick={() => { playSe('pop'); setShowBathConfirmModal(true); }}
                    className="w-full max-w-xs active:scale-95 transition-transform"
                >
                    <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-full py-5 px-8 flex items-center justify-center gap-3 shadow-lg shadow-pink-300/50">
                        <Icons.Bath size={28} />
                        <span className="text-xl font-black tracking-wide">お風呂に入る</span>
                    </div>
                </button>

                {/* Secondary Action: Sleep */}
                <button
                    onClick={handleSleepButtonPress}
                    className={`flex items-center justify-center gap-2 font-bold py-3 px-6 active:scale-95 transition-transform rounded-full ${hp > 40
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-300/50'
                        : 'text-indigo-400 bg-indigo-50'
                        }`}
                >
                    <Icons.Zzz size={16} />
                    <span className="text-sm">今日はもう寝る...</span>
                </button>
            </div>

            {/* --- BOTTOM: Future / Exit (繋げる) --- */}
            <div className="flex-none px-6 pt-2 pb-4 flex flex-col items-center gap-3 w-full">
                {/* Zubora Savings */}
                <button
                    onClick={() => { playSe('pop'); setIsSavingsModalOpen(true); }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors"
                >
                    <Icons.Gem size={16} />
                    <span className="text-xs font-bold">ズボラ貯金 Lv.{calculateLevel(savedMinutes)}</span>
                    <span className="text-sm font-black font-pop">{savedMinutes}分</span>
                </button>

                {/* Tools Row */}
                <div className="flex gap-6 mt-2 mb-4">
                    {/* Share Button (Action) */}
                    <button onClick={() => { const text = `現在の清潔度: ${Math.floor(hp)}%\n経過時間: ${hoursSince}時間\n\n#フロハイッタ`; const url = "https://app.bath-check.com/"; window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank'); }} className="text-gray-400 hover:text-pink-400 transition-colors">
                        <Icons.XLogo size={20} />
                    </button>
                    {/* Camera Button (Action) */}
                    <button onClick={() => generateShareImage()} disabled={isGenerating} className="text-gray-400 hover:text-pink-400 transition-colors disabled:opacity-30">
                        {isGenerating ? <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div> : <Icons.Camera size={20} />}
                    </button>
                    {/* Help */}
                    <button onClick={() => { playSe('pop'); setIsHelp(true); }} className="text-gray-400 hover:text-pink-400 transition-colors"><Icons.Help size={20} /></button>
                </div>
            </div>

            <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} bathEvents={bathEvents} onDayClick={(details) => { playSe('pop'); setSelectedDateDetails(details); setIsCalendarOpen(false); }} />
            {generatedImage && (<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setGeneratedImage(null)}> <div className="bg-transparent w-full max-w-sm relative" onClick={e => e.stopPropagation()}> <img src={generatedImage} alt="Share" className="w-full rounded-xl shadow-2xl" /> <div className="text-center mt-4 text-white font-bold text-sm opacity-80">長押しして保存</div></div> </div>)}
        </div>
    );
};

export default App;
