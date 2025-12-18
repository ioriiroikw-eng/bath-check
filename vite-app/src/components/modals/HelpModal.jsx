import React from 'react';
import { Icons } from '../Icons';

const HelpModal = ({ isOpen, onClose, onStartTutorial }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-pink-100 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
                    <Icons.X />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-lg font-black text-gray-800 mb-1 font-pop">使い方ガイド</h2>
                    <p className="text-xs text-pink-500 font-bold">無理せず、適切なタイミングで！</p>
                </div>

                <div className="space-y-4 text-sm text-gray-600 font-bold">
                    <div className="bg-pink-50 p-3 rounded-xl flex items-start gap-3">
                        <div className="text-2xl">❤️</div>
                        <div>
                            <h4 className="text-pink-600 font-black mb-1">HP（清潔度）を管理</h4>
                            <p className="text-xs leading-relaxed">時間が経つとHPが減ります。「毎日入る」のではなく「HPが減ったら入る」目安にしてください。</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-xl flex items-start gap-3">
                        <div className="text-2xl">🛁</div>
                        <div>
                            <h4 className="text-blue-600 font-black mb-1">お風呂でリセット</h4>
                            <p className="text-xs leading-relaxed">お風呂に入ったらボタンをタップ！HP全回復＆占いで運気アップ✨</p>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-3 rounded-xl flex items-start gap-3">
                        <div className="text-2xl">💎</div>
                        <div>
                            <h4 className="text-indigo-600 font-black mb-1">ズボラ貯金</h4>
                            <p className="text-xs leading-relaxed">入浴をスキップして「寝る」と、30分が貯金されます。サボることも立派な戦略！</p>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-xl flex items-start gap-3">
                        <div className="text-2xl">🔮</div>
                        <div>
                            <h4 className="text-purple-600 font-black mb-1">本格お風呂占い</h4>
                            <p className="text-xs leading-relaxed">リセット時に占いが発動！入浴で運気を上げて、ラッキーアクションを実行しよう！</p>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl shadow-md mt-6 active:scale-95">
                    わかった！
                </button>

                {/* チュートリアル再表示リンク */}
                {onStartTutorial && (
                    <button
                        onClick={onStartTutorial}
                        className="w-full mt-3 py-2 text-xs text-gray-400 font-bold hover:text-pink-400 transition-colors"
                    >
                        📖 チュートリアルをもう一度見る
                    </button>
                )}
            </div>
        </div>
    );
};

export default HelpModal;
