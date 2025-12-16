import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icons } from './components/Icons';
import { STATUS_MESSAGES, BASE_RATE_PER_HOUR, BASE_SLEEP_DAMAGE, STORAGE_KEY_HP, STORAGE_KEY_LAST_BATH, STORAGE_KEY_DAMAGE, STORAGE_KEY_LOGS, STORAGE_KEY_HISTORY, STORAGE_KEY_WEATHER, STORAGE_KEY_IS_SLEEPING, STORAGE_KEY_SLEEP_TYPE, STORAGE_KEY_SLEEP_START, STORAGE_KEY_SAVED_MINUTES, SE_POP_URL, SE_KIRA_URL, BGM_URL } from './constants';
import { generateFortune, getLocalDateStr, calculateLevel } from './utils';

import WelcomeModal from './components/modals/WelcomeModal';
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

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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
      if (diff > 6 && diff < 16) { setShowWelcomeModal(true); }
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

  const hoursSince = ((new Date() - lastBathTime) / (1000 * 60 * 60)).toFixed(1);

  if (isSleeping) {
    return <SleepModeView onWakeUp={handleWakeUp} savedMinutes={savedMinutes} status={status} sleepType={sleepType} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4 pb-safe relative">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="float-bg">{[...Array(15)].map((_, i) => <div key={i} className="float-item" style={{ left: `${Math.random() * 100}%`, animationDuration: `${15 + Math.random() * 20}s`, animationDelay: `${Math.random() * 10}s`, fontSize: `${10 + Math.random() * 20}px` }}>{i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '🛁'}</div>)}</div>

      {showInAppWarning && <InAppBrowserWarning onClose={() => setShowInAppWarning(false)} />}
      {showInstallGuide && <InstallGuide onClose={() => setShowInstallGuide(false)} />}
      <WelcomeModal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} onAction={(damage, logText, icon) => { setEventDamageTotal(prev => prev + damage); addLog(logText, icon, 'action'); setShowWelcomeModal(false); playSe('pop'); }} />
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

      <div className="w-full flex justify-between items-center pt-safe mb-4 mt-2 relative z-20 px-2">
        <div className="flex gap-2">
          <button onClick={() => { playSe('pop'); setIsCalendarOpen(true); }} className="bg-white/80 p-3 rounded-full shadow-md text-pink-500 hover:scale-110 transition-transform"><Icons.Calendar size={24} /></button>
          <button onClick={toggleBgm} className={`p-3 rounded-full shadow-md transition-transform ${isBgmPlaying ? 'bg-pink-500 text-white animate-pulse' : 'bg-white/80 text-pink-500'}`}><Icons.Music size={24} /></button>
          <button onClick={() => { playSe('pop'); setIsHelp(true); }} className="bg-white/80 p-3 rounded-full shadow-md text-pink-500 hover:scale-110 transition-transform"><Icons.Help size={24} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { const text = `現在の清潔度: ${Math.floor(hp)}% (${status.label})\nお風呂に入らず${hoursSince}時間が経過... ${status.deco}\n\n適切な入浴タイミングを診断中！ #フロハイッタ`; const url = "https://app.bath-check.com/"; window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank'); }} className="bg-white/80 p-3 rounded-full shadow-md text-pink-500 hover:scale-110 transition-transform"> <Icons.XLogo size={24} /> </button>
          <button onClick={() => generateShareImage()} disabled={isGenerating} className="bg-white/80 p-3 rounded-full shadow-md text-pink-500 hover:scale-110 transition-transform disabled:opacity-50"> {isGenerating ? <div className="animate-spin w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full"></div> : <Icons.Camera size={24} />} </button>
        </div>
      </div>

      {/* ズボラ貯金表示エリア (タップでモーダルオープン) */}
      <button
        onClick={() => { playSe('pop'); setIsSavingsModalOpen(true); }}
        className="w-full max-w-sm flex items-center gap-2 mb-4 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 shadow-sm active:scale-95 transition-all"
      >
        <Icons.Gem size={18} className="text-indigo-400" />
        <div className="flex-1 text-left">
          <div className="text-[10px] text-indigo-400 font-bold">ズボラ貯金 Lv.{calculateLevel(savedMinutes)}</div>
          <div className="text-xs font-bold text-indigo-600 font-pop">{savedMinutes}分 <span className="text-[10px] text-indigo-400 font-normal">(詳細をタップ✨)</span></div>
        </div>
      </button>

      <div className="w-full max-w-sm mb-4">
        {!weatherData ? (
          <button onClick={fetchWeather} disabled={isFetchingWeather} className="w-full bg-blue-50 border-2 border-blue-200 text-blue-500 font-bold py-2 rounded-xl shadow-sm text-xs flex items-center justify-center gap-2 transition-transform active:scale-95"> {isFetchingWeather ? <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div> : <Icons.Cloud size={16} />} <span>現在地の天気を取得してリアル連携 (β)</span> </button>
        ) : (
          <div className="w-full bg-white/80 border-2 border-blue-100 rounded-xl p-3 flex items-center justify-between shadow-sm relative overflow-hidden">
            {weatherRate > 1.0 && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg animate-pulse">ダメージ加速中!</div>}
            {weatherRate < 1.0 && <div className="absolute top-0 right-0 bg-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">快適ボーナス中!</div>}
            <div className="flex items-center gap-3">
              <div className="text-3xl">{weatherData.temperature >= 25 ? '🥵' : weatherData.temperature <= 10 ? '🥶' : '🌤️'}</div>
              <div>
                <div className="text-xs font-bold text-gray-400">現在の気温</div>
                <div className="text-xl font-black text-gray-700 font-pop">{weatherData.temperature}°C</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400">ダメージ倍率</div>
              <div className={`text-lg font-black font-pop ${weatherRate > 1.0 ? 'text-red-500' : weatherRate < 1.0 ? 'text-blue-500' : 'text-gray-600'}`}>x{weatherRate}</div>
            </div>
            <button onClick={fetchWeather} className="absolute bottom-2 right-2 text-gray-300 p-1 hover:text-blue-400"><Icons.Cloud size={12} /></button>
          </div>
        )}
      </div>

      <div className="w-full max-w-sm glass-card rounded-3xl p-6 mb-6 text-center relative overflow-visible">
        <div className="absolute -top-6 -right-1 text-6xl animate-bounce z-20 filter drop-shadow-lg">{status.deco}</div>
        <div className="absolute top-0 left-0 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-br-2xl rounded-tl-2xl shadow-sm z-10 font-pop">{status.label}</div>
        <div className="w-40 h-40 mx-auto mt-8 mb-6 relative purupuru select-none flex items-center justify-center">
          <div className={`absolute inset-2 rounded-full opacity-60 blur-2xl ${status.glow}`} style={{ transform: 'translate3d(0,0,0)' }}></div>
          <img src={status.avatar} alt={status.label} className="relative z-10 w-32 h-32 object-contain drop-shadow-md rounded-full" />
        </div>
        <div className="relative pt-1 mb-2">
          <div className="flex mb-2 items-center justify-between font-pop">
            <span className="text-sm font-bold inline-block py-1 px-3 uppercase rounded-full text-white bg-pink-400 shadow-md">清潔度</span>
            <span className="text-2xl font-black text-pink-500 drop-shadow-sm">{Math.floor(hp)}%</span>
          </div>
          <div className="h-6 w-full rounded-full meter-track relative mt-2"><div style={{ width: `${hp}%` }} className="h-full rounded-full meter-fill relative"></div><div style={{ left: `calc(${hp}% - 12px)` }} className="absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center meter-icon"><span className="text-2xl">💖</span></div></div>
        </div>
        <div className="relative bg-white/80 rounded-xl p-4 border-2 border-pink-100 shadow-sm mt-4">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-pink-100 rotate-45"></div>
          <p className="font-bold text-gray-700 leading-relaxed text-sm font-hand">{status.shareMsg}</p>
        </div>
      </div>

      <div className="bg-white/80 px-6 py-3 rounded-2xl mb-8 shadow-md border-2 border-white flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-2 text-pink-400"><Icons.Clock size={20} /><span className="text-xs font-bold">経過時間</span></div>
        <span className="text-2xl font-black text-pink-500 font-pop">{hoursSince}<span className="text-sm ml-1 text-pink-400">H</span></span>
      </div>

      {/* お風呂ボタン & 寝るボタン エリア */}
      <div className="w-full max-w-sm mb-36 flex flex-col gap-4">
        <button onClick={() => { playSe('pop'); setShowBathConfirmModal(true); }} className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-black py-4 rounded-full shadow-lg border-4 border-white active:scale-95 transition-all flex items-center justify-center gap-2 text-lg font-pop relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Icons.Bath size={24} /> <span>お風呂入ってリセット✨</span>
        </button>

        {/* HP40%以上の時は「今日は寝る」を激推し */}
        {hp >= 40 ? (
          <div className="animate-pulse">
            <div className="text-center text-xs font-bold text-indigo-500 mb-1">今日はパスでOK！肌のバリア機能を守ろう🛡️</div>
            <button onClick={handleSleepButtonPress} className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white font-black py-3 rounded-full shadow-md border-2 border-white active:scale-95 transition-all flex items-center justify-center gap-2 text-base font-pop">
              <Icons.Zzz size={20} /> <span>今日は寝る！</span>
            </button>
          </div>
        ) : (
          <button onClick={handleSleepButtonPress} className="w-full bg-gray-100 text-gray-400 font-bold py-2 rounded-full active:scale-95 transition-all flex items-center justify-center gap-2 text-xs">
            <Icons.Zzz size={16} /> <span>今日はもう限界...寝る</span>
          </button>
        )}
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-4 z-40 pointer-events-none">

      </div>

      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} bathEvents={bathEvents} onDayClick={(details) => { playSe('pop'); setSelectedDateDetails(details); setIsCalendarOpen(false); }} />
      {generatedImage && (<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setGeneratedImage(null)}> <div className="bg-white rounded-3xl p-4 w-full max-w-sm relative" onClick={e => e.stopPropagation()}> <button onClick={() => setGeneratedImage(null)} className="absolute -top-3 -right-3 bg-gray-500 text-white p-2 rounded-full"><Icons.X size={16} /></button> <h3 className="text-center font-bold text-gray-700 mb-2 font-pop">画像を長押しして保存してね！</h3> <img src={generatedImage} alt="Share" className="w-full rounded-xl border border-gray-200 shadow-inner" /> </div> </div>)}
    </div>
  );
};

export default App;
