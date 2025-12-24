import React from 'react';
import { Icons } from '../Icons';

/**
 * ActionArea - Main action buttons (Bath / Sleep)
 */
const ActionArea = ({ hp, onBathClick, onSleepClick, playSe }) => {
    // When HP > 40%, show Sleep as primary; otherwise Bath is primary
    const sleepFirst = hp > 40;

    const PrimaryBathButton = () => (
        <button
            id="bath-button"
            onClick={() => {
                playSe?.('pop');
                onBathClick?.();
            }}
            className="w-full max-w-xs active:scale-[0.97] transition-all duration-200"
        >
            <div className="btn-primary flex items-center justify-center gap-3 py-5">
                <Icons.Bath size={28} />
                <span className="text-xl tracking-wide">お風呂に入る</span>
            </div>
        </button>
    );

    const SecondaryBathButton = () => (
        <button
            id="bath-button"
            onClick={() => {
                playSe?.('pop');
                onBathClick?.();
            }}
            className="btn-secondary flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
        >
            <Icons.Bath size={16} />
            <span className="text-sm">お風呂に入る</span>
        </button>
    );

    const PrimarySleepButton = () => (
        <button
            id="sleep-button"
            onClick={onSleepClick}
            className="w-full max-w-xs active:scale-[0.97] transition-all duration-200"
        >
            <div className="btn-indigo flex items-center justify-center gap-3 py-5">
                <Icons.Zzz size={24} />
                <span className="text-xl tracking-wide">今日はもう寝る...</span>
            </div>
        </button>
    );

    const SecondarySleepButton = () => (
        <button
            id="sleep-button"
            onClick={onSleepClick}
            className="flex items-center justify-center gap-2 font-bold py-3 px-6 active:scale-[0.97] transition-all rounded-full text-indigo-500 bg-indigo-50 hover:bg-indigo-100"
        >
            <Icons.Zzz size={16} />
            <span className="text-sm">今日はもう寝る...</span>
        </button>
    );

    return (
        <div className="flex flex-col items-center gap-4 w-full px-6">
            {sleepFirst ? (
                <>
                    <PrimarySleepButton />
                    <SecondaryBathButton />
                </>
            ) : (
                <>
                    <PrimaryBathButton />
                    <SecondarySleepButton />
                </>
            )}
        </div>
    );
};

export default ActionArea;
