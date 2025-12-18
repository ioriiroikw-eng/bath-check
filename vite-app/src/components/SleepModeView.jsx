import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';

// 励ましの言葉
const ENCOURAGEMENTS = [
    "今日も1日頑張ってえらい！",
    "自分を大切にできてすごい✨",
    "ゆっくり休んでね、おやすみ💤",
    "明日もきっといい日になるよ",
    "今日の疲れ、お風呂で癒せたね",
    "よく頑張った！ぐっすり眠れますように",
    "お疲れさま、明日も応援してるよ",
    "ちゃんと休むのも大事なこと🌙",
];

const SleepModeView = ({ onWakeUp, savedMinutes, status, sleepType }) => {
    const [encouragement, setEncouragement] = useState("");

    useEffect(() => {
        // ランダムに励ましの言葉を選ぶ
        const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
        setEncouragement(msg);
    }, []);

    return (
        <div className="min-h-screen w-full bg-indigo-950 flex flex-col items-center justify-center relative overflow-hidden text-white px-6">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>

            {/* Stars */}
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute bg-white rounded-full animate-twinkle" style={{
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 5 + 's'
                }}></div>
            ))}

            <div className="z-10 text-center w-full max-w-sm">
                {/* キャラクター */}
                <div className="mb-8">
                    <img src={status.avatar} alt="Sleeping" className="w-32 h-32 mx-auto object-contain drop-shadow-lg mb-4" />
                </div>

                {/* 励ましの言葉 */}
                <div className="bg-indigo-900/50 backdrop-blur-md border border-indigo-700/50 rounded-2xl p-6 mb-6">
                    <p className="text-xl font-bold text-white leading-relaxed">
                        {encouragement}
                    </p>
                </div>

                {/* ズボラ貯金表示 */}
                {sleepType === 'skip' && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-3 mb-6 flex items-center justify-center gap-2">
                        <Icons.Gem size={16} className="text-yellow-400" />
                        <span className="text-yellow-200 font-bold text-sm">貯金 +30分 獲得済み</span>
                    </div>
                )}

                {/* おはようボタン */}
                <button
                    onClick={onWakeUp}
                    className="w-full bg-white text-indigo-900 font-black py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95 transition-all text-xl flex items-center justify-center gap-2"
                >
                    <Icons.Sun size={24} />
                    <span>おはよう！</span>
                </button>
            </div>
        </div>
    );
};

export default SleepModeView;
