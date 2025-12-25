import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icons } from './components/Icons';
import { STATUS_MESSAGES, DAILY_GREETINGS, BASE_RATE_PER_HOUR, BASE_SLEEP_DAMAGE, STORAGE_KEY_HP, STORAGE_KEY_LAST_BATH, STORAGE_KEY_DAMAGE, STORAGE_KEY_LOGS, STORAGE_KEY_HISTORY, STORAGE_KEY_WEATHER, STORAGE_KEY_IS_SLEEPING, STORAGE_KEY_SLEEP_TYPE, STORAGE_KEY_SLEEP_START, STORAGE_KEY_SAVED_MINUTES, STORAGE_KEY_TUTORIAL_COMPLETED, STORAGE_KEY_SKIN_TYPE, SKIN_TYPES, SE_POP_URL, SE_KIRA_URL, BGM_URL } from './constants';
import { generateFortune, getLocalDateStr, calculateLevel } from './utils';


import OutingActionModal from './components/modals/OutingActionModal';
import BathConfirmModal from './components/modals/BathConfirmModal';
import SleepConfirmModal from './components/modals/SleepConfirmModal';
import HelpModal from './components/modals/HelpModal';
import DayDetailModal from './components/modals/DayDetailModal';
import StatsModal from './components/modals/StatsModal';
import BathRatingModal from './components/modals/BathRatingModal';
import SavingsModal from './components/modals/SavingsModal';
import InAppBrowserWarning from './components/modals/InAppBrowserWarning';
import InstallGuide from './components/modals/InstallGuide';
import LocationPermissionModal from './components/modals/LocationPermissionModal';
import AffiliateAdModal from './components/modals/AffiliateAdModal';
import LevelUpShareModal from './components/modals/LevelUpShareModal';
import SkipShareModal from './components/modals/SkipShareModal';
import CommunityModal from './components/modals/CommunityModal';
import SkinTypeInputModal from './components/modals/SkinTypeInputModal';
import BathTypeDiagnosisModal from './components/modals/BathTypeDiagnosisModal';

import SleepModeView from './components/SleepModeView';
import SplashScreen from './components/SplashScreen';
import ActionButton from './components/ActionButton';
import CommunityBanner from './components/CommunityBanner';
import WeeklyReportBanner from './components/WeeklyReportBanner';
import TutorialOverlay, { TutorialStartModal } from './components/TutorialOverlay';
import HamburgerMenu from './components/HamburgerMenu';

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
    const [showAffiliateAdModal, setShowAffiliateAdModal] = useState(false); // スキップ時の広告モーダル
    const [showLevelUpModal, setShowLevelUpModal] = useState(false); // レベルアップ時のモーダル
    const [newLevel, setNewLevel] = useState(null); // 新しいレベル
    const [showSkipShareModal, setShowSkipShareModal] = useState(false); // サボリシェアモーダル
    const [sleepHoursForShare, setSleepHoursForShare] = useState(0); // シェア用の睡眠時間
    const [pendingSleepAfterFortune, setPendingSleepAfterFortune] = useState(false); // 占い後にスリープに入るフラグ
    const [showCommunityModal, setShowCommunityModal] = useState(false); // コミュニティモーダル
    const [showBathTypeDiagnosis, setShowBathTypeDiagnosis] = useState(false); // バスタイプ診断モーダル

    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [showBathRatingModal, setShowBathRatingModal] = useState(false); // お風呂評価モーダル
    const [pendingBathEvent, setPendingBathEvent] = useState(null); // 評価待ちのお風呂イベント
    const [isHelpOpen, setIsHelp] = useState(false);

    const [selectedDateDetails, setSelectedDateDetails] = useState(null);


    const [showInAppWarning, setShowInAppWarning] = useState(false);
    const [showInstallGuide, setShowInstallGuide] = useState(false);
    const [showBathConfirmModal, setShowBathConfirmModal] = useState(false);
    const [showOutingActionModal, setShowOutingActionModal] = useState(false);

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isFetchingWeather, setIsFetchingWeather] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

    const audioRef = useRef(null);
    const sePopRef = useRef(null);
    const seKiraRef = useRef(null);
    const [showSplash, setShowSplash] = useState(true);

    // チュートリアル用State
    const [showTutorialStart, setShowTutorialStart] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    // 肌タイプ用State
    const [skinType, setSkinType] = useState(null);
    const [showSkinTypeModal, setShowSkinTypeModal] = useState(false);

    // Plan C: Tap-to-Speak State
    const [showBubble, setShowBubble] = useState(false);
    const [bubbleText, setBubbleText] = useState("");
    const bubbleTimeoutRef = useRef(null);

    // ハンバーガーメニュー
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

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

        // 最初のユーザーインタラクションでBGMを開始
        const startBgmOnInteraction = () => {
            if (isBgmPlayingRef.current && audioRef.current && !isSleeping) {
                audioRef.current.play().catch(() => { });
            }
            // 一度だけ実行
            document.removeEventListener('click', startBgmOnInteraction);
            document.removeEventListener('touchstart', startBgmOnInteraction);
        };
        document.addEventListener('click', startBgmOnInteraction);
        document.addEventListener('touchstart', startBgmOnInteraction);

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
            document.removeEventListener('click', startBgmOnInteraction);
            document.removeEventListener('touchstart', startBgmOnInteraction);
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

    // 天気取得のヘルパー関数
    const handleWeatherData = useCallback((temp, isFallback = false) => {
        setWeatherData({ temperature: temp, updated: new Date().toISOString() });
        if (isFallback) { addLog(`東京の気温(${temp}°C)を取得しました`, "🗼", 'system'); }
        else { addLog(`天気取得完了！現在${temp}°C`, "🌤️", 'system'); }
        setIsFetchingWeather(false);
    }, []);

    const fetchTokyoWeather = useCallback(async () => {
        setIsFetchingWeather(true);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            handleWeatherData(data.current_weather.temperature, true);
        } catch (e) { addLog("天気の取得に失敗しました💦", "❌", 'system'); setIsFetchingWeather(false); }
    }, [handleWeatherData]);

    const fetchWithLocation = useCallback(() => {
        setIsFetchingWeather(true);
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
    }, [handleWeatherData, fetchTokyoWeather]);

    const handleWeatherButtonPress = () => {
        playSe('pop');
        setShowLocationModal(true);
    };

    const handleLocationAllow = () => {
        setShowLocationModal(false);
        fetchWithLocation();
    };

    const handleLocationDeny = () => {
        setShowLocationModal(false);
        fetchTokyoWeather();
    };

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

        // 肌タイプのロード
        if (load(STORAGE_KEY_SKIN_TYPE)) setSkinType(load(STORAGE_KEY_SKIN_TYPE));

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
            if ((new Date() - lastUpdate) > 1000 * 60 * 60) fetchTokyoWeather();
        } else { fetchTokyoWeather(); }

        const ua = navigator.userAgent.toLowerCase();
        const isInAppBrowser = /line|instagram|twitter|fbav|fban/.test(ua);
        if (isInAppBrowser) { setShowInAppWarning(true); }
        else {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
            if (!isStandalone) setTimeout(() => setShowInstallGuide(true), 2000);
        }
        const lastLogin = localStorage.getItem('hq_last_login');
        const tutorialCompleted = localStorage.getItem(STORAGE_KEY_TUTORIAL_COMPLETED);
        const now = new Date();
        // チュートリアル完了済みで、睡眠中でない場合のみ外出モーダルを表示
        if (lastLogin && !isSleeping && tutorialCompleted) {
            const diff = (now - new Date(lastLogin)) / (1000 * 60 * 60);
            if (diff >= 1) { // 1時間以上ぶりなら外出アクション確認
                setShowOutingActionModal(true);
            }

        }
        localStorage.setItem('hq_last_login', now.toISOString());

        // 初回起動時のチュートリアル表示チェック（アプリ内ブラウザ警告がない場合のみ）
        if (!tutorialCompleted && !isInAppBrowser) {
            // スプラッシュ終了後に表示するため、少し遅延
            setTimeout(() => setShowTutorialStart(true), 2500);
        }
    }, [fetchTokyoWeather]);

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
        // 肌タイプのセーブ
        if (skinType) localStorage.setItem(STORAGE_KEY_SKIN_TYPE, skinType);
    }, [hp, lastBathTime, eventDamageTotal, logs, bathEvents, weatherData, isSleeping, sleepType, sleepStartTime, savedMinutes, skinType]);

    const getWeatherDamageRate = () => { if (!weatherData) return 1.0; const t = weatherData.temperature; if (t >= 30) return 1.5; if (t >= 25) return 1.2; if (t <= 10) return 0.8; return 1.0; };
    const weatherRate = getWeatherDamageRate();

    // 肌タイプによるダメージ倍率
    const getSkinDamageRate = () => {
        if (!skinType) return 1.0;
        const type = SKIN_TYPES.find(t => t.id === skinType);
        return type ? type.damageRate : 1.0;
    };
    const skinDamageRate = getSkinDamageRate();

    // --- 睡眠機能の実装 ---
    const handleSleepButtonPress = () => {
        // 直近3時間以内に入浴記録（お風呂に入った記録、sleepタイプではないもの）があるかチェック
        const now = new Date();
        const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

        // bathEventsから実際のお風呂記録を探す（type !== 'sleep'）
        const recentBathRecord = bathEvents.find(event => {
            if (!event.time || event.type === 'sleep') return false;
            const eventTime = new Date(event.time);
            return eventTime > threeHoursAgo;
        });

        if (recentBathRecord) {
            // 直近3時間以内にお風呂に入っているなら即座に通常睡眠
            startSleep('normal');
        } else {
            // 入ってないなら確認モーダルを表示
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
            // レベルアップ検知のため、事前にレベルを計算
            const oldLevel = calculateLevel(savedMinutes);
            const newMinutes = savedMinutes + 30;
            const newLevelValue = calculateLevel(newMinutes);

            setSavedMinutes(newMinutes); // 30分貯金
            // 履歴に追加 (type: 'sleep')
            const newEvent = { dateStr: getLocalDateStr(now), time: now.toISOString(), hoursSince: '-', preBathHp: '-', fortune: null, type: 'sleep' };
            setBathEvents(prev => [newEvent, ...prev]);
            addLog("今日は寝る！（スキップ）30分貯金しました💰", "💤", 'action');

            // レベルアップしたらモーダル表示
            if (newLevelValue > oldLevel) {
                setNewLevel(newLevelValue);
                setTimeout(() => setShowLevelUpModal(true), 500);
            }
        } else {
            addLog("おやすみモードを開始しました💤", "🛌", 'system');
        }

        playSe('pop');
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleWakeUp = () => {
        const now = new Date();
        const wasSkip = sleepType === 'skip'; // スキップだったかどうか保存
        let sleepHours = 0;

        setIsSleeping(false);

        // ダメージ計算: (経過時間 * 基本ダメージ * 天候倍率)
        if (sleepStartTime) {
            const diffMs = now - new Date(sleepStartTime);
            sleepHours = diffMs / (1000 * 60 * 60);
            const damage = Math.floor(sleepHours * BASE_SLEEP_DAMAGE * weatherRate); // 天候倍率を適用
            setEventDamageTotal(prev => prev + damage);
            addLog(`おはよう！よく寝たね✨ (睡眠ダメージ: -${damage})`, "☀️", 'action');
        }
        setSleepStartTime(null);
        playSe('kira');

        // スキップだった場合、サボリシェアモーダルを表示
        if (wasSkip) {
            setSleepHoursForShare(sleepHours);
            setTimeout(() => setShowSkipShareModal(true), 300);
        }
    };

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 5000); return () => clearInterval(timer); }, []);

    useEffect(() => {
        if (isSleeping) return; // 睡眠中はHPの自動減少を行わない（起きた時にまとめて計算）
        const diffMs = new Date() - lastBathTime;
        const hours = diffMs / (1000 * 60 * 60);
        const timeDamage = hours * BASE_RATE_PER_HOUR * weatherRate * skinDamageRate;
        const totalDamage = timeDamage + eventDamageTotal;
        setHp(Math.max(0, Math.min(100, 100 - totalDamage)));
    }, [currentTime, lastBathTime, eventDamageTotal, weatherRate, skinDamageRate, isSleeping]);

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
        // 占いを削除し、評価モーダルを表示
        const newEvent = { dateStr: getLocalDateStr(now), time: now.toISOString(), hoursSince: hoursSince.toFixed(1), preBathHp: Math.floor(hp), type: 'bath', rating: 0, memo: '' };
        setPendingBathEvent(newEvent);
        setLastBathTime(now);
        setEventDamageTotal(0);
        setHp(100);
        addLog("お風呂入って復活！今日も私が一番カワイイ💖", "🛁", 'action');
        playSe('kira');
        setTimeout(() => { setShowBathRatingModal(true); }, 500);
        if (navigator.vibrate) navigator.vibrate([0, 100, 50, 100]);
    };

    // お風呂評価を保存
    const handleBathRatingSubmit = ({ rating, memo }) => {
        if (pendingBathEvent) {
            const eventWithRating = { ...pendingBathEvent, rating, memo };
            setBathEvents(prev => [eventWithRating, ...prev]);
            setPendingBathEvent(null);
        }
        setShowBathRatingModal(false);
        // 記録忘れフローの場合、評価後にスリープに入る
        if (pendingSleepAfterFortune) {
            setPendingSleepAfterFortune(false);
            startSleep('normal');
        }
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
            const infoStartY = cardY + 510;
            // 時間表示（ホーム画面スタイル - font-mono）
            ctx.fillStyle = '#111827'; ctx.font = '900 80px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'; ctx.fillText(elapsedFormatted, cx, infoStartY);
            ctx.fillStyle = '#9ca3af'; ctx.font = 'bold 24px "Zen Maru Gothic"'; ctx.fillText('風呂キャンした時間', cx, infoStartY + 35);

            // 清潔度ラベルとパーセント（ホーム画面スタイル）
            const hpBarY = infoStartY + 90;
            // 清潔度ラベル（左）
            ctx.fillStyle = '#ec4899';
            drawRoundedRect(ctx, cx - 200, hpBarY, 100, 36, 18); ctx.fill();
            ctx.fillStyle = '#ffffff'; ctx.font = 'bold 20px "Zen Maru Gothic"'; ctx.fillText('清潔度', cx - 150, hpBarY + 25);
            // パーセント（右）
            ctx.fillStyle = hp > 50 ? '#ec4899' : hp > 20 ? '#f97316' : '#6b7280';
            ctx.font = '900 50px "Mochiy Pop One"'; ctx.textAlign = 'right'; ctx.fillText(`${Math.floor(hp)}%`, cx + 200, hpBarY + 40);
            ctx.textAlign = 'center';

            // HPバー
            const barY = hpBarY + 55;
            const barW = 400; const barH = 24;
            ctx.fillStyle = '#e5e7eb'; drawRoundedRect(ctx, cx - barW / 2, barY, barW, barH, 12); ctx.fill();
            // グラデーションバー
            const barGrad = ctx.createLinearGradient(cx - barW / 2, 0, cx + barW / 2, 0);
            barGrad.addColorStop(0, '#ec4899'); barGrad.addColorStop(0.5, '#fb923c'); barGrad.addColorStop(1, '#facc15');
            ctx.fillStyle = barGrad;
            drawRoundedRect(ctx, cx - barW / 2, barY, barW * (hp / 100), barH, 12); ctx.fill();
            // ハートアイコン
            const heartX = cx - barW / 2 + barW * (hp / 100);
            ctx.font = '28px sans-serif'; ctx.fillText(hp > 80 ? '❤️' : hp > 50 ? '🧡' : hp > 30 ? '💛' : hp > 10 ? '💔' : '🖤', heartX, barY + 8);

            ctx.fillStyle = '#374151'; ctx.font = 'bold 36px "Yomogi"'; ctx.fillText(`「${status.shareMsg}」`, W / 2, 1070);
            ctx.fillStyle = '#ec4899'; ctx.font = 'bold 28px "Mochiy Pop One"'; ctx.fillText('#フロハイッタ', W / 2, 1130);
            ctx.fillStyle = '#9ca3af'; ctx.font = '20px "Zen Maru Gothic"'; ctx.fillText('bath-check.com', W / 2, 1170);
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

    // 昨日の風呂キャン推定人数（useMemoを早期リターン前に移動）
    const saboriCount = useMemo(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const seed = yesterday.getFullYear() * 10000 + (yesterday.getMonth() + 1) * 100 + yesterday.getDate();
        const pseudoRandom = ((seed * 9301 + 49297) % 233280) / 233280;
        return Math.floor(100 + pseudoRandom * 900);
    }, []);

    // 経過時間を時間:分:秒形式でフォーマット
    const elapsedMs = new Date() - lastBathTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const elapsedFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const secondsFormatted = String(seconds).padStart(2, '0');
    const hoursSince = (elapsedMs / (1000 * 60 * 60)).toFixed(1); // 共有用に残す

    // HPに応じたハートアイコン
    const getHeartEmoji = (hpValue) => {
        if (hpValue > 80) return '❤️';
        if (hpValue > 50) return '🧡';
        if (hpValue > 30) return '💛';
        if (hpValue > 10) return '💔';
        return '🖤';
    };

    if (isSleeping) {
        return <SleepModeView onWakeUp={handleWakeUp} savedMinutes={savedMinutes} status={status} sleepType={sleepType} />;
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-pink-50 relative overflow-hidden text-gray-800 font-sans">
            {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

            {showInAppWarning && <InAppBrowserWarning onClose={() => {
                setShowInAppWarning(false);
                // チュートリアル未完了時はチュートリアルを開始
                const tutorialCompleted = localStorage.getItem(STORAGE_KEY_TUTORIAL_COMPLETED);
                if (!tutorialCompleted) {
                    setTimeout(() => setShowTutorialStart(true), 500);
                }
            }} />}
            {showInstallGuide && !showTutorialStart && !showTutorial && <InstallGuide onClose={() => setShowInstallGuide(false)} />}
            <LocationPermissionModal isOpen={showLocationModal} onAllowLocation={handleLocationAllow} onUseDefault={handleLocationDeny} />

            <OutingActionModal isOpen={showOutingActionModal} onClose={() => setShowOutingActionModal(false)} onAction={handleManualDamage} />
            <BathConfirmModal isOpen={showBathConfirmModal} onClose={() => setShowBathConfirmModal(false)} onConfirm={handleBath} />
            <SleepConfirmModal
                isOpen={showSleepConfirmModal}
                onClose={() => setShowSleepConfirmModal(false)}
                onConfirm={() => {
                    setShowSleepConfirmModal(false);
                    setShowAffiliateAdModal(true); // まず広告モーダルを表示
                }}
                onForgot={() => {
                    setShowSleepConfirmModal(false);
                    setPendingSleepAfterFortune(true); // 占い後にスリープに入るフラグをセット
                    handleBath(); // 入浴処理を実行（占いモーダルが開く）
                }}
                saboriCount={saboriCount}
            />
            <AffiliateAdModal
                isOpen={showAffiliateAdModal}
                onClose={() => {
                    setShowAffiliateAdModal(false);
                    startSleep('skip'); // 広告モーダルを閉じたらスリープ開始
                }}
            />
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelp(false)} onStartTutorial={() => { setIsHelp(false); setShowTutorial(true); }} onChangeSkinType={() => { setIsHelp(false); setShowSkinTypeModal(true); }} />
            <BathRatingModal
                isOpen={showBathRatingModal}
                onClose={() => setShowBathRatingModal(false)}
                onSubmit={handleBathRatingSubmit}
            />
            <DayDetailModal isOpen={!!selectedDateDetails} onClose={() => setSelectedDateDetails(null)} details={selectedDateDetails} logs={logs} />

            <SavingsModal isOpen={isSavingsModalOpen} onClose={() => setIsSavingsModalOpen(false)} savedMinutes={savedMinutes} />
            <LevelUpShareModal isOpen={showLevelUpModal} onClose={() => setShowLevelUpModal(false)} newLevel={newLevel} savedMinutes={savedMinutes} />
            <SkipShareModal isOpen={showSkipShareModal} onClose={() => setShowSkipShareModal(false)} sleepHours={sleepHoursForShare} />

            {/* 肌タイプ入力モーダル */}
            <SkinTypeInputModal
                isOpen={showSkinTypeModal}
                onClose={() => setShowSkinTypeModal(false)}
                onSelect={(type) => {
                    setSkinType(type);
                    setShowSkinTypeModal(false);
                }}
                currentSkinType={skinType}
            />

            {/* --- TOP: Past / Premise (突きつける) --- */}
            <div className="flex-none pt-safe px-6 pb-4 flex flex-col items-center relative z-10 w-full mt-4">
                {/* Helper ButtonsRow */}
                <div className="w-full flex justify-between items-center mb-6 px-4">
                    <button id="stats-button" onClick={() => { playSe('pop'); setIsStatsOpen(true); }} className="flex flex-col items-center gap-1 group">
                        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            <Icons.BarChart2 size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors">記録・分析</span>
                    </button>

                    {/* Weather moved here */}
                    {!weatherData ? (
                        <button onClick={handleWeatherButtonPress} disabled={isFetchingWeather} className="flex flex-col items-center gap-1 group">
                            <div className="p-2 rounded-full bg-blue-50 text-blue-400 group-hover:bg-blue-100 transition-colors">
                                <Icons.Cloud size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-blue-400">{isFetchingWeather ? "..." : "天気取得"}</span>
                        </button>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1">
                                <span className="text-xl">{weatherData.temperature >= 25 ? '🥵' : weatherData.temperature <= 10 ? '🥶' : '🌤️'}</span>
                                <span className="text-sm font-black font-pop text-gray-600">{weatherData.temperature}°C</span>
                                <span className={`text-[10px] font-bold px-1 py-0.5 rounded ${weatherRate > 1.0 ? 'bg-red-100 text-red-500' : weatherRate < 1.0 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'}`}>
                                    x{weatherRate}
                                </span>
                            </div>
                        </div>
                    )}

                    <button onClick={() => { playSe('pop'); setShowHamburgerMenu(true); }} className="flex flex-col items-center gap-1 group">
                        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors">
                            <Icons.Menu size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-pink-500 transition-colors">メニュー</span>
                    </button>
                </div>

                {/* タイプ診断バナー - 目立つように配置 */}
                <button
                    onClick={() => { playSe('pop'); setShowBathTypeDiagnosis(true); }}
                    className="w-full max-w-xs mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-lg shadow-purple-200 active:scale-95 transition-transform"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <div className="text-left">
                            <p className="font-bold text-sm">タイプ診断</p>
                            <p className="text-[10px] opacity-80">あなたの風呂キャンタイプは？</p>
                        </div>
                    </div>
                    <Icons.ChevronRight size={20} />
                </button>


                {/* Status Avatar (The "Subject") & Tap-to-Speak (Plan C) */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-2 z-30">
                    {/* Tap Area */}
                    <div
                        onClick={() => {
                            const s = getStatus(hp);
                            // 30%の確率で曜日別セリフ、70%でHP別セリフ
                            const dayOfWeek = new Date().getDay();
                            const useDailyGreeting = Math.random() < 0.3;
                            const msg = useDailyGreeting
                                ? DAILY_GREETINGS[dayOfWeek]
                                : s.msgList[Math.floor(Math.random() * s.msgList.length)];
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
                    <img src={status.avatar} alt={status.label} className="relative z-10 w-36 h-36 object-contain drop-shadow-sm pointer-events-none animate-float-breathe" />

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
                    <div className="flex items-baseline justify-center gap-1">
                        <p className={`font-black text-gray-900 tracking-tight font-mono ${hours >= 100 ? 'text-4xl' : 'text-5xl'}`}>
                            {elapsedFormatted}
                        </p>
                        <p className="text-xl font-bold text-gray-400 font-mono">
                            :{secondsFormatted}
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-1">風呂キャンした時間</p>
                </div>
                <div id="hp-bar" className="w-full max-w-xs mx-auto mt-4">
                    {/* 清潔度ラベルとパーセンテージ */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="bg-pink-500 text-white text-xs font-black px-3 py-1 rounded-full">清潔度</span>
                        <span className={`text-3xl font-black ${hp > 50 ? 'text-pink-500' : hp > 20 ? 'text-orange-500' : 'text-gray-500'}`}>{Math.floor(hp)}%</span>
                    </div>

                    {/* グラデーションバー＋ハートアイコン */}
                    <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-visible">
                        <div
                            style={{ width: `${hp}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400"
                        ></div>
                        {/* ハートアイコン（バーの先端） */}
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-xl"
                            style={{ left: `${hp}%` }}
                        >
                            {getHeartEmoji(hp)}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CENTER: Present / Action (促す) --- */}
            <div className="flex-none flex flex-col items-center px-6 gap-4 relative z-20 w-full mt-8">
                {/* HP > 40% の場合は寝るボタンを先に表示 */}
                {hp > 40 ? (
                    <>
                        {/* Primary: Sleep (HP高い時) */}
                        <button
                            id="sleep-button"
                            onClick={handleSleepButtonPress}
                            className="w-full max-w-xs active:scale-95 transition-transform"
                        >
                            <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full py-5 px-8 flex items-center justify-center gap-3 shadow-lg shadow-indigo-300/50">
                                <Icons.Zzz size={24} />
                                <span className="text-xl font-black tracking-wide">今日はもう寝る...</span>
                            </div>
                        </button>
                        {/* Secondary: Bath */}
                        <button
                            id="bath-button"
                            onClick={() => { playSe('pop'); setShowBathConfirmModal(true); }}
                            className="flex items-center justify-center gap-2 font-bold py-3 px-6 active:scale-95 transition-transform rounded-full text-pink-400 bg-pink-50"
                        >
                            <Icons.Bath size={16} />
                            <span className="text-sm">お風呂に入る</span>
                        </button>
                    </>
                ) : (
                    <>
                        {/* Primary: Bath (HP低い時) */}
                        <button
                            id="bath-button"
                            onClick={() => { playSe('pop'); setShowBathConfirmModal(true); }}
                            className="w-full max-w-xs active:scale-95 transition-transform"
                        >
                            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-full py-5 px-8 flex items-center justify-center gap-3 shadow-lg shadow-pink-300/50">
                                <Icons.Bath size={28} />
                                <span className="text-xl font-black tracking-wide">お風呂に入る</span>
                            </div>
                        </button>
                        {/* Secondary: Sleep */}
                        <button
                            id="sleep-button"
                            onClick={handleSleepButtonPress}
                            className="flex items-center justify-center gap-2 font-bold py-3 px-6 active:scale-95 transition-transform rounded-full text-indigo-400 bg-indigo-50"
                        >
                            <Icons.Zzz size={16} />
                            <span className="text-sm">今日はもう寝る...</span>
                        </button>
                    </>
                )}
            </div>

            {/* --- BOTTOM: Future / Exit (繋げる) --- */}
            <div className="flex-none px-6 pt-2 pb-4 flex flex-col items-center gap-3 w-full">
                {/* Zubora Savings */}
                <button
                    id="savings-button"
                    onClick={() => { playSe('pop'); setIsSavingsModalOpen(true); }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors"
                >
                    <Icons.Gem size={16} />
                    <span className="text-xs font-bold">ズボラ貯金 Lv.{calculateLevel(savedMinutes)}</span>
                    <span className="text-sm font-black font-pop">{savedMinutes}分</span>
                </button>

                {/* Tools Row */}
                <div className="flex gap-4 mt-2 mb-4 w-full justify-center px-4">
                    {/* Camera Button (Action) */}
                    <button onClick={() => generateShareImage()} disabled={isGenerating} className="flex flex-col items-center gap-1 group min-w-[3.5rem] disabled:opacity-50">
                        <div className="p-3 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500 transition-all group-active:scale-95 relative">
                            {isGenerating ? (
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Icons.Camera size={20} />
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-pink-500 transition-colors">シェア</span>
                    </button>

                    {/* BGM */}
                    <button onClick={toggleBgm} className="flex flex-col items-center gap-1 group min-w-[3.5rem]">
                        <div className={`p-3 rounded-2xl transition-all group-active:scale-95 ${isBgmPlaying
                            ? 'bg-pink-100 text-pink-500 shadow-sm border border-pink-200'
                            : 'bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500'
                            }`}>
                            <Icons.Music size={20} className={isBgmPlaying ? 'animate-pulse' : ''} />
                        </div>
                        <span className={`text-[10px] font-bold transition-colors ${isBgmPlaying ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-500'
                            }`}>BGM</span>
                    </button>
                </div>
            </div>

            <CommunityBanner showInstallGuide={showInstallGuide} showTutorial={showTutorial || showTutorialStart} />
            <WeeklyReportBanner onOpenReport={() => setIsStatsOpen(true)} bathEvents={bathEvents} />
            <CommunityModal isOpen={showCommunityModal} onClose={() => setShowCommunityModal(false)} />
            <HamburgerMenu
                isOpen={showHamburgerMenu}
                onClose={() => setShowHamburgerMenu(false)}
                onOpenBlog={() => window.open('https://bath-check.com/blog/', '_blank')}
                onOpenCommunity={() => setShowCommunityModal(true)}
                onOpenSkinType={() => setShowSkinTypeModal(true)}
                onOpenHelp={() => setIsHelp(true)}
            />
            <StatsModal isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} bathEvents={bathEvents} savedMinutes={savedMinutes} onDayClick={(details) => { playSe('pop'); setSelectedDateDetails(details); setIsStatsOpen(false); }} />
            {generatedImage && (<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setGeneratedImage(null)}> <div className="bg-transparent w-full max-w-sm relative" onClick={e => e.stopPropagation()}> <img src={generatedImage} alt="Share" className="w-full rounded-xl shadow-2xl" /> <div className="text-center mt-4 text-white font-bold text-sm opacity-80">長押しして保存</div></div> </div>)}

            {/* チュートリアル */}
            {
                showTutorialStart && (
                    <TutorialStartModal
                        onStart={() => {
                            setShowTutorialStart(false);
                            setShowTutorial(true);
                        }}
                        onSkip={() => {
                            setShowTutorialStart(false);
                            localStorage.setItem(STORAGE_KEY_TUTORIAL_COMPLETED, 'true');
                        }}
                    />
                )
            }
            {
                showBathTypeDiagnosis && (
                    <BathTypeDiagnosisModal
                        isOpen={showBathTypeDiagnosis}
                        onClose={() => setShowBathTypeDiagnosis(false)}
                        bathEvents={bathEvents}
                    />
                )
            }
            {
                showTutorial && (
                    <TutorialOverlay
                        onComplete={() => {
                            setShowTutorial(false);
                            localStorage.setItem(STORAGE_KEY_TUTORIAL_COMPLETED, 'true');
                            setShowSkinTypeModal(true);
                        }}
                        onSkip={() => {
                            setShowTutorial(false);
                            localStorage.setItem(STORAGE_KEY_TUTORIAL_COMPLETED, 'true');
                            setShowSkinTypeModal(true);
                        }}
                        onTutorialBath={() => {
                            // チュートリアル用 - 音だけ鳴らす（実データは変更しない）
                            playSe('kira');
                        }}
                        onTutorialSleep={() => {
                            // チュートリアル用 - 音だけ鳴らす（実データは変更しない）
                            playSe('pop');
                        }}
                    />
                )
            }
        </div >
    );
};

export default App;
