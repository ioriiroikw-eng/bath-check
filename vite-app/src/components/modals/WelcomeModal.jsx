import React from 'react';

const WelcomeModal = ({ isOpen, onClose, onAction }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="text-center mb-6">
                    <div className="text-5xl mb-2 animate-bounce">🏠</div>
                    <h3 className="text-xl font-black text-gray-800 mb-1 font-pop">おかえり〜！</h3>
                    <p className="text-xs text-gray-500 font-bold">外の汚れを記録する？<br />(今の状態を選んでね！)</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button onClick={() => onAction(3, "近所行ってきただけ！セーフ🙆‍♀️", "👟")} className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 p-3 rounded-xl flex flex-col items-center gap-1 active:scale-95 transition-transform">
                        <span className="text-2xl">👟</span>
                        <span className="text-xs font-bold text-gray-700">ちょっとそこまで</span>
                        <span className="text-[10px] bg-blue-200 text-blue-800 px-2 rounded-full font-bold">-3%</span>
                    </button>
                    <button onClick={() => onAction(10, "無事帰宅🏠 ベタベタする〜🥺", "🏫")} className="bg-green-50 hover:bg-green-100 border-2 border-green-100 p-3 rounded-xl flex flex-col items-center gap-1 active:scale-95 transition-transform">
                        <span className="text-2xl">🏫</span>
                        <span className="text-xs font-bold text-gray-700">学校/バイトおわ！</span>
                        <span className="text-[10px] bg-green-200 text-green-800 px-2 rounded-full font-bold">-10%</span>
                    </button>
                    <button onClick={() => onAction(20, "満員電車とか無理...早くお風呂...😇", "🥵")} className="bg-red-50 hover:bg-red-100 border-2 border-red-100 p-3 rounded-xl flex flex-col items-center gap-1 active:scale-95 transition-transform">
                        <span className="text-2xl">🥵</span>
                        <span className="text-xs font-bold text-gray-700">汗だく限界...</span>
                        <span className="text-[10px] bg-red-200 text-red-800 px-2 rounded-full font-bold">-20%</span>
                    </button>
                    <button onClick={() => onAction(0, "ただいま！まだ舞える✨", "✨")} className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-100 p-3 rounded-xl flex flex-col items-center gap-1 active:scale-95 transition-transform">
                        <span className="text-2xl">✨</span>
                        <span className="text-xs font-bold text-gray-700">まだ余裕✨</span>
                        <span className="text-[10px] bg-yellow-200 text-yellow-800 px-2 rounded-full font-bold">±0%</span>
                    </button>
                </div>
                <button onClick={onClose} className="w-full text-xs text-gray-400 underline py-2">今は記録しない</button>
            </div>
        </div>
    );
};

export default WelcomeModal;
