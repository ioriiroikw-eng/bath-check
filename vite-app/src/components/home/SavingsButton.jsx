import React from 'react';
import { getRankInfo } from '../../utils';

/**
 * SavingsButton - Home screen button for Off-time Savings
 */
const SavingsButton = ({ savedMinutes, onClick }) => {
    // 安全にランク情報を取得
    const rankInfo = getRankInfo(savedMinutes || 0);

    return (
        <button
            id="savings-button"
            onClick={onClick}
            className={`w-full max-w-sm bg-white border-2 ${rankInfo.border} rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all active:scale-95 group mx-auto`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 ${rankInfo.bg} rounded-xl group-hover:opacity-80 transition-opacity`}>
                    <img src={rankInfo.icon} alt="Rank" className="w-8 h-8 object-contain drop-shadow-sm" />
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-bold text-gray-400">オフタイム貯金</span>
                    <span className={`text-lg font-black font-pop ${rankInfo.color}`}>{rankInfo.label}</span>
                </div>
            </div>
            <div className="flex items-end gap-1">
                <span className={`text-3xl font-black font-pop ${rankInfo.color} drop-shadow-sm`}>{savedMinutes}</span>
                <span className={`text-sm font-bold mb-1 ${rankInfo.color}`}>分</span>
            </div>
        </button>
    );
};

export default SavingsButton;
