import React, { useState, useEffect } from 'react';

// 各ステップでキャラクターの画像と表情を変化させる
const TUTORIAL_STEPS = [
    {
        id: 'intro',
        title: 'ようこそ！',
        description: '「毎日お風呂入らなきゃ...」そんなプレッシャーから解放！HPが減ったら入る、新しい入浴スタイル✨',
        target: null,
        character: './char_80.png',
    },
    {
        id: 'hp',
        title: 'HP（清潔度）',
        description: '時間経過でHPが減少。気温が高いと速くなるよ🥵',
        target: 'hp-bar',
        character: './char_50.png',
    },
    {
        id: 'bath',
        title: 'お風呂に入る',
        description: 'タップでHP全回復！お風呂占いで運勢もわかる🔮',
        target: 'bath-button',
        character: './char_80.png',
    },
    {
        id: 'sleep',
        title: '今日はもう寝る...',
        description: '入浴スキップでもOK！ズボラ貯金で30分貯まる💰',
        target: 'sleep-button',
        character: './char_20.png',
    },
    {
        id: 'savings',
        title: 'ズボラ貯金',
        description: 'サボった時間が貯まってレベルアップ💎',
        target: 'savings-button',
        character: './char_50.png',
    },
    {
        id: 'calendar',
        title: 'カレンダー',
        description: '入浴・スキップ履歴を確認📅',
        target: 'calendar-button',
        character: './char_80.png',
    },
];

const TutorialOverlay = ({ onComplete, onSkip }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [showContent, setShowContent] = useState(false);
    const [characterKey, setCharacterKey] = useState(0);

    const step = TUTORIAL_STEPS[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

    // ターゲット要素の位置を取得
    useEffect(() => {
        setShowContent(false);

        const timer = setTimeout(() => {
            if (step.target) {
                const el = document.getElementById(step.target);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    setTargetRect({
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                        centerY: rect.top + rect.height / 2,
                    });
                } else {
                    setTargetRect(null);
                }
            } else {
                setTargetRect(null);
            }
            setShowContent(true);
            setCharacterKey(prev => prev + 1);
        }, 150);

        return () => clearTimeout(timer);
    }, [currentStep, step.target]);

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // 画面の中央よりターゲットが上にあればカードを下に、下にあれば上に配置
    const isTargetInUpperHalf = targetRect ? targetRect.centerY < window.innerHeight / 2 : false;

    return (
        <div className="fixed inset-0 z-[100]">
            {/* オーバーレイ背景 - 4つの長方形で穴を開ける */}
            {targetRect ? (
                <>
                    {/* 上の暗い部分 */}
                    <div
                        className="absolute left-0 right-0 top-0 bg-black/60"
                        style={{ height: Math.max(0, targetRect.top - 12) }}
                    />
                    {/* 左の暗い部分 */}
                    <div
                        className="absolute bg-black/60"
                        style={{
                            top: targetRect.top - 12,
                            left: 0,
                            width: Math.max(0, targetRect.left - 12),
                            height: targetRect.height + 24,
                        }}
                    />
                    {/* 右の暗い部分 */}
                    <div
                        className="absolute bg-black/60"
                        style={{
                            top: targetRect.top - 12,
                            left: targetRect.left + targetRect.width + 12,
                            right: 0,
                            height: targetRect.height + 24,
                        }}
                    />
                    {/* 下の暗い部分 */}
                    <div
                        className="absolute left-0 right-0 bottom-0 bg-black/60"
                        style={{ top: targetRect.top + targetRect.height + 12 }}
                    />

                    {/* ハイライト枠 */}
                    <div
                        className="absolute rounded-xl pointer-events-none"
                        style={{
                            top: targetRect.top - 12,
                            left: targetRect.left - 12,
                            width: targetRect.width + 24,
                            height: targetRect.height + 24,
                            border: '3px solid #ec4899',
                            boxShadow: '0 0 15px rgba(236, 72, 153, 0.7)',
                        }}
                    />
                </>
            ) : (
                <div className="absolute inset-0 bg-black/60" />
            )}

            {/* 説明カード - ターゲット位置に応じて上下に配置 */}
            {showContent && (
                <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[92%] max-w-sm animate-fade-in ${!targetRect
                        ? 'top-[35%] -translate-y-1/2'
                        : isTargetInUpperHalf
                            ? 'bottom-[15%]'
                            : 'top-[25%]'
                        }`}
                >
                    <div className="bg-white rounded-2xl p-4 shadow-2xl relative">
                        {/* キャラクター */}
                        <img
                            key={characterKey}
                            src={step.character}
                            alt=""
                            className="absolute -top-10 left-2 w-14 h-14 object-contain animate-bounce-in drop-shadow-lg"
                        />

                        {/* ステップインジケーター */}
                        <div className="flex justify-center gap-1 mb-2 pt-1">
                            {TUTORIAL_STEPS.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full ${idx === currentStep ? 'bg-pink-500' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* タイトル */}
                        <h3 className="text-base font-black text-gray-800 mb-1 font-pop text-center">
                            {step.title}
                        </h3>

                        {/* 説明 */}
                        <p className="text-xs text-gray-600 text-center leading-relaxed mb-3 font-bold">
                            {step.description}
                        </p>

                        {/* ボタン */}
                        <div className="flex gap-2">
                            {!isFirstStep && (
                                <button
                                    onClick={handlePrev}
                                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-600 text-sm font-bold rounded-lg active:scale-95"
                                >
                                    ← 戻る
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex-1 py-2 px-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm font-bold rounded-lg shadow-md active:scale-95"
                            >
                                {isLastStep ? '始める！🎉' : '次へ →'}
                            </button>
                        </div>

                        {/* スキップ */}
                        {!isLastStep && (
                            <button
                                onClick={onSkip}
                                className="w-full mt-2 py-1 text-[10px] text-gray-400 font-bold"
                            >
                                スキップ
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// チュートリアル開始前の選択画面
export const TutorialStartModal = ({ onStart, onSkip }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-gradient-to-b from-pink-100 to-white flex items-center justify-center p-6">
            <div className="w-full max-w-sm text-center animate-fade-in">
                {/* キャラクター */}
                <div className="relative">
                    <img
                        src="./char_80.png"
                        alt="キャラクター"
                        className="w-32 h-32 mx-auto mb-4 object-contain animate-float-breathe drop-shadow-lg"
                    />
                    <div className="absolute top-0 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                        やっほー！
                    </div>
                </div>

                {/* タイトル */}
                <h2 className="text-xl font-black text-gray-800 mb-2 font-pop">
                    はじめまして！
                </h2>

                {/* 説明 */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    「フロハイッタ？」は<br />
                    あなたの入浴タイミングを<br />
                    可視化するアプリです✨
                </p>

                {/* 使い方を見るボタン */}
                <button
                    onClick={onStart}
                    className="w-full py-4 px-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg shadow-pink-300/50 active:scale-95 transition-transform mb-4"
                >
                    使い方を見る 👀
                </button>

                {/* スキップ */}
                <button
                    onClick={onSkip}
                    className="py-2 text-sm text-gray-400 font-bold"
                >
                    スキップして始める
                </button>
            </div>
        </div>
    );
};

export default TutorialOverlay;
