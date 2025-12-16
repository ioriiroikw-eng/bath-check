import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [fillLevel, setFillLevel] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // Start filling
        setTimeout(() => setFillLevel(100), 300);

        // Finish animation
        const finishTimer = setTimeout(() => {
            setIsFinished(true);
        }, 2000);

        // Unmount
        const unmountTimer = setTimeout(() => {
            onFinish();
        }, 2800);

        return () => {
            clearTimeout(finishTimer);
            clearTimeout(unmountTimer);
        };
    }, [onFinish]);

    return (
        <div className={`fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* Icon Container */}
            <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-slate-100">

                {/* 1. Empty State Background */}
                <div className="absolute inset-0 bg-slate-50"></div>

                {/* 2. Liquid Layer (Fills up) */}
                <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-indigo-800 via-fuchsia-700 to-orange-500 transition-all ease-in-out"
                    style={{
                        height: `${fillLevel}%`,
                        transitionDuration: '2000ms'
                    }}
                >
                    {/* Wave Surface */}
                    <div className="absolute w-[200%] h-6 bg-white/40 -top-3 left-[-50%] animate-wave"></div>
                    <div className="absolute w-[200%] h-6 bg-white/20 -top-1 left-[-50%] animate-wave-reverse"></div>
                </div>

                {/* 3. Logo Mark (Floating in center) */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <img
                        src="/splash_logo.png"
                        alt="Logo"
                        className={`w-24 h-24 object-contain transition-transform duration-500 ${fillLevel > 50 ? 'scale-110' : 'scale-100'}`}
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                    />
                </div>

                {/* 4. Final Flash (Optional: Fade to real icon if needed, or just flash) */}
                <div className={`absolute inset-0 bg-white/30 transition-opacity duration-500 pointer-events-none ${isFinished ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <div className="absolute bottom-16 text-rose-400 font-bold tracking-widest text-sm animate-pulse font-pop">
                お湯はり中...
            </div>

            <style>{`
        @keyframes wave {
            0% { transform: translateX(0) scaleY(1); }
            50% { transform: translateX(-25%) scaleY(0.8); }
            100% { transform: translateX(-50%) scaleY(1); }
        }
        @keyframes wave-reverse {
            0% { transform: translateX(-50%) scaleY(1); }
            50% { transform: translateX(-25%) scaleY(1.2); }
            100% { transform: translateX(0) scaleY(1); }
        }
        .animate-wave { animation: wave 3s linear infinite; }
        .animate-wave-reverse { animation: wave-reverse 4s linear infinite; }
      `}</style>
        </div>
    );
};

export default SplashScreen;
