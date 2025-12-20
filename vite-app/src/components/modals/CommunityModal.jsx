import React from 'react';
import { Icons } from '../Icons';

const COMMUNITY_URL = 'https://x.com/i/communities/2002271224563736624';

const CommunityModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleJoinCommunity = () => {
        window.open(COMMUNITY_URL, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* 背景装飾 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/4 right-1/4 text-indigo-300/30 text-2xl">📢</div>
                    <div className="absolute bottom-1/4 left-1/4 text-purple-300/30 text-xl">🛁</div>
                </div>

                {/* 閉じるボタン */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 z-10 hover:text-gray-600 transition-colors">
                    <Icons.X size={20} />
                </button>

                <div className="relative z-10 text-center">
                    {/* アイコン */}
                    <div className="text-6xl mb-3">🛁🙅‍♀️</div>

                    {/* タイトル */}
                    <h2 className="text-xl font-black font-pop text-indigo-600 mb-1">風呂キャンセル界隈</h2>
                    <p className="text-sm font-bold text-gray-500 mb-4">Xコミュニティ掲示板</p>

                    {/* 説明カード */}
                    <div className="bg-white/80 rounded-2xl p-4 mb-4 shadow-sm border border-indigo-100 text-left">
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            風呂キャン民が集まるコミュニティです！
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>📝 今日の風呂キャン報告</li>
                            <li>💬 風呂キャン仲間とおしゃべり</li>
                            <li>🏆 連続風呂キャン記録の共有</li>
                            <li>✨ 励まし合い・共感</li>
                        </ul>
                    </div>

                    {/* 参加ボタン */}
                    <button
                        onClick={handleJoinCommunity}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg hover:shadow-xl mb-2"
                    >
                        <Icons.XLogo size={18} />
                        <span>コミュニティを見る</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-400 font-bold py-2 text-xs hover:text-gray-600 transition-colors"
                    >
                        あとで
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityModal;
