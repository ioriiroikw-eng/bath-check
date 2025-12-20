import React from 'react';
import { Icons } from '../Icons';

const COMMUNITY_URL = 'https://x.com/i/communities/2002271224563736624';

const SkipShareModal = ({ isOpen, onClose, sleepHours }) => {
    if (!isOpen) return null;

    // シェアメッセージを生成
    const generateShareMessage = () => {
        const hoursText = sleepHours >= 1
            ? `${Math.floor(sleepHours)}時間`
            : `${Math.floor(sleepHours * 60)}分`;

        const messages = [
            `昨晩、風呂キャンセルしました🛁💤\n睡眠${hoursText}を優先！`,
            `風呂キャンセル発動💤\n${hoursText}の睡眠を選びました`,
            `本日の風呂、キャンセルさせていただきました\n代わりに${hoursText}寝ました🛌`,
        ];

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        return `${randomMsg}\n\n#フロハイッタ #風呂キャンセル界隈`;
    };

    const handleShare = () => {
        const text = generateShareMessage();
        const url = "https://app.bath-check.com/";
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleJoinCommunity = () => {
        window.open(COMMUNITY_URL, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative overflow-hidden text-center"
                onClick={e => e.stopPropagation()}
            >
                {/* 背景装飾 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/4 left-1/4 text-indigo-300/30 text-xl">💤</div>
                    <div className="absolute bottom-1/3 right-1/4 text-purple-300/30 text-lg">🛁</div>
                </div>

                {/* 閉じるボタン */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 z-10 hover:text-gray-600 transition-colors">
                    <Icons.X size={20} />
                </button>

                <div className="relative z-10">
                    {/* アイコン */}
                    <div className="text-6xl mb-3">😴</div>

                    {/* タイトル */}
                    <h2 className="text-xl font-black font-pop text-indigo-600 mb-1">おはよう！</h2>
                    <p className="text-sm font-bold text-gray-500 mb-4">昨晩は風呂キャンセルしたね🛁</p>

                    {/* メッセージカード */}
                    <div className="bg-white/80 rounded-2xl p-4 mb-4 shadow-sm border border-indigo-100">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            睡眠を優先した自分を<br />
                            <span className="font-bold text-indigo-600">褒めてあげよう！</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            風呂キャンセル界隈の仲間と共有しませんか？
                        </p>
                    </div>

                    {/* シェアボタン */}
                    <button
                        onClick={handleShare}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg hover:shadow-xl mb-2"
                    >
                        <Icons.XLogo size={18} />
                        <span>風呂キャンセルをシェア</span>
                    </button>

                    {/* コミュニティ参加ボタン */}
                    <button
                        onClick={handleJoinCommunity}
                        className="w-full bg-indigo-50 text-indigo-600 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all mb-2"
                    >
                        <span>📢</span>
                        <span>風呂キャンセル界隈を覗く</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-400 font-bold py-2 text-xs hover:text-gray-600 transition-colors"
                    >
                        今はいいや
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkipShareModal;
