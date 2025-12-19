import React, { useMemo, useState } from 'react';
import { Icons } from '../Icons';
import { RANK_TITLES, MONEY_CONVERSIONS, AFFILIATE_SUGGESTIONS } from '../../constants';
import { calculateLevel, getNextLevelMinutes } from '../../utils';

const SavingsModal = ({ isOpen, onClose, savedMinutes }) => {
    const [activeTab, setActiveTab] = useState('experience'); // 'experience' or 'time'

    // レベル計算
    const level = calculateLevel(savedMinutes);
    const nextLevelMinutes = getNextLevelMinutes(level);
    const savedYen = Math.floor(savedMinutes / 30 * 80); // 30分=80円計算

    // ランク称号
    const rankTitle = useMemo(() => {
        for (let i = RANK_TITLES.length - 1; i >= 0; i--) {
            if (level >= RANK_TITLES[i].lv) {
                return RANK_TITLES[i].title;
            }
        }
        return RANK_TITLES[0].title;
    }, [level]);

    // お金換算提案 (3つ選出) - お金タブ用
    const moneySuggestions = useMemo(() => {
        const affordable = MONEY_CONVERSIONS.filter(item => item.minYen <= savedYen);
        if (affordable.length === 0) return [];
        const shuffled = [...affordable].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [savedYen, isOpen]);

    // アフィリエイト提案（貯金額に応じてフィルタリング）- 体験タブ用
    const affiliateSuggestions = useMemo(() => {
        return AFFILIATE_SUGGESTIONS
            .filter(item => savedYen >= item.minYen && savedYen < item.maxYen)
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 2);
    }, [savedYen, isOpen]);

    // 早期リターン（すべてのhookの後）
    if (!isOpen) return null;


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
                        <div className="bg-indigo-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(level / 100) * 100}%` }}></div>
                    </div>
                    {level < 100 ? (
                        <div className="text-[10px] text-right text-indigo-300">次レベルまであと{nextLevelMinutes - savedMinutes}分</div>
                    ) : (
                        <div className="text-[10px] text-right text-indigo-300">MAX LEVEL</div>
                    )}
                </div>

                {/* タブ切り替え */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'experience'
                            ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-md'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        🎧 体験
                    </button>
                    <button
                        onClick={() => setActiveTab('time')}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'time'
                            ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-md'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        ⏰ お金
                    </button>
                </div>

                {/* 体験タブ */}
                {activeTab === 'experience' && (
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span>📚</span>本日のおすすめ体験
                        </h3>
                        {affiliateSuggestions.length > 0 ? (
                            <div className="space-y-3">
                                {affiliateSuggestions.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-orange-200"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {item.bannerImage ? (
                                            <img
                                                src={item.bannerImage}
                                                alt={item.title}
                                                className="w-full h-auto"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
                                                <div className="text-2xl">{item.icon}</div>
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-gray-700">{item.title}</div>
                                                    <div className="text-[10px] text-gray-600">{item.description}</div>
                                                    <div className="text-[9px] text-orange-500 font-bold">{item.subtext}</div>
                                                </div>
                                                <div className="text-orange-400">
                                                    <Icons.ArrowRight size={16} />
                                                </div>
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-orange-50/50 rounded-xl border border-dashed border-orange-200">
                                <div className="text-2xl mb-2">🎧</div>
                                <div className="text-xs text-orange-400 font-bold">
                                    もう少し貯めると<br />特別な体験がアンロックされるよ！
                                </div>
                            </div>
                        )}
                        <p className="text-[9px] text-gray-400 text-center mt-3">
                            ※ 広告を含みます
                        </p>
                    </div>
                )}

                {/* お金タブ */}
                {activeTab === 'time' && (
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span>💰</span>このお金で買えるもの！
                        </h3>
                        {moneySuggestions.length > 0 ? (
                            <div className="space-y-2">
                                {moneySuggestions.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-3 rounded-xl shadow-sm">
                                        <div className="text-2xl">{item.icon}</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-gray-700">{item.text}</div>
                                            <div className="text-[10px] text-green-500 font-bold">💵 {item.minYen}円〜</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-green-50/50 rounded-xl border border-dashed border-green-200">
                                <div className="text-2xl mb-2">🌱</div>
                                <div className="text-xs text-green-500 font-bold">まだ貯金が足りないみたい...<br />お風呂をスキップして貯めよう！</div>
                            </div>
                        )}
                    </div>
                )}

                <p className="text-[10px] text-center text-gray-400">
                    ※換算は目安です。浮いた時間とお金は<br />あなたの好きなことに使いましょう！
                </p>
            </div>
        </div>
    );
};

export default SavingsModal;

