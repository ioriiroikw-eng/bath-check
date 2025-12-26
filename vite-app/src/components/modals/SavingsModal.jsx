import React, { useMemo, useState, useEffect } from 'react';
import { Icons } from '../Icons';
import { MONEY_CONVERSIONS, AFFILIATE_SUGGESTIONS, GIFT_CARD_AD, STORAGE_KEY_SAVINGS_AD_INDEX, STORAGE_KEY_SAVINGS_EXP_AD_INDEX } from '../../constants';
import { calculateLevel, getRankInfo } from '../../utils';
import AdImage from '../AdImage';

const SavingsModal = ({ isOpen, onClose, savedMinutes }) => {
    const [activeTab, setActiveTab] = useState('experience');

    // ランク情報取得
    const rankInfo = getRankInfo(savedMinutes);
    const savedYen = Math.floor(savedMinutes / 30 * 80);

    // プログレスバー計算
    const progressPercent = useMemo(() => {
        if (rankInfo.isMax) return 100;
        const current = savedMinutes - rankInfo.threshold;
        const range = rankInfo.nextThreshold - rankInfo.threshold;
        return Math.min(100, Math.max(0, (current / range) * 100));
    }, [savedMinutes, rankInfo]);

    // Amazon広告（自己投資タブ用）
    const amazonAds = useMemo(() => {
        return AFFILIATE_SUGGESTIONS
            .filter(item => item.category === 'amazon' && !item.isA8);
    }, []);

    // 体験用A8広告（320x50）
    const experienceAds = useMemo(() => {
        return AFFILIATE_SUGGESTIONS.filter(item => item.category === 'experience' && item.isA8 && item.a8Code);
    }, []);

    // Amazon + A8を合わせた体験用広告リスト
    const allExperienceAds = useMemo(() => {
        return [...amazonAds, ...experienceAds];
    }, [amazonAds, experienceAds]);

    // 体験タブ用広告インデックス
    const currentExpIndex = useMemo(() => {
        if (allExperienceAds.length === 0) return 0;
        const savedIndex = localStorage.getItem(STORAGE_KEY_SAVINGS_EXP_AD_INDEX);
        return savedIndex ? parseInt(savedIndex, 10) % allExperienceAds.length : 0;
    }, [isOpen, allExperienceAds.length]);

    // 表示する体験用広告（2つ）- Amazon + A8をローテーション
    const displayExpAds = useMemo(() => {
        if (allExperienceAds.length === 0) return [];
        const ads = [];
        for (let i = 0; i < Math.min(2, allExperienceAds.length); i++) {
            ads.push(allExperienceAds[(currentExpIndex + i) % allExperienceAds.length]);
        }
        return ads;
    }, [allExperienceAds, currentExpIndex]);

    // A8広告（ご褒美タブ用 300x250）- ローテーション
    const a8Ads = useMemo(() => {
        return AFFILIATE_SUGGESTIONS.filter(item => item.isA8 && item.a8Code && item.category !== 'experience');
    }, []);

    // 現在のA8広告インデックスを取得
    const currentA8Index = useMemo(() => {
        if (a8Ads.length === 0) return 0;
        const savedIndex = localStorage.getItem(STORAGE_KEY_SAVINGS_AD_INDEX);
        return savedIndex ? parseInt(savedIndex, 10) % a8Ads.length : 0;
    }, [isOpen, a8Ads.length]);

    // 表示するA8広告（3つまで）
    const displayA8Ads = useMemo(() => {
        if (a8Ads.length === 0) return [];
        const ads = [];
        for (let i = 0; i < Math.min(3, a8Ads.length); i++) {
            ads.push(a8Ads[(currentA8Index + i) % a8Ads.length]);
        }
        return ads;
    }, [a8Ads, currentA8Index]);

    // モーダルを閉じる時に広告インデックスを進める
    const handleClose = () => {
        // 体験タブの場合
        if (activeTab === 'experience' && allExperienceAds.length > 0) {
            const nextExpIndex = (currentExpIndex + displayExpAds.length) % allExperienceAds.length;
            localStorage.setItem(STORAGE_KEY_SAVINGS_EXP_AD_INDEX, nextExpIndex.toString());
        }
        // ご褒美タブの場合
        if (activeTab === 'time' && a8Ads.length > 0) {
            const nextIndex = (currentA8Index + displayA8Ads.length) % a8Ads.length;
            localStorage.setItem(STORAGE_KEY_SAVINGS_AD_INDEX, nextIndex.toString());
        }
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={handleClose}>
            <div
                className="glass-card-strong rounded-3xl p-6 w-full max-w-sm animate-slide-up max-h-[90vh] overflow-y-auto relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <Icons.X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wider">
                        オフタイム貯金
                    </span>

                    {/* Main amount with glow */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-30" />
                        </div>
                        <h2 className="text-5xl font-black font-pop text-slate-700 relative text-display tracking-tight">
                            {savedMinutes}
                            <span className="text-lg text-slate-400 font-bold ml-1">分</span>
                        </h2>
                    </div>
                    <div className="text-sm font-bold text-slate-500 mt-2">
                        節約金額: <span className="text-emerald-600">約{savedYen.toLocaleString()}円</span>相当
                    </div>
                </div>

                {/* Rank Card */}
                <div className={`bg-white border rounded-2xl p-5 mb-6 text-center shadow-sm ${rankInfo.border}`}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-400 tracking-wider">現在のランク</span>
                        <span className={`text-xl font-black font-pop ${rankInfo.color}`}>
                            {rankInfo.tier} <span className="text-sm text-slate-400">{rankInfo.rank}</span>
                        </span>
                    </div>

                    <div className={`text-lg font-bold ${rankInfo.color} mb-4 text-display flex items-center justify-center gap-2`}>
                        <img src={rankInfo.icon} alt={rankInfo.tier} className="w-10 h-10 object-contain drop-shadow-md" />
                        {rankInfo.label}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden border border-slate-100">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${rankInfo.progressClass} shadow-sm`}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {!rankInfo.isMax ? (
                        <div className="text-[10px] text-right text-slate-400 font-bold tracking-wide">
                            次のランクまで <span className={rankInfo.color}>{rankInfo.nextThreshold - savedMinutes} 分</span>
                        </div>
                    ) : (
                        <div className={`text-[10px] text-right ${rankInfo.color} font-bold tracking-wide`}>
                            ✨ MAX RANK REACHED ✨
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 p-1 bg-slate-50 rounded-xl">
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs transition-all ${activeTab === 'experience'
                            ? 'bg-white text-slate-700 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        自己投資 (体験)
                    </button>
                    <button
                        onClick={() => setActiveTab('time')}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs transition-all ${activeTab === 'time'
                            ? 'bg-white text-slate-700 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        ご褒美 (アイテム)
                    </button>
                </div>

                {/* Experience Tab - Amazon + A8 Ads 混合ローテーション（合計2つ） */}
                {activeTab === 'experience' && (
                    <div className="mb-4 animate-fade-in">
                        <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 tracking-wider">
                            おすすめのアクション
                        </h3>
                        {displayExpAds.length > 0 ? (
                            <div className="space-y-3">
                                {displayExpAds.map((item, i) => (
                                    <div key={i}>
                                        {/* A8広告の場合 */}
                                        {item.isA8 && item.a8Code ? (
                                            <a
                                                href={item.a8Code.linkUrl}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                                className="block bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <AdImage
                                                    src={item.a8Code.imgUrl}
                                                    alt={item.title}
                                                    width={item.a8Code.width}
                                                    height={item.a8Code.height}
                                                    trackingUrl={item.a8Code.trackingUrl}
                                                    className="w-full h-auto"
                                                />
                                            </a>
                                        ) : (
                                            /* Amazon広告の場合 */
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {item.bannerImage ? (
                                                    <AdImage src={item.bannerImage} alt={item.title} className="w-full h-auto" />
                                                ) : (
                                                    <div className="flex items-center gap-3 p-4">
                                                        <div className="text-3xl opacity-80">{item.icon}</div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-bold text-slate-700">{item.title}</div>
                                                            <div className="text-xs text-slate-500">{item.description}</div>
                                                            <div className="text-xs text-emerald-500 font-bold mt-1">{item.subtext}</div>
                                                        </div>
                                                        <Icons.ArrowRight size={16} className="text-slate-300" />
                                                    </div>
                                                )}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                <div className="text-2xl mb-2 opacity-50">📚</div>
                                <div className="text-xs text-slate-500 font-medium leading-relaxed">
                                    貯まった時間で<br />新しい知識をインプットしませんか？
                                </div>
                            </div>
                        )}
                        <p className="text-[9px] text-slate-300 text-center mt-3">PR</p>
                    </div>
                )}

                {/* Reward Tab - A8 Ads */}
                {activeTab === 'time' && (
                    <div className="mb-4 animate-fade-in">
                        <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 tracking-wider">
                            あなたへのご褒美
                        </h3>
                        {displayA8Ads.length > 0 ? (
                            <div className="space-y-3">
                                {displayA8Ads.map((item, i) => (
                                    <div key={i}>
                                        <a
                                            href={item.a8Code.linkUrl}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="block bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <AdImage
                                                src={item.a8Code.imgUrl}
                                                alt={item.title}
                                                width={item.a8Code.width}
                                                height={item.a8Code.height}
                                                trackingUrl={item.a8Code.trackingUrl}
                                                className="w-full h-auto"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                <div className="text-2xl mb-2 opacity-50">🌱</div>
                                <div className="text-xs text-slate-500 font-medium leading-relaxed">
                                    まだ残高が少ないようです。<br />時間を貯めて、自分へのご褒美を。
                                </div>
                            </div>
                        )}
                        <p className="text-[9px] text-slate-300 text-center mt-3">PR</p>
                    </div>
                )}

                <p className="text-[10px] text-center text-slate-400 leading-relaxed mt-4">
                    つくった時間とお金を使って<br />
                    あなた自身のアップデートを。
                </p>
            </div>
        </div>
    );
};

export default SavingsModal;
