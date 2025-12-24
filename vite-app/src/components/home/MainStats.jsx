import React from 'react';
import { Badge } from '../ui';

/**
 * MainStats - HP bar and elapsed time display
 */
const MainStats = ({ hp, elapsedFormatted, secondsFormatted, hours }) => {
    // Heart emoji based on HP
    const getHeartEmoji = (hpValue) => {
        if (hpValue > 80) return '❤️';
        if (hpValue > 50) return '🧡';
        if (hpValue > 30) return '💛';
        if (hpValue > 10) return '💔';
        return '🖤';
    };

    // HP color
    const getHpColor = (hpValue) => {
        if (hpValue > 50) return 'text-pink-500';
        if (hpValue > 20) return 'text-orange-500';
        return 'text-gray-500';
    };

    return (
        <div className="w-full">
            {/* Elapsed Time Display */}
            <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                    <p className={`font-black text-gray-900 tracking-tight font-mono text-display ${hours >= 100 ? 'text-4xl' : 'text-5xl'}`}>
                        {elapsedFormatted}
                    </p>
                    <p className="text-xl font-bold text-gray-400 font-mono">
                        :{secondsFormatted}
                    </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">風呂キャンした時間</p>
            </div>

            {/* HP Bar */}
            <div id="hp-bar" className="w-full max-w-xs mx-auto">
                {/* Label and Percentage */}
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="pink">清潔度</Badge>
                    <span className={`text-3xl font-black text-display ${getHpColor(hp)}`}>
                        {Math.floor(hp)}%
                    </span>
                </div>

                {/* Progress Bar with Liquid Effect */}
                <div className="relative h-5 w-full meter-track">
                    <div
                        style={{ width: `${hp}%` }}
                        className="h-full meter-fill"
                    />
                    {/* Heart indicator at the end of the bar */}
                    <div
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-xl drop-shadow-sm transition-all duration-500"
                        style={{ left: `${hp}%` }}
                    >
                        {getHeartEmoji(hp)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainStats;
