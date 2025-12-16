import { FORTUNE_RANKS, FORTUNE_MESSAGES, FORTUNE_ACTIONS } from './constants';

export const generateFortune = () => {
    const rand = Math.random();
    let cumulativeProb = 0;
    let selectedRank = FORTUNE_RANKS[FORTUNE_RANKS.length - 1];
    for (const rank of FORTUNE_RANKS) { cumulativeProb += rank.prob; if (rand < cumulativeProb) { selectedRank = rank; break; } }
    const messages = FORTUNE_MESSAGES[selectedRank.id];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const getStar = (min) => Math.min(5, Math.max(1, min + Math.floor(Math.random() * 3)));
    return { rank: selectedRank.name, read: selectedRank.read, title: message.title, desc: message.desc, color: selectedRank.color, bg: selectedRank.bg, love: getStar(selectedRank.minStar - 1), money: getStar(selectedRank.minStar - 1), health: getStar(selectedRank.minStar), action: FORTUNE_ACTIONS[Math.floor(Math.random() * FORTUNE_ACTIONS.length)] };
};

export const getLocalDateStr = (date) => { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); return `${year}-${month}-${day}`; };

// ズボラ貯金レベル計算 (Lv.100上限)
// 公式: 必要分 = 15 * Lv * (Lv - 1)
// Lv1: 0, Lv2: 30, Lv3: 90, Lv4: 180... Lv100: 148500
export const calculateLevel = (savedMinutes) => {
    // 逆算: 15*L^2 - 15*L - min = 0
    // L = (15 + sqrt(225 + 60*min)) / 30
    // 近似解でOK
    if (savedMinutes <= 0) return 1;
    let lv = Math.floor((15 + Math.sqrt(225 + 60 * savedMinutes)) / 30);
    return Math.min(100, Math.max(1, lv));
};

export const getNextLevelMinutes = (currentLevel) => {
    if (currentLevel >= 100) return 0;
    const nextLv = currentLevel + 1;
    return 15 * nextLv * (nextLv - 1);
};
