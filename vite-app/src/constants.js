
export const STATUS_MESSAGES = {
    high: ["今日の私、最強かも", "無敵モード突入", "毛穴どこ？って感じ", "清潔感がすごい", "良い香りしかしない", "鏡見るの楽しい", "推しに会える状態", "自己肯定感MAX"],
    mid: ["まだいける、たぶん", "ギリギリ保ってる", "急な予定はちょっと...", "加工したら余裕", "近づいても大丈夫かも", "清潔感...70点くらい", "可もなく不可もなく", "明日の自分に期待"],
    low: ["人に会いたくない", "帽子とマスクが必須", "前髪がやばい", "オンラインならなんとか", "ちょっと匂う気がする", "外出禁止レベル", "頭皮が主張してる", "自分から逃げたい"],
    bad: ["完全に終わった...", "お風呂...どこ...", "人権がない", "限界を超えた", "触れないで", "バイオハザード", "もう手遅れ", "記憶から消したい"]
};

// 曜日別キャラセリフ (0=日曜, 1=月曜, ...)
export const DAILY_GREETINGS = [
    "日曜日〜 明日から頑張ろ、今日は休む💤",
    "月曜つらい...お風呂で癒されよう🛁",
    "火曜日！まだ週の前半...頑張れ私💪",
    "水曜日、折り返し！✨",
    "木曜...あとちょっと！",
    "金曜日！今日くらいサボっていいよね🎉",
    "土曜日〜好きなだけゴロゴロしよう"
];

export const ZUBORA_CONVERSIONS = [
    // SNS・動画系（時間換算）
    { type: 'time', min: 30, text: 'TikTok 60本分', icon: '📱' },
    { type: 'time', min: 30, text: '推しのMV 7回再生', icon: '🎵' },
    { type: 'time', min: 30, text: 'Youtubeショート 90本分', icon: '▶️' },
    { type: 'time', min: 30, text: 'インスタリール 50本分', icon: '📸' },
    { type: 'time', min: 60, text: 'Netflix 1エピソード', icon: '🍿' },
    { type: 'time', min: 60, text: '推しの配信アーカイブ', icon: '📺' },
    { type: 'time', min: 60, text: 'Spotify 15曲分', icon: '🎧' },
    { type: 'time', min: 90, text: 'アマプラで映画1本', icon: '🎬' },
    { type: 'time', min: 120, text: 'ゲーム実況 2本分', icon: '🎮' },
    { type: 'time', min: 30, text: 'X(Twitter)無限スクロール', icon: '🐦' },
    { type: 'time', min: 30, text: 'LINE未読 20件消化', icon: '💬' },
    { type: 'time', min: 30, text: 'ペットを吸う時間', icon: '🐈' },
];

// オフタイム貯金ランク定義 (5 Tier x 3 Sub-ranks)
// オフタイム貯金ランク定義 (5 Tier x 3 Sub-ranks)
export const SAVINGS_RANKS = [
    // Bronze: 深みのあるブロンズと温かみのある背景
    { threshold: 0, tier: 'Bronze', rank: 'III', label: 'ブロンズ III', color: 'text-amber-800', bg: 'bg-gradient-to-br from-orange-50 to-amber-100', border: 'border-amber-200', progressClass: 'from-amber-400 to-orange-500', icon: '/assets/ranks/rank-bronze.png' },
    { threshold: 90, tier: 'Bronze', rank: 'II', label: 'ブロンズ II', color: 'text-amber-800', bg: 'bg-gradient-to-br from-orange-50 to-amber-100', border: 'border-amber-200', progressClass: 'from-amber-400 to-orange-500', icon: '/assets/ranks/rank-bronze.png' },
    { threshold: 180, tier: 'Bronze', rank: 'I', label: 'ブロンズ I', color: 'text-amber-800', bg: 'bg-gradient-to-br from-orange-50 to-amber-100', border: 'border-amber-200', progressClass: 'from-amber-400 to-orange-500', icon: '/assets/ranks/rank-bronze.png' },
    // Silver: クールで知的なシルバーグレー
    { threshold: 300, tier: 'Silver', rank: 'III', label: 'シルバー III', color: 'text-slate-600', bg: 'bg-gradient-to-br from-slate-50 to-gray-200', border: 'border-slate-300', progressClass: 'from-slate-300 to-slate-500', icon: '/assets/ranks/rank-silver.png' },
    { threshold: 600, tier: 'Silver', rank: 'II', label: 'シルバー II', color: 'text-slate-600', bg: 'bg-gradient-to-br from-slate-50 to-gray-200', border: 'border-slate-300', progressClass: 'from-slate-300 to-slate-500', icon: '/assets/ranks/rank-silver.png' },
    { threshold: 900, tier: 'Silver', rank: 'I', label: 'シルバー I', color: 'text-slate-600', bg: 'bg-gradient-to-br from-slate-50 to-gray-200', border: 'border-slate-300', progressClass: 'from-slate-300 to-slate-500', icon: '/assets/ranks/rank-silver.png' },
    // Gold: リッチで華やかなゴールド
    { threshold: 1500, tier: 'Gold', rank: 'III', label: 'ゴールド III', color: 'text-yellow-700', bg: 'bg-gradient-to-br from-yellow-50 to-amber-100', border: 'border-yellow-300', progressClass: 'from-yellow-400 to-amber-500', icon: '/assets/ranks/rank-gold.png' },
    { threshold: 2100, tier: 'Gold', rank: 'II', label: 'ゴールド II', color: 'text-yellow-700', bg: 'bg-gradient-to-br from-yellow-50 to-amber-100', border: 'border-yellow-300', progressClass: 'from-yellow-400 to-amber-500', icon: '/assets/ranks/rank-gold.png' },
    { threshold: 3000, tier: 'Gold', rank: 'I', label: 'ゴールド I', color: 'text-yellow-700', bg: 'bg-gradient-to-br from-yellow-50 to-amber-100', border: 'border-yellow-300', progressClass: 'from-yellow-400 to-amber-500', icon: '/assets/ranks/rank-gold.png' },
    // Diamond: 透明感のあるクリスタルブルー
    { threshold: 4500, tier: 'Diamond', rank: 'III', label: 'ダイヤモンド III', color: 'text-cyan-700', bg: 'bg-gradient-to-br from-cyan-50 to-sky-100', border: 'border-cyan-200', progressClass: 'from-cyan-400 to-sky-500', icon: '/assets/ranks/rank-diamond.png' },
    { threshold: 6000, tier: 'Diamond', rank: 'II', label: 'ダイヤモンド II', color: 'text-cyan-700', bg: 'bg-gradient-to-br from-cyan-50 to-sky-100', border: 'border-cyan-200', progressClass: 'from-cyan-400 to-sky-500', icon: '/assets/ranks/rank-diamond.png' },
    { threshold: 9000, tier: 'Diamond', rank: 'I', label: 'ダイヤモンド I', color: 'text-cyan-700', bg: 'bg-gradient-to-br from-cyan-50 to-sky-100', border: 'border-cyan-200', progressClass: 'from-cyan-400 to-sky-500', icon: '/assets/ranks/rank-diamond.png' },
    // Blue Diamond: 深く神秘的なロイヤルブルー
    { threshold: 12000, tier: 'Blue Diamond', rank: 'III', label: 'ブルーダイヤ III', color: 'text-blue-800', bg: 'bg-gradient-to-br from-indigo-50 to-blue-100', border: 'border-indigo-300', progressClass: 'from-indigo-400 to-blue-600', icon: '/assets/ranks/rank-blue-diamond.png' },
    { threshold: 15000, tier: 'Blue Diamond', rank: 'II', label: 'ブルーダイヤ II', color: 'text-blue-800', bg: 'bg-gradient-to-br from-indigo-50 to-blue-100', border: 'border-indigo-300', progressClass: 'from-indigo-400 to-blue-600', icon: '/assets/ranks/rank-blue-diamond.png' },
    { threshold: 30000, tier: 'Blue Diamond', rank: 'I', label: 'ブルーダイヤ I', color: 'text-blue-800', bg: 'bg-gradient-to-br from-indigo-50 to-blue-100', border: 'border-indigo-300', progressClass: 'from-indigo-400 to-blue-600', icon: '/assets/ranks/rank-blue-diamond.png' },
];

export const FORTUNE_RANKS = [
    { id: 'kamiyu', name: '神湯', read: 'かみゆ', prob: 0.05, minStar: 4, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'appare', name: '天晴', read: 'あっぱれ', prob: 0.15, minStar: 4, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'gokuraku', name: '極楽', read: 'ごくらく', prob: 0.20, minStar: 3, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'yoiyu', name: '良湯', read: 'よいゆ', prob: 0.25, minStar: 3, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'totonoyu', name: '整湯', read: 'ととのゆ', prob: 0.15, minStar: 2, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'nurumayu', name: '微温', read: 'ぬるまゆ', prob: 0.10, minStar: 2, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'haran', name: '波乱', read: 'はらん', prob: 0.10, minStar: 1, color: 'text-gray-500', bg: 'bg-gray-100' },
];

export const FORTUNE_MESSAGES = {
    kamiyu: [{ title: "奇跡の浄化", desc: "古い角質と共に過去の厄まで洗い流されました。今日のあなたは無敵のオーラを放っています。" }, { title: "選ばれし者", desc: "湯の神に愛されています。入浴によって潜在能力が解放され、アイデアが無限に湧き出るでしょう。" }],
    appare: [{ title: "最高に整う日", desc: "心身のバランスが完璧に整いました。このエネルギーを使えば、どんな困難も乗り越えられます。" }, { title: "視界良好", desc: "湯気のように悩みが晴れていきます。直感が冴え渡り、素晴らしい決断ができる日です。" }],
    gokuraku: [{ title: "癒やしの波動", desc: "芯まで温まり、深いリラックス状態です。人にも優しくなれるので、対人運が上昇する予感。" }, { title: "極上の休息", desc: "まるで温泉旅行に来たかのような開放感。今日頑張った自分を、誰よりも褒めてあげてください。" }],
    yoiyu: [{ title: "安定の温もり", desc: "いつものお風呂が、一番の幸せ。派手さはありませんが、確実な幸福があなたを包んでいます。" }, { title: "程よい湯加減", desc: "無理なく過ごせる良い日です。ぬるめのお湯にゆっくり浸かることで、運気が安定します。" }],
    totonoyu: [{ title: "リセットの時", desc: "少し乱れていたリズムが戻りました。明日に向けての準備は万端。早めに寝るとさらに吉。" }, { title: "基本に忠実", desc: "丁寧に体を洗うことで運が開けます。基本を大切にすることで、物事がスムーズに進むでしょう。" }],
    nurumayu: [{ title: "あと一歩", desc: "少し長湯しすぎたかも？水分補給をしっかりして、ダラダラしすぎないように気を引き締めて。" }, { title: "現状維持", desc: "良くも悪くも変化のない日。ぬるま湯に浸かるように、今の環境に甘えすぎないよう注意が必要です。" }],
    haran: [{ title: "湯冷め注意報", desc: "心が急いていませんか？シャワーだけで済ませると運気が逃げます。5分でも湯船に浸かって回避を。" }, { title: "要浄化", desc: "邪気が溜まっています。お風呂掃除を入念に行い、清めることで運気を取り戻せるでしょう。" }]
};

export const FORTUNE_ACTIONS = ["お気に入りの音楽をかけて30分浸かる", "炭酸系の入浴剤を入れて深呼吸", "湯船の中で足首を10回回す", "目を閉じて1分間無心になる", "上がった後に常温の水を飲む", "新しいスポンジをおろす", "シャワーヘッドをピカピカに磨く", "お風呂上がりにストレッチをする", "柑橘系の香りを嗅ぐ", "浴室の鏡を曇りなく磨く", "ヘアパックをして5分待つ", "足の指を一本ずつマッサージ", "湯船で「ありがとう」と3回唱える", "バスソルトで発汗を促す", "お風呂上がりに保湿を徹底する", "排水溝を掃除して運気を流す", "冷水を足にかけて引き締める", "キャンドル（なければ照明OFF）で瞑想", "アヒルのおもちゃを浮かべて遊ぶ", "防水スマホケースで動画を見る", "大きな声で歌う（近所迷惑注意）", "ボディスクラブで全身磨き", "頭皮マッサージを入念にする", "湯船の中でグーチョキパー運動", "一番風呂を狙う", "入浴剤を混ぜてオリジナルの色を作る", "お風呂上がりにフルーツ牛乳を飲む", "バスタオルをふかふかの物に変える", "お風呂上がりに窓を開けて換気", "湯船で深呼吸して悪い気を吐く"];

export const BASE_RATE_PER_HOUR = 1.0;
export const BASE_SLEEP_DAMAGE = 2;

export const STORAGE_KEY_HP = 'hq_hp';
export const STORAGE_KEY_LAST_BATH = 'hq_last_bath';
export const STORAGE_KEY_DAMAGE = 'hq_damage';
export const STORAGE_KEY_LOGS = 'hq_logs';
export const STORAGE_KEY_HISTORY = 'hq_history';
export const STORAGE_KEY_WEATHER = 'hq_weather_v1';
export const STORAGE_KEY_IS_SLEEPING = 'hq_is_sleeping';
export const STORAGE_KEY_SLEEP_TYPE = 'hq_sleep_type'; // 'normal' or 'skip'
export const STORAGE_KEY_SLEEP_START = 'hq_sleep_start';
export const STORAGE_KEY_SAVED_MINUTES = 'hq_saved_minutes';
export const STORAGE_KEY_TUTORIAL_COMPLETED = 'hq_tutorial_completed';
export const STORAGE_KEY_SKIN_TYPE = 'hq_skin_type';
export const STORAGE_KEY_WEEKLY_BANNER_SHOWN = 'hq_weekly_banner_shown';
export const STORAGE_KEY_HP_HISTORY = 'hq_hp_history'; // 週間HP履歴
export const STORAGE_KEY_WEEKLY_REPORTS = 'hq_weekly_reports'; // 過去の週次レポート履歴
export const STORAGE_KEY_WEEKLY_REPORT_NOTIFIED = 'hq_weekly_report_notified'; // 週次レポート通知済みフラグ

// 週間レポート評価システム（比率ベース: スキップ率 = スキップ回数 / 総アクション数）
export const WEEKLY_REPORT_EVALUATIONS = [
    // スキップ率 0% (全部お風呂)
    {
        minRatio: 0, maxRatio: 0, title: '清潔の鑑', emoji: '💎', messages: [
            '完璧な清潔感！尊敬します✨',
            '毎日お風呂に入れるなんてすごい！',
            '清潔感の塊、羨ましい！',
        ]
    },
    // スキップ率 1-20%
    {
        minRatio: 0.01, maxRatio: 0.20, title: 'ほぼ完璧', emoji: '✨', messages: [
            'ほとんど毎日入ってて偉い！',
            'たまにはサボっても大丈夫だよ',
            '清潔感バッチリ！',
        ]
    },
    // スキップ率 21-40%
    {
        minRatio: 0.21, maxRatio: 0.40, title: 'バランス型', emoji: '⚖️', messages: [
            '程よくサボって良いバランス！',
            '無理しすぎないのが一番！',
            '賢い選択ができてるね',
        ]
    },
    // スキップ率 41-60%
    {
        minRatio: 0.41, maxRatio: 0.60, title: 'サボり気味', emoji: '😌', messages: [
            '半分くらいサボれてる！いい感じ',
            '自分のペースで生きてる証拠',
            'ちょうどいい塩梅かもね',
        ]
    },
    // スキップ率 61-80%
    {
        minRatio: 0.61, maxRatio: 0.80, title: 'サボりの達人', emoji: '🏆', messages: [
            '効率的な生活、さすがです！',
            '浮いた時間で自分を甘やかして♪',
            '時間の使い方が上手！',
        ]
    },
    // スキップ率 81-99%
    {
        minRatio: 0.81, maxRatio: 0.99, title: 'ズボラマスター', emoji: '🌟', messages: [
            'ほぼ毎日サボれてる！才能ある',
            'ズボラ道を極めつつある...',
            '誰にも真似できないスタイル',
        ]
    },
    // スキップ率 100% (全部スキップ)
    {
        minRatio: 1.0, maxRatio: 1.0, title: 'ズボラ界の神', emoji: '👑', messages: [
            'もはや伝説レベル...！',
            '完璧なズボラ、尊い',
            '究極の境地に到達！',
        ]
    },
];

// 肌タイプ定義
export const SKIN_TYPES = [
    { id: 'dry', name: '乾燥肌', emoji: '🏜️', damageRate: 0.8, description: 'カサカサしやすい' },
    { id: 'normal', name: '普通肌', emoji: '✨', damageRate: 1.0, description: 'バランスが良い' },
    { id: 'combination', name: '混合肌', emoji: '🌓', damageRate: 1.0, description: 'Tゾーンはベタつき' },
    { id: 'oily', name: '脂性肌', emoji: '💧', damageRate: 1.3, description: 'テカリやすい' },
    { id: 'sensitive', name: '敏感肌', emoji: '🌸', damageRate: 0.9, description: '刺激に弱い' },
];

export const SKIN_TYPE_DIAGNOSIS_URL = 'https://diagnosis.bath-check.com';

export const SE_POP_URL = "./audio/se_pop.mp3";
export const SE_KIRA_URL = "./audio/se_kira.mp3";
export const BGM_URL = "./audio/bgm.mp3";

// お金換算の提案（節約金額で何が買えるか）
export const MONEY_CONVERSIONS = [
    // 〜100円
    { type: 'money', minYen: 0, text: 'うまい棒 1本', icon: '🍫' },
    { type: 'money', minYen: 80, text: 'ガム 1個', icon: '🫧' },
    { type: 'money', minYen: 100, text: '自販機の水 1本', icon: '💧' },
    // 100〜300円
    { type: 'money', minYen: 150, text: 'コンビニおにぎり', icon: '🍙' },
    { type: 'money', minYen: 150, text: 'セブンのアイス', icon: '🍨' },
    { type: 'money', minYen: 200, text: 'コンビニスイーツ', icon: '🍰' },
    { type: 'money', minYen: 250, text: 'スタバのドリップコーヒー', icon: '☕' },
    // 300〜500円
    { type: 'money', minYen: 300, text: 'マックのバーガーセット', icon: '🍔' },
    { type: 'money', minYen: 350, text: '牛丼並盛り', icon: '🥡' },
    { type: 'money', minYen: 400, text: 'コンビニ弁当', icon: '🍱' },
    { type: 'money', minYen: 500, text: 'スタバのフラペチーノ', icon: '🧋' },
    // 500〜1000円
    { type: 'money', minYen: 600, text: 'ラーメン一杯', icon: '🍜' },
    { type: 'money', minYen: 700, text: 'ファミレスのランチ', icon: '🍽️' },
    { type: 'money', minYen: 800, text: 'タピオカドリンク', icon: '🧋' },
    { type: 'money', minYen: 1000, text: '映画館のポップコーン', icon: '🍿' },
    // 1000円〜
    { type: 'money', minYen: 1200, text: '回転寿司ランチ', icon: '🍣' },
    { type: 'money', minYen: 1500, text: 'カフェでケーキセット', icon: '🎂' },
    { type: 'money', minYen: 1800, text: '映画チケット（一般）', icon: '🎬' },
    { type: 'money', minYen: 2000, text: 'ネイルサロン（ケアのみ）', icon: '💅' },
    { type: 'money', minYen: 2500, text: 'アマプラ会員6ヶ月分', icon: '📺' },
    { type: 'money', minYen: 3000, text: 'ユニクロTシャツ 2枚', icon: '👕' },
    { type: 'money', minYen: 5000, text: '美容室カット', icon: '💇' },
    { type: 'money', minYen: 8000, text: 'ちょっといいディナー', icon: '🥂' },
    { type: 'money', minYen: 10000, text: '日帰り温泉旅行', icon: '♨️' },
];

// Amazonギフトカード広告（お金タブ用）
export const GIFT_CARD_AD = {
    url: 'https://www.amazon.co.jp/b?_encoding=UTF8&node=3131877051&pf_rd_p=baf486ea-77d6-4464-bc6e-61e5eea6c995&pf_rd_r=6M68EF1K1Q71X27Y93Y5&linkCode=ll2&tag=noteshuekika1-22&linkId=3f6418ee42fa12503be9b6141f26240e&language=ja_JP&ref_=as_li_ss_tl',
    bannerImage: './banner_giftcard.png',
    messages: [
        '浮いたお金で、自分にご褒美をあげませんか？',
        '節約したお金を、大切な人へのギフトに✨',
        '貯まったお金で、ちょっといいものを買おう！',
        '自分へのご褒美、たまには良いよね🎁',
        'これだけ貯まった！自分にプレゼントしよう',
        '頑張った自分にAmazonギフトでご褒美を💝',
    ],
};

// Amazonアソシエイト アフィリエイト提案
export const AFFILIATE_SUGGESTIONS = [
    // ===== Amazon広告 =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🎧',
        title: 'Audible無料体験',
        description: 'サボった30分、耳から読書しませんか？',
        subtext: '今なら無料で1冊聴けます',
        url: 'https://www.amazon.co.jp/hz/audible/mlp?tag=noteshuekika1-22',
        bannerImage: './banner_audible.png',
        skipMessages: [
            '今日得した30分で、耳から読書してみませんか？',
            '浮いた30分、通勤時間にも使える"聴く読書"はいかが？',
            'ゴロゴロしながら30分、声優さんの朗読で癒されませんか？',
        ],
        category: 'amazon',
        priority: 1,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📚',
        title: 'Kindle Unlimited',
        description: '浮いた時間でスキルアップ',
        subtext: '30分で読める本が0円で読み放題',
        url: 'https://www.amazon.co.jp/kindle-dbs/hz/signup?tag=noteshuekika1-22',
        bannerImage: './banner_kindle.png',
        skipMessages: [
            '今日得した30分で、好きな漫画・本を読みませんか？',
            '布団の中で30分、話題のビジネス書をサクッと読もう',
            '浮いた時間でスキルアップ！時短術の本が読み放題✨',
        ],
        category: 'amazon',
        priority: 2,
    },
    // ===== A8広告 カテゴリ1+2: バス・ボディケア =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🛁',
        title: 'バスケア商品A',
        description: 'お風呂をもっと楽しく',
        subtext: '人気のバスアイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+BPIX2Q+2L6G+ZQV5T',
            imgUrl: 'https://www23.a8.net/svt/bgt?aid=251226440708&wid=001&eno=01&mid=s00000012076006004000&mc=1',
            trackingUrl: 'https://www17.a8.net/0.gif?a8mat=45KNK8+BPIX2Q+2L6G+ZQV5T',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'バスタイムをもっと楽しく🛁',
            'お風呂グッズでリラックスタイム♪',
            '今日のバスタイムを特別に✨',
        ],
        category: 'bath',
        priority: 3,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🛁',
        title: 'バスケア商品B',
        description: 'バスタイムを充実させよう',
        subtext: 'こだわりのバスアイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+E2NWKY+R12+6AC5D',
            imgUrl: 'https://www20.a8.net/svt/bgt?aid=251226440851&wid=001&eno=01&mid=s00000003503001056000&mc=1',
            trackingUrl: 'https://www16.a8.net/0.gif?a8mat=45KNK8+E2NWKY+R12+6AC5D',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'バスタイムを充実させよう🛁',
            'こだわりのバスアイテムで癒されよう',
            'お風呂タイムをもっと楽しく♪',
        ],
        category: 'bath',
        priority: 3,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🛁',
        title: '入浴剤',
        description: '毎日のお風呂を特別に',
        subtext: '人気の入浴剤',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KMSG+B89CJ6+31RE+ZSSLT',
            imgUrl: 'https://www27.a8.net/svt/bgt?aid=251225440679&wid=001&eno=01&mid=s00000014225006013000&mc=1',
            trackingUrl: 'https://www18.a8.net/0.gif?a8mat=45KMSG+B89CJ6+31RE+ZSSLT',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '毎日のお風呂を特別に✨',
            '入浴剤でリラックスタイム♪',
            'バスタイムをもっと楽しく🛁',
        ],
        category: 'bath',
        priority: 3,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🛁',
        title: 'バスグッズ',
        description: 'お風呂の時間をもっと快適に',
        subtext: 'おすすめバスアイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+EGCVHU+1KO+2Z7YC1',
            imgUrl: 'https://www26.a8.net/svt/bgt?aid=251226440874&wid=001&eno=01&mid=s00000000204018009000&mc=1',
            trackingUrl: 'https://www18.a8.net/0.gif?a8mat=45KNK8+EGCVHU+1KO+2Z7YC1',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'お風呂の時間をもっと快適に🛁',
            'バスグッズでリラックス♪',
            '今日のお風呂を特別に✨',
        ],
        category: 'bath',
        priority: 3,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🛁',
        title: 'ボディケア商品',
        description: 'お肌のケアも忘れずに',
        subtext: '人気のボディケア',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+E3URSI+4GRI+HXKQP',
            imgUrl: 'https://www28.a8.net/svt/bgt?aid=251226440853&wid=001&eno=01&mid=s00000020835003012000&mc=1',
            trackingUrl: 'https://www19.a8.net/0.gif?a8mat=45KNK8+E3URSI+4GRI+HXKQP',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'お肌のケアも忘れずに🫧',
            'ボディケアでお肌つるつる♪',
            'お風呂上がりのケアを楽しく✨',
        ],
        category: 'bath',
        priority: 3,
    },
    // ===== A8広告 カテゴリ3: リラックス・癒し =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🌿',
        title: 'リラックスアイテムA',
        description: '癒しの時間を',
        subtext: 'リラックスグッズ',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+E5N2LU+31RE+2BF9A9',
            imgUrl: 'https://www28.a8.net/svt/bgt?aid=251226440856&wid=001&eno=01&mid=s00000014225014012000&mc=1',
            trackingUrl: 'https://www12.a8.net/0.gif?a8mat=45KNK8+E5N2LU+31RE+2BF9A9',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '癒しの時間を過ごそう🌿',
            'リラックスグッズで心も体もほぐれる♪',
            '今日は自分を労わろう✨',
        ],
        category: 'relax',
        priority: 4,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🌿',
        title: 'リラックスアイテムB',
        description: '心と体を癒す',
        subtext: '癒しのアイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+EYTB8Y+425O+BZO4H',
            imgUrl: 'https://www29.a8.net/svt/bgt?aid=251226440905&wid=001&eno=01&mid=s00000018942002014000&mc=1',
            trackingUrl: 'https://www14.a8.net/0.gif?a8mat=45KNK8+EYTB8Y+425O+BZO4H',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '心と体を癒そう🌿',
            '癒しのアイテムでリフレッシュ♪',
            '自分へのご褒美に✨',
        ],
        category: 'relax',
        priority: 4,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '🌿',
        title: 'リラックスアイテムC',
        description: '日々の疲れを癒す',
        subtext: 'おすすめリラックスグッズ',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F006GI+3PSY+ZU2WH',
            imgUrl: 'https://www22.a8.net/svt/bgt?aid=251226440907&wid=001&eno=01&mid=s00000017341006019000&mc=1',
            trackingUrl: 'https://www12.a8.net/0.gif?a8mat=45KNK8+F006GI+3PSY+ZU2WH',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '日々の疲れを癒そう🌿',
            'リラックスタイムを充実させよう♪',
            '自分を労わる時間を✨',
        ],
        category: 'relax',
        priority: 4,
    },
    // ===== A8広告 カテゴリ4: スキンケア =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '✨',
        title: 'スキンケアA',
        description: 'お肌に優しいケア',
        subtext: '人気のスキンケア',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F1SH9U+1USQ+CDLO1',
            imgUrl: 'https://www29.a8.net/svt/bgt?aid=251226440910&wid=001&eno=01&mid=s00000008657002079000&mc=1',
            trackingUrl: 'https://www15.a8.net/0.gif?a8mat=45KNK8+F1SH9U+1USQ+CDLO1',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'お肌に優しいケアを✨',
            'スキンケアで美肌をキープ♪',
            'お風呂上がりのスキンケアを大切に',
        ],
        category: 'skincare',
        priority: 5,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '✨',
        title: 'スキンケアB',
        description: '毎日のスキンケアに',
        subtext: 'おすすめスキンケア',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+EO3ICY+1USQ+25HS3L',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440887&wid=001&eno=01&mid=s00000008657013016000&mc=1',
            trackingUrl: 'https://www12.a8.net/0.gif?a8mat=45KNK8+EO3ICY+1USQ+25HS3L',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '毎日のスキンケアを大切に✨',
            'お肌のケアで美しく♪',
            'スキンケアで自分磨き',
        ],
        category: 'skincare',
        priority: 5,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '✨',
        title: 'スキンケアC',
        description: 'お肌をいたわる',
        subtext: '話題のスキンケア',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F2ZCHE+31RE+BXB8X',
            imgUrl: 'https://www25.a8.net/svt/bgt?aid=251226440912&wid=001&eno=01&mid=s00000014225002003000&mc=1',
            trackingUrl: 'https://www15.a8.net/0.gif?a8mat=45KNK8+F2ZCHE+31RE+BXB8X',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'お肌をいたわろう✨',
            'スキンケアで健やかな肌へ♪',
            '毎日のケアが大切',
        ],
        category: 'skincare',
        priority: 5,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '✨',
        title: 'スキンケアD',
        description: '美肌への第一歩',
        subtext: '人気のスキンケア商品',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F467OY+4GDM+TSBE9',
            imgUrl: 'https://www23.a8.net/svt/bgt?aid=251226440914&wid=001&eno=01&mid=s00000020785005003000&mc=1',
            trackingUrl: 'https://www12.a8.net/0.gif?a8mat=45KNK8+F467OY+4GDM+TSBE9',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '美肌への第一歩✨',
            'スキンケアで輝く肌へ♪',
            '自分へのご褒美スキンケア',
        ],
        category: 'skincare',
        priority: 5,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '✨',
        title: 'スキンケアE',
        description: '肌に潤いを',
        subtext: 'おすすめスキンケアアイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+ESUZ76+4GDM+NTZCH',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440895&wid=001&eno=01&mid=s00000020785004003000&mc=1',
            trackingUrl: 'https://www11.a8.net/0.gif?a8mat=45KNK8+ESUZ76+4GDM+NTZCH',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '肌に潤いを✨',
            'スキンケアで潤い肌へ♪',
            'お肌のケアを楽しもう',
        ],
        category: 'skincare',
        priority: 5,
    },
    // ===== A8広告 カテゴリ5: 睡眠・ウェルネス =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '💤',
        title: '睡眠グッズA',
        description: '質の良い睡眠を',
        subtext: '人気の睡眠アイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F5D2WI+5QLS+BZ0Z5',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440916&wid=001&eno=01&mid=s00000026776002011000&mc=1',
            trackingUrl: 'https://www13.a8.net/0.gif?a8mat=45KNK8+F5D2WI+5QLS+BZ0Z5',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '質の良い睡眠を💤',
            '睡眠グッズで快眠生活♪',
            'ぐっすり眠れるアイテムを✨',
        ],
        category: 'sleep',
        priority: 6,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '💤',
        title: '睡眠グッズB',
        description: '快適な眠りのために',
        subtext: 'おすすめ睡眠アイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F5YIIA+53VQ+62U35',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440917&wid=001&eno=01&mid=s00000023831001021000&mc=1',
            trackingUrl: 'https://www17.a8.net/0.gif?a8mat=45KNK8+F5YIIA+53VQ+62U35',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '快適な眠りのために💤',
            '睡眠の質を上げよう♪',
            'ぐっすり眠れる毎日を✨',
        ],
        category: 'sleep',
        priority: 6,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '💤',
        title: '睡眠グッズC',
        description: '眠りを大切に',
        subtext: '話題の睡眠グッズ',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+FK8X0Y+5LHW+5YZ75',
            imgUrl: 'https://www24.a8.net/svt/bgt?aid=251226440941&wid=001&eno=01&mid=s00000026114001003000&mc=1',
            trackingUrl: 'https://www11.a8.net/0.gif?a8mat=45KNK8+FK8X0Y+5LHW+5YZ75',
            width: 300,
            height: 250,
        },
        skipMessages: [
            '眠りを大切に💤',
            '快眠グッズでぐっすり♪',
            '質の良い睡眠で元気に✨',
        ],
        category: 'sleep',
        priority: 6,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '💤',
        title: '睡眠グッズD',
        description: 'ぐっすり眠ろう',
        subtext: '人気の快眠アイテム',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+F8XOJ6+2HEW+5YDJSH',
            imgUrl: 'https://www20.a8.net/svt/bgt?aid=251226440922&wid=001&eno=01&mid=s00000011588036007000&mc=1',
            trackingUrl: 'https://www14.a8.net/0.gif?a8mat=45KNK8+F8XOJ6+2HEW+5YDJSH',
            width: 300,
            height: 250,
        },
        skipMessages: [
            'ぐっすり眠ろう💤',
            '快眠アイテムで朝スッキリ♪',
            '眠りの質を上げよう✨',
        ],
        category: 'sleep',
        priority: 6,
    },
    // ===== A8広告 体験・自己投資系（320x50） =====
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📖',
        title: '自己投資サービスA',
        description: '浮いた時間でスキルアップ',
        subtext: 'おすすめ体験',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+G0X1YQ+40T2+6E71D',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440969&wid=001&eno=01&mid=s00000018767001074000&mc=1',
            trackingUrl: 'https://www13.a8.net/0.gif?a8mat=45KNK8+G0X1YQ+40T2+6E71D',
            width: 320,
            height: 50,
        },
        skipMessages: [
            '浮いた時間で自己投資📖',
            'スキルアップのチャンス！',
            '時間を有効活用しよう✨',
        ],
        category: 'experience',
        priority: 7,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📖',
        title: '自己投資サービスB',
        description: '新しいスキルを身につけよう',
        subtext: 'おすすめ体験',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+G69YEQ+4N6C+639IP',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440978&wid=001&eno=01&mid=s00000021666001023000&mc=1',
            trackingUrl: 'https://www13.a8.net/0.gif?a8mat=45KNK8+G69YEQ+4N6C+639IP',
            width: 320,
            height: 50,
        },
        skipMessages: [
            '新しいスキルを身につけよう📖',
            '自己投資で成長しよう！',
            '浮いた時間を活用✨',
        ],
        category: 'experience',
        priority: 7,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📖',
        title: '自己投資サービスC',
        description: 'あなたの成長をサポート',
        subtext: 'おすすめ体験',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+G994FM+3D3Q+61C2P',
            imgUrl: 'https://www26.a8.net/svt/bgt?aid=251226440983&wid=001&eno=01&mid=s00000015695001014000&mc=1',
            trackingUrl: 'https://www17.a8.net/0.gif?a8mat=45KNK8+G994FM+3D3Q+61C2P',
            width: 320,
            height: 50,
        },
        skipMessages: [
            'あなたの成長をサポート📖',
            'スキルアップのチャンス！',
            '自分磨きを始めよう✨',
        ],
        category: 'experience',
        priority: 7,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📖',
        title: '自己投資サービスD',
        description: '浮いた時間を有効活用',
        subtext: 'おすすめ体験',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+FHV6LU+5S3O+5ZEMP',
            imgUrl: 'https://www21.a8.net/svt/bgt?aid=251226440937&wid=001&eno=01&mid=s00000026970001005000&mc=1',
            trackingUrl: 'https://www13.a8.net/0.gif?a8mat=45KNK8+FHV6LU+5S3O+5ZEMP',
            width: 100,
            height: 60,
        },
        skipMessages: [
            '浮いた時間を有効活用📖',
            'スキルアップのチャンス！',
            '自己投資を始めよう✨',
        ],
        category: 'experience',
        priority: 7,
    },
    {
        type: 'affiliate',
        minYen: 0,
        maxYen: 999999,
        icon: '📖',
        title: '自己投資サービスE',
        description: '新しい学びを始めよう',
        subtext: 'おすすめ体験',
        isA8: true,
        a8Code: {
            linkUrl: 'https://px.a8.net/svt/ejp?a8mat=45KNK8+G8NOTU+5FZU+5Z6WX',
            imgUrl: 'https://www22.a8.net/svt/bgt?aid=251226440982&wid=001&eno=01&mid=s00000025401001004000&mc=1',
            trackingUrl: 'https://www13.a8.net/0.gif?a8mat=45KNK8+G8NOTU+5FZU+5Z6WX',
            width: 100,
            height: 60,
        },
        skipMessages: [
            '新しい学びを始めよう📖',
            '時間を有効活用！',
            'スキルアップしよう✨',
        ],
        category: 'experience',
        priority: 7,
    },
];

// 広告ローテーション用ストレージキー
export const STORAGE_KEY_BATH_AD_INDEX = 'hq_bath_ad_index';
export const STORAGE_KEY_SLEEP_AD_INDEX = 'hq_sleep_ad_index';
export const STORAGE_KEY_SAVINGS_AD_INDEX = 'hq_savings_ad_index';
export const STORAGE_KEY_SAVINGS_EXP_AD_INDEX = 'hq_savings_exp_ad_index';
export const STORAGE_KEY_STATS_WEEKLY_AD_INDEX = 'hq_stats_weekly_ad_index';
export const STORAGE_KEY_STATS_MONTHLY_AD_INDEX = 'hq_stats_monthly_ad_index';
export const STORAGE_KEY_STATS_ALL_AD_INDEX = 'hq_stats_all_ad_index';



// ===== バスタイプ16診断 =====

// 精度レベル定義
export const BATH_TYPE_ACCURACY_LEVELS = [
    { minDays: 0, maxDays: 6, level: 0, label: '診断不可', stars: '' },
    { minDays: 7, maxDays: 13, level: 1, label: '暫定', stars: '⭐' },
    { minDays: 14, maxDays: 20, level: 2, label: '傾向確認', stars: '⭐⭐' },
    { minDays: 21, maxDays: 27, level: 3, label: 'かなり正確', stars: '⭐⭐⭐' },
    { minDays: 28, maxDays: 9999, level: 4, label: '確定', stars: '⭐⭐⭐⭐' },
];

// 16タイプ定義
export const BATH_TYPE_16 = {
    // C(清潔) + H(平日) + R(規則) + F(冬型)
    CHRF: {
        code: 'CHRF',
        name: '氷の完璧主義者',
        emoji: '🧊',
        shortDesc: '冷静で隙がない...でも本当は？',
        personality: '計画性に優れ、自分に厳しいストイックな性格。周囲からは「完璧」に見えるが、実は内面では葛藤を抱えていることも。冬でもしっかり入浴するその姿勢は、責任感の強さの表れ。仕事や勉強では高い成果を出すが、自分を追い込みすぎる傾向がある。',
        detailedDesc: '平日に規則正しく、冬でも欠かさずお風呂に入るあなたは、まさに「鋼の意志」の持ち主。周囲から信頼される一方で、「完璧でなければ」というプレッシャーを自分にかけがち。時には弱さを見せることで、人間関係がより深まることも。',
        strengths: ['高い自己管理能力', '信頼される存在', '目標達成力が高い', '責任感が強い'],
        weaknesses: ['自分に厳しすぎる', '他人にも高い基準を求めがち', 'リラックスが苦手'],
        traits: ['几帳面', '責任感強い', 'ストイック', '自分に厳しい'],
        advice: 'たまには自分を甘やかしても大丈夫。完璧じゃなくても愛される。',
        compatibility: ['ZKKN', 'CHRN'],
        jobs: ['経営者', '医師', '弁護士', '公認会計士'],
        motto: '努力は裏切らない',
        celebImage: 'イチロー、本田圭佑のようなストイックなタイプ',
    },
    // C(清潔) + H(平日) + R(規則) + N(夏型)
    CHRN: {
        code: 'CHRN',
        name: '太陽の優等生',
        emoji: '☀️',
        shortDesc: '眩しすぎて本音が見えない',
        personality: '明るく前向きで、周囲の期待に応えようとする優等生タイプ。夏は特に活動的で、規則正しい生活を送る。一見完璧だが、本音を隠しがちな一面も。人から好かれることが多いが、「いい人」を演じ続けることに疲れることも。',
        detailedDesc: '太陽のように周囲を明るくするあなたは、チームのムードメーカー。平日はきっちり、夏はアクティブに動く姿は周囲の憧れ。ただし、「期待に応えなければ」という思いが強く、自分の本当の気持ちを抑えがち。たまには「NO」と言う勇気も大切。',
        strengths: ['コミュニケーション能力', 'ポジティブ思考', '周囲を巻き込む力', 'バランス感覚'],
        weaknesses: ['本音を言えない', '断れない', '自分を後回しにしがち'],
        traits: ['前向き', '協調性高い', '期待に応える', 'ポジティブ'],
        advice: '本音を言っても嫌われないよ。自分らしさを大切に。',
        compatibility: ['ZKKF', 'CHRF'],
        jobs: ['営業', '広報', 'イベントプランナー', '教師'],
        motto: '笑顔は最高の武器',
        celebImage: '明石家さんま、綾瀬はるかのような明るいタイプ',
    },
    // C(清潔) + H(平日) + K(気まぐれ) + F(冬型)
    CHKF: {
        code: 'CHKF',
        name: '冬眠する真面目',
        emoji: '🐻',
        shortDesc: 'ONとOFFの差が激しい',
        personality: '平日は真面目に働くが、気分の波がある。冬は特に「冬眠モード」に入りやすく、エネルギーを溜め込む傾向。メリハリのある生き方を好む。集中力が高く、やる時はやるタイプだが、充電期間も必要。',
        detailedDesc: '仕事モードとオフモードの切り替えが明確なあなた。平日はしっかり動くけど、冬になるとエネルギーセーブモードに。これは怠けではなく、次の活動に向けた戦略的な休息。自分のリズムを理解し、それに従って生きている賢さがある。',
        strengths: ['集中力が高い', 'メリハリ上手', 'エネルギー管理が上手', '自己理解が深い'],
        weaknesses: ['テンションの波がある', '冬は動きたくない', '予定変更に弱い'],
        traits: ['メリハリ型', '気分屋', 'エネルギー管理上手', '季節で変わる'],
        advice: '自分のリズムを大切に。無理に一定を保たなくていい。',
        compatibility: ['ZHRN', 'CKRF'],
        jobs: ['エンジニア', '研究者', 'プログラマー', 'デザイナー'],
        motto: '休むことも仕事のうち',
        celebImage: 'ヒカルのように集中と休息を繰り返すタイプ',
    },
    // C(清潔) + H(平日) + K(気まぐれ) + N(夏型)
    CHKN: {
        code: 'CHKN',
        name: '夏のカメレオン',
        emoji: '🦎',
        shortDesc: '環境で変わる七変化',
        personality: '適応力が高く、環境によって自分を変えられる柔軟性の持ち主。夏は活発だが、気まぐれな一面も。社交的で人付き合いが上手。どんな状況でも馴染めるが、本当の自分がわからなくなることも。',
        detailedDesc: '状況に応じて自分を変えられる高い適応力の持ち主。夏は特にアクティブで、様々なコミュニティで活躍できる。ただし、カメレオンのように変わりすぎると「本当の自分は何だろう？」と迷うことも。変わらない軸を持つことで、より魅力的になれる。',
        strengths: ['適応力抜群', '社交性が高い', 'フットワークが軽い', '柔軟な発想'],
        weaknesses: ['自分を見失いやすい', '八方美人になりがち', '軸がブレやすい'],
        traits: ['適応力高い', '社交的', '柔軟', '変化を楽しむ'],
        advice: '本当の自分を見失わないで。変わらない軸を持とう。',
        compatibility: ['ZKRF', 'ZHRN'],
        jobs: ['コンサルタント', 'プロデューサー', 'マーケティング', '翻訳家'],
        motto: '変化を楽しむ',
        celebImage: 'ローラのように環境に適応するカメレオンタイプ',
    },
    // C(清潔) + K(休日) + R(規則) + F(冬型)
    CKRF: {
        code: 'CKRF',
        name: '週末の仮面紳士',
        emoji: '🎭',
        shortDesc: '平日の顔と休日の顔',
        personality: '平日と休日で異なる顔を持つ二面性の持ち主。休日は特に自分らしく過ごし、規則的だが冬は静かに過ごすことを好む。内面は豊かで深い。表の顔と裏の顔があるが、どちらも本当のあなた。',
        detailedDesc: '仕事の顔とプライベートの顔が違う、魅力的な二面性の持ち主。休日こそ本来の自分が出てくる。冬は特に内省的になり、深い思考を楽しむ。この「仮面」は悪いものではなく、社会で生きる知恵。両方の自分を愛せるようになると、より自由になれる。',
        strengths: ['切り替え上手', '内面が深い', '自分の時間を大切にする', '観察力がある'],
        weaknesses: ['本音を出しにくい', '理解されにくい', '孤独を感じやすい'],
        traits: ['二面性', '内面豊か', '休日重視', '自分の時間大切'],
        advice: 'どちらの自分も本当のあなた。統合していこう。',
        compatibility: ['CHKF', 'ZKKN'],
        jobs: ['作家', '編集者', '心理カウンセラー', 'クリエイティブディレクター'],
        motto: '表の顔も裏の顔も本物',
        celebImage: '有吉弘行のように二面性を持つタイプ',
    },
    // C(清潔) + K(休日) + R(規則) + N(夏型)
    CKRN: {
        code: 'CKRN',
        name: '自由な王様',
        emoji: '👑',
        shortDesc: '誰にも縛られない',
        personality: '休日に本領発揮するタイプ。夏が好きで、自分のルールで生きる王様気質。自由を愛し、束縛を嫌う。自分の世界観を大切にする。リーダーシップがあるが、協調性には課題があることも。',
        detailedDesc: '自分の王国（世界観）を持っている人。休日は自分のペースで動き、夏は特に活動的。他人に合わせるより、自分らしさを貫くことを選ぶ。その姿勢に惹かれる人も多いが、「わがまま」と誤解されることも。王様には臣下も必要—時には人を頼ることも大切。',
        strengths: ['リーダーシップ', '独自の世界観', '決断力がある', 'ブレない軸'],
        weaknesses: ['協調性に欠ける', '孤立しやすい', '頑固になりがち'],
        traits: ['自由人', '独自の価値観', '夏好き', 'マイルール'],
        advice: '周りとの調和も時には大切。協力することで広がる世界もある。',
        compatibility: ['ZHRF', 'ZKRN'],
        jobs: ['起業家', 'CEO', 'フリーランス', 'アーティスト'],
        motto: '自分の人生は自分で決める',
        celebImage: 'ホリエモンのように自分の道を賫くタイプ',
    },
    // C(清潔) + K(休日) + K(気まぐれ) + F(冬型)
    CKKF: {
        code: 'CKKF',
        name: '気まぐれ貴族',
        emoji: '🏰',
        shortDesc: '予測不能だが品がある',
        personality: '気まぐれで予測不能だが、どこか品がある不思議な魅力の持ち主。休日型で冬を好み、独自の美学を持つ。直感で動く芸術家タイプ。ルールに縛られず、自分の感性を大切にする。',
        detailedDesc: '貴族のような独自の美学を持ちながら、気まぐれに生きる。周囲からは「次に何をするかわからない」と思われるが、それが魅力でもある。冬の静けさの中でインスピレーションを得て、突然動き出す。その予測不能さが、あなたをユニークな存在にしている。',
        strengths: ['独自のセンス', '直感力が鋭い', '美的感覚', '型にはまらない'],
        weaknesses: ['計画性がない', '理解されにくい', '気分で動きすぎる'],
        traits: ['直感型', '美学重視', '予測不能', '独自のセンス'],
        advice: '計画性を少し足すと、もっと自由になれるかも。',
        compatibility: ['ZHRN', 'ZHKN'],
        jobs: ['アートディレクター', 'ファッションデザイナー', '建築家', 'フードコーディネーター'],
        motto: '美しく生きる',
        celebImage: '安藤忠雄のような独自の美学を持つタイプ',
    },
    // C(清潔) + K(休日) + K(気まぐれ) + N(夏型)
    CKKN: {
        code: 'CKKN',
        name: '夏風のジプシー',
        emoji: '🌊',
        shortDesc: '風のように現れて消える',
        personality: '自由奔放で、風のように生きる旅人タイプ。夏が大好きで、気まぐれに生きることを楽しむ。束縛を嫌い、新しい経験を求める冒険家。一つの場所に留まることが苦手。',
        detailedDesc: '風のように自由に生きるあなたは、一つの場所に留まることが苦手。夏は特に活動的で、新しい場所、新しい人、新しい経験を求めて動き回る。その自由さは魅力的だが、深い関係を築くのが苦手なことも。時には錨を下ろして、じっくり向き合う時間も必要。',
        strengths: ['冒険心旺盛', '新しいことへの好奇心', 'フットワーク', '束縛されない'],
        weaknesses: ['継続が苦手', '深い関係を築きにくい', '落ち着きがない'],
        traits: ['冒険心', '自由奔放', '好奇心旺盛', '束縛嫌い'],
        advice: '時には立ち止まって、今を味わうことも大切。',
        compatibility: ['ZHKF', 'ZKRF'],
        jobs: ['トラベルライター', 'フォトグラファー', 'バックパッカー', 'ツアーガイド'],
        motto: '人生は旅だ',
        celebImage: '高倉健のように世界を旅するタイプ',
    },
    // Z(ズボラ) + H(平日) + R(規則) + F(冬型)
    ZHRF: {
        code: 'ZHRF',
        name: '隠れ完璧主義者',
        emoji: '🎯',
        shortDesc: 'ズボラに見えて実は...',
        personality: '一見ズボラに見えるが、実は自分なりの完璧を追求している。平日型で規則的、効率を重視するタイプ。無駄を省いた合理的な生き方。「必要最小限」で最大の成果を出そうとする。',
        detailedDesc: '表面的にはズボラに見えるが、実は効率を極めた結果。「やらなくていいこと」を見極め、本当に必要なことにエネルギーを集中させる。平日は意外と規則的で、冬でも自分なりのルーティンがある。ミニマリスト的な生き方の達人。',
        strengths: ['効率重視', '本質を見抜く力', '無駄がない', '合理的思考'],
        weaknesses: ['手を抜きすぎる時がある', '他人から誤解されやすい', '完璧主義が隠れている'],
        traits: ['効率重視', '合理的', '実は完璧主義', 'ミニマリスト志向'],
        advice: '周りにも自分のスタイルを伝えよう。理解者が増えるはず。',
        compatibility: ['CKRN', 'CHRN'],
        jobs: ['システムエンジニア', 'データアナリスト', 'インフラエンジニア', '会計士'],
        motto: '効率こそ正義',
        celebImage: '中田敦彦のように効率を極めたタイプ',
    },
    // Z(ズボラ) + H(平日) + R(規則) + N(夏型)
    ZHRN: {
        code: 'ZHRN',
        name: '省エネの賢者',
        emoji: '🧙',
        shortDesc: '最小の努力で最大の成果',
        personality: '無駄なエネルギーを使わない省エネタイプ。効率的に生きることに長け、最小限の努力で結果を出す。賢く戦略的な頭脳派。「頑張りすぎない」ことの大切さを知っている。',
        detailedDesc: '賢者のように、エネルギーの使い方を熟知している。平日は規則的だが、夏は特に省エネモード。「頑張ること」と「頑張らないこと」を見極め、効率よく生きる。周囲からは「なぜあんなに楽そうなのに成果が出るの？」と不思議がられることも。',
        strengths: ['戦略的思考', 'エネルギー管理', '冷静な判断力', '持続可能なペース'],
        weaknesses: ['熱意が伝わりにくい', '手を抜いていると誤解される', 'もう少し頑張れる場面も'],
        traits: ['戦略家', '効率的', '頭脳派', 'エネルギー管理上手'],
        advice: '時には非効率な寄り道も、人生を豊かにする。',
        compatibility: ['CHKF', 'CHKN'],
        jobs: ['戦略コンサルタント', 'ファンドマネージャー', 'プロダクトマネージャー', 'リモートワーカー'],
        motto: '頑張らない勇気',
        celebImage: 'ひろゆきのように賢く省エネなタイプ',
    },
    // Z(ズボラ) + H(平日) + K(気まぐれ) + F(冬型)
    ZHKF: {
        code: 'ZHKF',
        name: '冬の修行僧',
        emoji: '🧘',
        shortDesc: '冬だけ本気を出す謎の存在',
        personality: '普段はゆるく生きているが、冬になると何かに目覚める謎めいた存在。気まぐれだが、ここぞという時に集中する瞬発力の持ち主。内なるエネルギーを溜め込んでいる。',
        detailedDesc: '普段は飄々としているが、冬になると何かのスイッチが入る不思議な人。平日も気まぐれに動くが、集中すると驚くほどの成果を出す。周囲からは「何を考えているかわからない」と思われるが、実は深い内面を持っている。',
        strengths: ['瞬発力', 'ここぞの集中力', '独自のリズム', '神秘的な魅力'],
        weaknesses: ['普段は何もしない', '理解されにくい', 'いつ動くか予測不能'],
        traits: ['ミステリアス', '瞬発力', 'ここぞの集中力', '独自のリズム'],
        advice: '普段からもう少し力を出すと、もっと楽に生きられるかも。',
        compatibility: ['CKKN', 'CKRF'],
        jobs: ['研究者', '小説家', 'インディーズクリエイター', '禁欲ボックス系'],
        motto: '沈黙は金',
        celebImage: '庇鬼ちゃんのように謎めいたタイプ',
    },
    // Z(ズボラ) + H(平日) + K(気まぐれ) + N(夏型)
    ZHKN: {
        code: 'ZHKN',
        name: '夏の哲学者',
        emoji: '📚',
        shortDesc: '深く考えすぎて動けない？',
        personality: '思考派で、物事を深く考える哲学者タイプ。夏が好きで、気まぐれに行動する。考えすぎて動けないこともあるが、洞察力は鋭い。「なぜ？」を常に考えている。',
        detailedDesc: '物事の本質を考えることが好きな哲学者タイプ。夏は思考がクリアになり、様々なアイデアが浮かぶ。ただし、考えすぎて行動に移せないことも。「完璧に考えてから動く」より「動きながら考える」を意識すると、もっと生きやすくなる。',
        strengths: ['深い洞察力', '本質を見抜く', '知的好奇心', '独自の視点'],
        weaknesses: ['行動に移せない', '考えすぎる', '優柔不断になりがち'],
        traits: ['思考派', '洞察力鋭い', '考えすぎ', '知的好奇心'],
        advice: 'まず動いてみよう。動きながら考えるのも良い。',
        compatibility: ['CKKF', 'CHRN'],
        jobs: ['哲学者', '評論家', 'ライター', '大学教授'],
        motto: 'なぜ？を追い続ける',
        celebImage: '松本人志のように深く考えるタイプ',
    },
    // Z(ズボラ) + K(休日) + R(規則) + F(冬型)
    ZKRF: {
        code: 'ZKRF',
        name: '週末だけの革命家',
        emoji: '✊',
        shortDesc: '休日に本当の自分が出る',
        personality: '平日は省エネで過ごし、休日に全力を出す革命家タイプ。規則的だが冬を好み、自分の時間を大切にする。内に秘めた情熱がある。',
        detailedDesc: '平日はエネルギーを温存し、休日に爆発させるタイプ。普段は静かだが、本気を出すと驚くほどのパワーを発揮する。冬でも規則的に動くが、それは「休日のため」。内なる情熱を持っており、信じることには全力で取り組む。',
        strengths: ['情熱的', 'メリハリがある', '信念がある', '休日の充実度'],
        weaknesses: ['平日はやる気がない', 'エネルギー配分が極端', '普段の評価が低め'],
        traits: ['情熱的', '休日全力', '内に秘めた力', 'オンオフ明確'],
        advice: '平日にもその情熱を少し出してみよう。',
        compatibility: ['CHKN', 'CKKN'],
        jobs: ['社会活動家', 'NPO職員', 'クリエイター', 'ブロガー'],
        motto: '信じることに全力',
        celebImage: '坂本龍一のように情熱を秘めたタイプ',
    },
    // Z(ズボラ) + K(休日) + R(規則) + N(夏型)
    ZKRN: {
        code: 'ZKRN',
        name: '永遠の自由人',
        emoji: '🦅',
        shortDesc: '誰よりも自分を知っている',
        personality: '自分を深く理解し、自分らしく生きる永遠の自由人。休日型で夏を愛し、規則的だが自分のルールで生きる。自己肯定感が高い。他人の目を気にせず、自分の道を歩む。',
        detailedDesc: '自分自身を深く理解し、他人の評価に左右されない強さを持つ。休日は自分のペースで動き、夏は特に自由を満喫する。「自分らしさ」を大切にする姿勢は、周囲の人にも勇気を与える。ただし、その自由さを分かち合うことで、より豊かな人生になる。',
        strengths: ['自己理解が深い', '自己肯定感が高い', 'ブレない', '他人に影響されない'],
        weaknesses: ['孤立しがち', '協調性に欠ける', '自分の殻に閉じこもる'],
        traits: ['自己理解深い', '自己肯定感高い', '自分らしさ重視', '独立心'],
        advice: 'その自由さを周りにも分けてあげよう。',
        compatibility: ['CKRN', 'CHRF'],
        jobs: ['ノマドワーカー', 'ブロガー', 'ヨガインストラクター', '自由業'],
        motto: '自分らしく生きる',
        celebImage: 'マツコデラックスのように自由に生きるタイプ',
    },
    // Z(ズボラ) + K(休日) + K(気まぐれ) + F(冬型)
    ZKKF: {
        code: 'ZKKF',
        name: '冬眠するアーティスト',
        emoji: '🎨',
        shortDesc: '創造性が爆発する瞬間がある',
        personality: '普段はゆるく過ごすが、創造性が爆発する瞬間がある芸術家タイプ。冬を好み、気まぐれに生きる。独自の世界観と感性を持つ。インスピレーションが降りてきた時の集中力は驚異的。',
        detailedDesc: '普段はゆったりと過ごし、冬は特に内向的になるが、創造性のスイッチが入ると別人のように活動する。アーティスト気質で、独自の感性と世界観を持っている。「作品」を生み出す瞬間のために、普段は休んでいるとも言える。',
        strengths: ['創造性', '独自の感性', 'インスピレーション', '表現力'],
        weaknesses: ['気分の波が激しい', '締め切りに弱い', '理解されにくい'],
        traits: ['創造的', '感性豊か', '独自の世界観', 'インスピレーション型'],
        advice: '創造性を形にする習慣をつけよう。',
        compatibility: ['CHRN', 'ZHKN'],
        jobs: ['画家', '音楽家', '映像クリエイター', 'イラストレーター'],
        motto: 'インスピレーションが全て',
        celebImage: '米津玄師のように芸術的なタイプ',
    },
    // Z(ズボラ) + K(休日) + K(気まぐれ) + N(夏型)
    ZKKN: {
        code: 'ZKKN',
        name: '究極のマイペース',
        emoji: '🌈',
        shortDesc: '唯一無二、比較不能',
        personality: '誰とも比較できない唯一無二の存在。完全に自分のペースで生き、夏を愛し、気まぐれを楽しむ。自由を体現した究極のマイペース人間。「普通」という概念が最も遠い存在。',
        detailedDesc: 'あらゆる型にはまらない、完全なるオリジナル。休日は自分の好きなように過ごし、夏は特に自由を謳歌する。他人のペースに合わせることが最も苦手だが、その「マイペースさ」こそが最大の魅力。世界に一人しかいない、唯一無二の存在。',
        strengths: ['唯一無二', 'ストレスが少ない', '自分らしい', '比較しない'],
        weaknesses: ['社会適応が苦手', '約束や締め切りに弱い', '理解者が少ない'],
        traits: ['唯一無二', '完全マイペース', '比較しない', '自由の体現者'],
        advice: '自分らしさを大切にしながら、時には周りとも歩調を合わせよう。',
        compatibility: ['CHRF', 'CKRF'],
        jobs: ['インフルエンサー', 'YouTuber', '自由業', '作家'],
        motto: '比較しない、競争しない',
        celebImage: 'フワちゃんのように唯一無二なタイプ',
    },
};
