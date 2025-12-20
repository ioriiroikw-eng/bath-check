import React, { useState } from 'react';
import { Icons } from '../Icons';
import { getLocalDateStr } from '../../utils';

const CalendarModal = ({ isOpen, onClose, bathEvents, onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
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
    if (!isOpen) return null;

    const getDaysInMonth = (date) => {
        const year = date.getFullYear(); const month = date.getMonth();
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
            if (hSet.has(prevDateStr)) streak++; else break;
        }
        return streak;
    };

    const calculateCurrentStreak = (hSet) => {
        const today = getLocalDateStr(new Date());
        const yesterday = getLocalDateStr(new Date(new Date().setDate(new Date().getDate() - 1)));
        let start = hSet.has(today) ? today : hSet.has(yesterday) ? yesterday : null;
        return start ? calculateStreakAtDate(start, hSet) : 0;
    };

    const streak = calculateCurrentStreak(historySet);
    const days = getDaysInMonth(currentDate);
    const monthLabel = `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`;
    const getStamp = (s) => s >= 30 ? "🌈" : s >= 7 ? "💎" : s >= 3 ? "👑" : "💮";
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-pink-100 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><Icons.X /></button>

                {/* ヘッダー */}
                <div className="text-center mb-6 flex-shrink-0">
                    <h2 className="text-sm text-gray-500 font-bold mb-1">履歴管理センター</h2>
                    <div className="text-4xl font-black text-pink-500 drop-shadow-sm flex items-center justify-center gap-2">
                        <span>{streak}日</span>
                        <span className="animate-pulse">🔥</span>
                    </div>
                </div>

                {/* 月ナビゲーション */}
                <div className="flex justify-between items-center mb-4 px-2">
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 text-pink-400">
                        <Icons.ChevronLeft size={20} />
                    </button>
                    <span className="font-bold text-gray-800 text-lg">{monthLabel}</span>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 text-pink-400">
                        <Icons.ChevronRight size={20} />
                    </button>
                </div>

                {/* 曜日ヘッダー（7列グリッド） */}
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-gray-400 border-b border-gray-100 pb-2">
                    {weekDays.map((day, i) => (
                        <div key={i} className={i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : ''}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* カレンダーグリッド（7列） */}
                <div className="flex-grow overflow-y-auto">
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((date, i) => {
                            if (!date) return <div key={i} className="h-12"></div>;
                            const dateStr = getLocalDateStr(date);
                            const s = calculateStreakAtDate(dateStr, historySet);
                            const isToday = date.toDateString() === new Date().toDateString();
                            const eventDetails = bathEventMap.get(dateStr);
                            const hasStamp = s > 0 || eventDetails;

                            // スタンプの種類を決定
                            let stampEmoji = null;
                            if (s > 0) {
                                stampEmoji = getStamp(s);
                            } else if (eventDetails) {
                                stampEmoji = eventDetails.type === 'sleep' ? '💤' : '✨';
                            }

                            return (
                                <div
                                    key={i}
                                    onClick={eventDetails ? () => onDayClick(eventDetails) : null}
                                    className={`h-12 flex flex-col items-center justify-start pt-1 rounded-lg ${isToday ? 'border-2 border-pink-300 bg-pink-50' : ''
                                        } ${eventDetails ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
                                >
                                    {/* 日付 */}
                                    <span className={`text-sm leading-none ${isToday ? 'text-pink-600 font-bold' : hasStamp ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {date.getDate()}
                                    </span>
                                    {/* スタンプを日付の下に表示（常に高さを確保） */}
                                    <span className="text-[10px] leading-none mt-1 h-3">
                                        {stampEmoji || ''}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className="text-[10px] text-gray-400 text-center mt-4">🔎マークの日付をタップで詳細ログを確認！</p>
            </div>
        </div>
    );
};

export default CalendarModal;
