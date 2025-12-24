import React from 'react';
import { Icons } from '../Icons';
import { IconButton } from '../ui';
import { calculateLevel } from '../../utils';

/**
 * FooterTools - Bottom toolbar with savings, community, share, etc.
 */
const FooterTools = ({
    savedMinutes,
    isBgmPlaying,
    isGenerating,
    onSavingsClick,
    onCommunityClick,
    onShareClick,
    onBgmToggle,
    onHelpClick,
    playSe,
}) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full px-6 pt-4 pb-6">
            {/* Zubora Savings Button */}
            <button
                id="savings-button"
                onClick={() => {
                    playSe?.('pop');
                    onSavingsClick?.();
                }}
                className="flex items-center gap-3 px-5 py-3 rounded-full glass-card hover:shadow-lg transition-all active:scale-[0.97]"
            >
                <span className="text-xl">💎</span>
                <span className="text-sm font-bold text-indigo-600">ズボラ貯金 Lv.{calculateLevel(savedMinutes)}</span>
                <span className="text-lg font-black font-pop text-indigo-500">{savedMinutes}分</span>
            </button>

            {/* Tools Row */}
            <div className="flex gap-5 w-full justify-center">
                {/* Community */}
                <IconButton
                    onClick={() => {
                        playSe?.('pop');
                        onCommunityClick?.();
                    }}
                    label="掲示板"
                >
                    <Icons.MessageCircle size={20} />
                </IconButton>

                {/* Share */}
                <IconButton
                    onClick={() => onShareClick?.()}
                    disabled={isGenerating}
                    label="シェア"
                >
                    {isGenerating ? (
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Icons.Camera size={20} />
                    )}
                </IconButton>

                {/* BGM */}
                <IconButton
                    onClick={onBgmToggle}
                    active={isBgmPlaying}
                    label="BGM"
                >
                    <Icons.Music size={20} className={isBgmPlaying ? 'animate-pulse' : ''} />
                </IconButton>

                {/* Help */}
                <IconButton
                    onClick={() => {
                        playSe?.('pop');
                        onHelpClick?.();
                    }}
                    label="ヘルプ"
                >
                    <Icons.HelpCircle size={20} />
                </IconButton>
            </div>
        </div>
    );
};

export default FooterTools;
