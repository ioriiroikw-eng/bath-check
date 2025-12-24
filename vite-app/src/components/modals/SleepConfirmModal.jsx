import React from 'react';
import { Icons } from '../Icons';

const SleepConfirmModal = ({ isOpen, onClose, onConfirm, onForgot }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
            onClick={onClose}
        >
            <div
                className="glass-card-strong rounded-3xl p-8 w-full max-w-sm text-center animate-bounce-in"
                onClick={e => e.stopPropagation()}
            >
                {/* Icon with glow */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-indigo-300 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative text-6xl flex items-center justify-center h-full">
                        🛁
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-gray-800 mb-2 text-display">
                    お風呂入った？
                </h3>

                {/* Description */}
                <p className="text-gray-500 font-medium mb-6 text-sm leading-relaxed">
                    記録を忘れてるだけ？<br />
                    それとも今日はスキップ？
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    {/* Forgot to record */}
                    <button
                        onClick={onForgot}
                        className="w-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-3"
                    >
                        <span className="text-xl">💮</span>
                        <span>入った！(記録忘れ)</span>
                    </button>

                    {/* Skip bath */}
                    <button
                        onClick={onConfirm}
                        className="w-full btn-indigo py-4 text-sm flex items-center justify-center gap-3"
                    >
                        <span className="text-xl">💤</span>
                        <span>まだ (スキップ！)</span>
                        <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            +30分
                        </span>
                    </button>

                    {/* Cancel */}
                    <button
                        onClick={onClose}
                        className="w-full text-sm text-gray-400 py-2 hover:text-gray-600 transition-colors font-medium"
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SleepConfirmModal;
