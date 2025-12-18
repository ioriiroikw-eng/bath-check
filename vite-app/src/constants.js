
export const STATUS_MESSAGES = {
    high: ["全人類見て✨", "今なら無敵モード", "毛穴？何それ美味しいの？", "オーラで見えません", "フローラルな香り漂う", "鏡を見るのが楽しい", "清潔感の塊", "世界が私に恋してる"],
    mid: ["まだ舞えるはず", "ギリ人間保ってます", "急な呼び出しはNGで", "フィルタかければ余裕", "近づいても大丈夫...たぶん", "清潔感...70点くらい？", "可もなく不可もなく", "明日の私に期待"],
    low: ["半径2m接近禁止", "帽子とマスクが本体", "前髪がバーコード", "Zoomなら耐える", "野生の香りがする", "誰にも会いたくない", "頭皮がかゆい気がする", "自分から逃げたい"],
    bad: ["社会的に死😇", "お風呂...どこ...", "人権を失いました", "ハエが友達", "触るな危険", "バイオハザード発生中", "終わりの始まり", "記憶から消去したい"]
};

export const ZUBORA_CONVERSIONS = [
    { type: 'time', min: 30, text: 'TikTok 60本分', icon: '📱' },
    { type: 'time', min: 30, text: '推しのMV 7回再生', icon: '🎵' },
    { type: 'time', min: 30, text: 'LINE未読 20件消化', icon: '💬' },
    { type: 'time', min: 30, text: '前髪セット 3回やり直し', icon: '💇‍♀️' },
    { type: 'time', min: 30, text: '至福の二度寝 3セット', icon: '🛌' },
    { type: 'time', min: 30, text: 'ペットを吸う時間', icon: '🐈' },
    { type: 'time', min: 30, text: '天井のシミを数える虚無', icon: '😶' },
    { type: 'time', min: 60, text: '推しの配信アーカイブ', icon: '📺' },
    { type: 'time', min: 120, text: '映画1本', icon: '🎬' },
    { type: 'money', min: 30, text: 'スタバのトッピング1つ', icon: '☕️' },
    { type: 'money', min: 60, text: 'コンビニのおにぎり1個', icon: '🍙' },
    { type: 'money', min: 150, text: 'キャンメイクの新作コスメ', icon: '💄' },
    { type: 'money', min: 180, text: 'マックのセット', icon: '🍔' },
];

export const RANK_TITLES = [
    { lv: 1, title: '見習いサボり魔' },
    { lv: 5, title: '省エネの達人' },
    { lv: 10, title: 'ズボラ界のルーキー' },
    { lv: 20, title: '入浴拒否のプロ' },
    { lv: 30, title: '虚無の支配者' },
    { lv: 50, title: 'お風呂？何それ' },
    { lv: 80, title: '伝説のドライ人間' },
    { lv: 100, title: '入浴の概念を忘れた神' },
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

export const SE_POP_URL = "./audio/se_pop.mp3";
export const SE_KIRA_URL = "./audio/se_kira.mp3";
export const BGM_URL = "./audio/bgm.mp3"; 
