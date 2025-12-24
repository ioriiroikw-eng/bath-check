import React from 'react';

/**
 * StatusDisplay - Avatar with glow effect and speech bubble
 */
const StatusDisplay = ({
    status,
    hp,
    showBubble,
    bubbleText,
    onAvatarClick,
}) => {
    return (
        <div className="relative w-44 h-44 flex items-center justify-center mb-2 z-30">
            {/* Tap Area */}
            <div
                onClick={onAvatarClick}
                className="absolute inset-0 z-50 cursor-pointer rounded-full active:scale-95 transition-transform"
            />

            {/* Glow Effect */}
            <div className={`absolute inset-2 rounded-full opacity-50 blur-2xl ${status.glow}`} />

            {/* Avatar with enhanced animation */}
            <div className="avatar-glow">
                <img
                    src={status.avatar}
                    alt={status.label}
                    className="relative z-10 w-40 h-40 object-contain drop-shadow-lg pointer-events-none animate-float-breathe"
                />
            </div>

            {/* Speech Bubble */}
            {showBubble && (
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-max max-w-[220px] z-40 animate-bubble-pop pointer-events-none">
                    <div className="glass-card-strong px-4 py-3 rounded-2xl text-center relative">
                        <p className="text-sm font-bold text-gray-800 leading-tight">{bubbleText}</p>
                        {/* Bubble tail */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200/50 rotate-45 rounded-sm" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusDisplay;
