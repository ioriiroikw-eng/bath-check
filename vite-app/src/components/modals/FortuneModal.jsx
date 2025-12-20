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
            <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>★</span>
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
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-3" onClick={isFlipped ? onClose : null}>
            <div className="w-full max-w-xs perspective-1000" onClick={e => e.stopPropagation()}>
                <div className={`card-inner relative w-full h-[480px] duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={() => !isFlipped && setIsFlipped(true)}>

                    {/* FRONT: 水晶玉デザイン */}
                    <div className="card-front bg-pink-50 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                        <div className="text-7xl mb-4 drop-shadow-lg">🔮</div>
                        <h2 className="text-2xl font-black text-pink-500 tracking-wider mb-3">湯の託宣</h2>
                        <p className="text-xs font-bold text-gray-400 animate-pulse">心を鎮めてタップ...</p>
                    </div>

                    {/* BACK: 結果表示（白背景） */}
                    <div className="card-back bg-white rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
                        {/* グラデーションヘッダー */}
                        <div className="w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400"></div>

                        <div className="flex-1 flex flex-col items-center p-4 text-center">
                            {/* 入浴運勢 */}
                            <p className="text-sm font-black text-gray-700 tracking-wider mb-1">入浴運勢</p>

                            {/* ランク名 */}
                            <h2 className={`text-5xl font-black ${result.color} tracking-wider`}>{result.rank}</h2>
                            <p className="text-xs font-bold text-gray-400 mb-2">- {result.read} -</p>

                            {/* タイトル */}
                            <div className="w-full bg-gray-50 rounded-lg px-3 py-1.5 mb-2">
                                <p className="text-sm font-bold text-gray-700">「{result.title}」</p>
                            </div>

                            {/* 説明文 */}
                            <p className="text-[10px] text-gray-600 leading-snug mb-2 px-1">
                                {result.desc}
                            </p>

                            {/* 星評価 */}
                            <div className="w-full space-y-1 mb-2">
                                <div className="flex items-center justify-between bg-pink-50 rounded-md px-3 py-1">
                                    <span className="text-xs font-bold text-pink-500">恋愛運</span>
                                    <div className="text-xs">{renderStars(getStars('love'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-yellow-50 rounded-md px-3 py-1">
                                    <span className="text-xs font-bold text-yellow-600">金運</span>
                                    <div className="text-xs">{renderStars(getStars('money'))}</div>
                                </div>
                                <div className="flex items-center justify-between bg-green-50 rounded-md px-3 py-1">
                                    <span className="text-xs font-bold text-green-600">健康運</span>
                                    <div className="text-xs">{renderStars(getStars('health'))}</div>
                                </div>
                            </div>

                            {/* ラッキーアクション */}
                            <div className="w-full mb-2">
                                <p className="text-[9px] font-bold text-purple-400 tracking-widest mb-0.5">✨ ラッキーベストアクション ✨</p>
                                <p className="text-xs font-bold text-purple-600">{result.action}</p>
                            </div>

                            {/* シェアセクション */}
                            <div className="w-full bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-2 mb-2">
                                <p className="text-[10px] font-bold text-gray-500 mb-1">🛁 復活をシェア！</p>
                                <button
                                    onClick={handleShare}
                                    className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                >
                                    <Icons.XLogo size={14} />
                                    <span>Xでシェア</span>
                                </button>
                            </div>

                            {/* 閉じるボタン */}
                            <button onClick={onClose} className="text-gray-400 text-[10px] font-bold underline">
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

