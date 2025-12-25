import React, { useState, useEffect, useCallback } from 'react';

// インタラクティブな成功体験を重視したオンボーディング
const TUTORIAL_STEPS = [
    {
        id: 'intro',
        type: 'intro',
        title: 'お風呂、めんどくさい？',
        description: 'わかる。その気持ち、全人類の本音だよ。\nここなら「サボっても」大丈夫！',
        character: './char_80.png',
        characterMessage: 'やっほー！一緒にサボろ〜',
    },
    {
        id: 'bath-action',
        type: 'action',
        title: 'まず試してみて！',
        description: 'お風呂ボタンを押すと\nHP（清潔度）が全回復するよ✨',
        target: 'bath-button',
        character: './char_50.png',
        characterMessage: 'ボタン押してみて！',
        actionLabel: 'HPが回復！',
        successMessage: '🎉 やったね！これがこのアプリの基本！',
    },
    {
        id: 'sleep-action',
        type: 'action',
        title: 'サボっても大丈夫！',
        description: '疲れた日は「寝る」を押すと\nズボラ貯金が30分貯まる💰',
        target: 'sleep-button',
        character: './char_20.png',
        characterMessage: '今日は寝ちゃお〜',
        actionLabel: 'ズボラ貯金+30分！',
        successMessage: '💰 サボった時間が貯金に！これ最高でしょ？',
    },
    {
        id: 'forecast',
        type: 'intro',
        title: '今日の予報機能 📅',
        description: '過去のパターンと天気から\n「今日お風呂入りそう度」を予測！',
        target: 'forecast-badge',
        character: './char_80.png',
        characterMessage: '毎日チェックしてね〜',
    },
    {
        id: 'complete',
        type: 'complete',
        title: '準備完了！',
        description: '毎日入らなくていい。\nHPが減ったら入る、新しいスタイル！',
        character: './char_80.png',
        characterMessage: '一緒にがんばろ〜！',
    },
];

const TutorialOverlay = ({ onComplete, onSkip, onTutorialBath, onTutorialSleep }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [showContent, setShowContent] = useState(false);
    const [characterKey, setCharacterKey] = useState(0);
    const [actionCompleted, setActionCompleted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const step = TUTORIAL_STEPS[currentStep];
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

    // チュートリアル中はスクロール無効
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // ステップ変更時の処理
    useEffect(() => {
        setShowContent(false);
        setActionCompleted(false);
        setShowSuccess(false);

        const timer = setTimeout(() => {
            if (step.target) {
                const el = document.getElementById(step.target);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    // アクションボタンのクリックハンドラ
    const handleActionClick = useCallback(() => {
        if (step.type !== 'action' || actionCompleted) return;

        // 実際のアクションを実行
        if (step.id === 'bath-action' && onTutorialBath) {
            onTutorialBath();
        } else if (step.id === 'sleep-action' && onTutorialSleep) {
            onTutorialSleep();
        }

        // 成功エフェクトを表示
        setActionCompleted(true);
        setShowSuccess(true);

        // 少し待ってから次へ進める状態に
        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    }, [step, actionCompleted, onTutorialBath, onTutorialSleep]);

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    // カード位置 - ボタンが下にある場合はカードを上に配置
    const getCardPositionClass = () => {
        if (!targetRect) return 'top-[30%]';
        // ターゲットが画面の下半分にある場合はカードを上に表示
        return 'top-[8%]';
    };

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* オーバーレイ背景 */}
            {targetRect ? (
                <>
                    <div className="fixed left-0 right-0 top-0 bg-black/70 pointer-events-auto" style={{ height: Math.max(0, targetRect.top - 12) }} />
                    <div className="fixed bg-black/70 pointer-events-auto" style={{ top: targetRect.top - 12, left: 0, width: Math.max(0, targetRect.left - 12), height: targetRect.height + 24 }} />
                    <div className="fixed bg-black/70 pointer-events-auto" style={{ top: targetRect.top - 12, left: targetRect.left + targetRect.width + 12, right: 0, height: targetRect.height + 24 }} />
                    <div className="fixed left-0 right-0 bottom-0 bg-black/70 pointer-events-auto" style={{ top: targetRect.top + targetRect.height + 12 }} />

                    {/* ハイライト枠 - クリック可能 */}
                    <div
                        onClick={handleActionClick}
                        className={`fixed rounded-2xl cursor-pointer transition-all ${actionCompleted ? 'pointer-events-none' : 'pointer-events-auto animate-pulse'
                            }`}
                        style={{
                            top: targetRect.top - 12,
                            left: targetRect.left - 12,
                            width: targetRect.width + 24,
                            height: targetRect.height + 24,
                            border: actionCompleted ? '4px solid #22c55e' : '4px solid #ec4899',
                            boxShadow: actionCompleted
                                ? '0 0 30px rgba(34, 197, 94, 0.8)'
                                : '0 0 30px rgba(236, 72, 153, 0.8)',
                        }}
                    />
                </>
            ) : (
                <div className="fixed inset-0 bg-black/70 pointer-events-auto" />
            )}

            {/* 成功メッセージ */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce-in text-center">
                        <p className="text-lg font-black">{step.successMessage}</p>
                    </div>
                </div>
            )}

            {/* 説明カード */}
            {showContent && (
                <div className={`fixed left-4 right-4 mx-auto max-w-sm pointer-events-auto ${getCardPositionClass()}`}>
                    <div className="bg-white rounded-3xl p-5 shadow-2xl relative">
                        {/* キャラクター */}
                        <div className="absolute -top-14 left-4 flex items-end gap-2">
                            <img
                                key={characterKey}
                                src={step.character}
                                alt=""
                                className="w-16 h-16 object-contain animate-bounce-in drop-shadow-lg"
                            />
                            {/* 吹き出し */}
                            <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 animate-bounce">
                                {step.characterMessage}
                            </div>
                        </div>

                        {/* ステップインジケーター */}
                        <div className="flex justify-center gap-2 mb-3 pt-2">
                            {TUTORIAL_STEPS.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentStep
                                        ? 'bg-pink-500 w-6'
                                        : idx < currentStep
                                            ? 'bg-green-400'
                                            : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* タイトル */}
                        <h3 className="text-lg font-black text-gray-800 mb-2 text-center">
                            {step.title}
                        </h3>

                        {/* 説明 */}
                        <p className="text-sm text-gray-600 text-center leading-relaxed mb-4 whitespace-pre-line">
                            {step.description}
                        </p>

                        {/* アクションタイプの場合 */}
                        {step.type === 'action' && (
                            <div className="mb-4">
                                {!actionCompleted ? (
                                    <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-3 text-center">
                                        <p className="text-sm font-bold text-pink-600">
                                            👆 ボタンを押してね！
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center">
                                        <p className="text-sm font-bold text-green-600">
                                            ✅ {step.actionLabel}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ボタン */}
                        {step.type === 'action' ? (
                            <button
                                onClick={handleNext}
                                disabled={!actionCompleted}
                                className={`w-full py-3 px-4 text-white font-bold rounded-xl shadow-md transition-all ${actionCompleted
                                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 active:scale-95'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                {isLastStep ? '始める！ ✨' : '次へ →'}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-xl shadow-md active:scale-95"
                            >
                                {isLastStep ? '始める！ ✨' : '次へ →'}
                            </button>
                        )}

                        {/* スキップ */}
                        {!isLastStep && (
                            <button
                                onClick={onSkip}
                                className="w-full mt-2 py-1 text-xs text-gray-400 font-bold"
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
        <div className="fixed inset-0 z-[100] bg-gradient-to-b from-pink-50 via-white to-indigo-50 flex items-center justify-center p-6">
            <div className="w-full max-w-sm text-center animate-fade-in">
                {/* キャラクター */}
                <div className="relative mb-6">
                    <img
                        src="./char_80.png"
                        alt="キャラクター"
                        className="w-36 h-36 mx-auto object-contain animate-float-breathe drop-shadow-xl"
                    />
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-bounce shadow-lg">
                        やっほー！
                    </div>
                </div>

                {/* タイトル */}
                <h2 className="text-2xl font-black text-gray-800 mb-3">
                    お風呂、めんどくさい？
                </h2>

                {/* 説明 */}
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                    わかる、その気持ち。<br />
                    <span className="font-bold text-pink-500">一緒にサボろ？</span>
                </p>

                {/* ボタン */}
                <button
                    onClick={onStart}
                    className="w-full py-4 px-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg shadow-pink-300/50 active:scale-95 transition-transform mb-4"
                >
                    使い方を見る 👀
                </button>

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
