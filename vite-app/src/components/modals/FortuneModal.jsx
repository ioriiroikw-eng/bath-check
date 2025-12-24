import React, { useState, useEffect } from 'react';
import { Icons } from '../Icons';

const FortuneModal = ({ isOpen, onClose, result, hoursSince }) => {
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
            <span key={i} className={`transition-all duration-300 ${i < count ? 'text-yellow-400 scale-100' : 'text-gray-200 scale-90'}`}>
                ★
            </span>
        ));
    };

    // シェアメッセージを生成
    const generateShareMessage = () => {
        const hoursText = parseFloat(hoursSince) >= 1
            ? `${Math.floor(parseFloat(hoursSince))}時間ぶり`
            : `${Math.floor(parseFloat(hoursSince) * 60)}分ぶり`;
        return `${hoursText}にフロに入って復活しました！清潔度100%！✨\n\n運勢: ${result.rank}（${result.read}）\n「${result.title}」\n\n#フロハイッタ`;
    };

    const handleShare = () => {
        const text = generateShareMessage();
        const url = "https://app.bath-check.com/";
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div
            className="fixed inset-0 bg-gradient-to-b from-indigo-900/95 to-purple-900/95 z-[60] flex items-center justify-center p-4"
            onClick={isFlipped ? onClose : null}
        >
            {/* Sparkle background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0.6,
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-xs perspective-1000" onClick={e => e.stopPropagation()}>
                <div
                    className={`card-inner relative w-full h-[500px] duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'flipped' : ''}`}
                    onClick={() => !isFlipped && setIsFlipped(true)}
                >
                    {/* FRONT: Crystal Ball Design */}
                    <div className="card-front glass-dark rounded-3xl flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse" />
                            <div className="text-8xl mb-6 drop-shadow-2xl relative animate-float-breathe">🔮</div>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-wider mb-4 text-display">
                            湯の託宣
                        </h2>
                        <p className="text-sm font-bold text-purple-200 animate-pulse">
                            心を鎮めてタップ...
                        </p>
                    </div>

                    {/* BACK: Result Display */}
                    <div className="card-back glass-card-strong rounded-3xl overflow-hidden flex flex-col">
                        {/* Gradient Header */}
                        <div className="w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />

                        <div className="flex-1 flex flex-col items-center p-5 text-center">
                            {/* Label */}
                            <p className="text-xs font-bold text-gray-500 tracking-widest mb-1">入浴運勢</p>

                            {/* Rank */}
                            <h2 className={`text-5xl font-black ${result.color} tracking-wider text-display`}>
                                {result.rank}
                            </h2>
                            <p className="text-xs font-medium text-gray-400 mb-3">- {result.read} -</p>

                            {/* Title */}
                            <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-2 mb-3">
                                <p className="text-sm font-bold text-gray-700">「{result.title}」</p>
                            </div>

                            {/* Description */}
                            <p className="text-[11px] text-gray-600 leading-relaxed mb-3 px-2">
                                {result.desc}
                            </p>

                            {/* Star Ratings */}
                            <div className="w-full space-y-1.5 mb-3">
                                <div className="flex items-center justify-between bg-pink-50 rounded-lg px-4 py-1.5">
                                    <span className="text-xs font-bold text-pink-500">恋愛運</span>
                                    <div className="text-sm tracking-wider">{renderStars(getStars('love'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-yellow-50 rounded-lg px-4 py-1.5">
                                    <span className="text-xs font-bold text-yellow-600">金運</span>
                                    <div className="text-sm tracking-wider">{renderStars(getStars('money'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-1.5">
                                    <span className="text-xs font-bold text-green-600">健康運</span>
                                    <div className="text-sm tracking-wider">{renderStars(getStars('health'))}</div>
                                </div>
                            </div>

                            {/* Lucky Action */}
                            <div className="w-full mb-3">
                                <p className="text-[10px] font-bold text-purple-400 tracking-widest mb-1">
                                    ✨ ラッキーベストアクション ✨
                                </p>
                                <p className="text-xs font-bold text-purple-600">{result.action}</p>
                            </div>

                            {/* Share Section */}
                            <div className="w-full glass-card rounded-xl p-3 mb-2">
                                <p className="text-[10px] font-bold text-gray-500 mb-2">🛁 復活をシェア！</p>
                                <button
                                    onClick={handleShare}
                                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                                >
                                    <Icons.XLogo size={14} />
                                    <span>Xでシェア</span>
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-xs font-medium transition-colors"
                            >
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
