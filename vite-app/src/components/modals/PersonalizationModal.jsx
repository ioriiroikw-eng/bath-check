import React, { useState } from 'react';

const STORAGE_KEY_PERSONALIZATION = 'bath_personalization';

// パーソナライズ質問
const PERSONALIZATION_QUESTIONS = [
    {
        id: 'frequency',
        question: 'お風呂の頻度は？',
        emoji: '🛁',
        character: './char_80.png',
        characterMessage: 'どのくらい入る派？',
        options: [
            { text: '毎日入りたい派！', value: 'daily', baseProb: 85 },
            { text: '2日に1回くらいかな', value: 'alternate', baseProb: 65 },
            { text: '気分次第〜', value: 'random', baseProb: 45 },
        ]
    },
    {
        id: 'weekend',
        question: '金曜の夜は？',
        emoji: '🌙',
        character: './char_50.png',
        characterMessage: '週末あるある教えて〜',
        options: [
            { text: 'いつも通り入る！', value: 'normal', weekendPenalty: 0 },
            { text: '解放感でサボりがち...', value: 'skip', weekendPenalty: -25 },
            { text: 'むしろゆっくり入る', value: 'relax', weekendPenalty: 10 },
        ]
    },
    {
        id: 'time',
        question: '朝シャワー派？夜風呂派？',
        emoji: '⏰',
        character: './char_80.png',
        characterMessage: 'ラスト！',
        options: [
            { text: '夜にゆっくり派', value: 'night', message: null },
            { text: '朝シャワー派', value: 'morning', message: '朝派は意識高い！' },
            { text: 'その時の気分', value: 'both', message: null },
        ]
    }
];

const PersonalizationModal = ({ isOpen, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    if (!isOpen) return null;

    const question = PERSONALIZATION_QUESTIONS[currentQuestion];

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [question.id]: option };
        setAnswers(newAnswers);

        if (currentQuestion < PERSONALIZATION_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // 完了 - 結果を保存
            const personalization = {
                baseProb: newAnswers.frequency?.baseProb || 70,
                weekendPenalty: newAnswers.weekend?.weekendPenalty || 0,
                timePreference: newAnswers.time?.value || 'night',
                completedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY_PERSONALIZATION, JSON.stringify(personalization));
            onComplete(personalization);
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-white to-purple-100 z-[100] flex flex-col items-center justify-center p-4">
            {/* キャラクター */}
            <div className="flex items-start gap-2 mb-4 w-full max-w-sm">
                <img
                    src={question.character}
                    alt="キャラクター"
                    className="w-16 h-16 object-contain animate-bounce-in"
                />
                <div className="bg-pink-400 text-white px-4 py-2 rounded-2xl rounded-tl-none font-bold text-sm shadow-lg animate-fade-in">
                    {question.characterMessage}
                </div>
            </div>

            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl animate-bounce-in border-4 border-pink-100">
                {/* プログレス - ドットスタイル */}
                <div className="flex justify-center gap-2 mb-6">
                    {PERSONALIZATION_QUESTIONS.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all ${i < currentQuestion
                                ? 'bg-green-400'
                                : i === currentQuestion
                                    ? 'bg-pink-400 w-8'
                                    : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                {/* 質問 */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-black text-gray-800 leading-relaxed">
                        {question.question}
                    </h2>
                </div>

                {/* 選択肢 */}
                <div className="space-y-3">
                    {question.options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(option)}
                            className="w-full bg-gray-50 hover:bg-pink-50 border-2 border-gray-100 hover:border-pink-200 rounded-2xl p-4 text-center font-bold text-gray-700 transition-all active:scale-95"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                    あなた専用の予報を作成します ✨
                </p>
            </div>
        </div>
    );
};

export default PersonalizationModal;
export { STORAGE_KEY_PERSONALIZATION };
