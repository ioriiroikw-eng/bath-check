import React, { useMemo, useState } from 'react';
import { Icons } from '../Icons';
import { RANK_TITLES, MONEY_CONVERSIONS, AFFILIATE_SUGGESTIONS, GIFT_CARD_AD } from '../../constants';
import { calculateLevel, getNextLevelMinutes } from '../../utils';

const SavingsModal = ({ isOpen, onClose, savedMinutes }) => {
    const [activeTab, setActiveTab] = useState('experience');

    // レベル計算
    const level = calculateLevel(savedMinutes);
    const nextLevelMinutes = getNextLevelMinutes(level);
    const savedYen = Math.floor(savedMinutes / 30 * 80);

    // ランク称号
    const rankTitle = useMemo(() => {
        for (let i = RANK_TITLES.length - 1; i >= 0; i--) {
            if (level >= RANK_TITLES[i].lv) {
                return RANK_TITLES[i].title;
            }
        }
        return RANK_TITLES[0].title;
    }, [level]);

    // お金換算提案
    const moneySuggestions = useMemo(() => {
        const affordable = MONEY_CONVERSIONS.filter(item => item.minYen <= savedYen);
        if (affordable.length === 0) return [];
        const shuffled = [...affordable].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [savedYen, isOpen]);

    // アフィリエイト提案
    const affiliateSuggestions = useMemo(() => {
        return AFFILIATE_SUGGESTIONS
            .filter(item => savedYen >= item.minYen && savedYen < item.maxYen)
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 2);
    }, [savedYen, isOpen]);

    // ギフトカードメッセージ
    const giftCardMessage = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * GIFT_CARD_AD.messages.length);
        return GIFT_CARD_AD.messages[randomIndex];
    }, [isOpen]);

    if (!isOpen) return null;

    // Progress percentage
    const progressPercent = Math.min((savedMinutes / nextLevelMinutes) * 100, 100);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
            <div
                className="glass-card-strong rounded-3xl p-6 w-full max-w-sm animate-slide-up max-h-[90vh] overflow-y-auto relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <Icons.X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                        ズボラ貯金ステータス
                    </span>

                    {/* Main amount with glow */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-20" />
                        </div>
                        <h2 className="text-5xl font-black font-pop text-indigo-500 relative text-display">
                            {savedMinutes}
                            <span className="text-lg text-gray-400 font-bold">分</span>
                        </h2>
                    </div>
                    <div className="text-sm font-bold text-gray-400 mt-1">
                        節約金額: <span className="text-indigo-500">約{savedYen}円</span>相当
                    </div>
                </div>

                {/* Rank Card */}
                <div className="glass-card rounded-2xl p-5 mb-6 text-center">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-indigo-400">現在のランク</span>
                        <span className="text-2xl font-black font-pop text-indigo-600">Lv.{level}</span>
                    </div>

                    <div className="text-lg font-bold text-indigo-700 mb-4 text-display">
                        「{rankTitle}」
                    </div>

                    {/* Progress bar */}
                    <div className="w-full meter-track h-3 mb-2">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {level < 100 ? (
                        <div className="text-[11px] text-right text-indigo-400 font-medium">
                            次レベルまであと <span className="font-bold">{nextLevelMinutes - savedMinutes}分</span>
                        </div>
                    ) : (
                        <div className="text-[11px] text-right text-indigo-400 font-bold">
                            ✨ MAX LEVEL ✨
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${activeTab === 'experience'
                                ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        🎧 体験
                    </button>
                    <button
                        onClick={() => setActiveTab('time')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${activeTab === 'time'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        💰 お金
                    </button>
                </div>

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            📚 本日のおすすめ体験
                        </h3>
                        {affiliateSuggestions.length > 0 ? (
                            <div className="space-y-3">
                                {affiliateSuggestions.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all active:scale-[0.98]"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {item.bannerImage ? (
                                            <img src={item.bannerImage} alt={item.title} className="w-full h-auto" />
                                        ) : (
                                            <div className="flex items-center gap-3 p-4">
                                                <div className="text-3xl">{item.icon}</div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-gray-700">{item.title}</div>
                                                    <div className="text-xs text-gray-500">{item.description}</div>
                                                    <div className="text-xs text-orange-500 font-bold">{item.subtext}</div>
                                                </div>
                                                <Icons.ArrowRight size={18} className="text-orange-400" />
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 glass-card rounded-xl">
                                <div className="text-3xl mb-2">🎧</div>
                                <div className="text-xs text-gray-500 font-medium">
                                    もう少し貯めると<br />特別な体験がアンロックされるよ！
                                </div>
                            </div>
                        )}
                        <p className="text-[9px] text-gray-400 text-center mt-3">※ 広告を含みます</p>
                    </div>
                )}

                {/* Money Tab */}
                {activeTab === 'time' && (
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            💰 このお金で買えるもの！
                        </h3>
                        {moneySuggestions.length > 0 ? (
                            <div className="space-y-2">
                                {moneySuggestions.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 glass-card p-4 rounded-xl">
                                        <div className="text-2xl">{item.icon}</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-700">{item.text}</div>
                                            <div className="text-xs text-green-500 font-bold">💵 {item.minYen}円〜</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 glass-card rounded-xl">
                                <div className="text-3xl mb-2">🌱</div>
                                <div className="text-xs text-gray-500 font-medium">
                                    まだ貯金が足りないみたい...<br />お風呂をスキップして貯めよう！
                                </div>
                            </div>
                        )}

                        {/* Gift Card Ad */}
                        <div className="mt-4">
                            <p className="text-sm font-bold text-amber-600 text-center mb-2">
                                {giftCardMessage}
                            </p>
                            <a
                                href={GIFT_CARD_AD.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all active:scale-[0.98]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={GIFT_CARD_AD.bannerImage} alt="Amazonギフトカード" className="w-full h-auto" />
                            </a>
                            <p className="text-[9px] text-gray-400 text-center mt-2">※ 広告を含みます</p>
                        </div>
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
