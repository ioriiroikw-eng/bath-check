import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '../Icons';
import { BATH_TYPE_16, BATH_TYPE_ACCURACY_LEVELS } from '../../constants';
import { getLocalDateStr } from '../../utils';

const STORAGE_KEY_QUIZ_RESULT = 'bath_type_quiz_result';

// 10問の診断質問（各軸2-3問ずつ）
const QUIZ_QUESTIONS = [
    // 頻度軸 (C/Z) - 3問
    {
        id: 1,
        question: '理想のお風呂頻度は？',
        axis: 'frequency',
        options: [
            { text: '毎日入りたい', score: 1 },
            { text: '2日に1回くらい', score: 0 },
            { text: '気が向いた時でいい', score: -1 },
        ]
    },
    {
        id: 2,
        question: '疲れて帰ってきた夜、お風呂は...',
        axis: 'frequency',
        options: [
            { text: '絶対入る', score: 1 },
            { text: '悩むけど入る', score: 0 },
            { text: 'もう寝る', score: -1 },
        ]
    },
    {
        id: 3,
        question: '「今日お風呂入った？」と聞かれたら...',
        axis: 'frequency',
        options: [
            { text: '当たり前じゃん', score: 1 },
            { text: '入ったよ（たぶん）', score: 0 },
            { text: '...聞かないで', score: -1 },
        ]
    },
    // 曜日軸 (H/K) - 2問
    {
        id: 4,
        question: '平日と休日、どっちがお風呂に入りやすい？',
        axis: 'dayOfWeek',
        options: [
            { text: '平日の方がルーティン化してる', score: 1 },
            { text: 'どっちも変わらない', score: 0 },
            { text: '休日の方がゆっくり入れる', score: -1 },
        ]
    },
    {
        id: 5,
        question: '金曜の夜、お風呂は...',
        axis: 'dayOfWeek',
        options: [
            { text: 'いつも通り入る', score: 1 },
            { text: '解放感で迷う', score: 0 },
            { text: '週末だし明日でいいや', score: -1 },
        ]
    },
    // 安定度軸 (R/K) - 3問
    {
        id: 6,
        question: 'お風呂に入る時間は決まってる？',
        axis: 'stability',
        options: [
            { text: 'だいたい同じ時間', score: 1 },
            { text: '日によってバラバラ', score: 0 },
            { text: '気分次第', score: -1 },
        ]
    },
    {
        id: 7,
        question: '予定が狂うとどう感じる？',
        axis: 'stability',
        options: [
            { text: 'ちょっとストレス', score: 1 },
            { text: '仕方ないと思う', score: 0 },
            { text: 'むしろ楽しい', score: -1 },
        ]
    },
    {
        id: 8,
        question: '生活リズムは規則的？',
        axis: 'stability',
        options: [
            { text: 'かなり規則的', score: 1 },
            { text: '平日は規則的', score: 0 },
            { text: '完全に気まぐれ', score: -1 },
        ]
    },
    // 季節軸 (N/F) - 2問
    {
        id: 9,
        question: '夏と冬、どっちがお風呂に入りやすい？',
        axis: 'season',
        options: [
            { text: '夏の方が入りやすい', score: 1 },
            { text: '季節関係なく同じ', score: 0 },
            { text: '冬の方が入りやすい', score: -1 },
        ]
    },
    {
        id: 10,
        question: '寒い冬の夜、お風呂は...',
        axis: 'season',
        options: [
            { text: '温まりたいから入る！', score: -1 },
            { text: '普通に入る', score: 0 },
            { text: '寒くて布団から出たくない...', score: 1 },
        ]
    },
];

const BathTypeDiagnosisModal = ({ isOpen, onClose, bathEvents }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizResult, setQuizResult] = useState(null);

    // 保存されたクイズ結果を読み込み
    useEffect(() => {
        if (isOpen) {
            const saved = localStorage.getItem(STORAGE_KEY_QUIZ_RESULT);
            if (saved) {
                try {
                    setQuizResult(JSON.parse(saved));
                } catch (e) { }
            }
        }
    }, [isOpen]);

    // データ分析結果を算出
    const dataAnalysisResult = useMemo(() => {
        if (!bathEvents || !Array.isArray(bathEvents)) {
            return { canDiagnose: false, daysNeeded: 7, dataDays: 0 };
        }

        const uniqueDates = new Set();
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const dateStr = evt.dateStr || getLocalDateStr(new Date(evt.time));
            uniqueDates.add(dateStr);
        });
        const dataDays = uniqueDates.size;

        const accuracyLevel = BATH_TYPE_ACCURACY_LEVELS.find(
            a => dataDays >= a.minDays && dataDays <= a.maxDays
        ) || BATH_TYPE_ACCURACY_LEVELS[0];

        if (dataDays < 7) {
            return { canDiagnose: false, daysNeeded: 7 - dataDays, dataDays, accuracyLevel };
        }

        // 4軸算出
        const bathCount = bathEvents.filter(e => typeof e !== 'string' && e.type === 'bath').length;
        const skipCount = bathEvents.filter(e => typeof e !== 'string' && e.type === 'sleep').length;
        const totalActions = bathCount + skipCount;
        const bathRate = totalActions > 0 ? bathCount / totalActions : 0.5;
        const axis1 = bathRate >= 0.5 ? 'C' : 'Z';

        let weekdayBath = 0, weekdayTotal = 0, weekendBath = 0, weekendTotal = 0;
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const day = new Date(evt.time).getDay();
            const isWeekend = day === 0 || day === 6;
            if (isWeekend) {
                weekendTotal++;
                if (evt.type === 'bath') weekendBath++;
            } else {
                weekdayTotal++;
                if (evt.type === 'bath') weekdayBath++;
            }
        });
        const weekdayRate = weekdayTotal > 0 ? weekdayBath / weekdayTotal : 0.5;
        const weekendRate = weekendTotal > 0 ? weekendBath / weekendTotal : 0.5;
        const axis2 = weekdayRate >= weekendRate ? 'H' : 'K';

        const dayOfWeekCounts = Array(7).fill(0);
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const day = new Date(evt.time).getDay();
            dayOfWeekCounts[day]++;
        });
        const avgCount = dayOfWeekCounts.reduce((a, b) => a + b, 0) / 7;
        const variance = dayOfWeekCounts.reduce((acc, c) => acc + Math.pow(c - avgCount, 2), 0) / 7;
        const axis3 = variance <= avgCount ? 'R' : 'K';

        let summerBath = 0, summerTotal = 0, winterBath = 0, winterTotal = 0;
        bathEvents.forEach(evt => {
            if (typeof evt === 'string') return;
            const month = new Date(evt.time).getMonth();
            const isSummer = month >= 5 && month <= 7;
            const isWinter = month === 11 || month <= 1;
            if (isSummer) { summerTotal++; if (evt.type === 'bath') summerBath++; }
            else if (isWinter) { winterTotal++; if (evt.type === 'bath') winterBath++; }
        });
        const summerRate = summerTotal > 0 ? summerBath / summerTotal : 0.5;
        const winterRate = winterTotal > 0 ? winterBath / winterTotal : 0.5;
        const axis4 = summerRate >= winterRate ? 'N' : 'F';

        const typeCode = axis1 + axis2 + axis3 + axis4;
        const typeData = BATH_TYPE_16[typeCode] || BATH_TYPE_16.ZKKN;

        return {
            canDiagnose: true, dataDays, accuracyLevel, typeCode, typeData,
            axes: {
                frequency: { value: axis1, label: axis1 === 'C' ? '清潔寄り' : 'ズボラ寄り' },
                dayOfWeek: { value: axis2, label: axis2 === 'H' ? '平日型' : '休日型' },
                stability: { value: axis3, label: axis3 === 'R' ? '規則的' : '気まぐれ' },
                season: { value: axis4, label: axis4 === 'N' ? '夏型' : '冬型' },
            }
        };
    }, [bathEvents, isOpen]);

    const handleAnswer = (score) => {
        const question = QUIZ_QUESTIONS[currentQuestion];
        const newAnswers = { ...answers, [question.axis]: (answers[question.axis] || 0) + score };
        setAnswers(newAnswers);

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // クイズ完了
            const axis1 = (newAnswers.frequency || 0) >= 0 ? 'C' : 'Z';
            const axis2 = (newAnswers.dayOfWeek || 0) >= 0 ? 'H' : 'K';
            const axis3 = (newAnswers.stability || 0) >= 0 ? 'R' : 'K';
            const axis4 = (newAnswers.season || 0) >= 0 ? 'N' : 'F';
            const typeCode = axis1 + axis2 + axis3 + axis4;
            const typeData = BATH_TYPE_16[typeCode] || BATH_TYPE_16.ZKKN;
            const result = { typeCode, typeData, completedAt: new Date().toISOString() };
            setQuizResult(result);
            localStorage.setItem(STORAGE_KEY_QUIZ_RESULT, JSON.stringify(result));
            setShowQuiz(false);
        }
    };

    const handleShare = (typeData, typeCode) => {
        const text = `🔮 バスタイプ16診断

${typeData.emoji} ${typeData.name}
"${typeData.shortDesc}"

${typeData.traits.map(t => '#' + t).join(' ')}

#フロハイッタ #バスタイプ診断`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://app.bath-check.com/')}`;
        window.open(url, '_blank');
    };

    if (!isOpen) return null;

    // どの結果を表示するか決定
    const displayResult = dataAnalysisResult.canDiagnose ? dataAnalysisResult : (quizResult ? { typeCode: quizResult.typeCode, typeData: quizResult.typeData, isQuiz: true } : null);
    const hasQuizResult = !!quizResult;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-sm modal-enter shadow-2xl relative border-4 border-purple-100 max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 z-10"><Icons.X /></button>

                {showQuiz ? (
                    // クイズ画面
                    <div className="p-6 flex flex-col h-full">
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Q{currentQuestion + 1}/{QUIZ_QUESTIONS.length}</span>
                                <span>{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2 transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-3">🔮</div>
                                <h2 className="text-lg font-black text-gray-800 leading-relaxed">
                                    {QUIZ_QUESTIONS[currentQuestion].question}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {QUIZ_QUESTIONS[currentQuestion].options.map((option, i) => (
                                    <button key={i} onClick={() => handleAnswer(option.score)}
                                        className="w-full bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 rounded-xl p-4 text-left font-bold text-gray-700 transition-all active:scale-95">
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : displayResult ? (
                    // 結果表示
                    <div className="p-6 overflow-y-auto">
                        <div className="text-center mb-4">
                            {!displayResult.isQuiz && (
                                <div className="text-xs text-indigo-500 font-bold mb-2 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                                    📊 {dataAnalysisResult.dataDays}日分のデータで分析
                                </div>
                            )}
                            {displayResult.isQuiz && (
                                <div className="text-xs text-purple-500 font-bold mb-2 bg-purple-50 px-3 py-1 rounded-full inline-block">
                                    🔮 クイズ診断結果
                                </div>
                            )}
                            <div className="text-5xl mb-2">{displayResult.typeData.emoji}</div>
                            <div className="text-xs text-purple-400 font-bold mb-1">{displayResult.typeCode}</div>
                            <h2 className="text-2xl font-black text-purple-700 mb-1">{displayResult.typeData.name}</h2>
                            <p className="text-sm text-gray-600 italic">"{displayResult.typeData.shortDesc}"</p>
                            {dataAnalysisResult.canDiagnose && dataAnalysisResult.accuracyLevel && (
                                <div className="mt-2 text-xs text-gray-400">
                                    精度: {dataAnalysisResult.accuracyLevel.stars} ({dataAnalysisResult.accuracyLevel.label})
                                </div>
                            )}
                        </div>

                        <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-100">
                            <p className="text-sm text-gray-600 leading-relaxed">{displayResult.typeData.personality}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {displayResult.typeData.traits.map((trait, i) => (
                                <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">#{trait}</span>
                            ))}
                        </div>

                        {dataAnalysisResult.canDiagnose && dataAnalysisResult.axes && (
                            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-700 mb-3">📊 4つの軸</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <div className="text-gray-500 text-xs">頻度</div>
                                        <div className="font-bold text-gray-700">{dataAnalysisResult.axes.frequency.label}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <div className="text-gray-500 text-xs">曜日</div>
                                        <div className="font-bold text-gray-700">{dataAnalysisResult.axes.dayOfWeek.label}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <div className="text-gray-500 text-xs">安定度</div>
                                        <div className="font-bold text-gray-700">{dataAnalysisResult.axes.stability.label}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <div className="text-gray-500 text-xs">季節</div>
                                        <div className="font-bold text-gray-700">{dataAnalysisResult.axes.season.label}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-100">
                            <h3 className="text-sm font-bold text-amber-700 mb-1">💡 アドバイス</h3>
                            <p className="text-sm text-gray-600">{displayResult.typeData.advice}</p>
                        </div>

                        {/* 精度アップ案内 */}
                        {displayResult.isQuiz && !dataAnalysisResult.canDiagnose && (
                            <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-100 text-center">
                                <div className="text-xs text-indigo-600 font-bold">
                                    📊 あと{dataAnalysisResult.daysNeeded}日分のデータで精度アップ！
                                </div>
                                <div className="w-full bg-indigo-200 rounded-full h-1.5 mt-2">
                                    <div className="bg-indigo-500 rounded-full h-1.5 transition-all"
                                        style={{ width: `${Math.min(100, (dataAnalysisResult.dataDays / 7) * 100)}%` }} />
                                </div>
                            </div>
                        )}
                        {dataAnalysisResult.canDiagnose && dataAnalysisResult.accuracyLevel && dataAnalysisResult.accuracyLevel.level < 4 && (
                            <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-100 text-center">
                                <div className="text-xs text-indigo-600 font-bold">
                                    📊 あと{BATH_TYPE_ACCURACY_LEVELS[dataAnalysisResult.accuracyLevel.level + 1].minDays - dataAnalysisResult.dataDays}日分のデータで精度アップ！
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1">
                                    次のレベル: {BATH_TYPE_ACCURACY_LEVELS[dataAnalysisResult.accuracyLevel.level + 1].stars} {BATH_TYPE_ACCURACY_LEVELS[dataAnalysisResult.accuracyLevel.level + 1].label}
                                </div>
                            </div>
                        )}

                        {/* 詳細を見るボタン */}
                        <button onClick={() => window.open('https://bath-check.com/bath-type-16.html', '_blank')}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-3 font-bold mb-3 flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95">
                            📖 詳細を見る
                        </button>

                        <button onClick={() => handleShare(displayResult.typeData, displayResult.typeCode)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95">
                            <Icons.XLogo size={18} />結果をシェア
                        </button>
                    </div>
                ) : (
                    // 診断前（クイズ未実施＋データ不足）
                    <div className="p-6 flex flex-col h-full">
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-3">🔮</div>
                            <h2 className="text-xl font-black text-gray-800 mb-2">バスタイプ16診断</h2>
                            <p className="text-sm text-gray-500">入浴習慣からあなたの性格がわかる！</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                            <div className="text-xs text-gray-500 mb-2">📊 データ分析診断</div>
                            <div className="text-lg font-bold text-gray-700 mb-1">
                                あと{dataAnalysisResult.daysNeeded}日で解放
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-500 rounded-full h-2 transition-all"
                                    style={{ width: `${Math.min(100, (dataAnalysisResult.dataDays / 7) * 100)}%` }} />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">アプリを使い続けると自動で診断されます</p>
                        </div>

                        {!hasQuizResult && (
                            <>
                                <div className="text-center text-xs text-gray-400 my-2">もしくは</div>
                                <button onClick={() => { setShowQuiz(true); setCurrentQuestion(0); setAnswers({}); }}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-4 font-bold transition-all active:scale-95">
                                    🔮 今すぐ10問で診断する
                                </button>
                                <p className="text-xs text-gray-400 text-center mt-2">※ クイズは1回のみ実行可能です</p>
                            </>
                        )}
                        {hasQuizResult && (
                            <div className="text-center text-xs text-gray-400 mt-4">
                                ✅ クイズ診断済み（{new Date(quizResult.completedAt).toLocaleDateString()}）
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BathTypeDiagnosisModal;
