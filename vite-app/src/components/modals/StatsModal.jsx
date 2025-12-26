import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '../Icons';
import { getLocalDateStr } from '../../utils';
import { WEEKLY_REPORT_EVALUATIONS, STORAGE_KEY_WEEKLY_REPORTS, BATH_TYPE_16, BATH_TYPE_ACCURACY_LEVELS, AFFILIATE_SUGGESTIONS, GIFT_CARD_AD, STORAGE_KEY_STATS_WEEKLY_AD_INDEX, STORAGE_KEY_STATS_MONTHLY_AD_INDEX, STORAGE_KEY_STATS_ALL_AD_INDEX } from '../../constants';
import AdImage from '../AdImage';

const StatsModal = ({ isOpen, onClose, bathEvents, onDayClick, onOpenDiagnosis }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('weekly'); // 'calendar', 'weekly', 'monthly', 'all'

    // ===== 広告ローテーション用（タブごと） =====
    const allAds = useMemo(() => {
        return AFFILIATE_SUGGESTIONS.filter(item => item.isA8 && item.a8Code);
    }, []);

    // タブごとのストレージキーを取得
    const getStorageKeyForTab = (tab) => {
        switch (tab) {
            case 'weekly': return STORAGE_KEY_STATS_WEEKLY_AD_INDEX;
            case 'monthly': return STORAGE_KEY_STATS_MONTHLY_AD_INDEX;
            case 'all': return STORAGE_KEY_STATS_ALL_AD_INDEX;
            default: return STORAGE_KEY_STATS_WEEKLY_AD_INDEX;
        }
    };

    // タブごとの広告インデックスを取得
    const getAdIndexForTab = (tab) => {
        if (allAds.length === 0) return 0;
        const storageKey = getStorageKeyForTab(tab);
        const savedIndex = localStorage.getItem(storageKey);
        return savedIndex ? parseInt(savedIndex, 10) % allAds.length : 0;
    };

    const weeklyAdIndex = useMemo(() => getAdIndexForTab('weekly'), [isOpen, allAds.length]);
    const monthlyAdIndex = useMemo(() => getAdIndexForTab('monthly'), [isOpen, allAds.length]);
    const allAdIndex = useMemo(() => getAdIndexForTab('all'), [isOpen, allAds.length]);

    const weeklyAd = allAds[weeklyAdIndex] || null;
    const monthlyAd = allAds[monthlyAdIndex] || null;
    const allAd = allAds[allAdIndex] || null;

    // モーダルを閉じる時に現在のタブの広告インデックスを進める
    const handleClose = () => {
        if (allAds.length > 0 && activeTab !== 'calendar') {
            const storageKey = getStorageKeyForTab(activeTab);
            const currentIndex = getAdIndexForTab(activeTab);
            const nextIndex = (currentIndex + 1) % allAds.length;
            localStorage.setItem(storageKey, nextIndex.toString());
        }
        onClose();
    };

    const bathEventMap = new Map();
    const historySet = new Set();
    if (bathEvents && Array.isArray(bathEvents)) {
        bathEvents.forEach(evt => {
            const dStr = typeof evt === 'string' ? evt : evt.dateStr;
            historySet.add(dStr);
            if (typeof evt !== 'string') {
                if (!bathEventMap.has(dStr)) {
                    bathEventMap.set(dStr, evt);
                } else {
                    const existing = bathEventMap.get(dStr);
                    if (existing.type === 'sleep' && evt.type === 'bath') {
                        bathEventMap.set(dStr, evt);
                    }
                }
            }
        });
    }

    // ===== 統計計算 =====

    // 週間統計
    const weeklyStats = useMemo(() => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        let bathCount = 0;
        let skipCount = 0;

        if (bathEvents && Array.isArray(bathEvents)) {
            bathEvents.forEach(evt => {
                if (typeof evt === 'string') return;
                const eventDate = new Date(evt.time);
                if (eventDate >= weekStart) {
                    if (evt.type === 'bath') bathCount++;
                    else if (evt.type === 'sleep') skipCount++;
                }
            });
        }

        const total = bathCount + skipCount;
        const bathRate = total > 0 ? Math.round((bathCount / total) * 100) : 0;
        const savedTime = skipCount * 30;
        const savedMoney = Math.floor(savedTime / 30 * 80);

        return { bathCount, skipCount, total, bathRate, savedTime, savedMoney };
    }, [bathEvents, isOpen]);

    // 月間統計
    const monthlyStats = useMemo(() => {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);

        let bathCount = 0;
        let skipCount = 0;

        if (bathEvents && Array.isArray(bathEvents)) {
            bathEvents.forEach(evt => {
                if (typeof evt === 'string') return;
                const eventDate = new Date(evt.time);
                if (eventDate >= monthStart) {
                    if (evt.type === 'bath') bathCount++;
                    else if (evt.type === 'sleep') skipCount++;
                }
            });
        }

        const total = bathCount + skipCount;
        const bathRate = total > 0 ? Math.round((bathCount / total) * 100) : 0;
        const savedTime = skipCount * 30;
        const savedMoney = Math.floor(savedTime / 30 * 80);

        return { bathCount, skipCount, total, bathRate, savedTime, savedMoney };
    }, [bathEvents, isOpen]);

    // 全期間統計
    const allTimeStats = useMemo(() => {
        let bathCount = 0;
        let skipCount = 0;
        let firstDate = null;

        if (bathEvents && Array.isArray(bathEvents)) {
            bathEvents.forEach(evt => {
                if (typeof evt === 'string') return;
                if (evt.type === 'bath') bathCount++;
                else if (evt.type === 'sleep') skipCount++;

                const eventDate = new Date(evt.time);
                if (!firstDate || eventDate < firstDate) {
                    firstDate = eventDate;
                }
            });
        }

        const total = bathCount + skipCount;
        const bathRate = total > 0 ? Math.round((bathCount / total) * 100) : 0;
        const savedTime = skipCount * 30;
        const savedMoney = Math.floor(savedTime / 30 * 80);

        // 利用日数
        const daysSinceStart = firstDate
            ? Math.ceil((new Date() - firstDate) / (1000 * 60 * 60 * 24)) + 1
            : 0;

        return { bathCount, skipCount, total, bathRate, savedTime, savedMoney, daysSinceStart, firstDate };
    }, [bathEvents, isOpen]);

    // 曜日別パターン
    const dayOfWeekPattern = useMemo(() => {
        const pattern = Array(7).fill(null).map(() => ({ bath: 0, skip: 0, total: 0 }));

        if (bathEvents && Array.isArray(bathEvents)) {
            bathEvents.forEach(evt => {
                if (typeof evt === 'string') return;
                const eventDate = new Date(evt.time);
                const dayOfWeek = eventDate.getDay();

                if (evt.type === 'bath') pattern[dayOfWeek].bath++;
                else if (evt.type === 'sleep') pattern[dayOfWeek].skip++;
                pattern[dayOfWeek].total++;
            });
        }

        return pattern.map((p, i) => ({
            day: ['日', '月', '火', '水', '木', '金', '土'][i],
            ...p,
            bathRate: p.total > 0 ? Math.round((p.bath / p.total) * 100) : null
        }));
    }, [bathEvents, isOpen]);

    // 洞察コメント生成
    const insights = useMemo(() => {
        const comments = [];

        if (!dayOfWeekPattern || dayOfWeekPattern.every(p => p.total === 0)) {
            return comments;
        }

        // スキップしやすい曜日を見つける
        const worstDay = dayOfWeekPattern
            .filter(p => p.bathRate !== null && p.total >= 2)
            .sort((a, b) => (a.bathRate ?? 100) - (b.bathRate ?? 100))[0];

        if (worstDay && worstDay.bathRate !== null && worstDay.bathRate < 50) {
            comments.push({
                icon: '⚠️',
                text: `${worstDay.day}曜日は${100 - worstDay.bathRate}%の確率でスキップ傾向`,
                type: 'warning'
            });
        }

        // 入浴しやすい曜日を見つける
        const bestDay = dayOfWeekPattern
            .filter(p => p.bathRate !== null && p.total >= 2)
            .sort((a, b) => (b.bathRate ?? 0) - (a.bathRate ?? 0))[0];

        if (bestDay && bestDay.bathRate !== null && bestDay.bathRate >= 80) {
            comments.push({
                icon: '🛁',
                text: `${bestDay.day}曜日は${bestDay.bathRate}%入浴！お風呂デー`,
                type: 'success'
            });
        }

        // 平日vs休日の比較
        const weekdayPattern = dayOfWeekPattern.slice(1, 6);
        const weekendPattern = [dayOfWeekPattern[0], dayOfWeekPattern[6]];

        const weekdayAvg = weekdayPattern.filter(p => p.bathRate !== null).reduce((sum, p) => sum + (p.bathRate ?? 0), 0) / weekdayPattern.filter(p => p.bathRate !== null).length || 0;
        const weekendAvg = weekendPattern.filter(p => p.bathRate !== null).reduce((sum, p) => sum + (p.bathRate ?? 0), 0) / weekendPattern.filter(p => p.bathRate !== null).length || 0;

        if (Math.abs(weekdayAvg - weekendAvg) >= 20) {
            if (weekdayAvg > weekendAvg) {
                comments.push({
                    icon: '📊',
                    text: `平日型タイプ：休日より平日の方が入浴率が高い`,
                    type: 'info'
                });
            } else {
                comments.push({
                    icon: '📊',
                    text: `休日型タイプ：平日より休日の方が入浴率が高い`,
                    type: 'info'
                });
            }
        }

        return comments;
    }, [dayOfWeekPattern]);

    // 記録・実績
    const records = useMemo(() => {
        if (!bathEvents || !Array.isArray(bathEvents)) {
            return { maxBathStreak: 0, maxSkipStreak: 0, currentStreak: 0 };
        }

        // 日付ごとにイベントをまとめる
        const dateEvents = new Map();
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const dateStr = evt.dateStr || getLocalDateStr(new Date(evt.time));
            if (!dateEvents.has(dateStr)) {
                dateEvents.set(dateStr, evt.type);
            } else if (evt.type === 'bath') {
                dateEvents.set(dateStr, 'bath'); // bathを優先
            }
        });

        // ソートされた日付リストを作成
        const sortedDates = Array.from(dateEvents.keys()).sort();

        let maxBathStreak = 0;
        let maxSkipStreak = 0;
        let currentBathStreak = 0;
        let currentSkipStreak = 0;

        sortedDates.forEach(dateStr => {
            const type = dateEvents.get(dateStr);
            if (type === 'bath') {
                currentBathStreak++;
                currentSkipStreak = 0;
                maxBathStreak = Math.max(maxBathStreak, currentBathStreak);
            } else if (type === 'sleep') {
                currentSkipStreak++;
                currentBathStreak = 0;
                maxSkipStreak = Math.max(maxSkipStreak, currentSkipStreak);
            }
        });

        // 現在の連続記録
        const today = getLocalDateStr(new Date());
        const yesterday = getLocalDateStr(new Date(new Date().setDate(new Date().getDate() - 1)));

        let currentStreak = 0;
        let checkDate = historySet.has(today) ? today : (historySet.has(yesterday) ? yesterday : null);

        if (checkDate) {
            let current = new Date(checkDate);
            while (historySet.has(getLocalDateStr(current))) {
                currentStreak++;
                current.setDate(current.getDate() - 1);
            }
        }

        return { maxBathStreak, maxSkipStreak, currentStreak };
    }, [bathEvents, historySet, isOpen]);

    // ===== バスタイプ16診断 =====
    const bathTypeResult = useMemo(() => {
        if (!bathEvents || !Array.isArray(bathEvents)) {
            return { canDiagnose: false, daysNeeded: 7, dataDays: 0 };
        }

        // ユニークな日数をカウント
        const uniqueDates = new Set();
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const dateStr = evt.dateStr || getLocalDateStr(new Date(evt.time));
            uniqueDates.add(dateStr);
        });
        const dataDays = uniqueDates.size;

        // 精度レベルを取得
        const accuracyLevel = BATH_TYPE_ACCURACY_LEVELS.find(
            a => dataDays >= a.minDays && dataDays <= a.maxDays
        ) || BATH_TYPE_ACCURACY_LEVELS[0];

        if (dataDays < 7) {
            return {
                canDiagnose: false,
                daysNeeded: 7 - dataDays,
                dataDays,
                accuracyLevel
            };
        }

        // === 4軸を算出 ===

        // 1. 頻度軸 (C/Z): お風呂率 >= 50% → C
        const bathCount = bathEvents.filter(e => typeof e !== 'string' && e.type === 'bath').length;
        const skipCount = bathEvents.filter(e => typeof e !== 'string' && e.type === 'sleep').length;
        const totalActions = bathCount + skipCount;
        const bathRate = totalActions > 0 ? bathCount / totalActions : 0.5;
        const axis1 = bathRate >= 0.5 ? 'C' : 'Z';

        // 2. 曜日軸 (H/K): 平日お風呂率 > 休日 → H
        let weekdayBath = 0, weekdayTotal = 0, weekendBath = 0, weekendTotal = 0;
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const day = new Date(evt.time).getDay();
            const isWeekend = day === 0 || day === 6;
            if (isWeekend) {
                weekendTotal++;
                if (evt.type === 'bath') weekendBath++;
            } else {
                weekdayTotal++;
                if (evt.type === 'bath') weekdayBath++;
            }
        });
        const weekdayRate = weekdayTotal > 0 ? weekdayBath / weekdayTotal : 0.5;
        const weekendRate = weekendTotal > 0 ? weekendBath / weekendTotal : 0.5;
        const axis2 = weekdayRate >= weekendRate ? 'H' : 'K';

        // 3. 安定度軸 (R/K): 曜日ごとの分散が小さい → R
        const dayOfWeekCounts = Array(7).fill(0);
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const day = new Date(evt.time).getDay();
            dayOfWeekCounts[day]++;
        });
        const avgCount = dayOfWeekCounts.reduce((a, b) => a + b, 0) / 7;
        const variance = dayOfWeekCounts.reduce((acc, c) => acc + Math.pow(c - avgCount, 2), 0) / 7;
        const axis3 = variance <= avgCount ? 'R' : 'K';

        // 4. 季節軸 (N/F): 夏(6-8月)のお風呂率 > 冬(12,1,2月) → N
        let summerBath = 0, summerTotal = 0, winterBath = 0, winterTotal = 0;
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const month = new Date(evt.time).getMonth();
            const isSummer = month >= 5 && month <= 7; // 6-8月
            const isWinter = month === 11 || month <= 1; // 12,1,2月
            if (isSummer) {
                summerTotal++;
                if (evt.type === 'bath') summerBath++;
            } else if (isWinter) {
                winterTotal++;
                if (evt.type === 'bath') winterBath++;
            }
        });
        // データ不足の場合はデフォルトでN
        const summerRate = summerTotal > 0 ? summerBath / summerTotal : 0.5;
        const winterRate = winterTotal > 0 ? winterBath / winterTotal : 0.5;
        const axis4 = summerRate >= winterRate ? 'N' : 'F';

        const typeCode = axis1 + axis2 + axis3 + axis4;
        const typeData = BATH_TYPE_16[typeCode] || BATH_TYPE_16.ZKKN;

        return {
            canDiagnose: true,
            dataDays,
            accuracyLevel,
            typeCode,
            typeData,
            axes: {
                frequency: { value: axis1, label: axis1 === 'C' ? '清潔寄り' : 'ズボラ寄り', rate: Math.round(bathRate * 100) },
                dayOfWeek: { value: axis2, label: axis2 === 'H' ? '平日型' : '休日型' },
                stability: { value: axis3, label: axis3 === 'R' ? '規則的' : '気まぐれ' },
                season: { value: axis4, label: axis4 === 'N' ? '夏型' : '冬型' },
            }
        };
    }, [bathEvents, isOpen]);

    // 評価を取得
    const evaluation = useMemo(() => {
        const stats = activeTab === 'weekly' ? weeklyStats
            : activeTab === 'monthly' ? monthlyStats
                : allTimeStats;
        const totalActions = stats.bathCount + stats.skipCount;

        if (totalActions === 0) {
            return { title: '情報不足', emoji: '📊', message: 'まだ記録がありません' };
        }

        const skipRatio = stats.skipCount / totalActions;
        const eval_ = WEEKLY_REPORT_EVALUATIONS.find(
            e => skipRatio >= e.minRatio && skipRatio <= e.maxRatio
        ) || WEEKLY_REPORT_EVALUATIONS[0];

        return { ...eval_, message: eval_.messages[0] };
    }, [activeTab, weeklyStats, monthlyStats, allTimeStats]);

    if (!isOpen) return null;

    // カレンダー関連
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
        for (let i = 1; i <= lastDayOfMonth; i++) days.push(new Date(year, month, i));
        return days;
    };

    const calculateStreakAtDate = (targetDateStr, hSet) => {
        if (!hSet.has(targetDateStr)) return 0;
        let streak = 1;
        let current = new Date(targetDateStr);
        while (true) {
            current.setDate(current.getDate() - 1);
            const prevDateStr = getLocalDateStr(current);
            if (hSet.has(prevDateStr)) streak++;
            else break;
        }
        return streak;
    };

    const days = getDaysInMonth(currentDate);
    const monthLabel = `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`;
    const getStamp = (s) => s >= 30 ? "🌈" : s >= 7 ? "💎" : s >= 3 ? "👑" : "💮";
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    // Xでシェア
    const handleShareReport = () => {
        const stats = activeTab === 'weekly' ? weeklyStats
            : activeTab === 'monthly' ? monthlyStats
                : allTimeStats;
        const periodLabel = activeTab === 'weekly' ? '今週'
            : activeTab === 'monthly' ? '今月'
                : '全期間';

        const text = `📊 ${periodLabel}のフロハイッタ統計

🏆 評価: ${evaluation.title}
🛁 お風呂: ${stats.bathCount}回
💤 風呂キャン: ${stats.skipCount}回
📈 お風呂率: ${stats.bathRate}%
⏰ 節約時間: ${stats.savedTime}分
💰 節約金額: 約${stats.savedMoney}円

#フロハイッタ`;

        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://app.bath-check.com/')}`;
        window.open(tweetUrl, '_blank');
    };

    // 統計表示コンポーネント
    const StatsDisplay = ({ stats, showEvaluation = true, ad = null }) => (
        <div className="space-y-4">
            {/* 評価 */}
            {showEvaluation && stats.total > 0 && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 text-center">
                    <div className="text-xl font-black text-indigo-600">{evaluation.title}</div>
                </div>
            )}

            {/* メイン統計 */}
            {/* メイン統計 */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-rose-500 font-mono tracking-tighter">{stats.bathCount}<span className="text-sm font-bold ml-1 text-rose-300">回</span></div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest mt-1">お風呂回数</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-indigo-500 font-mono tracking-tighter">{stats.skipCount}<span className="text-sm font-bold ml-1 text-indigo-300">回</span></div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest mt-1">風呂キャン</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-emerald-500 font-mono tracking-tighter">{stats.bathRate}<span className="text-sm font-bold ml-1 text-emerald-300">%</span></div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest mt-1">お風呂率</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-amber-500 font-mono tracking-tighter">{stats.savedTime}<span className="text-sm font-bold ml-1 text-amber-300">分</span></div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest mt-1">節約時間</div>
                </div>
            </div>

            {/* 節約金額 */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 tracking-widest">節約金額</span>
                <span className="text-2xl font-black text-slate-700 font-mono tracking-tighter">¥{stats.savedMoney.toLocaleString()}</span>
            </div>

            {/* アフィリエイト広告（A8広告ローテーション・タブごと） */}
            {stats.savedTime >= 30 && ad && ad.a8Code && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-200">
                    <a
                        href={ad.a8Code.linkUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="block rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <AdImage
                            src={ad.a8Code.imgUrl}
                            alt={ad.title}
                            width={ad.a8Code.width}
                            height={ad.a8Code.height}
                            trackingUrl={ad.a8Code.trackingUrl}
                            className="w-full h-auto"
                        />
                    </a>
                    <p className="text-[9px] text-gray-400 text-center mt-2">PR</p>
                </div>
            )}
        </div>
    );

    // 曜日別パターン表示
    const DayOfWeekChart = () => (
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest ml-1">
                曜日別パターン
            </h3>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-3 shadow-sm">
                {dayOfWeekPattern.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className={`w-8 text-xs font-bold ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
                            {['日', '月', '火', '水', '木', '金', '土'][i]}
                        </span>

                        <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden relative">
                            {/* 背景グリッド的なライン */}
                            <div className="absolute inset-0 w-full h-full border-l border-white/50"></div>

                            {p.bathRate !== null && p.bathRate > 0 && (
                                <div
                                    className={`h-full rounded-full ${p.bathRate >= 80 ? 'bg-emerald-400' :
                                        p.bathRate >= 50 ? 'bg-blue-400' :
                                            'bg-rose-400'
                                        }`}
                                    style={{ width: `${p.bathRate}%` }}
                                />
                            )}
                        </div>

                        <div className="w-12 text-right">
                            {p.bathRate !== null ? (
                                <span className="text-sm font-black text-slate-700 font-mono">
                                    {p.bathRate}<span className="text-[10px] text-slate-300 ml-0.5">%</span>
                                </span>
                            ) : (
                                <span className="text-xs text-slate-300">-</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 洞察コメント表示
    const InsightsSection = () => {
        if (insights.length === 0) return null;

        return (
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest ml-1">
                    パターン分析
                </h3>
                <div className="space-y-2">
                    {insights.map((insight, i) => (
                        <div
                            key={i}
                            className={`rounded-xl p-3 border flex items-center gap-2 ${insight.type === 'warning'
                                ? 'bg-amber-50 border-amber-100'
                                : insight.type === 'success'
                                    ? 'bg-green-50 border-green-100'
                                    : 'bg-blue-50 border-blue-100'
                                }`}
                        >
                            <span className={`text-sm font-bold ${insight.type === 'warning'
                                ? 'text-amber-700'
                                : insight.type === 'success'
                                    ? 'text-green-700'
                                    : 'text-blue-700'
                                }`}>
                                {insight.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 記録・実績表示
    const RecordsSection = () => (
        <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-1">
                🏆 記録・実績
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-pink-50 rounded-xl p-3 border border-pink-100 text-center">
                    <div className="text-xs text-gray-500 mb-1">最長連続お風呂</div>
                    <div className="text-xl font-black text-pink-600">{records.maxBathStreak}<span className="text-sm">日</span></div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100 text-center">
                    <div className="text-xs text-gray-500 mb-1">最長連続風呂キャン</div>
                    <div className="text-xl font-black text-indigo-600">{records.maxSkipStreak}<span className="text-sm">日</span></div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 text-center">
                    <div className="text-xs text-gray-500 mb-1">現在の連続記録</div>
                    <div className="text-xl font-black text-orange-600">{records.currentStreak}<span className="text-sm">日</span></div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-center">
                    <div className="text-xs text-gray-500 mb-1">利用日数</div>
                    <div className="text-xl font-black text-green-600">{allTimeStats.daysSinceStart}<span className="text-sm">日</span></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={handleClose}>
            <div className="bg-white rounded-3xl p-5 w-full max-w-md modal-enter shadow-2xl relative border-4 border-pink-100 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 z-10"><Icons.X /></button>

                {/* ヘッダー */}
                <div className="text-center mb-3 flex-shrink-0">
                    <h2 className="text-lg font-black text-gray-800">📊 詳細・統計</h2>
                    <div className="text-sm text-gray-500">
                        🔥 {records.currentStreak}日連続記録中
                    </div>
                </div>

                {/* タブ切り替え */}
                <div className="flex gap-1 mb-4 flex-shrink-0 bg-gray-100 p-1 rounded-xl">
                    {[
                        { key: 'calendar', label: '📅' },
                        { key: 'weekly', label: '週間' },
                        { key: 'monthly', label: '月間' },
                        { key: 'all', label: '全体' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-2 px-1 rounded-lg font-bold text-xs transition-all ${activeTab === tab.key
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* カレンダータブ */}
                {activeTab === 'calendar' && (
                    <div className="flex-grow overflow-y-auto">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 text-pink-400">
                                <Icons.ChevronLeft size={20} />
                            </button>
                            <span className="font-bold text-gray-800">{monthLabel}</span>
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 text-pink-400">
                                <Icons.ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-gray-400 border-b border-gray-100 pb-2">
                            {weekDays.map((day, i) => (
                                <div key={i} className={i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : ''}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {days.map((date, i) => {
                                if (!date) return <div key={i} className="h-11"></div>;
                                const dateStr = getLocalDateStr(date);
                                const s = calculateStreakAtDate(dateStr, historySet);
                                const isToday = date.toDateString() === new Date().toDateString();
                                const eventDetails = bathEventMap.get(dateStr);
                                const hasStamp = s > 0 || eventDetails;

                                let stampEmoji = null;
                                if (s > 0) stampEmoji = getStamp(s);
                                else if (eventDetails) stampEmoji = eventDetails.type === 'sleep' ? '💤' : '✨';

                                return (
                                    <div
                                        key={i}
                                        onClick={eventDetails ? () => onDayClick(eventDetails) : null}
                                        className={`h-11 flex flex-col items-center justify-start pt-1 rounded-lg ${isToday ? 'border-2 border-pink-300 bg-pink-50' : ''} ${eventDetails ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
                                    >
                                        <span className={`text-xs leading-none ${isToday ? 'text-pink-600 font-bold' : hasStamp ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {date.getDate()}
                                        </span>
                                        <span className="text-[10px] leading-none mt-1">{stampEmoji || ''}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-3">マークをタップで詳細確認</p>
                    </div>
                )}

                {/* 週間タブ */}
                {activeTab === 'weekly' && (
                    <div className="flex-grow overflow-y-auto space-y-4">
                        <div className="text-center text-xs text-gray-500 mb-2">
                            今週（日曜日〜）の統計
                        </div>
                        <StatsDisplay stats={weeklyStats} ad={weeklyAd} />

                        <button
                            onClick={handleShareReport}
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                        >
                            <Icons.XLogo size={18} />
                            Xでシェアする
                        </button>
                    </div>
                )}

                {/* 月間タブ */}
                {activeTab === 'monthly' && (
                    <div className="flex-grow overflow-y-auto space-y-4">
                        <div className="text-center text-xs text-gray-500 mb-2">
                            今月（{new Date().getMonth() + 1}月）の統計
                        </div>
                        <StatsDisplay stats={monthlyStats} ad={monthlyAd} />
                        <DayOfWeekChart />

                        <button
                            onClick={handleShareReport}
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                        >
                            <Icons.XLogo size={18} />
                            Xでシェアする
                        </button>
                    </div>
                )}

                {/* 全期間タブ */}
                {activeTab === 'all' && (
                    <div className="flex-grow overflow-y-auto space-y-4">
                        <div className="text-center text-xs text-gray-500 mb-2">
                            {allTimeStats.firstDate
                                ? `${allTimeStats.firstDate.getFullYear()}/${allTimeStats.firstDate.getMonth() + 1}/${allTimeStats.firstDate.getDate()}〜 の累計`
                                : '全期間の統計'
                            }
                        </div>
                        <StatsDisplay stats={allTimeStats} ad={allAd} />
                        <RecordsSection />
                        <DayOfWeekChart />
                        <InsightsSection />

                        <button
                            onClick={handleShareReport}
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                        >
                            <Icons.XLogo size={18} />
                            Xでシェアする
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsModal;
