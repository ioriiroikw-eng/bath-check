import React, { useState, useEffect } from 'react';

// スケルトンローディング付き広告画像コンポーネント
const AdImage = ({
    src,
    alt,
    width,
    height,
    className = '',
    onClick,
    linkUrl,
    trackingUrl
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // 画像が変わったらリセット
        setIsLoaded(false);
        setHasError(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    // アスペクト比を計算
    const aspectRatio = height && width ? (height / width) * 100 : 75;

    return (
        <div className="relative">
            {/* スケルトンローディング */}
            {!isLoaded && !hasError && (
                <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"
                    style={{ paddingBottom: `${aspectRatio}%` }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* 実際の画像 */}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={handleError}
                className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    display: hasError ? 'none' : 'block',
                }}
            />

            {/* エラー時のフォールバック */}
            {hasError && (
                <div
                    className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"
                    style={{ paddingBottom: `${aspectRatio}%`, position: 'relative' }}
                >
                    <span className="absolute inset-0 flex items-center justify-center text-sm">
                        📢 広告
                    </span>
                </div>
            )}

            {/* トラッキングピクセル */}
            {trackingUrl && (
                <img
                    src={trackingUrl}
                    alt=""
                    width="1"
                    height="1"
                    style={{ position: 'absolute', visibility: 'hidden' }}
                />
            )}
        </div>
    );
};

export default AdImage;
