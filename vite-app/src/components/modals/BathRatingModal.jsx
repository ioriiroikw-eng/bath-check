import React, { useState, useMemo } from 'react';
import { Icons } from '../Icons';
import { AFFILIATE_SUGGESTIONS, STORAGE_KEY_BATH_AD_INDEX } from '../../constants';

const BathRatingModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [memo, setMemo] = useState('');

    // 有効な広告リスト（bath/skincareカテゴリ優先）
    const validAds = useMemo(() => {
        const bathAds = AFFILIATE_SUGGESTIONS.filter(
            item => (item.category === 'bath' || item.category === 'skincare') && item.isA8 && item.a8Code
        );
        const allA8Ads = AFFILIATE_SUGGESTIONS.filter(
            item => item.isA8 && item.a8Code
        );
        return bathAds.length > 0 ? bathAds : allA8Ads;
    }, []);

    // 現在の広告インデックスを取得
    const currentIndex = useMemo(() => {
        if (validAds.length === 0) return 0;
        const savedIndex = localStorage.getItem(STORAGE_KEY_BATH_AD_INDEX);
        return savedIndex ? parseInt(savedIndex, 10) % validAds.length : 0;
    }, [isOpen, validAds.length]);

    // 現在表示する広告
    const currentAffiliate = validAds[currentIndex] || null;

    // 次の広告へ進める関数
    const advanceAdIndex = () => {
        if (validAds.length > 0) {
            const nextIndex = (currentIndex + 1) % validAds.length;
            localStorage.setItem(STORAGE_KEY_BATH_AD_INDEX, nextIndex.toString());
        }
    };

    if (!isOpen) return null;

    const handleSubmit = () => {
        advanceAdIndex();
        onSubmit({ rating: rating || 3, memo: memo.trim() });
        setRating(0);
        setMemo('');
    };

    const handleSkip = () => {
        advanceAdIndex();
        onSubmit({ rating: 0, memo: '' });
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

                {/* ご褒美広告（A8広告バナー） */}
                {currentAffiliate && currentAffiliate.isA8 && currentAffiliate.a8Code && (
                    <div className="mb-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-200">
                        <p className="text-xs text-pink-500 font-bold mb-2 text-center">🎁 お風呂入れたご褒美に</p>
                        <a
                            href={currentAffiliate.a8Code.linkUrl}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="block rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                border="0"
                                width={currentAffiliate.a8Code.width}
                                height={currentAffiliate.a8Code.height}
                                src={currentAffiliate.a8Code.imgUrl}
                                alt={currentAffiliate.title}
                                className="w-full h-auto"
                            />
                        </a>
                        {/* A8トラッキングピクセル */}
                        <img
                            border="0"
                            width="1"
                            height="1"
                            src={currentAffiliate.a8Code.trackingUrl}
                            alt=""
                            style={{ position: 'absolute', visibility: 'hidden' }}
                        />
                        <p className="text-[9px] text-gray-400 text-center mt-2">PR</p>
                    </div>
                )}

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

