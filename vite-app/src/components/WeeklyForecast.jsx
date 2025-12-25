import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from './Icons';

const STORAGE_KEY_PERSONALIZATION = 'bath_personalization';
const STORAGE_KEY_WEEKLY_WEATHER = 'weekly_weather';

// 気温から入浴確率への補正を計算
const getWeatherModifier = (temperature) => {
    if (temperature >= 35) return -20;  // 猛暑→だるくて入りたくない
    if (temperature >= 30) return -10;  // 暑すぎ
    if (temperature >= 25) return 10;   // 適度に暑い→スッキリしたい
    if (temperature <= 0) return -20;   // 極寒→入りたくない
    if (temperature <= 5) return -15;   // かなり寒い
    if (temperature <= 10) return -5;   // 寒い
    return 0; // 普通
};

// 天気アイコンを取得
const getWeatherIcon = (temperature) => {
    if (temperature >= 30) return '🥵';
    if (temperature >= 25) return '☀️';
    if (temperature <= 5) return '🥶';
    if (temperature <= 10) return '❄️';
    return '🌤️';
};

const WeeklyForecastModal = ({ isOpen, onClose, forecast }) => {
    if (!isOpen || !forecast) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl animate-bounce-in relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <Icons.X size={20} />
                </button>

                <h2 className="text-lg font-black text-gray-800 text-center mb-4 flex items-center justify-center gap-2">
                    📅 今週のお風呂予報
                </h2>

                <div className="space-y-2">
                    {forecast.days.map((day, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between p-3 rounded-xl ${day.isToday
                                ? 'bg-pink-50 border-2 border-pink-200'
                                : 'bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className={`font-bold w-6 ${day.isWeekend
                                    ? (day.dayName === '日' ? 'text-red-500' : 'text-blue-500')
                                    : 'text-gray-600'
                                    }`}>
                                    {day.dayName}
                                </span>
                                <span className="text-gray-400 text-sm">{day.date}日</span>
                                {day.isToday && <span className="text-[10px] bg-pink-400 text-white px-2 py-0.5 rounded-full">今日</span>}
                            </div>
                            <div className="flex items-center gap-3">
                                {/* 天気 */}
                                {day.temperature !== null && (
                                    <div className="flex items-center gap-1 text-sm">
                                        <span>{day.weatherIcon}</span>
                                        <span className="text-gray-500">{day.temperature}°</span>
                                    </div>
                                )}
                                {/* 確率 */}
                                <div className="flex items-center gap-1">
                                    <span className="text-xl">{day.icon}</span>
                                    <span className={`font-bold text-lg ${day.color}`}>{day.probability}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                    {forecast.useRealData
                        ? '※ 過去のパターン + 天気から予測'
                        : '※ あなたの回答 + 天気から予測'}
                </p>
            </div>
        </div>
    );
};

const TodayForecastBadge = ({ bathEvents, personalization, onClick }) => {
    const [savedPersonalization, setSavedPersonalization] = useState(null);
    const [weeklyWeather, setWeeklyWeather] = useState(null);

    // パーソナライズデータを読み込み
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY_PERSONALIZATION);
        if (saved) {
            try {
                setSavedPersonalization(JSON.parse(saved));
            } catch (e) { }
        }
    }, []);

    // 週間天気予報を取得
    useEffect(() => {
        const fetchWeeklyWeather = async () => {
            // キャッシュをチェック
            const cached = localStorage.getItem(STORAGE_KEY_WEEKLY_WEATHER);
            if (cached) {
                try {
                    const data = JSON.parse(cached);
                    // 6時間以内なら使用
                    if (Date.now() - data.fetchedAt < 6 * 60 * 60 * 1000) {
                        setWeeklyWeather(data.temperatures);
                        return;
                    }
                } catch (e) { }
            }

            try {
                // 東京の7日間予報を取得
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=temperature_2m_max&timezone=Asia%2FTokyo&forecast_days=7`
                );
                if (!res.ok) throw new Error('API Error');
                const data = await res.json();

                const temperatures = data.daily.temperature_2m_max;
                setWeeklyWeather(temperatures);

                // キャッシュに保存
                localStorage.setItem(STORAGE_KEY_WEEKLY_WEATHER, JSON.stringify({
                    temperatures,
                    fetchedAt: Date.now()
                }));
            } catch (e) {
                console.warn('Weekly weather fetch failed:', e);
            }
        };

        fetchWeeklyWeather();
    }, []);

    const activePersonalization = personalization || savedPersonalization;

    const forecast = useMemo(() => {
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
        const dayStats = Array(7).fill(null).map(() => ({ bath: 0, total: 0 }));
        let validDataCount = 0;

        if (bathEvents && Array.isArray(bathEvents)) {
            bathEvents.forEach(evt => {
                if (typeof evt === 'string') return;
                const eventDate = new Date(evt.time);
                const dayOfWeek = eventDate.getDay();
                dayStats[dayOfWeek].total++;
                validDataCount++;
                if (evt.type === 'bath') {
                    dayStats[dayOfWeek].bath++;
                }
            });
        }

        const today = new Date();
        const days = [];
        const useRealData = validDataCount >= 3;

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = date.getDay();
            const stats = dayStats[dayOfWeek];
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isFriday = dayOfWeek === 5;

            // 天気データ
            const temperature = weeklyWeather ? weeklyWeather[i] : null;
            const weatherModifier = temperature !== null ? getWeatherModifier(Math.round(temperature)) : 0;
            const weatherIcon = temperature !== null ? getWeatherIcon(Math.round(temperature)) : null;

            let probability;

            if (useRealData && stats.total > 0) {
                probability = Math.round((stats.bath / stats.total) * 100);
            } else if (activePersonalization) {
                probability = activePersonalization.baseProb || 70;
                if ((isWeekend || isFriday) && activePersonalization.weekendPenalty) {
                    probability = probability + activePersonalization.weekendPenalty;
                }
            } else {
                probability = 70;
            }

            // 天気補正を適用
            probability = Math.max(10, Math.min(100, probability + weatherModifier));

            let icon = '🛁';
            let color = 'text-pink-500';
            if (probability >= 80) {
                icon = '🛁';
                color = 'text-pink-500';
            } else if (probability >= 60) {
                icon = '🚿';
                color = 'text-blue-500';
            } else if (probability >= 40) {
                icon = '⚠️';
                color = 'text-yellow-500';
            } else {
                icon = '💤';
                color = 'text-indigo-500';
            }

            days.push({
                dayName: dayNames[dayOfWeek],
                date: date.getDate(),
                probability,
                icon,
                color,
                isToday: i === 0,
                isWeekend,
                temperature: temperature !== null ? Math.round(temperature) : null,
                weatherIcon
            });
        }

        return { days, useRealData };
    }, [bathEvents, activePersonalization, weeklyWeather]);

    const todayForecast = forecast.days[0];

    return (
        <>
            <button
                onClick={() => onClick(forecast)}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex items-center gap-1">
                    <span className="text-xl">{todayForecast.icon}</span>
                    <span className={`text-sm font-black ${todayForecast.color}`}>{todayForecast.probability}%</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-pink-500">今日の予報</span>
            </button>
        </>
    );
};

export { TodayForecastBadge, WeeklyForecastModal };
