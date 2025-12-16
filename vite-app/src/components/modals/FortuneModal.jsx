import React, { useState, useEffect } from 'react';

const FortuneModal = ({ isOpen, onClose, result }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsFlipped(false);
            const timer = setTimeout(() => {
                setIsFlipped(true);
                if (navigator.vibrate) navigator.vibrate([50, 100]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);
    if (!isOpen || !result) return null;

    const StarRating = ({ count }) => (<div className="flex text-sm"> {[...Array(5)].map((_, i) => (<span key={i} className={i < count ? "star-rating" : "star-rating-gray"}>★</span>))} </div>);

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6" onClick={isFlipped ? onClose : null}>
            <div className="w-full max-w-sm aspect-[3/4] perspective-1000" onClick={e => e.stopPropagation()}>
                <div className={`card-inner relative w-full h-full duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={() => !isFlipped && setIsFlipped(true)}>
                    <div className="card-front">
                        <div className="text-6xl animate-pulse">🔮</div>
                        <p className="mt-4 text-pink-400 font-bold font-pop">湯の託宣</p>
                        <p className="text-xs text-gray-400 mt-2">心を鎮めてタップ...</p>
                    </div>
                    <div className="card-back overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400"></div>
                        <div className="p-6 flex flex-col h-full w-full">
                            <div className="text-center mb-4">
                                <p className="text-xs text-gray-400 font-bold mb-1">入浴運勢</p>
                                <h2 className={`text-4xl font-black font-pop ${result.color} tracking-widest`}>{result.rank}</h2>
                                <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-widest">- {result.read} -</p>
                                <h3 className="text-sm font-bold text-gray-700 mt-2">「{result.title}」</h3>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-xs font-bold text-gray-600 leading-relaxed text-center flex-grow flex items-center justify-center"> {result.desc} </div>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between items-center bg-pink-50 px-3 py-1.5 rounded-lg"> <span className="text-xs font-bold text-pink-500">恋愛運</span> <StarRating count={result.love} /> </div>
                                <div className="flex justify-between items-center bg-yellow-50 px-3 py-1.5 rounded-lg"> <span className="text-xs font-bold text-yellow-600">金運</span> <StarRating count={result.money} /> </div>
                                <div className="flex justify-between items-center bg-green-50 px-3 py-1.5 rounded-lg"> <span className="text-xs font-bold text-green-600">健康運</span> <StarRating count={result.health} /> </div>
                            </div>
                            <div className="mt-auto text-center">
                                <div className="text-[10px] text-purple-500 font-bold mb-1">✨ ラッキーバスアクション ✨</div>
                                <div className="bg-purple-100 text-purple-700 font-bold py-2 px-4 rounded-full text-xs inline-block shadow-sm"> {result.action} </div>
                            </div>
                            <button onClick={onClose} className="mt-4 text-xs text-gray-400 underline">閉じる</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FortuneModal;
