import React from 'react';
import { Icons } from '../Icons';
import { IconButton } from '../ui';
import { getRankInfo } from '../../utils';

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
    onMenuClick,
    playSe,
}) => {
    // 安全にランク情報を取得
    const rankInfo = getRankInfo(savedMinutes || 0);

    return (
        <div className="flex w-full justify-around items-center px-4 py-2">
            {/* Rank/Savings (Icon only) */}
            <div className="flex flex-col items-center gap-1 active:scale-90 transition-transform cursor-pointer"
                onClick={() => {
                    playSe?.('pop');
                    onSavingsClick?.();
                }}
            >
                <div className={`p-1.5 rounded-full border ${rankInfo.border} bg-white shadow-sm`}>
                    <img src={rankInfo.icon} alt="Rank" className="w-6 h-6 object-contain" />
                </div>
                <span className="text-[10px] font-bold text-gray-500">貯金</span>
            </div>

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

            {/* Menu (Hamburger) */}
            <IconButton
                onClick={() => {
                    playSe?.('pop');
                    onMenuClick?.();
                }}
                label="メニュー"
            >
                <Icons.Menu size={20} />
            </IconButton>
        </div>
    );
};

export default FooterTools;
