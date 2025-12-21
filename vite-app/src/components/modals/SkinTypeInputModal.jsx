import React from 'react';
import { Icons } from '../Icons';
import { SKIN_TYPES, SKIN_TYPE_DIAGNOSIS_URL } from '../../constants';

const SkinTypeInputModal = ({ isOpen, onClose, onSelect, currentSkinType }) => {
    if (!isOpen) return null;

    const handleDiagnosis = () => {
        window.open(SKIN_TYPE_DIAGNOSIS_URL, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-pink-100 max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {onClose && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
                        <Icons.X />
                    </button>
                )}

                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🧴</div>
                    <h2 className="text-lg font-black text-gray-800 mb-1 font-pop">あなたの肌タイプは？</h2>
                    <p className="text-xs text-gray-500 font-bold">
                        肌タイプによってHP減少速度が変わります
                    </p>
                </div>

                {/* 肌タイプ選択 */}
                <div className="space-y-2 mb-4">
                    {SKIN_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => onSelect(type.id)}
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all active:scale-95 ${currentSkinType === type.id
                                ? 'bg-pink-100 border-2 border-pink-400'
                                : 'bg-gray-50 border-2 border-transparent hover:bg-pink-50'
                                }`}
                        >
                            <div className="text-left flex-1">
                                <div className="font-black text-gray-800">{type.name}</div>
                                <div className="text-[10px] text-gray-400">{type.description}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 診断サイトへのリンク */}
                <button
                    onClick={handleDiagnosis}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    <span>🔍</span>
                    <span>肌タイプを診断する</span>
                    <span>→</span>
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-2">
                    診断サイトで結果を確認してね！
                </p>
            </div>
        </div>
    );
};

export default SkinTypeInputModal;
