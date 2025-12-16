import React, { useMemo } from 'react';
import { Icons } from '../Icons';
import { RANK_TITLES, ZUBORA_CONVERSIONS } from '../../constants';

const SavingsModal = ({ isOpen, onClose, savedMinutes }) => {
    if (!isOpen) return null;

    // レベル計算 (30分 = 1Lv, Max 99)
    const level = Math.min(99, Math.floor(savedMinutes / 30.3) + 1);
    // ランク称号
    let rankTitle = RANK_TITLES[0].title;
    for (let i = RANK_TITLES.length - 1; i >= 0; i--) {
        if (level >= RANK_TITLES[i].lv) {
            rankTitle = RANK_TITLES[i].title;
            break;
        }
    }

    // ランダム提案 (3つ選出)
    const suggestions = useMemo(() => {
        const affordable = ZUBORA_CONVERSIONS.filter(item => item.min <= savedMinutes);
        if (affordable.length === 0) return [ZUBORA_CONVERSIONS[0]];
        const shuffled = [...affordable].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [savedMinutes, isOpen]);

    const savedYen = Math.floor(savedMinutes / 30 * 80); // 30分=80円計算

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-indigo-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><Icons.X /></button>

                <div className="text-center mb-6">
                    <div className="inline-block bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-2">ズボラ貯金ステータス</div>
                    <h2 className="text-4xl font-black font-pop text-indigo-500 mb-1">{savedMinutes}<span className="text-lg text-gray-400">分</span></h2>
                    <div className="text-xs font-bold text-gray-400">節約金額: 約{savedYen}円相当</div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-center border-2 border-indigo-100">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-indigo-400">現在のランク</span>
                        <span className="text-xl font-black font-pop text-indigo-600">Lv.{level}</span>
                    </div>
                    <div className="text-lg font-bold text-indigo-700 mb-3">「{rankTitle}」</div>

                    <div className="w-full bg-white rounded-full h-2.5 mb-1">
                        <div className="bg-indigo-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(level / 99) * 100}%` }}></div>
                    </div>
                    <div className="text-[10px] text-right text-indigo-300">MAX Lv.99まであと{3000 - savedMinutes}分</div>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <span>🎁</span>今のあなたならコレができる！
                    </h3>
                    <div className="space-y-2">
                        {suggestions.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                                <div className="text-2xl">{item.icon}</div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-gray-600">{item.text}</div>
                                    <div className="text-[10px] text-gray-400">{item.type === 'money' ? '💰 お金換算' : '⏳ 時間換算'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-[10px] text-center text-gray-400">
                    ※換算は目安です。浮いた時間とお金は<br />あなたの好きなことに使いましょう！
                </p>
            </div>
        </div>
    );
};

export default SavingsModal;
