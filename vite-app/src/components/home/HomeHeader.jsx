import React from 'react';
import { Icons } from '../Icons';

/**
 * HomeHeader - Weather, daily stats, and quick access buttons
 */
const HomeHeader = ({
    weatherData,
    weatherRate,
    saboriCount,
    isFetchingWeather,
    onWeatherClick,
    onStatsClick,
    onDiagnosisClick,
    playSe,
}) => {
    return (
        <div className="flex-none pt-safe px-6 pb-4 flex flex-col items-center relative z-10 w-full mt-4">
            {/* Top Row: Stats & Diagnosis buttons */}
            <div className="w-full flex justify-between items-center mb-6 px-4">
                <button
                    id="stats-button"
                    onClick={() => {
                        playSe?.('pop');
                        onStatsClick?.();
                    }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className="p-2.5 rounded-xl bg-white/70 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all shadow-sm group-active:scale-95">
                        <Icons.BarChart2 size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors">
                        記録・分析
                    </span>
                </button>

                <button
                    onClick={() => {
                        playSe?.('pop');
                        onDiagnosisClick?.();
                    }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-all shadow-sm group-active:scale-95">
                        <Icons.Sparkles size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-purple-500 group-hover:text-purple-600 transition-colors">
                        タイプ診断
                    </span>
                </button>
            </div>

            {/* Weather Display */}
            {!weatherData ? (
                <button
                    onClick={onWeatherClick}
                    disabled={isFetchingWeather}
                    className="text-xs font-bold text-blue-500 bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2 mb-3 hover:bg-blue-100 transition-colors active:scale-95"
                >
                    {isFetchingWeather ? (
                        <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <Icons.Cloud size={14} />
                            <span>天気を取得</span>
                        </>
                    )}
                </button>
            ) : (
                <div className="flex items-center gap-3 mb-3 animate-fade-in glass-card px-4 py-2 rounded-full">
                    <span className="text-2xl">
                        {weatherData.temperature >= 25 ? '🥵' : weatherData.temperature <= 10 ? '🥶' : '🌤️'}
                    </span>
                    <span className="text-lg font-black font-pop text-gray-700">
                        {weatherData.temperature}°C
                    </span>
                    <span className={`
                        text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${weatherRate > 1.0 ? 'bg-red-100 text-red-500' : weatherRate < 1.0 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'}
                    `}>
                        ×{weatherRate}
                    </span>
                </div>
            )}

            {/* Yesterday's Skip Count */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <span>👥</span>
                <span className="font-medium">
                    昨日の風呂キャン推定人数: <span className="font-bold text-gray-600">{saboriCount.toLocaleString()}人</span>
                </span>
            </div>
        </div>
    );
};

export default HomeHeader;
