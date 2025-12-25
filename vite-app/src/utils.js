import { FORTUNE_RANKS, FORTUNE_MESSAGES, FORTUNE_ACTIONS, SAVINGS_RANKS } from './constants';

export const generateFortune = () => {
    const rand = Math.random();
    let cumulativeProb = 0;
    let selectedRank = FORTUNE_RANKS[FORTUNE_RANKS.length - 1];
    for (const rank of FORTUNE_RANKS) { cumulativeProb += rank.prob; if (rand < cumulativeProb) { selectedRank = rank; break; } }
    const messages = FORTUNE_MESSAGES[selectedRank.id];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const getStar = (min) => Math.min(5, Math.max(1, min + Math.floor(Math.random() * 3)));
    return {
        rank: selectedRank.name,
        read: selectedRank.read,
        title: message.title,
        desc: message.desc,
        color: selectedRank.color,
        bg: selectedRank.bg,
        stars: {
            love: getStar(selectedRank.minStar - 1),
            money: getStar(selectedRank.minStar - 1),
            health: getStar(selectedRank.minStar)
        },
        action: FORTUNE_ACTIONS[Math.floor(Math.random() * FORTUNE_ACTIONS.length)]
    };
};

export const getLocalDateStr = (date) => { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); return `${year}-${month}-${day}`; };

// ズボラ貯金レベル計算 (Lv.100上限)
// 公式: 必要分 = 25 * Lv * (Lv - 1)
// Lv1: 0, Lv2: 50, Lv3: 150...
export const calculateLevel = (savedMinutes) => {
    // 逆算: 25*L^2 - 25*L - min = 0
    // L = (25 + sqrt(625 + 100*min)) / 50
    if (savedMinutes <= 0) return 1;
    let lv = Math.floor((25 + Math.sqrt(625 + 100 * savedMinutes)) / 50);
    return Math.min(100, Math.max(1, lv));
};

// ランク情報の取得
export const getRankInfo = (savedMinutes) => {
    // 安全のため数値を保証
    const safeMinutes = typeof savedMinutes === 'number' ? savedMinutes : 0;

    // 降順にソートして、閾値を超えている最初のランクを見つける
    // (SAVINGS_RANKSは昇順定義されている前提だが、念のためreverseしてfind)
    const reversedRanks = [...SAVINGS_RANKS].reverse();
    const currentRank = reversedRanks.find(r => safeMinutes >= r.threshold) || SAVINGS_RANKS[0];

    // 次のランクを探す
    const currentIndex = SAVINGS_RANKS.indexOf(currentRank);
    const nextRank = SAVINGS_RANKS[currentIndex + 1];

    return {
        ...currentRank,
        nextThreshold: nextRank ? nextRank.threshold : null,
        isMax: !nextRank
    };
};

export const getNextLevelMinutes = (currentLevel) => {
    if (currentLevel >= 100) return 0;
    const nextLv = currentLevel + 1;
    return 25 * nextLv * (nextLv - 1);
};
