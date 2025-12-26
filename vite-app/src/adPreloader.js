// 広告画像のプリロードユーティリティ
import { AFFILIATE_SUGGESTIONS } from './constants';

// 画像をプリロードする関数
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
};

// 全A8広告画像をプリロード
export const preloadAdImages = async () => {
    const a8Ads = AFFILIATE_SUGGESTIONS.filter(item => item.isA8 && item.a8Code?.imgUrl);
    const amazonAds = AFFILIATE_SUGGESTIONS.filter(item => !item.isA8 && item.bannerImage);

    const imageUrls = [
        ...a8Ads.map(ad => ad.a8Code.imgUrl),
        ...amazonAds.map(ad => ad.bannerImage),
    ];

    // バックグラウンドでプリロード（エラーは無視）
    const promises = imageUrls.map(url =>
        preloadImage(url).catch(() => null)
    );

    await Promise.allSettled(promises);
    console.log(`Preloaded ${imageUrls.length} ad images`);
};

// プリロード済み画像のキャッシュ状態を管理
const preloadedImages = new Set();

export const isImagePreloaded = (src) => preloadedImages.has(src);

export const markImageAsPreloaded = (src) => {
    preloadedImages.add(src);
};
