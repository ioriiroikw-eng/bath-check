import React, { useMemo } from 'react';
import { AFFILIATE_SUGGESTIONS, STORAGE_KEY_SLEEP_AD_INDEX } from '../../constants';

const AffiliateAdModal = ({ isOpen, onClose }) => {
    // 有効な広告リスト（sleepカテゴリ優先、次にA8広告全般）
    const validAds = useMemo(() => {
        // まずsleepカテゴリを優先
        const sleepAds = AFFILIATE_SUGGESTIONS.filter(
            item => item.category === 'sleep' && item.isA8 && item.a8Code && item.skipMessages
        );
        // sleepがなければA8広告全般
        const a8Ads = AFFILIATE_SUGGESTIONS.filter(
            item => item.isA8 && item.a8Code && item.skipMessages
        );
        // A8がなければAmazon広告
        const amazonAds = AFFILIATE_SUGGESTIONS.filter(
            item => item.bannerImage && item.skipMessages && !item.isA8
        );
        return sleepAds.length > 0 ? sleepAds : (a8Ads.length > 0 ? a8Ads : amazonAds);
    }, []);

    // 現在の広告インデックスを取得
    const currentIndex = useMemo(() => {
        if (validAds.length === 0) return 0;
        const savedIndex = localStorage.getItem(STORAGE_KEY_SLEEP_AD_INDEX);
        return savedIndex ? parseInt(savedIndex, 10) % validAds.length : 0;
    }, [isOpen, validAds.length]);

    // 現在表示する広告
    const affiliate = validAds[currentIndex] || null;

    // スキップ時のメッセージを選択
    const message = useMemo(() => {
        if (!affiliate || !affiliate.skipMessages) return '';
        const randomIndex = Math.floor(Math.random() * affiliate.skipMessages.length);
        return affiliate.skipMessages[randomIndex];
    }, [affiliate, isOpen]);

    // モーダルを閉じる時に次の広告へ進める
    const handleClose = () => {
        if (validAds.length > 0) {
            const nextIndex = (currentIndex + 1) % validAds.length;
            localStorage.setItem(STORAGE_KEY_SLEEP_AD_INDEX, nextIndex.toString());
        }
        onClose();
    };

    if (!isOpen || !affiliate) return null;

    // A8広告かどうか
    const isA8 = affiliate.isA8 && affiliate.a8Code;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleClose}>
            <div
                className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl border border-indigo-700/50 text-center"
                onClick={e => e.stopPropagation()}
            >
                {/* ポジティブなメッセージ */}
                <p className="text-lg font-bold text-white mb-4 leading-relaxed">
                    {message}
                </p>

                {/* バナー画像（A8広告 or Amazon広告） */}
                {isA8 ? (
                    <>
                        <a
                            href={affiliate.a8Code.linkUrl}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="block rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform active:scale-[0.98] mb-4 bg-white/10 p-2"
                        >
                            <img
                                border="0"
                                width={affiliate.a8Code.width}
                                height={affiliate.a8Code.height}
                                alt={affiliate.title}
                                src={affiliate.a8Code.imgUrl}
                                className="w-full h-auto rounded-lg"
                            />
                        </a>
                        {/* A8トラッキングピクセル */}
                        <img
                            border="0"
                            width="1"
                            height="1"
                            src={affiliate.a8Code.trackingUrl}
                            alt=""
                            style={{ position: 'absolute', visibility: 'hidden' }}
                        />
                    </>
                ) : (
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
                )}

                {/* 広告表記 */}
                <p className="text-[10px] text-gray-400 mb-4">※ 広告を含みます</p>

                {/* 閉じるボタン */}
                <button
                    onClick={handleClose}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors border border-white/30"
                >
                    おやすみ画面へ 💤
                </button>
            </div>
        </div>
    );
};

export default AffiliateAdModal;

