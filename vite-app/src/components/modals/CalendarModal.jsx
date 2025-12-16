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
            // 同日に複数のイベントがある場合、bathを優先する
            if (typeof evt !== 'string') {
                if (!bathEventMap.has(dStr)) {
                    bathEventMap.set(dStr, evt);
                } else {
                    const existing = bathEventMap.get(dStr);
                    // 既存がsleepで、新しいのがbathなら上書き (優先度: bath > sleep)
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
        const days = []; for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
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
    const CalendarView = () => (
        <>
            <div className="flex justify-between items-center mb-4 px-2">
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 text-pink-400"><Icons.ChevronLeft size={20} /></button>
                <span className="font-bold text-gray-800 text-lg block">{monthLabel}</span>
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 text-pink-400"><Icons.ChevronRight size={20} /></button>
            </div>
            <div className="calendar-grid mb-2 text-center text-xs font-bold text-gray-400 border-b border-gray-100 pb-2"><div className="text-red-400">日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div className="text-blue-400">土</div></div>
            <div className="calendar-grid gap-1">
                {days.map((date, i) => {
                    if (!date) return <div key={i}></div>;
                    const dateStr = getLocalDateStr(date);
                    const hasEntry = historySet.has(dateStr);
                    const s = calculateStreakAtDate(dateStr, historySet);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const rotate = (date.getDate() * 13) % 20 - 10;
                    const eventDetails = bathEventMap.get(dateStr);

                    // 背景色の決定 (優先順位: 今日の枠 > お風呂(ピンク) > 睡眠(青))
                    let bgClass = '';
                    let borderClass = '';

                    if (isToday) {
                        bgClass = 'bg-pink-50';
                        borderClass = 'border border-pink-200';
                    } else if (eventDetails) {
                        if (eventDetails.type === 'sleep') {
                            bgClass = 'bg-indigo-50';
                        } else {
                            bgClass = 'bg-pink-50'; // デフォルトはお風呂色
                        }
                    }

                    return (
                        <div key={i} onClick={eventDetails ? () => onDayClick(eventDetails) : null} className={`calendar-cell ${bgClass} ${borderClass} ${eventDetails ? 'cursor-pointer hover:bg-opacity-80 active:scale-95 transition-all' : ''}`}>
                            <span className={`text-[10px] mb-0.5 ${isToday ? 'text-pink-600 font-bold' : 'text-gray-400'}`}>{date.getDate()}</span>
                            {s > 0 && <span className="text-2xl absolute bottom-0 stamp-animate select-none" style={{ transform: `rotate(${rotate}deg)` }}>{getStamp(s)}</span>}
                            {eventDetails && !s && (
                                <div className="absolute bottom-1 text-base">
                                    {eventDetails.type === 'sleep' ? '💤' : '✨'}
                                </div>
                            )}
                            {eventDetails && <div className="absolute top-0 right-0 text-gray-300 opacity-70 scale-50">🔎</div>}
                        </div>
                    );
                })}
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-4">🔎マークの日付をタップで詳細ログを確認！</p>
        </>
    );
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-pink-100 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><Icons.X /></button>
                <div className="text-center mb-6 flex-shrink-0">
                    <h2 className="text-sm text-gray-500 font-bold mb-1 font-pop">履歴管理センター</h2>
                    <div className="text-4xl font-black text-pink-500 font-pop drop-shadow-sm flex items-center justify-center gap-2"><span>{streak}日</span><span className="animate-pulse">🔥</span></div>
                </div>
                <div className="flex-grow overflow-y-auto"> <CalendarView /> </div>
            </div>
        </div>
    );
};

export default CalendarModal;
