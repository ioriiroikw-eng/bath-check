import React, { useState, useEffect } from 'react';
import { Icons } from '../Icons';

const FortuneModal = ({ isOpen, onClose, result }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsFlipped(false);
            const timer = setTimeout(() => {
                setIsFlipped(true);
                if (navigator.vibrate) navigator.vibrate([50, 100]);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);
    if (!isOpen || !result) return null;

    // 星の数を計算（1-5）
    const getStars = (category) => {
        if (!result.stars) return 3;
        return result.stars[category] || 3;
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>★</span>
        ));
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-6" onClick={isFlipped ? onClose : null}>
            <div className="w-full max-w-sm aspect-[3/4] perspective-1000" onClick={e => e.stopPropagation()}>
                <div className={`card-inner relative w-full h-full duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={() => !isFlipped && setIsFlipped(true)}>

                    {/* FRONT: 水晶玉デザイン */}
                    <div className="card-front bg-pink-50 rounded-3xl flex flex-col items-center justify-center shadow-2xl">
                        <div className="text-9xl mb-6 drop-shadow-lg">🔮</div>
                        <h2 className="text-3xl font-black text-pink-500 tracking-wider mb-4">湯の託宣</h2>
                        <p className="text-sm font-bold text-gray-400 animate-pulse">心を鎮めてタップ...</p>
                    </div>

                    {/* BACK: 結果表示（白背景） */}
                    <div className="card-back bg-white rounded-3xl overflow-hidden relative shadow-2xl flex flex-col">
                        {/* グラデーションヘッダー */}
                        <div className="w-full h-3 bg-gradient-to-r from-pink-400 to-purple-400"></div>

                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            {/* 入浴運勢 */}
                            <p className="text-base font-black text-gray-700 tracking-wider mb-2">入浴運勢</p>

                            {/* ランク名（Zen Maru Gothicで見やすく） */}
                            <h2 className={`text-6xl font-black ${result.color} tracking-wider mb-1`}>{result.rank}</h2>
                            <p className="text-sm font-bold text-gray-400 mb-6">- {result.read} -</p>

                            {/* タイトル */}
                            <div className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-4">
                                <p className="text-base font-bold text-gray-700">「{result.title}」</p>
                            </div>

                            {/* 説明文 */}
                            <p className="text-xs text-gray-600 leading-relaxed mb-6 px-2">
                                {result.desc}
                            </p>

                            {/* 星評価 */}
                            <div className="w-full space-y-2 mb-6">
                                <div className="flex items-center justify-between bg-pink-50 rounded-lg px-4 py-2">
                                    <span className="text-sm font-bold text-pink-500">恋愛運</span>
                                    <div className="text-lg">{renderStars(getStars('love'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-yellow-50 rounded-lg px-4 py-2">
                                    <span className="text-sm font-bold text-yellow-600">金運</span>
                                    <div className="text-lg">{renderStars(getStars('money'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-2">
                                    <span className="text-sm font-bold text-green-600">健康運</span>
                                    <div className="text-lg">{renderStars(getStars('health'))}</div>
                                </div>
                            </div>

                            {/* ラッキーアクション */}
                            <div className="w-full mb-4">
                                <p className="text-[10px] font-bold text-purple-400 tracking-widest mb-1">✨ ラッキーベストアクション ✨</p>
                                <p className="text-sm font-bold text-purple-600">{result.action}</p>
                            </div>

                            {/* 閉じるボタン */}
                            <button onClick={onClose} className="text-gray-400 text-xs font-bold underline mt-2">
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FortuneModal;
