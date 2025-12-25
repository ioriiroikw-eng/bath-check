import React, { useState, useMemo } from 'react';
import { Icons } from '../Icons';
import { AFFILIATE_SUGGESTIONS } from '../../constants';

const BathRatingModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [memo, setMemo] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit({ rating: rating || 3, memo: memo.trim() });
        setRating(0);
        setMemo('');
    };

    const handleSkip = () => {
        onSubmit({ rating: 0, memo: '' }); // 0 = 評価なし
        setRating(0);
        setMemo('');
    };

    const displayRating = hoveredRating || rating;

    const getRatingMessage = (r) => {
        switch (r) {
            case 1: return 'イマイチだった...';
            case 2: return 'まあまあかな';
            case 3: return 'ふつう！';
            case 4: return 'よかった！';
            case 5: return '最高のバスタイム！';
            default: return '星をタップして評価';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-bounce-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ヘッダー */}
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🛁✨</div>
                    <h2 className="text-xl font-black text-gray-800">
                        お風呂おつかれさま！
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        今日のバスタイムを記録しよう
                    </p>
                </div>

                {/* 星評価 */}
                <div className="mb-6">
                    <div className="flex justify-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-transform active:scale-90 hover:scale-110"
                            >
                                <Icons.Star
                                    size={36}
                                    className={`transition-colors ${star <= displayRating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-sm font-bold text-gray-600">
                        {getRatingMessage(displayRating)}
                    </p>
                </div>

                {/* メモ入力 */}
                <div className="mb-4">
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="今日のひとこと（任意）"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-300 focus:outline-none text-sm resize-none"
                        rows={2}
                        maxLength={100}
                    />
                </div>

                {/* ご褒美広告 */}
                {(() => {
                    const randomAffiliate = AFFILIATE_SUGGESTIONS[Math.floor(Math.random() * AFFILIATE_SUGGESTIONS.length)];
                    return randomAffiliate ? (
                        <a
                            href={randomAffiliate.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mb-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-200 hover:shadow-md transition-shadow"
                        >
                            <p className="text-xs text-pink-500 font-bold mb-1">🎁 お風呂入れたご褒美に</p>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{randomAffiliate.icon}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-800 text-sm">{randomAffiliate.title}</p>
                                    <p className="text-xs text-gray-500">{randomAffiliate.subtext}</p>
                                </div>
                                <Icons.ChevronRight size={16} className="text-pink-400" />
                            </div>
                        </a>
                    ) : null;
                })()}

                {/* ボタン */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSkip}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95"
                    >
                        スキップ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-xl shadow-md active:scale-95"
                    >
                        記録する ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BathRatingModal;
