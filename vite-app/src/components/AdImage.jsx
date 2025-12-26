import React, { useState, useRef } from 'react';

// 広告画像コンポーネント（チカチカ防止版）
const AdImage = ({
    src,
    alt,
    width,
    height,
    className = '',
    trackingUrl
}) => {
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    const handleError = () => {
        setHasError(true);
    };

    return (
        <div className="relative">
            {/* 実際の画像（ローディング状態なし、直接表示） */}
            {!hasError && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    onError={handleError}
                    className={className}
                    style={{ display: 'block' }}
                />
            )}

            {/* エラー時のフォールバック */}
            {hasError && (
                <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 py-4">
                    <span className="text-sm">📢 広告</span>
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


