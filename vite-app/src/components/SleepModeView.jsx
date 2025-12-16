import React from 'react';
import { Icons } from './Icons';

const SleepModeView = ({ onWakeUp, savedMinutes, status, sleepType }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-white sleep-overlay">
            <div className="text-center mb-10">
                <div className="w-40 h-40 mx-auto mb-6 relative purupuru select-none flex items-center justify-center">
                    <img src={status.avatar} alt="睡眠中..." className="relative z-10 w-32 h-32 object-contain drop-shadow-md" />
                </div>
                <h2 className="text-3xl font-black font-pop mb-2 text-indigo-300">
                    {sleepType === 'skip' ? '戦略的睡眠中...' : 'おやすみ中...'}
                </h2>
                <p className="text-sm font-bold text-indigo-100">
                    {sleepType === 'skip' ? 'アプリをロックしてデトックス中' : '良い夢を...💤'}
                </p>
            </div>

            {sleepType === 'skip' && (
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-10 text-center w-full max-w-xs">
                    <div className="text-xs font-bold text-indigo-200 mb-2">💎 今回のズボラ成果</div>
                    <div className="text-4xl font-black font-pop text-yellow-300 drop-shadow-md">+30<span className="text-sm ml-1">分</span></div>
                    <p className="text-xs text-indigo-200 mt-2">合計貯金: {savedMinutes}分</p>
                </div>
            )}

            <button
                onClick={onWakeUp}
                className="w-full max-w-xs bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-white font-black py-4 rounded-full shadow-lg border-4 border-white active:scale-95 transition-all flex items-center justify-center gap-2 text-lg font-pop"
            >
                <Icons.Sun size={24} /> <span>おはよう！起きた☀️</span>
            </button>
            <p className="text-[10px] text-gray-400 mt-4 opacity-50">起きたら汚れを計算します...</p>
        </div>
    );
};

export default SleepModeView;
