import React from 'react';
import { Icons } from '../Icons';

const BathConfirmModal = ({ isOpen, onClose, onConfirm }) => {
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
                    <div className="absolute inset-0 bg-pink-300 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative text-6xl flex items-center justify-center h-full">
                        🛁
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-gray-800 mb-2 text-display">
                    お風呂タイム？
                </h3>

                {/* Description */}
                <p className="text-gray-500 font-medium mb-6 text-sm leading-relaxed">
                    お風呂に入ってリセットしますか？<br />
                    <span className="text-pink-500 font-bold">HP全回復</span> & <span className="text-purple-500 font-bold">今日の記録！</span>
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 text-lg rounded-full shadow-lg shadow-pink-300/50 active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                        <span>入った！</span>
                        <span className="text-xl">✨</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-full transition-all active:scale-95"
                    >
                        まだ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BathConfirmModal;
