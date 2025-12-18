import React, { useState, useEffect, useCallback } from 'react';

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

    // ターゲット要素の位置を更新
    const updateTargetRect = useCallback(() => {
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
    }, [step.target]);

    // チュートリアル中はユーザーのスクロールを無効化
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // ステップ変更時にターゲットにスクロール＆位置取得
    useEffect(() => {
        setShowContent(false);

        const timer = setTimeout(() => {
            if (step.target) {
                const el = document.getElementById(step.target);
                if (el) {
                    // ターゲット要素を画面中央付近にスクロール
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // スクロール完了後に位置を取得（少し遅延）
                    setTimeout(() => {
                        updateTargetRect();
                        setShowContent(true);
                        setCharacterKey(prev => prev + 1);
                    }, 300);
                } else {
                    setTargetRect(null);
                    setShowContent(true);
                    setCharacterKey(prev => prev + 1);
                }
            } else {
                setTargetRect(null);
                setShowContent(true);
                setCharacterKey(prev => prev + 1);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [currentStep, step.target, updateTargetRect]);

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

    // カード位置のスタイルを計算
    const getCardPositionClass = () => {
        if (!targetRect) {
            return 'top-[35%] -translate-y-1/2';
        }
        if (isTargetInUpperHalf) {
            // ターゲットが上部にある場合、カードは下部に
            return 'bottom-[10%]';
        } else {
            // ターゲットが下部にある場合、カードは上部に
            return 'top-[15%]';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* オーバーレイ背景 - 4つの長方形で穴を開ける */}
            {targetRect ? (
                <>
                    {/* 上の暗い部分 */}
                    <div
                        className="fixed left-0 right-0 top-0 bg-black/60 pointer-events-auto"
                        style={{ height: Math.max(0, targetRect.top - 8) }}
                    />
                    {/* 左の暗い部分 */}
                    <div
                        className="fixed bg-black/60 pointer-events-auto"
                        style={{
                            top: targetRect.top - 8,
                            left: 0,
                            width: Math.max(0, targetRect.left - 8),
                            height: targetRect.height + 16,
                        }}
                    />
                    {/* 右の暗い部分 */}
                    <div
                        className="fixed bg-black/60 pointer-events-auto"
                        style={{
                            top: targetRect.top - 8,
                            left: targetRect.left + targetRect.width + 8,
                            right: 0,
                            height: targetRect.height + 16,
                        }}
                    />
                    {/* 下の暗い部分 */}
                    <div
                        className="fixed left-0 right-0 bottom-0 bg-black/60 pointer-events-auto"
                        style={{ top: targetRect.top + targetRect.height + 8 }}
                    />

                    {/* ハイライト枠 */}
                    <div
                        className="fixed rounded-xl"
                        style={{
                            top: targetRect.top - 8,
                            left: targetRect.left - 8,
                            width: targetRect.width + 16,
                            height: targetRect.height + 16,
                            border: '3px solid #ec4899',
                            boxShadow: '0 0 15px rgba(236, 72, 153, 0.7)',
                        }}
                    />
                </>
            ) : (
                <div className="fixed inset-0 bg-black/60 pointer-events-auto" />
            )}

            {/* 説明カード */}
            {showContent && (
                <div
                    className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-sm animate-fade-in pointer-events-auto ${getCardPositionClass()}`}
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
