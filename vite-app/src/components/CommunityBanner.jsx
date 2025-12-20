import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

const COMMUNITY_URL = 'https://x.com/i/communities/2002271224563736624';
const STORAGE_KEY_BANNER_DISMISSED = 'hq_community_banner_dismissed';

const CommunityBanner = ({ showInstallGuide = false, showTutorial = false }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // InstallGuideまたはチュートリアルが表示中なら待機
        if (showInstallGuide || showTutorial) {
            setIsVisible(false);
            return;
        }

        // 前回非表示にした時刻を確認
        const dismissedAt = localStorage.getItem(STORAGE_KEY_BANNER_DISMISSED);
        if (dismissedAt) {
            const dismissedTime = new Date(dismissedAt);
            const now = new Date();
            const hoursSince = (now - dismissedTime) / (1000 * 60 * 60);
            // 24時間経過していたら再表示
            if (hoursSince < 24) {
                return;
            }
        }
        // 少し遅延してから表示
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, [showInstallGuide, showTutorial]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(STORAGE_KEY_BANNER_DISMISSED, new Date().toISOString());
    };

    const handleJoinCommunity = () => {
        window.open(COMMUNITY_URL, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-[2px] shadow-xl shadow-purple-500/30">
                <div className="bg-gray-900/95 backdrop-blur rounded-2xl p-4 relative">
                    {/* 閉じるボタン */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 transition-colors"
                    >
                        <Icons.X size={16} />
                    </button>

                    {/* コンテンツ */}
                    <div className="flex items-start gap-3">
                        {/* アイコン */}
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-2 rounded-xl shrink-0">
                            <span className="text-2xl">📢</span>
                        </div>

                        {/* テキスト */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-black text-sm mb-1 font-pop">
                                風呂キャンセル界隈🛁💤
                            </h3>
                            <p className="text-gray-300 text-xs leading-relaxed mb-3">
                                風呂キャン民の集うコミュニティで、今日の風呂キャンを報告しよう！
                            </p>

                            {/* ボタン */}
                            <button
                                onClick={handleJoinCommunity}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                            >
                                <Icons.XLogo size={14} />
                                <span>コミュニティを見る</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityBanner;
