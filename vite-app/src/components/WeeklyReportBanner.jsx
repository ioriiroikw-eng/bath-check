import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { STORAGE_KEY_WEEKLY_BANNER_SHOWN } from '../constants';

const WeeklyReportBanner = ({ onOpenReport, bathEvents }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // 週間統計を計算
    const calculateWeeklyStats = () => {
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

        return { bathCount, skipCount, savedTime: skipCount * 30 };
    };

    useEffect(() => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const isSunday = dayOfWeek === 0; // 日曜日のみ

        if (!isSunday) return;

        // 今週すでに表示したかチェック
        const lastShown = localStorage.getItem(STORAGE_KEY_WEEKLY_BANNER_SHOWN);
        if (lastShown) {
            const lastShownDate = new Date(lastShown);
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            weekStart.setHours(0, 0, 0, 0);

            if (lastShownDate >= weekStart) {
                // 今週すでに表示済み
                return;
            }
        }

        // 2秒後に表示開始
        const timer = setTimeout(() => {
            setIsAnimating(true);
            setIsVisible(true);
            localStorage.setItem(STORAGE_KEY_WEEKLY_BANNER_SHOWN, now.toISOString());
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    const handleClick = () => {
        handleClose();
        setTimeout(() => onOpenReport(), 300);
    };

    if (!isVisible) return null;

    const stats = calculateWeeklyStats();

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[60] p-4 pt-safe transition-transform duration-300 ${isAnimating ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div
                onClick={handleClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-300/50 p-4 mx-auto max-w-sm cursor-pointer active:scale-[0.98] transition-transform"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white/80 text-xs font-bold">📊 今週の通信簿</span>
                        </div>
                        <h3 className="text-white font-black text-lg mb-2">
                            今週の通信簿が届きました！
                        </h3>
                        <div className="flex gap-4 text-white/90 text-sm">
                            <div>
                                <span className="font-bold">🛁 {stats.bathCount}回</span>
                            </div>
                            <div>
                                <span className="font-bold">💤 {stats.skipCount}回</span>
                            </div>
                            <div>
                                <span className="font-bold">⏰ {stats.savedTime}分</span>
                            </div>
                        </div>
                        <p className="text-white/70 text-xs mt-2">
                            タップして詳細を見る →
                        </p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleClose(); }}
                        className="text-white/60 hover:text-white p-1"
                    >
                        <Icons.X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeeklyReportBanner;
