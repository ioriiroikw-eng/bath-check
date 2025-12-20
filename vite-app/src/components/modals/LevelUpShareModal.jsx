import React from 'react';
import { Icons } from '../Icons';
import { RANK_TITLES } from '../../constants';

const LevelUpShareModal = ({ isOpen, onClose, newLevel, savedMinutes }) => {
    if (!isOpen) return null;

    // 貯金額を円に換算
    const savedYen = Math.floor(savedMinutes / 30 * 80);

    // ランク称号を取得
    const getRankTitle = () => {
        for (let i = RANK_TITLES.length - 1; i >= 0; i--) {
            if (newLevel >= RANK_TITLES[i].lv) {
                return RANK_TITLES[i].title;
            }
        }
        return RANK_TITLES[0].title;
    };

    const rankTitle = getRankTitle();

    // シェアメッセージを生成
    const generateShareMessage = () => {
        const hours = Math.floor(savedMinutes / 60);
        const mins = savedMinutes % 60;
        const timeText = hours > 0
            ? `${hours}時間${mins > 0 ? mins + '分' : ''}`
            : `${mins}分`;

        return `🎉 ズボラ貯金 Lv.${newLevel} に到達！\n\n称号: 「${rankTitle}」\n⏰ ${timeText}（約${savedYen}円）貯まった！\n\nお風呂サボって自分を甘やかし中...\n\n#フロハイッタ #ズボラ貯金`;
    };

    const handleShare = () => {
        const text = generateShareMessage();
        const url = "https://app.bath-check.com/";
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-amber-50 via-white to-purple-50 rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative overflow-hidden text-center"
                onClick={e => e.stopPropagation()}
            >
                {/* キラキラ背景 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-1/4 text-yellow-300/40 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
                    <div className="absolute top-1/3 right-1/4 text-purple-300/40 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
                    <div className="absolute bottom-1/4 left-1/3 text-pink-300/40 text-lg animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>
                </div>

                {/* 閉じるボタン */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 z-10 hover:text-gray-600 transition-colors">
                    <Icons.X size={20} />
                </button>

                {/* お祝い演出 */}
                <div className="relative z-10">
                    <div className="text-7xl mb-3 drop-shadow-lg" style={{ animation: 'bounce 1s ease-in-out infinite' }}>🎊</div>

                    {/* タイトル */}
                    <div className="mb-4">
                        <h2 className="text-3xl font-black font-pop bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            LEVEL UP!!
                        </h2>
                        <p className="text-sm font-bold text-gray-500 mt-1">ズボラ貯金がレベルアップ！</p>
                    </div>

                    {/* レベル表示カード */}
                    <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500 rounded-2xl p-5 mb-4 shadow-lg relative overflow-hidden">
                        {/* カード内キラキラ */}
                        <div className="absolute top-2 right-3 text-white/50 text-sm">✦</div>
                        <div className="absolute bottom-3 left-4 text-white/50 text-xs">✦</div>

                        <div className="text-6xl font-black font-pop text-white drop-shadow-md mb-2">
                            Lv.{newLevel}
                        </div>
                        <div className="inline-block bg-white/90 text-pink-600 text-sm font-black px-5 py-1.5 rounded-full shadow-sm">
                            「{rankTitle}」
                        </div>
                    </div>

                    {/* 貯金情報 */}
                    <div className="bg-white/80 rounded-xl p-3 mb-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="text-lg">⏰</span>
                                <span className="font-bold text-gray-700">{savedMinutes}分</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <div className="flex items-center gap-1">
                                <span className="text-lg">💰</span>
                                <span className="font-bold text-gray-700">約{savedYen}円</span>
                            </div>
                        </div>
                    </div>

                    {/* 自虐メッセージ */}
                    <p className="text-xs text-gray-500 mb-4">
                        お風呂サボって自分を甘やかし中...🛁💤
                    </p>

                    {/* シェアボタン */}
                    <button
                        onClick={handleShare}
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Icons.XLogo size={18} />
                        <span>レベルアップをシェア</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-400 font-bold py-2 text-xs mt-2 hover:text-gray-600 transition-colors"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelUpShareModal;
