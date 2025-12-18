import React, { useState, useEffect } from 'react';

// 各ステップでキャラクターの画像と表情を変化させる
const TUTORIAL_STEPS = [
    {
        id: 'intro',
        title: 'ようこそ！',
        description: '「毎日お風呂入らなきゃ...」\nそんなプレッシャーから解放！\nHPが減ったら入る、新しい入浴スタイル✨',
        target: null,
        cardPosition: 'center',
        character: './char_80.png',
    },
    {
        id: 'hp',
        title: 'HP（清潔度）',
        description: '時間が経つとHPが減るの。\n気温が高いと減りが速くなるよ🥵\nキャラをタップすると喋るよ！',
        target: 'hp-bar',
        cardPosition: 'bottom', // HPバーは上にあるのでカードは下
        character: './char_50.png',
    },
    {
        id: 'bath',
        title: 'お風呂に入る',
        description: 'ここをタップするとHP全回復！\nさらにお風呂占いで\n今日の運勢がわかるよ🔮',
        target: 'bath-button',
        cardPosition: 'top', // 風呂ボタンは中央なのでカードは上
        character: './char_80.png',
    },
    {
        id: 'sleep',
        title: '今日はもう寝る...',
        description: '入浴せずに寝てもOK！\n代わりに「ズボラ貯金」で\n30分貯まるよ💰',
        target: 'sleep-button',
        cardPosition: 'top', // 寝るボタンは中央下なのでカードは上
        character: './char_20.png',
    },
    {
        id: 'savings',
        title: 'ズボラ貯金',
        description: 'サボった時間が貯まって\nレベルアップ！\nサボることも立派な戦略💎',
        target: 'savings-button',
        cardPosition: 'top', // 貯金ボタンは下なのでカードは上
        character: './char_50.png',
    },
    {
        id: 'calendar',
        title: 'カレンダー',
        description: '入浴・スキップ履歴を\n確認できるよ📅\n続いたら自分を褒めよう！',
        target: 'calendar-button',
        cardPosition: 'center', // カレンダーは上にあるのでカードは中央
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
                    });
                } else {
                    setTargetRect(null);
                }
            } else {
                setTargetRect(null);
            }
            setShowContent(true);
            setCharacterKey(prev => prev + 1);
        }, 100);

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

    // カードの位置を計算
    const getCardStyle = () => {
        if (step.cardPosition === 'center' || !targetRect) {
            return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            };
        }

        if (step.cardPosition === 'top') {
            // 画面上部に配置
            return {
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
            };
        }

        // bottom: 画面下部に配置
        return {
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
        };
    };

    return (
        <div className="fixed inset-0 z-[100]">
            {/* オーバーレイ背景 - 4つの長方形で穴を開ける */}
            {targetRect ? (
                <>
                    {/* 上の暗い部分 */}
                    <div
                        className="absolute left-0 right-0 top-0 bg-black/50"
                        style={{ height: targetRect.top - 16 }}
                    />
                    {/* 左の暗い部分 */}
                    <div
                        className="absolute bg-black/50"
                        style={{
                            top: targetRect.top - 16,
                            left: 0,
                            width: targetRect.left - 16,
                            height: targetRect.height + 32,
                        }}
                    />
                    {/* 右の暗い部分 */}
                    <div
                        className="absolute bg-black/50"
                        style={{
                            top: targetRect.top - 16,
                            left: targetRect.left + targetRect.width + 16,
                            right: 0,
                            height: targetRect.height + 32,
                        }}
                    />
                    {/* 下の暗い部分 */}
                    <div
                        className="absolute left-0 right-0 bottom-0 bg-black/50"
                        style={{ top: targetRect.top + targetRect.height + 16 }}
                    />

                    {/* ハイライト枠 - 輝くボーダー */}
                    <div
                        className="absolute rounded-2xl pointer-events-none animate-pulse"
                        style={{
                            top: targetRect.top - 16,
                            left: targetRect.left - 16,
                            width: targetRect.width + 32,
                            height: targetRect.height + 32,
                            border: '4px solid #ec4899',
                            boxShadow: '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(236, 72, 153, 0.1)',
                        }}
                    />
                </>
            ) : (
                // 対象がない場合は全体を暗く
                <div className="absolute inset-0 bg-black/50" />
            )}

            {/* 説明カード */}
            {showContent && (
                <div
                    className="absolute w-[90%] max-w-sm animate-fade-in"
                    style={getCardStyle()}
                >
                    <div className="bg-white rounded-3xl p-5 shadow-2xl relative">
                        {/* キャラクター */}
                        <div className="absolute -top-14 left-4">
                            <img
                                key={characterKey}
                                src={step.character}
                                alt="キャラクター"
                                className="w-16 h-16 object-contain animate-bounce-in drop-shadow-lg"
                            />
                        </div>

                        {/* ステップインジケーター */}
                        <div className="flex justify-center gap-1.5 mb-3 pt-2">
                            {TUTORIAL_STEPS.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? 'bg-pink-500' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* タイトル */}
                        <h3 className="text-lg font-black text-gray-800 mb-2 font-pop text-center">
                            {step.title}
                        </h3>

                        {/* 説明 */}
                        <div className="bg-pink-50 rounded-2xl p-4 mb-4">
                            <p className="text-sm text-gray-700 text-center leading-relaxed whitespace-pre-line font-bold">
                                {step.description}
                            </p>
                        </div>

                        {/* ボタン */}
                        <div className="flex gap-3">
                            {!isFirstStep && (
                                <button
                                    onClick={handlePrev}
                                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-transform"
                                >
                                    ← 戻る
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-xl shadow-md shadow-pink-300/50 active:scale-95 transition-transform"
                            >
                                {isLastStep ? '始める！🎉' : '次へ →'}
                            </button>
                        </div>

                        {/* スキップ */}
                        {!isLastStep && (
                            <button
                                onClick={onSkip}
                                className="w-full mt-3 py-2 text-xs text-gray-400 font-bold"
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
                        className="w-36 h-36 mx-auto mb-4 object-contain animate-float-breathe drop-shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                        やっほー！
                    </div>
                </div>

                {/* タイトル */}
                <h2 className="text-2xl font-black text-gray-800 mb-2 font-pop">
                    はじめまして！
                </h2>

                {/* 説明 */}
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
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
