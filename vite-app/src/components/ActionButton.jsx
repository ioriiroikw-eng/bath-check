import React, { useState } from 'react';

const ActionButton = ({ icon, color, damage, label, onTrigger }) => {
    const [isCooldown, setIsCooldown] = useState(false);
    const handleClick = () => {
        if (isCooldown) return;
        onTrigger();
        setIsCooldown(true);
        setTimeout(() => { setIsCooldown(false); }, 3000);
    };
    return (
        <button onClick={handleClick} disabled={isCooldown} className={`relative ${isCooldown ? 'bg-gray-300 scale-95' : color} w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-3xl transition-all duration-300 border-4 border-white active:scale-90`}>
            {isCooldown ? <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div> : icon}
            <span className="absolute -bottom-6 text-[10px] font-bold text-gray-500 whitespace-nowrap bg-white/80 px-1 rounded">{label} {damage !== null ? `-${damage}` : ''}</span>
        </button>
    );
};

export default ActionButton;
