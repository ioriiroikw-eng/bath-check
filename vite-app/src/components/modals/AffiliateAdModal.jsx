import React, { useMemo } from 'react';
import { AFFILIATE_SUGGESTIONS } from '../../constants';

const AffiliateAdModal = ({ isOpen, onClose }) => {
    // ランダムにアフィリエイト提案を選択（バナー画像があるもののみ）
    const affiliate = useMemo(() => {
        const withBanners = AFFILIATE_SUGGESTIONS.filter(
            item => item.bannerImage && item.skipMessages
        );
        if (withBanners.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * withBanners.length);
        return withBanners[randomIndex];
    }, [isOpen]);

    // スキップ時のメッセージをランダムに選択
    const message = useMemo(() => {
        if (!affiliate || !affiliate.skipMessages) return '';
        const randomIndex = Math.floor(Math.random() * affiliate.skipMessages.length);
        return affiliate.skipMessages[randomIndex];
    }, [affiliate, isOpen]);

    if (!isOpen || !affiliate) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl border border-indigo-700/50 text-center"
                onClick={e => e.stopPropagation()}
            >
                {/* ポジティブなメッセージ */}
                <p className="text-lg font-bold text-white mb-4 leading-relaxed">
                    {message}
                </p>

                {/* バナー画像 */}
                <a
                    href={affiliate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform active:scale-[0.98] mb-4"
                >
                    <img
                        src={affiliate.bannerImage}
                        alt={affiliate.title}
                        className="w-full h-auto"
                    />
                </a>

                {/* 広告表記 */}
                <p className="text-[10px] text-gray-400 mb-4">※ 広告を含みます</p>

                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors border border-white/30"
                >
                    おやすみ画面へ 💤
                </button>
            </div>
        </div>
    );
};

export default AffiliateAdModal;
