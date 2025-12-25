import React from 'react';
import { Icons } from './Icons';

const HamburgerMenu = ({
    isOpen,
    onClose,
    onOpenBlog,
    onOpenCommunity,
    onOpenSkinType,
    onOpenHelp
}) => {
    if (!isOpen) return null;

    const menuItems = [
        {
            icon: '📚',
            label: 'コラム・豆知識',
            description: 'お風呂の科学を学ぼう',
            onClick: onOpenBlog,
        },
        {
            icon: '💬',
            label: '掲示板',
            description: 'みんなと交流しよう',
            onClick: onOpenCommunity,
        },
        {
            icon: '🧴',
            label: '肌タイプ設定',
            description: 'HPの減少速度が変わります',
            onClick: onOpenSkinType,
        },
        {
            icon: '❓',
            label: 'ヘルプ',
            description: 'アプリの使い方',
            onClick: onOpenHelp,
        },
    ];

    return (
        <>
            {/* オーバーレイ */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                onClick={onClose}
            />

            {/* メニューパネル */}
            <div className="fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl animate-slide-in-right">
                {/* ヘッダー */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-800">メニュー</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <Icons.X size={24} />
                    </button>
                </div>

                {/* メニュー項目 */}
                <div className="p-3 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-pink-50 active:scale-98 transition-all text-left group"
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 group-hover:text-pink-600">
                                    {item.label}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                            <Icons.ChevronRight size={18} className="text-gray-300 group-hover:text-pink-400" />
                        </button>
                    ))}
                </div>

                {/* フッター */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-center text-xs text-gray-400">
                        フロハイッタ？ v1.0
                    </p>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
