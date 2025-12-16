import React from 'react';

const SleepConfirmModal = ({ isOpen, onClose, onConfirm, onForgot }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter text-center shadow-2xl border-4 border-indigo-100" onClick={e => e.stopPropagation()}>
                <div className="text-5xl mb-4">🛁</div>
                <h3 className="text-xl font-black text-gray-800 mb-2 font-pop">お風呂入った？</h3>
                <p className="text-xs text-gray-500 font-bold mb-6">記録を忘れてるだけ？<br />それとも今日はスキップ？</p>
                <div className="flex flex-col gap-3">
                    <button onClick={onForgot} className="w-full bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold py-3 rounded-xl shadow-sm active:scale-95 text-sm flex items-center justify-center gap-2">
                        <span>💮</span> 入った！(記録忘れ)
                    </button>
                    <button onClick={onConfirm} className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white font-black py-3 rounded-xl shadow-md active:scale-95 text-sm flex items-center justify-center gap-2">
                        <span>💤</span> まだ (スキップ！) <span className="bg-white/20 text-[10px] px-1 rounded">+30分</span>
                    </button>
                    <button onClick={onClose} className="w-full text-xs text-gray-400 py-2 underline">キャンセル</button>
                </div>
            </div>
        </div>
    );
};

export default SleepConfirmModal;
