// utils/data.ts - 味道星球食谱小程序 - 完整数据层
import { request } from './request'

export interface Ingredient {
  id: string
  name: string
  category: 'vegetable' | 'meat' | 'grain_fruit'
  emoji: string
}
// ... (接口定义保持不变)

export interface CookingMethod {
  id: string
  name: string
  emoji: string
}

export interface Recipe {
  id: string
  name: string
  image: string
  ingredients: string[]
  cookingMethod: string
  cuisine: string
  difficulty: string
  time: string
  steps: string[]
  tips: string
  culture: string
  rating: number
  ratingCount: number
  isUserCreated: boolean
  region: string
  author: string
  searchKeywords?: string[]
  nutrition?: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}

export interface Review {
  id: string
  userName: string
  avatar: string
  score: number
  comment: string
  time: string
}

// ========== 饮食文化文章 ==========
export interface Article {
  id: string
  title: string
  cover: string
  summary: string
  content: string
  author: string
  authorAvatar: string
  publishTime: string
  readTime: string
  rating: number
  ratingCount: number
  tags: string[]
  isUserCreated: boolean
  userRatings: number[]
}

export interface ArticleComment {
  id: string
  userName: string
  avatar: string
  content: string
  time: string
  likes: number
}

export interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  images: string[]
  recipeId: string
  recipeName: string
  likes: number
  comments: number
  time: string
  isAI: boolean
  isUserCreated: boolean
  likedByUser: boolean
}

// ========== 热门搜索记录 ==========
export interface SearchRecord {
  keyword: string
  count: number
  lastSearchTime: number
}

export interface AIGeneratedRecipe {
  id: string
  name: string
  ingredients: string[]
  cookingMethod: string
  cuisine: string
  difficulty: string
  time: string
  steps: string[]
  tips: string
  culture: string
  reason: string
  generatedAt: string
}

// ========== 食材数据 ==========
export const vegetables: Ingredient[] = [
  { id: 'v1', name: '白菜', category: 'vegetable', emoji: '🥬' },
  { id: 'v2', name: '土豆', category: 'vegetable', emoji: '🥔' },
  { id: 'v3', name: '番茄', category: 'vegetable', emoji: '🍅' },
  { id: 'v4', name: '豆腐', category: 'vegetable', emoji: '🧈' },
  { id: 'v5', name: '茄子', category: 'vegetable', emoji: '🍆' },
  { id: 'v6', name: '青椒', category: 'vegetable', emoji: '🫑' },
  { id: 'v7', name: '黄瓜', category: 'vegetable', emoji: '🥒' },
  { id: 'v8', name: '胡萝卜', category: 'vegetable', emoji: '🥕' },
  { id: 'v9', name: '菠菜', category: 'vegetable', emoji: '🥗' },
  { id: 'v10', name: '蘑菇', category: 'vegetable', emoji: '🍄' },
  { id: 'v11', name: '木耳', category: 'vegetable', emoji: '🍂' },
  { id: 'v12', name: '冬瓜', category: 'vegetable', emoji: '🎃' },
  { id: 'v13', name: '莲藕', category: 'vegetable', emoji: '🥯' },
  { id: 'v14', name: '西蓝花', category: 'vegetable', emoji: '🥦' },
  { id: 'v15', name: '豆角', category: 'vegetable', emoji: '🫛' },
  { id: 'v16', name: '生菜', category: 'vegetable', emoji: '🥬' },
]

export const meats: Ingredient[] = [
  { id: 'm1', name: '猪肉', category: 'meat', emoji: '🥩' },
  { id: 'm2', name: '牛肉', category: 'meat', emoji: '🥩' },
  { id: 'm3', name: '鸡肉', category: 'meat', emoji: '🍗' },
  { id: 'm4', name: '鱼', category: 'meat', emoji: '🐟' },
  { id: 'm5', name: '虾', category: 'meat', emoji: '🦐' },
  { id: 'm6', name: '羊肉', category: 'meat', emoji: '🍖' },
  { id: 'm7', name: '鸭肉', category: 'meat', emoji: '🦆' },
  { id: 'm8', name: '排骨', category: 'meat', emoji: '🦴' },
  { id: 'm9', name: '五花肉', category: 'meat', emoji: '🥓' },
  { id: 'm10', name: '牛腩', category: 'meat', emoji: '🥩' },
  { id: 'm11', name: '里脊', category: 'meat', emoji: '🥩' },
  { id: 'm12', name: '鸡蛋', category: 'meat', emoji: '🥚' },
]

export const grainsFruits: Ingredient[] = [
  { id: 'g1', name: '面条', category: 'grain_fruit', emoji: '🍜' },
  { id: 'g2', name: '米饭', category: 'grain_fruit', emoji: '🍚' },
  { id: 'g3', name: '馒头', category: 'grain_fruit', emoji: '🍞' },
  { id: 'g4', name: '饺子皮', category: 'grain_fruit', emoji: '🥟' },
  { id: 'g5', name: '苹果', category: 'grain_fruit', emoji: '🍎' },
  { id: 'g6', name: '柠檬', category: 'grain_fruit', emoji: '🍋' },
  { id: 'g7', name: '面粉', category: 'grain_fruit', emoji: '🌾' },
  { id: 'g8', name: '糯米', category: 'grain_fruit', emoji: '🌾' },
  { id: 'g9', name: '玉米', category: 'grain_fruit', emoji: '🌽' },
  { id: 'g10', name: '红薯', category: 'grain_fruit', emoji: '🍠' },
  { id: 'g11', name: '南瓜', category: 'grain_fruit', emoji: '🎃' },
  { id: 'g12', name: '紫薯', category: 'grain_fruit', emoji: '🍠' },
  { id: 'g13', name: '花椒', category: 'grain_fruit', emoji: '🌶️' },
  { id: 'g14', name: '粉丝', category: 'grain_fruit', emoji: '🍜' },
  { id: 'g15', name: '年糕', category: 'grain_fruit', emoji: '🍡' },
]

// ========== 烹饪方式 ==========
export const cookingMethods: CookingMethod[] = [
  { id: 'c1', name: '炒', emoji: '🍳' },
  { id: 'c2', name: '蒸', emoji: '♨️' },
  { id: 'c3', name: '煮', emoji: '🫕' },
  { id: 'c4', name: '烤', emoji: '🔥' },
  { id: 'c5', name: '炸', emoji: '🍟' },
  { id: 'c6', name: '凉拌', emoji: '🥗' },
  { id: 'c7', name: '炖', emoji: '🍲' },
  { id: 'c8', name: '煎', emoji: '🥘' },
  { id: 'c9', name: '焖', emoji: '🥘' },
  { id: 'c10', name: '卤', emoji: '🥘' },
  { id: 'c11', name: '微波', emoji: '📡' },
]

// ========== 菜系列表 ==========
export const cuisines: string[] = [
  '全部', '川菜', '粤菜', '鲁菜', '苏菜', '浙菜', '湘菜',
  '闽菜', '徽菜', '家常菜', '西北菜', '东北菜', '创意菜'
]

// ========== 食谱数据 ==========
export const recipes: Recipe[] = [
  {
    id: 'r1', name: '番茄炒蛋', image: '/images/recipes/fanqiechaodan.png',
    ingredients: ['番茄', '鸡蛋'], cookingMethod: '炒', cuisine: '家常菜',
    difficulty: '简单', time: '15分钟',
    steps: ['番茄洗净切块，鸡蛋打散加少许盐搅匀', '锅中倒油烧热，倒入蛋液，用筷子快速搅散，盛出备用', '锅中再加少许油，放入番茄块翻炒出汁', '加入适量糖、盐调味，倒入炒好的鸡蛋翻炒均匀', '出锅前撒上葱花即可'],
    tips: '番茄要炒出汁才好吃；鸡蛋不要炒太老，七八分熟盛出最佳；可以加一点糖提鲜去酸。',
    culture: '番茄炒蛋是中国最普及的家常菜之一，几乎每个中国家庭都会做。它体现了中式烹饪"简单食材、丰富味道"的哲学。番茄在明朝传入中国，最初被视为观赏植物，直到近代才成为餐桌常客。',
    rating: 4.8, ratingCount: 2560, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r2', name: '宫保鸡丁', image: '/images/recipes/gongbaojiding.png',
    ingredients: ['鸡肉', '青椒', '胡萝卜'], cookingMethod: '炒', cuisine: '川菜',
    difficulty: '中等', time: '30分钟',
    steps: ['鸡胸肉切丁，加料酒、酱油、淀粉腌制15分钟', '调制宫保汁：醋2勺、酱油1勺、糖1勺、淀粉半勺、水适量混合', '花生米小火炸至金黄捞出，干辣椒切段，葱姜蒜切末', '锅中热油，放入花椒、干辣椒炒香，放入鸡丁滑炒变色', '加入葱姜蒜翻炒，倒入宫保汁翻炒均匀', '最后加入花生米快速翻炒出锅'],
    tips: '鸡丁腌制时间要够；花生米要最后放，避免受潮变软；火候要大，快速翻炒保持鸡肉嫩滑。',
    culture: '宫保鸡丁源自清朝四川总督丁宝桢，因其官衔"太子少保"（宫保），故名。此菜融合了甜、酸、辣三味，是川菜中最具代表性的菜品之一。',
    rating: 4.7, ratingCount: 3200, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r3', name: '红烧排骨', image: '/images/recipes/hongshaopaigu.png',
    ingredients: ['排骨'], cookingMethod: '炖', cuisine: '家常菜',
    difficulty: '中等', time: '60分钟',
    steps: ['排骨洗净冷水下锅焯水，撇去浮沫后捞出', '锅中放油，加入冰糖小火炒至焦糖色', '放入排骨翻炒上色，加入葱姜、八角、桂皮', '加入料酒、生抽、老抽翻炒均匀', '加入热水没过排骨，大火烧开后转小火炖40分钟', '大火收汁至浓稠即可出锅'],
    tips: '焯水要冷水下锅；炒糖色时火不要太大，避免发苦；炖的时候一定要加热水，冷水会让肉发紧。',
    culture: '红烧是中国最经典的烹饪技法之一，红烧排骨是几乎所有中国人的童年味道。红烧讲究"色泽红亮、酱香浓郁、肉质酥烂"。',
    rating: 4.9, ratingCount: 4100, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r4', name: '清蒸鲈鱼', image: '/images/recipes/qingzhengluyu.png',
    ingredients: ['鱼'], cookingMethod: '蒸', cuisine: '粤菜',
    difficulty: '中等', time: '25分钟',
    steps: ['鲈鱼处理干净，两面划几刀便于入味', '鱼身抹少许盐和料酒腌制10分钟', '盘中放葱段和姜片，鱼放在上面', '水烧开后放入鱼，大火蒸8-10分钟', '取出倒掉蒸出的汤汁，铺上葱丝和姜丝', '淋上蒸鱼豉油，浇上热油激发香气'],
    tips: '蒸鱼时间不宜过长，8-10分钟即可，过久鱼肉会老；最后浇热油是关键，能激发葱姜的香气。',
    culture: '清蒸鱼是粤菜的代表作，体现了"清、鲜、嫩、滑"的粤菜精髓。广东人讲究食材本味，认为最好的鱼就应该清蒸。',
    rating: 4.6, ratingCount: 1800, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r5', name: '麻婆豆腐', image: '/images/recipes/mapodoufu.png',
    ingredients: ['豆腐', '猪肉'], cookingMethod: '煮', cuisine: '川菜',
    difficulty: '简单', time: '20分钟',
    steps: ['豆腐切小块，放入加了盐的开水中焯2分钟捞出', '猪肉末加酱油、料酒拌匀', '锅中热油，放入肉末炒散变色', '加入郫县豆瓣酱炒出红油，加入姜蒜末', '加适量水烧开，放入豆腐轻轻推匀，小火煮5分钟', '加盐调味，水淀粉勾芡，撒上花椒粉和葱花'],
    tips: '豆腐先焯水可以去豆腥味且不易碎；用勺子推而不是翻炒，避免豆腐碎裂；花椒粉最后撒效果最好。',
    culture: '麻婆豆腐创始于清同治年间，成都万福桥边一家小店的陈麻婆所创。此菜集"麻、辣、烫、香、酥、嫩、鲜、活"八字于一体。',
    rating: 4.7, ratingCount: 2900, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r6', name: '白菜炖豆腐', image: '/images/recipes/baicaidundoufu.png',
    ingredients: ['白菜', '豆腐'], cookingMethod: '炖', cuisine: '家常菜',
    difficulty: '简单', time: '25分钟',
    steps: ['白菜洗净切段，豆腐切块', '锅中热油，放入葱姜爆香', '放入白菜帮翻炒至微软', '加入豆腐块，倒入适量清水', '大火烧开转小火炖15分钟', '加盐、胡椒粉调味，放入白菜叶煮2分钟即可'],
    tips: '白菜帮和叶要分开放，帮先放叶后放；豆腐不要翻动太多，容易碎；汤底可以用高汤代替清水更鲜美。',
    culture: '白菜炖豆腐是中国北方冬季最常见的家常菜，尤其在东北地区极为流行。',
    rating: 4.5, ratingCount: 1500, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r7', name: '鱼香茄子', image: '/images/recipes/yuxiangqiezi.png',
    ingredients: ['茄子', '猪肉'], cookingMethod: '炒', cuisine: '川菜',
    difficulty: '中等', time: '25分钟',
    steps: ['茄子切条，撒盐腌10分钟后挤干水分', '调制鱼香汁：醋2勺、糖1.5勺、酱油1勺、淀粉半勺、水适量', '锅中多放油，将茄子煎至两面金黄盛出', '锅留底油，放入肉末炒散，加入郫县豆瓣酱炒出红油', '加入姜蒜末、泡椒翻炒出香', '放入茄子，倒入鱼香汁翻炒均匀，撒葱花出锅'],
    tips: '茄子提前腌制可以减少吸油量；鱼香汁的比例很关键，酸甜咸要平衡；茄子不要过度翻炒以保持形状。',
    culture: '"鱼香"是川菜特有的味型，并非用鱼来调味，而是借鉴了泡鱼时的调料配比，创造出酸甜辣鲜的复合味道。',
    rating: 4.6, ratingCount: 2100, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r8', name: '糖醋排骨', image: '/images/recipes/tangcupaigu.png',
    ingredients: ['排骨'], cookingMethod: '炸', cuisine: '鲁菜',
    difficulty: '中等', time: '45分钟',
    steps: ['排骨切小段，冷水焯去血沫', '排骨加料酒、酱油、姜片腌制20分钟', '排骨裹上薄薄一层淀粉', '油温六成热时下锅炸至金黄捞出，复炸一次更酥脆', '调制糖醋汁：番茄酱2勺、醋2勺、糖3勺、酱油1勺、水适量', '锅中烧热糖醋汁，放入排骨快速翻炒裹匀，撒芝麻出锅'],
    tips: '复炸能使排骨更酥脆；糖醋汁要提前调好，下锅后快速翻炒；排骨大小要均匀，受热才一致。',
    culture: '糖醋是中国古老的调味方式，源自鲁菜体系。鲁菜是中国八大菜系之首，讲究"清香、鲜嫩、味纯"。',
    rating: 4.8, ratingCount: 3500, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r9', name: '水煮牛肉', image: '/images/recipes/shuizhuniurou.png',
    ingredients: ['牛肉', '白菜', '蘑菇'], cookingMethod: '煮', cuisine: '川菜',
    difficulty: '较难', time: '40分钟',
    steps: ['牛肉逆纹切薄片，加料酒、酱油、蛋清、淀粉腌制', '白菜、豆芽等蔬菜焯水铺在碗底', '锅中热油，炒香豆瓣酱、花椒、干辣椒、姜蒜', '加入高汤煮开，调味后将牛肉片逐片放入', '牛肉变色即捞出铺在蔬菜上', '碗面撒上蒜末、辣椒面、花椒面，浇上滚烫热油'],
    tips: '牛肉片要薄且逆纹切，口感才嫩；牛肉下锅后不要搅动，变色就捞；最后浇油一定要足够热才能激发香味。',
    culture: '水煮牛肉源于四川自贡，原是盐场工人的日常菜肴。此菜以"麻、辣、鲜、香"著称，是川菜中豪放风格的代表。',
    rating: 4.8, ratingCount: 2800, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r10', name: '蒜蓉蒸虾', image: '/images/recipes/suanrongzhengxia.png',
    ingredients: ['虾'], cookingMethod: '蒸', cuisine: '粤菜',
    difficulty: '简单', time: '20分钟',
    steps: ['虾去虾线，从背部剖开但不切断', '粉丝提前泡软，铺在盘底', '虾摆放在粉丝上', '大量蒜末用油炒至微黄，加入蒸鱼豉油拌匀', '将蒜蓉酱铺在每只虾上', '水开后大火蒸6-8分钟，取出撒葱花'],
    tips: '虾一定要新鲜；蒸的时间不要过长，6-8分钟足够；蒜蓉要用油炒过才香而不辣。',
    culture: '蒜蓉蒸虾是粤菜中经典的海鲜做法，体现了粤菜"鲜"字当头的烹饪理念。',
    rating: 4.7, ratingCount: 2200, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r11', name: '凉拌黄瓜', image: '/images/recipes/liangbanhuanggua.png',
    ingredients: ['黄瓜'], cookingMethod: '凉拌', cuisine: '家常菜',
    difficulty: '简单', time: '10分钟',
    steps: ['黄瓜洗净，用刀拍松后切段', '加入蒜末、盐腌制5分钟', '调制酱汁：生抽、醋、香油、辣椒油混合', '将酱汁浇在黄瓜上拌匀', '撒上白芝麻和香菜即可'],
    tips: '黄瓜要拍不要切，拍出来更入味；腌制后记得倒掉多余的水分；可根据口味加入花生碎增加口感。',
    culture: '凉拌菜是中国饮食中重要的组成部分，尤其在炎热的夏季。中医认为黄瓜性凉，可清热解暑。',
    rating: 4.5, ratingCount: 3800, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r12', name: '红烧肉', image: '/images/recipes/hongshaorrou.png',
    ingredients: ['猪肉'], cookingMethod: '炖', cuisine: '家常菜',
    difficulty: '中等', time: '90分钟',
    steps: ['五花肉切方块，冷水下锅焯水后捞出', '锅中放油，加冰糖小火炒至深琥珀色', '放入肉块翻炒上色', '加入料酒、生抽、老抽、葱姜、八角、桂皮', '加热水没过肉块，大火烧开转小火慢炖1小时', '大火收汁至浓稠，汤汁裹满每块肉即可'],
    tips: '五花肉要选肥瘦相间的；焯水后用温水冲洗干净；小火慢炖是关键，急不得；收汁时要不断翻动防止粘锅。',
    culture: '红烧肉在中国饮食文化中地位极高，苏东坡发明的"东坡肉"即是红烧肉的升级版。毛主席也酷爱红烧肉。',
    rating: 4.9, ratingCount: 5200, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r13', name: '酸辣土豆丝', image: '/images/recipes/suanlatudousi.png',
    ingredients: ['土豆', '青椒'], cookingMethod: '炒', cuisine: '家常菜',
    difficulty: '简单', time: '15分钟',
    steps: ['土豆去皮切细丝，泡水洗去淀粉', '青椒切丝，干辣椒切段，蒜切片', '锅中热油，放入花椒炸香后捞出', '放入干辣椒、蒜片爆香', '大火快速翻炒土豆丝，加入青椒丝', '沿锅边淋入醋，加盐调味，翻炒均匀出锅'],
    tips: '土豆丝要切均匀、泡水去除淀粉才会脆；全程大火快炒；醋要沿锅边淋入，遇热蒸发才能去酸留香。',
    culture: '酸辣土豆丝是中国最受欢迎的下饭菜之一，是"国民菜"的代表。',
    rating: 4.6, ratingCount: 4500, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r14', name: '烤羊肉串', image: '/images/recipes/kaoyangroupchuan.png',
    ingredients: ['羊肉'], cookingMethod: '烤', cuisine: '西北菜',
    difficulty: '中等', time: '30分钟',
    steps: ['羊肉切2cm方块，加洋葱丝、料酒、盐腌制30分钟', '准备烤料：孜然粉、辣椒面、盐混合', '将羊肉串在竹签上，每串5-6块', '烤箱预热220度或炭火烤炉准备好', '羊肉串放上去烤，每面烤3-4分钟', '翻面时撒上烤料，两面金黄即可'],
    tips: '羊肉要选带些肥的部位才不柴；腌制时加洋葱可去膻味；烤的时候火候要大，外焦里嫩最佳。',
    culture: '烤羊肉串源自新疆维吾尔族的传统美食，随着丝绸之路的文化交流传遍全国。',
    rating: 4.8, ratingCount: 3100, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r15', name: '东北锅包肉', image: '/images/recipes/guobaorrou.png',
    ingredients: ['猪肉', '胡萝卜'], cookingMethod: '炸', cuisine: '东北菜',
    difficulty: '较难', time: '40分钟',
    steps: ['猪里脊切薄片，加盐、料酒腌制10分钟', '调制面糊：淀粉加适量水搅成浓稠糊状', '肉片裹上面糊', '油温六成热下锅炸至定型捞出，升高油温复炸至金黄酥脆', '调制酱汁：白醋3勺、糖2勺、番茄酱1勺、盐少许', '锅中少许油烧热酱汁，倒入炸好的肉片快速翻匀出锅'],
    tips: '面糊浓度很关键，太稀挂不住、太厚不酥脆；复炸是酥脆的秘诀；糖醋汁要快速裹匀，不能泡着。',
    culture: '锅包肉是东北菜的经典代表，由清光绪年间哈尔滨道台府厨师郑兴文所创。',
    rating: 4.7, ratingCount: 2600, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r16', name: '西红柿牛腩', image: '/images/recipes/xihongshiniulan.png',
    ingredients: ['番茄', '牛肉', '土豆'], cookingMethod: '炖', cuisine: '家常菜',
    difficulty: '中等', time: '90分钟',
    steps: ['牛腩切块焯水洗净，番茄切块，土豆切块', '锅中热油，放入番茄炒出汤汁', '加入一勺番茄酱翻炒', '放入牛腩翻炒均匀', '加入足量热水，放入八角、香叶，大火烧开转小火炖1小时', '加入土豆块继续炖20分钟，加盐调味即可'],
    tips: '牛腩要选筋膜多的部位，炖出来才软糯；番茄要充分炒出汁；小火慢炖才能让牛肉入味软烂。',
    culture: '西红柿牛腩是一道中西合璧的家常菜，汤汁拌饭或配面条都是绝佳选择。',
    rating: 4.7, ratingCount: 2400, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r17', name: '蘑菇炒肉', image: '/images/recipes/moguchaorrou.png',
    ingredients: ['蘑菇', '猪肉', '青椒'], cookingMethod: '炒', cuisine: '家常菜',
    difficulty: '简单', time: '15分钟',
    steps: ['蘑菇洗净切片，猪肉切片加料酒淀粉腌制', '青椒切块，葱姜蒜切好', '锅中热油，肉片滑炒变色盛出', '锅中再加少许油，放蘑菇翻炒出水分', '加入青椒、葱姜蒜翻炒', '放回肉片，加盐、酱油调味翻匀出锅'],
    tips: '蘑菇要先炒出水分再加其他食材；肉片不要炒太久，保持嫩滑；可加蚝油提鲜。',
    culture: '中国是世界上最早认识并利用蘑菇的国家，食用菌文化已有数千年历史。',
    rating: 4.4, ratingCount: 1600, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r18', name: '菠菜豆腐汤', image: '/images/recipes/bocaidoufutang.png',
    ingredients: ['菠菜', '豆腐'], cookingMethod: '煮', cuisine: '家常菜',
    difficulty: '简单', time: '15分钟',
    steps: ['菠菜洗净焯水后切段，豆腐切小块', '锅中加水或高汤烧开', '放入豆腐煮3分钟', '加入菠菜煮1分钟', '加入盐、胡椒粉、香油调味', '撒上葱花即可出锅'],
    tips: '菠菜一定要先焯水去除草酸；豆腐要嫩豆腐才好喝；不要煮太久，保持菠菜翠绿色。',
    culture: '汤在中国饮食中具有极其重要的地位，"饭前一碗汤"是许多中国家庭的习惯。',
    rating: 4.3, ratingCount: 1200, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r19', name: '炸鸡翅', image: '/images/recipes/zhajichi.png',
    ingredients: ['鸡肉', '面粉'], cookingMethod: '炸', cuisine: '家常菜',
    difficulty: '简单', time: '30分钟',
    steps: ['鸡翅洗净，两面划口，加料酒、酱油、盐、姜片腌制2小时', '准备裹粉：面粉、淀粉、五香粉、盐混合', '鸡翅先蘸蛋液，再裹上混合粉', '油温五成热下鸡翅，中火炸至定型', '捞出，升高油温至七成热复炸至金黄酥脆', '捞出控油，撒上辣椒粉或椒盐'],
    tips: '腌制时间要够才入味；复炸是酥脆的关键；油温控制很重要，第一次中火、第二次大火。',
    culture: '虽然炸鸡在西方很流行，但中国的炸鸡翅有着自己的风味体系，注重腌制入味和香料运用。',
    rating: 4.6, ratingCount: 2800, isUserCreated: false, region: '', author: '平台精选'
  },
  {
    id: 'r20', name: '手擀面', image: '/images/recipes/shouganmian.png',
    ingredients: ['面粉', '番茄', '鸡蛋'], cookingMethod: '煮', cuisine: '家常菜',
    difficulty: '中等', time: '60分钟',
    steps: ['面粉加适量水和成面团，醒面30分钟', '面团擀成薄片，撒干面粉防粘', '将面片折叠后切成面条', '烧一锅开水，下入面条煮至浮起', '准备浇头：番茄炒蛋或其他喜欢的配菜', '面条捞出，浇上浇头即可'],
    tips: '和面时水要慢慢加，面团不粘手为宜；醒面时间要够；擀面时要均匀用力，厚薄一致。',
    culture: '面条是中国最古老的食物之一，已有四千多年历史。手擀面代表了中国面食文化中"手作"的温度。',
    rating: 4.5, ratingCount: 1900, isUserCreated: false, region: '', author: '平台精选'
  },
]

// ========== AI创想食谱 ==========
export const aiRecipes: Recipe[] = [
  {
    id: 'ai1', name: '柠檬蜜汁烤鸡翅', image: '/images/recipes/ai_jichi.png',
    ingredients: ['鸡肉', '柠檬'], cookingMethod: '烤', cuisine: '创意菜',
    difficulty: '简单', time: '30分钟(不含腌制)',
    steps: ['鸡翅两面划口，方便入味', '调制腌料：柠檬汁2个、蜂蜜3勺、酱油2勺、蒜蓉适量、黑胡椒', '鸡翅放入腌料中腌制4小时以上', '烤箱预热200度，鸡翅放入烤盘', '烤25分钟，每10分钟取出刷一次蜜汁', '出炉后挤上新鲜柠檬汁，撒上迷迭香'],
    tips: '腌制时间越长越入味；烤的时候注意观察颜色，防止烤焦；柠檬汁最后再挤，保持清香。',
    culture: '这是一道中西融合的创意菜，将西式烤鸡翅的做法与中式腌制技巧结合，柠檬的清新搭配蜂蜜的香甜。',
    rating: 4.5, ratingCount: 180, isUserCreated: false, region: '', author: 'AI创想'
  },
  {
    id: 'ai2', name: '红薯芝士焗饭', image: '/images/recipes/ai_jushu.png',
    ingredients: ['红薯', '米饭', '玉米'], cookingMethod: '烤', cuisine: '创意菜',
    difficulty: '简单', time: '35分钟',
    steps: ['红薯蒸熟后去皮压泥', '米饭与红薯泥、玉米粒、青豆混合拌匀', '加入少许盐和黑胡椒调味', '混合物放入烤碗中铺平', '表面铺上马苏里拉芝士', '烤箱200度烤15分钟至芝士金黄拉丝'],
    tips: '红薯要选择甜度高的品种；芝士量要足够才能拉丝；可以加入培根丁增加风味。',
    culture: '焗饭是港式茶餐厅的经典美食，融合了西式烘焙与中式米饭文化。',
    rating: 4.3, ratingCount: 120, isUserCreated: false, region: '', author: 'AI创想'
  },
]

// ========== 饮食文化文章数据 ==========
export const articles: Article[] = [
  {
    id: 'a1',
    title: '中国八大菜系：品味中华饮食文化的精髓',
    cover: '/images/articles/cuisine.jpg',
    summary: '鲁、川、苏、粤、闽、浙、湘、徽，八大菜系各具特色，共同构成了中华饮食文化的瑰丽画卷。本文带你深入了解各大菜系的起源、特色与代表名菜。',
    content: `中国饮食文化源远流长，博大精深。在漫长的历史发展中，由于地理环境、气候物产、文化传统以及民族习俗等方面的差异，中国逐渐形成了各具特色的菜系。

目前公认的中国八大菜系包括：鲁菜、川菜、苏菜、粤菜、闽菜、浙菜、湘菜和徽菜。

**鲁菜**是八大菜系之首，起源于山东。鲁菜讲究清香、鲜嫩、味纯，以爆、炒、烧、炸、溜等技法著称。代表菜有葱烧海参、糖醋鲤鱼等。

**川菜**以"百菜百味"著称，尤以麻、辣、鲜、香闻名。川菜善用辣椒、花椒，讲究"一菜一格，百菜百味"。代表菜有麻婆豆腐、回锅肉、水煮鱼等。

**苏菜**又称淮扬菜，起源于江苏扬州、苏州一带。苏菜讲究原汁原味，清鲜平和，菜品风格雅丽。代表菜有松鼠鳜鱼、狮子头等。

**粤菜**以广州菜为代表，讲究"清、鲜、嫩、滑、爽、香"。粤菜善于利用食材的原汁原味，调味追求清鲜。代表菜有白切鸡、叉烧、烤乳猪等。

**闽菜**以福州菜为代表，善于烹制海鲜，以清鲜、荤香、不腻见长。代表菜有佛跳墙、鸡汤氽海蚌等。

**浙菜**以杭州、宁波、绍兴菜为代表，讲究鲜嫩软滑，口味清淡。代表菜有东坡肉、西湖醋鱼、龙井虾仁等。

**湘菜**以长沙菜为代表，擅长香酸辣，具有浓厚的山乡风味。代表菜有剁椒鱼头、小炒黄牛肉等。

**徽菜**以沿江、沿淮菜为代表，重油重色，重火功。代表菜有臭鳜鱼、毛豆腐等。`,
    author: '饮食文化研究员',
    authorAvatar: '',
    publishTime: '2024-01-15',
    readTime: '8分钟',
    rating: 4.9,
    ratingCount: 1256,
    tags: ['饮食文化', '八大菜系', '中华美食'],
    isUserCreated: false,
    userRatings: []
  },
  {
    id: 'a2',
    title: '二十四节气与饮食养生：顺应自然的智慧',
    cover: '/images/articles/seasons.jpg',
    summary: '古人在长期的生产生活中，总结出二十四节气，并形成了"春养肝、夏养心、秋养肺、冬养肾"的饮食养生智慧。顺应节气，饮食养生，是中华传统文化的精华。',
    content: `二十四节气是中国古代农耕文明的产物，反映了季节变化、气候特点和物候现象。自古以来，中国人就根据节气来安排饮食，形成了独特的节气饮食文化。

**立春**（2月3-5日）：万物复苏，宜吃春饼、萝卜等升发之物，以助阳气生发。

**雨水**（2月18-20日）：天气转暖，降水增多，宜食红枣、蜂蜜等润燥之物。

**惊蛰**（3月5-7日）：春雷始鸣，宜吃梨、百合等滋阴润肺之品。

**春分**（3月20-22日）：昼夜平分，宜吃春菜、韭菜等应季蔬菜。

**清明**（4月4-6日）：天清气明，宜食青团、艾粄等清明特色食品。

**谷雨**（4月19-21日）：雨生百谷，宜喝茶、吃香椿，以祛湿健脾。

**立夏**（5月5-7日）：夏季开始，宜吃苦瓜、绿豆等清热解暑之物。

**小满**（5月20-22日）：小麦成熟，宜吃新麦制品，进食苦菜清热。

**芒种**（6月5-7日）：忙于夏收，宜喝酸梅汤、绿豆汤消暑。

**夏至**（6月21-22日）：阳气最盛，宜吃面条、馄饨，民间有"冬至饺子夏至面"之说。

**小暑**（7月6-8日）：暑气渐盛，宜吃黄鳝、莲藕等清补之物。

**大暑**（7月22-24日）：一年最热，宜喝绿豆粥、吃西瓜等消暑食品。

**立秋**（8月7-9日）：秋季开始，宜吃茄子、西瓜等润燥食品。

**处暑**（8月22-24日）：暑气消退，宜吃鸭子、百合等滋阴润燥之物。

**白露**（9月7-9日）：露凝而白，宜吃龙眼、红枣等补气养血之品。

**秋分**（9月22-24日）：昼夜平分，宜食螃蟹、月饼等秋季美食。

**寒露**（10月8-9日）：露气寒冷，宜吃芝麻、核桃等润肺之物。

**霜降**（10月23-24日）：天气渐冷，宜吃柿子、栗子等温补食品。

**立冬**（11月7-8日）：冬季开始，宜吃羊肉、饺子等进行温补。

**小雪**（11月22-23日）：开始降雪，宜吃腊肉、红薯等暖身之物。

**大雪**（12月6-8日）：雪量增大，宜吃羊肉汤、八宝粥等温热食品。

**冬至**（12月21-23日）：阴极阳生，宜吃饺子、汤圆，有"冬至大如年"之说。

**小寒**（1月5-7日）：气候寒冷，宜吃羊肉、鸡汤温补。

**大寒**（1月20-21日）：一年最冷，宜吃八宝饭、糯米饭等暖身食品。`,
    author: '中医养生专家',
    authorAvatar: '',
    publishTime: '2024-01-20',
    readTime: '10分钟',
    rating: 4.8,
    ratingCount: 980,
    tags: ['养生', '二十四节气', '传统智慧'],
    isUserCreated: false,
    userRatings: []
  },
  {
    id: 'a3',
    title: '筷子的文化：不仅是餐具，更是礼仪与哲学',
    cover: '/images/articles/chopsticks.jpg',
    summary: '筷子是中国饮食文化的象征，承载着三千年的历史与礼仪。正确使用筷子不仅是餐桌礼仪，更体现了中国传统文化中"天人合一"的哲学思想。',
    content: `筷子是中国古代的伟大发明之一，也是中华饮食文化的重要标志。虽然筷子看似简单，但其中蕴含的文化内涵却极为丰富。

**筷子的起源**

筷子的历史可以追溯到夏朝，距今已有三千多年。最初被称为"箸"，直到明朝才逐渐改称为"筷子"。传说中，筷子是大禹治水时所发明，当时为了节省时间，大禹直接用树枝夹取煮沸的食物，这便是筷子的雏形。

**筷子的文化寓意**

筷子通常成双成对，象征阴阳两极，寓意和谐平衡。筷子的长度、形状都有讲究：筷身上方下圆，代表天圆地方；长度七寸六分，象征人的七情六欲。

**筷子使用礼仪**

1. 不能用筷子指人，这是不礼貌的行为
2. 不能用筷子敲击碗碟，这在乞丐文化中才这样做
3. 夹菜时不能来回挑拣，要一次性夹取
4. 筷子不用时要放在筷架上，不能插在饭中
5. 不能用筷子在菜中乱搅
6. 长辈先动筷，晚辈才能开始吃

**筷子与养生**

正确使用筷子还能锻炼手指灵活性，促进大脑发育。中医认为，手指与脏腑经络相连，经常使用筷子可以起到保健作用。

**筷子的材质演变**

从最初的树枝、竹筷，到后来的木筷、象牙筷，再到现代的金属筷、塑料筷，筷子的材质也在不断发展。如今，木筷和竹筷因其环保健康的特点，重新受到人们的青睐。

**筷子的国际影响**

筷子文化随着中华文明的传播，影响了日本、韩国、越南等东亚国家。但不同国家的筷子各有特色：日本筷子较短且尖头，韩国筷子多为金属制，越南筷子则与中国相似。`,
    author: '民俗文化学者',
    authorAvatar: '',
    publishTime: '2024-02-01',
    readTime: '6分钟',
    rating: 4.7,
    ratingCount: 756,
    tags: ['传统文化', '筷子', '礼仪'],
    isUserCreated: false,
    userRatings: []
  },
  {
    id: 'a4',
    title: '茶与食的搭配艺术：中华美食的完美邂逅',
    cover: '/images/articles/tea.jpg',
    summary: '茶与中国美食的搭配是一门艺术，绿茶清新解腻、红茶醇厚回甘、乌龙茶香气袭人，不同的茶配不同的菜，才能相得益彰，让味蕾得到极致享受。',
    content: `茶与食的搭配在中国有着悠久的历史，早在唐代就有"茶宴"的记载。茶不仅能解腻助消化，还能提升食物的香气和口感，是中华饮食文化中不可或缺的元素。

**绿茶与清淡菜肴**

龙井、碧螺春等绿茶清香淡雅，适合搭配清淡的江浙菜、点心。如龙井虾仁，将虾仁的鲜嫩与龙井的清香完美融合，被誉为"天堂佳肴"。

代表搭配：
- 龙井虾仁 + 龙井茶
- 清蒸鱼 + 碧螺春
- 淮扬菜 + 黄山毛峰

**红茶与重口味菜肴**

正山小种、祁门红茶等红茶醇厚甘甜，适合搭配红烧、酱香类菜肴。红茶中的茶多酚能分解脂肪，帮助消化重口味食物。

代表搭配：
- 红烧肉 + 正山小种
- 烤鸭 + 祁门红茶
- 卤味 + 滇红

**乌龙茶与海鲜**

铁观音、大红袍等乌龙茶香气高长，适合搭配海鲜。乌龙茶能去腥提鲜，让海鲜更加美味。

代表搭配：
- 清蒸螃蟹 + 铁观音
- 白灼虾 + 大红袍
- 海鲜火锅 + 凤凰单丛

**普洱茶与油腻食物**

普洱茶具有很强的解腻功效，特别适合搭配火锅、烤肉等油腻食物。熟普温润养胃，生普清爽解腻。

代表搭配：
- 火锅 + 普洱熟茶
- 烤肉 + 普洱生茶
- 中式点心 + 陈年普洱

**花茶与甜点**

茉莉花茶、桂花茶等花茶芬芳怡人，适合搭配各类中式甜点。

代表搭配：
- 月饼 + 茉莉花茶
- 汤圆 + 桂花乌龙
- 绿豆糕 + 玫瑰花茶

**搭配原则**

1. 清淡配清淡，浓郁配浓郁
2. 考虑地域特色，入乡随俗
3. 注意茶的温度，热茶配热菜，温茶配冷菜
4. 个人口味为先，不必拘泥于规则`,
    author: '茶艺师',
    authorAvatar: '',
    publishTime: '2024-02-10',
    readTime: '7分钟',
    rating: 4.6,
    ratingCount: 543,
    tags: ['茶文化', '美食搭配', '生活艺术'],
    isUserCreated: false,
    userRatings: []
  },
  {
    id: 'a5',
    title: '年夜饭的文化：团圆桌上的中国年味',
    cover: '/images/articles/reunion.jpg',
    summary: '年夜饭是中国人一年中最重要的一顿饭，不仅象征着家庭的团圆，更承载着对新年的美好期盼。从南到北，各地年夜饭都有独特的习俗和寓意。',
    content: `年夜饭，又称团年饭，是中华民族的传统习俗。无论身处何地，中国人都会在除夕之夜赶回家中，与家人团聚，共进这顿意义非凡的晚餐。

**年夜饭的历史**

年夜饭的习俗可以追溯到南北朝时期，当时称为"年夜饭"或"岁饭"。古人认为年夜饭有驱除邪祟、迎接新年的作用，因此格外重视。

**各地年夜饭特色**

**北方年夜饭**：以饺子为主食，象征"更岁交子"。北方人会在饺子中包入硬币、糖果等，吃到的人预示新年好运。

**南方年夜饭**：以米饭为主食，搭配丰富的菜肴。南方人讲究"年年有余"，鱼是必不可少的一道菜。

**四川年夜饭**：川味浓郁，水煮鱼、回锅肉等经典川菜都会出现在年夜饭桌上。

**广东年夜饭**：讲究"好意头"，白切鸡寓意"金鸡报喜"，发菜炆猪手寓意"发财就手"。

**必备菜品及寓意**

1. 鱼（年年有余）
2. 饺子（元宝）
3. 汤圆（团团圆圆）
4. 年糕（年年高升）
5. 鸡（大吉大利）
6. 腊肉（家肥屋润）
7. 春卷（黄金万两）
8. 扣肉（富足美满）

**年夜饭的讲究**

1. 菜数要成双，寓意好事成双
2. 不能全吃完，要留一点，象征"有余"
3. 鱼不能翻面，寓意"顺顺利利"
4. 席间不能说"没、光、完"等字眼
5. 长辈先动筷，晚辈才能开始吃
6. 吃饭时不要打碎碗碟

**现代年夜饭的变化**

随着生活水平的提高和饮食观念的改变，现代年夜饭呈现出新的特点：
- 更注重营养均衡，蔬菜比例增加
- 半成品、预制菜成为新选择
- 年夜饭外卖悄然兴起
- 年夜饭旅游成为新时尚

无论形式如何变化，年夜饭承载的家庭团圆和美好期盼始终不变。`,
    author: '美食作家',
    authorAvatar: '',
    publishTime: '2024-02-15',
    readTime: '8分钟',
    rating: 4.9,
    ratingCount: 1867,
    tags: ['传统文化', '年夜饭', '春节'],
    isUserCreated: false,
    userRatings: []
  },
  {
    id: 'a6',
    title: '豆腐的千年传奇：从淮南王刘安到世界美食',
    cover: '/images/articles/tofu.jpg',
    summary: '豆腐是中国饮食文化的瑰宝，相传由西汉淮南王刘安发明。2000多年来，豆腐以其丰富的营养和多样的做法，成为中华美食的代表，并走向世界舞台。',
    content: `豆腐是中国饮食文化中最具代表性的食材之一，被誉为"植物肉"。它不仅营养丰富，而且做法多样，可煎、可炸、可炒、可炖、可凉拌，几乎可以与任何食材搭配。

**豆腐的起源**

相传豆腐是西汉时期淮南王刘安在炼丹时发明的。一日，刘安在炼制长生不老药时，偶然将石膏点入豆浆中，凝结成了豆腐。这个传说虽然无法考证，但说明了豆腐在中国已有两千多年的历史。

**豆腐的种类**

1. 北豆腐（老豆腐）：含水量少，质地硬实，适合煎炸、红烧
2. 南豆腐（嫩豆腐）：含水量多，质地细腻，适合凉拌、做汤
3. 豆腐皮：豆浆加热时凝结的薄膜，口感韧劲
4. 豆腐干：豆腐压制而成，质地紧实
5. 腐竹：豆浆加热时挑起的薄膜卷，富有嚼劲

**经典豆腐菜**

1. 麻婆豆腐：四川名菜，集"麻、辣、烫、香、酥、嫩"于一体
2. 家常豆腐：南北通吃，以煎制为主
3. 鲫鱼豆腐汤：滋补佳品，汤白如乳
4. 豆腐脑：早餐首选，可咸可甜
5. 臭豆腐：闻臭吃香，别有风味
6. 酿豆腐：客家名菜，肉馅填充其中

**豆腐的营养价值**

豆腐富含优质蛋白质，含有人体必需的8种氨基酸。每100克豆腐含蛋白质约8-12克，脂肪约3-5克，还含有钙、铁、磷等矿物质。

**豆腐在世界的传播**

豆腐最早传入日本、韩国等周边国家，后来随着海上贸易传到欧洲和美洲。如今，豆腐已经成为世界性的健康食品，深受素食者和健康饮食爱好者喜爱。

在日本，豆腐被称为"卯之花"，衍生出了豆腐刺身、冷豆腐等日式吃法。

在欧美，豆腐被加工成各种植物基产品，如豆腐汉堡、豆腐奶酪等，成为替代动物蛋白的重要选择。

**如何选购和保存豆腐**

选购时，应选择颜色乳白、质地细嫩、无异味的豆腐。新鲜豆腐最好当天食用，如需保存，可放入冰箱冷藏，但不要超过2-3天。`,
    author: '美食历史研究者',
    authorAvatar: '',
    publishTime: '2024-02-20',
    readTime: '7分钟',
    rating: 4.8,
    ratingCount: 654,
    tags: ['食材文化', '豆腐', '中华美食'],
    isUserCreated: false,
    userRatings: []
  },
]

// ========== 社区帖子数据 ==========
export const communityPosts: CommunityPost[] = [
  {
    id: 'p1', author: '美食小达人', avatar: '', content: '今天尝试了红烧肉，第一次做就成功了！色泽红亮，入口即化，家人都说好吃！分享给大家~', images: [], recipeId: 'r12', recipeName: '红烧肉', likes: 128, comments: 32, time: '2小时前', isAI: false, isUserCreated: false, likedByUser: false
  },
  {
    id: 'p2', author: '厨房新手', avatar: '', content: '酸辣土豆丝真的是入门必学！按照食谱做出来酸辣可口，土豆丝脆脆的超好吃！', images: [], recipeId: 'r13', recipeName: '酸辣土豆丝', likes: 89, comments: 15, time: '5小时前', isAI: false, isUserCreated: false, likedByUser: false
  },
  {
    id: 'p3', author: 'AI美食家', avatar: '', content: '【AI创想食谱】柠檬蜜汁烤鸡翅：将鸡翅用柠檬汁、蜂蜜、酱油、蒜蓉腌制4小时，200度烤25分钟，每10分钟刷一次蜜汁。柠檬的清香与蜂蜜的甜润完美融合！', images: [], recipeId: '', recipeName: '柠檬蜜汁烤鸡翅', likes: 256, comments: 67, time: '1天前', isAI: true, isUserCreated: false, likedByUser: false
  },
  {
    id: 'p4', author: '资深吃货', avatar: '', content: '周末做了一桌川菜！宫保鸡丁、麻婆豆腐、水煮牛肉，三道经典川菜一起上，麻辣鲜香，太过瘾了！', images: [], recipeId: 'r2', recipeName: '宫保鸡丁', likes: 312, comments: 45, time: '1天前', isAI: false, isUserCreated: false, likedByUser: false
  },
  {
    id: 'p5', author: 'AI美食家', avatar: '', content: '【AI创想食谱】红薯芝士焗饭：红薯蒸熟压泥，与米饭、玉米粒、青豆混合，铺上马苏里拉芝士，200度烤15分钟至芝士金黄拉丝。中西融合的创意美食！', images: [], recipeId: '', recipeName: '红薯芝士焗饭', likes: 198, comments: 38, time: '2天前', isAI: true, isUserCreated: false, likedByUser: false
  },
  {
    id: 'p6', author: '北方汉子', avatar: '', content: '老婆做的白菜炖豆腐太香了！寒冬里来一碗热腾腾的炖菜，浑身都暖和！强烈推荐这个食谱给大家！', images: [], recipeId: 'r6', recipeName: '白菜炖豆腐', likes: 76, comments: 12, time: '3天前', isAI: false, isUserCreated: false, likedByUser: false
  },
]

// ========== AI检索食谱数据库（用于模拟AI检索不存在食谱） ==========
const aiRecipeDatabase: Recipe[] = [
  {
    id: 'ai_db1', name: '菠萝咕噜肉', image: '/images/recipes/boluogulurou.png',
    ingredients: ['猪肉', '菠萝'], cookingMethod: '炒', cuisine: '粤菜',
    difficulty: '中等', time: '40分钟',
    steps: ['猪肉切块，用盐、料酒、淀粉腌制', '菠萝切块，用盐水浸泡', '调制咕噜汁：番茄酱、糖、醋、盐、淀粉、水混合', '猪肉裹淀粉炸至金黄', '锅中炒香蔬菜，倒入咕噜汁和菠萝', '放入炸好的肉块快速翻炒裹匀'],
    tips: '咕噜汁比例是关键，酸甜要平衡；炸肉时要复炸一次更酥脆。',
    culture: '咕噜肉是粤菜经典，酸甜可口，老少皆宜。',
    rating: 4.6, ratingCount: 890, isUserCreated: false, region: '', author: 'AI检索库'
  },
  {
    id: 'ai_db2', name: '蒜香牛柳', image: '/images/recipes/suanxiangniuliu.png',
    ingredients: ['牛肉', '蒜'], cookingMethod: '炒', cuisine: '家常菜',
    difficulty: '简单', time: '20分钟',
    steps: ['牛柳切条，加料酒、酱油、淀粉腌制', '大蒜切片', '锅中热油，爆香蒜片', '放入牛柳大火快炒', '加黑胡椒、盐调味', '出锅前撒上蒜末'],
    tips: '牛柳要逆纹切；大火快炒保持嫩滑。',
    culture: '蒜香牛柳是西式做法与中式食材的完美结合。',
    rating: 4.5, ratingCount: 567, isUserCreated: false, region: '', author: 'AI检索库'
  },
  {
    id: 'ai_db3', name: '芝士焗番茄', image: '/images/recipes/zhishijujuan.png',
    ingredients: ['番茄', '芝士'], cookingMethod: '烤', cuisine: '创意菜',
    difficulty: '简单', time: '25分钟',
    steps: ['番茄洗净，对半切开', '番茄上撒盐、黑胡椒', '铺上马苏里拉芝士', '烤箱200度烤15分钟', '出炉撒罗勒叶'],
    tips: '番茄要选成熟度适中的；芝士要铺满才能拉丝。',
    culture: '这是一道简单美味的意式开胃菜。',
    rating: 4.3, ratingCount: 234, isUserCreated: false, region: '', author: 'AI检索库'
  },
]

// ========== 工具函数 ==========

// 生成唯一ID
export function generateId(): string {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// 根据食材和烹饪方式搜索食谱
export function searchRecipes(
  selectedIngredients: string[],
  selectedMethod: string,
  selectedCuisine: string
): Recipe[] {
  let results = [...recipes, ...aiRecipes]

  if (selectedIngredients.length > 0) {
    results = results.filter(recipe =>
      selectedIngredients.some(ing => recipe.ingredients.includes(ing))
    )
  }

  if (selectedMethod && selectedMethod !== '全部') {
    results = results.filter(recipe => recipe.cookingMethod === selectedMethod)
  }

  if (selectedCuisine && selectedCuisine !== '全部') {
    results = results.filter(recipe => recipe.cuisine === selectedCuisine)
  }

  return results
}

// 获取热门食谱（按评分排序）
export function getHotRecipes(count: number = 6): Recipe[] {
  const allRecipes = [...recipes, ...aiRecipes]
  return [...allRecipes]
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, count)
}

// 获取评分最高的食谱（用于推荐）
export function getTopRatedRecipes(count: number = 10): Recipe[] {
  const allRecipes = [...recipes, ...aiRecipes]
  return [...allRecipes]
    .sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount)
    .slice(0, count)
}

// 获取所有食谱（含用户上传和AI检索库）
export function getAllRecipes(): Recipe[] {
  return [...recipes, ...aiRecipes, ...aiRecipeDatabase, ...getUserRecipes()]
}

// 获取食谱（通过ID）
export function getRecipeById(id: string): Recipe | undefined {
  let recipe = recipes.find(r => r.id === id)
  if (!recipe) recipe = aiRecipes.find(r => r.id === id)
  if (!recipe) recipe = aiRecipeDatabase.find(r => r.id === id)
  if (!recipe) recipe = getUserRecipes().find(r => r.id === id)
  return recipe
}

// 获取用户上传的食谱
export function getUserRecipes(): Recipe[] {
  try {
    const stored = wx.getStorageSync('userRecipes')
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 保存用户上传的食谱
export function saveUserRecipe(recipe: Recipe): void {
  const existing = getUserRecipes()
  existing.unshift(recipe)
  wx.setStorageSync('userRecipes', JSON.stringify(existing))
}

// ========== 文章相关函数 ==========

// 获取所有文章 (现改为从后端拉取)
export async function apiGetArticles(): Promise<Article[]> {
  return await request('/articles', 'GET') as Article[];
}

// 获取评分最高的文章（首页推荐）
export function getTopRatedArticles(count: number = 3): Article[] {
  return [...articles]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
}

// 获取用户创建的文章
export function getUserArticles(): Article[] {
  try {
    const stored = wx.getStorageSync('userArticles')
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 保存用户创建的文章 (改为调用后端 API)
export async function apiSubmitArticle(article: Article): Promise<any> {
  return await request('/articles', 'POST', article);
}


// 文章评分 (改为调用后端 API)
export async function apiRateArticle(articleId: string, score: number): Promise<any> {
  return await request(`/articles/rate/${articleId}`, 'POST', { score });
}

// 获取文章评论
export function getArticleComments(articleId: string): ArticleComment[] {
  try {
    const stored = wx.getStorageSync('articleComments_' + articleId)
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 保存文章评论
export function saveArticleComment(articleId: string, comment: ArticleComment): void {
  const existing = getArticleComments(articleId)
  existing.unshift(comment)
  wx.setStorageSync('articleComments_' + articleId, JSON.stringify(existing))
}

// ========== 社区帖子函数 ==========

// 获取社区帖子（含用户发布）
export function getCommunityPosts(): CommunityPost[] {
  try {
    const stored = wx.getStorageSync('userPosts')
    const userPosts: CommunityPost[] = stored ? JSON.parse(stored) : []
    return [...userPosts, ...communityPosts]
  } catch (_e) {
    return [...communityPosts]
  }
}

// 保存用户帖子
export function savePost(post: CommunityPost): void {
  try {
    const stored = wx.getStorageSync('userPosts')
    const existing: CommunityPost[] = stored ? JSON.parse(stored) : []
    existing.unshift(post)
    wx.setStorageSync('userPosts', JSON.stringify(existing))
  } catch (_e) { /* ignore */ }
}

// 点赞/取消点赞帖子
export function togglePostLike(postId: string): boolean {
  try {
    const posts = getCommunityPosts()
    const post = posts.find(p => p.id === postId)
    if (post) {
      post.likedByUser = !post.likedByUser
      post.likes += post.likedByUser ? 1 : -1
      wx.setStorageSync('userPosts', JSON.stringify(posts.filter(p => p.isUserCreated)))
      return post.likedByUser
    }
    return false
  } catch (_e) {
    return false
  }
}

// ========== 食谱评价函数 ==========

// 获取食谱评价
export function getRecipeReviews(recipeId: string): Review[] {
  try {
    const stored = wx.getStorageSync('reviews_' + recipeId)
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 保存食谱评价
export function saveReview(recipeId: string, review: Review): void {
  const existing = getRecipeReviews(recipeId)
  existing.unshift(review)
  wx.setStorageSync('reviews_' + recipeId, JSON.stringify(existing))
}

// ========== 收藏函数 ==========

// 获取收藏
export function getFavorites(): string[] {
  try {
    const stored = wx.getStorageSync('favorites')
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 切换收藏状态
export function toggleFavorite(recipeId: string): boolean {
  const favorites = getFavorites()
  const index = favorites.indexOf(recipeId)
  if (index > -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push(recipeId)
  }
  wx.setStorageSync('favorites', JSON.stringify(favorites))
  return index === -1
}

// ========== AI食谱检索函数 ==========

// 模拟AI检索食谱（数据库中不存在时生成）
export function searchAIRecipe(keyword: string): AIGeneratedRecipe | null {
  const allIngredients = [...vegetables, ...meats, ...grainsFruits]
  const matched = allIngredients.filter(i =>
    i.name.includes(keyword) || keyword.includes(i.name)
  )

  if (matched.length === 0) {
    const templates: AIGeneratedRecipe[] = [
      {
        id: generateId(),
        name: `${keyword}创意料理`,
        ingredients: [keyword, '葱姜蒜'],
        cookingMethod: '炒',
        cuisine: '创意菜',
        difficulty: '简单',
        time: '30分钟',
        steps: [
          `${keyword}准备好，洗净切块`,
          '葱姜蒜切末备用',
          '锅中热油，爆香葱姜蒜',
          `放入${keyword}大火翻炒`,
          `加入调味料翻炒均匀`,
          '出锅装盘'
        ],
        tips: `注意火候，${keyword}不要炒太久以免影响口感。`,
        culture: `这是一道融合创新理念的${keyword}料理，${keyword}富含营养，搭配得当可以做出美味佳肴。`,
        reason: `根据您搜索的"${keyword}"，结合多种食材搭配原理，为您创造了这道独特料理。`,
        generatedAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: `${keyword}清香炖菜`,
        ingredients: [keyword, '豆腐', '木耳'],
        cookingMethod: '炖',
        cuisine: '家常菜',
        difficulty: '中等',
        time: '45分钟',
        steps: [
          `${keyword}洗净切块`,
          '豆腐切块，木耳泡发',
          '锅中热油，煸炒姜片',
          `放入${keyword}翻炒片刻`,
          '加入足量清水',
          '放入豆腐和木耳，小火炖30分钟',
          '加盐调味即可'
        ],
        tips: `${keyword}要炖至软烂才好吃；汤底可以加入少量鸡精提鲜。`,
        culture: `这道${keyword}炖菜注重原汁原味，体现了中国人"以食养生"的饮食理念。`,
        reason: `AI通过分析食材特性，认为${keyword}适合炖煮方式，可以充分释放其营养和风味。`,
        generatedAt: new Date().toISOString()
      }
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }
  return null
}

// 检查食谱是否在数据库中
export function isRecipeInDatabase(name: string): boolean {
  const all = getAllRecipes()
  return all.some(r => r.name.includes(name) || name.includes(r.name))
}

// 添加AI检索到的食谱到用户数据库
export function addAIRcipeToDatabase(aiRecipe: AIGeneratedRecipe): void {
  const recipe: Recipe = {
    id: generateId(),
    name: aiRecipe.name,
    image: '',
    ingredients: aiRecipe.ingredients,
    cookingMethod: aiRecipe.cookingMethod,
    cuisine: aiRecipe.cuisine,
    difficulty: aiRecipe.difficulty,
    time: aiRecipe.time,
    steps: aiRecipe.steps,
    tips: aiRecipe.tips,
    culture: aiRecipe.culture,
    rating: 0,
    ratingCount: 0,
    isUserCreated: false,
    region: '',
    author: 'AI检索',
    nutrition: {
      calories: Math.floor(Math.random() * 300) + 150,
      protein: Math.floor(Math.random() * 20) + 5,
      fat: Math.floor(Math.random() * 15) + 3,
      carbs: Math.floor(Math.random() * 40) + 10
    }
  }
  saveUserRecipe(recipe)
}

// ========== 热门搜索排行函数 ==========

// 获取热门搜索关键词（模拟每日/周/月排行）
export function getHotSearchKeywords(type: 'day' | 'week' | 'month' = 'day'): { keyword: string, count: number }[] {
  const allKeywords = [
    { keyword: '红烧肉', baseCount: 5200, variance: 0.3 },
    { keyword: '番茄炒蛋', baseCount: 4500, variance: 0.2 },
    { keyword: '宫保鸡丁', baseCount: 3800, variance: 0.25 },
    { keyword: '酸辣土豆丝', baseCount: 3600, variance: 0.15 },
    { keyword: '麻婆豆腐', baseCount: 3200, variance: 0.2 },
    { keyword: '清蒸鱼', baseCount: 2800, variance: 0.3 },
    { keyword: '糖醋排骨', baseCount: 2600, variance: 0.2 },
    { keyword: '红烧排骨', baseCount: 2400, variance: 0.25 },
    { keyword: '水煮牛肉', baseCount: 2200, variance: 0.3 },
    { keyword: '凉拌黄瓜', baseCount: 2000, variance: 0.15 },
    { keyword: '蒜蓉蒸虾', baseCount: 1900, variance: 0.2 },
    { keyword: '手擀面', baseCount: 1800, variance: 0.2 },
    { keyword: '蘑菇炒肉', baseCount: 1600, variance: 0.15 },
    { keyword: '菠菜豆腐汤', baseCount: 1500, variance: 0.2 },
    { keyword: '白菜炖豆腐', baseCount: 1400, variance: 0.25 },
  ]

  const multiplier = type === 'day' ? 1 : type === 'week' ? 7 : 30
  const now = Date.now()

  return allKeywords
    .map(k => {
      const timeSeed = Math.sin(now / (type === 'day' ? 86400000 : type === 'week' ? 604800000 : 2592000000) + k.baseCount)
      const randomFactor = 0.7 + (timeSeed + 1) * 0.3 * k.variance
      return {
        keyword: k.keyword,
        count: Math.floor(k.baseCount * multiplier * randomFactor)
      }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

// 获取搜索历史
export function getSearchHistory(): string[] {
  try {
    const stored = wx.getStorageSync('searchHistory')
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 添加搜索历史
export function addSearchHistory(keyword: string): void {
  try {
    let history = getSearchHistory()
    history = history.filter(h => h !== keyword)
    history.unshift(keyword)
    history = history.slice(0, 20)
    wx.setStorageSync('searchHistory', JSON.stringify(history))
  } catch (_e) { /* ignore */ }
}

// 清空搜索历史
export function clearSearchHistory(): void {
  wx.setStorageSync('searchHistory', JSON.stringify([]))
}

// ========== 食谱盲盒函数 ==========

// 获取每日盲盒食谱
export function getDailyLuckyRecipe(): Recipe {
  const allRecipes = [...recipes, ...aiRecipes, ...getUserRecipes()]
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const index = seed % allRecipes.length
  return allRecipes[index]
}

// 获取随机食谱（盲盒）
export function getRandomRecipe(): Recipe {
  const allRecipes = [...recipes, ...aiRecipes, ...getUserRecipes()]
  const index = Math.floor(Math.random() * allRecipes.length)
  return allRecipes[index]
}

// 获取盲盒历史记录
export function getLuckyBoxHistory(): { recipeId: string, recipeName: string, time: string }[] {
  try {
    const stored = wx.getStorageSync('luckyBoxHistory')
    return stored ? JSON.parse(stored) : []
  } catch (_e) {
    return []
  }
}

// 添加盲盒记录
export function addLuckyBoxRecord(recipeId: string, recipeName: string): void {
  try {
    let history = getLuckyBoxHistory()
    history.unshift({ recipeId, recipeName, time: new Date().toLocaleString('zh-CN') })
    history = history.slice(0, 50)
    wx.setStorageSync('luckyBoxHistory', JSON.stringify(history))
  } catch (_e) { /* ignore */ }
}

// ========== 搜索匹配食谱 ==========

// ========== 后端 API 对接函数 ==========

/**
 * 从后端获取食材分类
 */
export async function fetchIngredients(): Promise<any> {
  return await request('/ingredients', 'GET');
}

/**
 * 从后端获取烹饪方式
 */
export async function fetchCookingMethods(): Promise<any> {
  return await request('/cooking-methods', 'GET');
}

/**
 * 根据条件从后端搜索食谱
 */
export async function fetchRecipes(params: { ingredients?: string[], method?: string, cuisine?: string } = {}): Promise<Recipe[]> {
  return await request('/recipes', 'GET', params) as Recipe[];
}

/**
 * 从后端获取食谱详情
 */
export async function fetchRecipeDetail(id: string): Promise<Recipe> {
  return await request(`/recipes/${id}`, 'GET') as Recipe;
}

/**
 * 投稿新食谱
 */
export async function apiSubmitRecipe(recipe: Recipe): Promise<any> {
  return await request('/recipes', 'POST', recipe);
}

/**
 * 获取随机食谱（用于盲盒/换一换）
 */
export async function apiGetRandomRecipe(): Promise<Recipe> {
  return await request('/recipes/random', 'GET') as Recipe;
}

/**
 * 获取社区动态列表
 */
export async function apiGetPosts(): Promise<CommunityPost[]> {
  const posts = await request('/posts', 'GET') as CommunityPost[];
  try {
    const stored = wx.getStorageSync('likedPosts')
    const likedPosts = stored ? JSON.parse(stored) : []
    posts.forEach(p => {
      p.likedByUser = likedPosts.includes(p.id)
    })
  } catch (e) {}
  return posts;
}

/**
 * 更新社区帖子状态（点赞/评论数）
 */
export async function apiUpdatePostStats(id: string, likeDelta: number, commentDelta: number): Promise<any> {
  return await request(`/posts/${id}/stats`, 'POST', { like_delta: likeDelta, comment_delta: commentDelta });
}

/**
 * 添加帖子留言
 */
export async function apiAddPostComment(id: string, content: string, author: string): Promise<any> {
  return await request(`/posts/${id}/comment`, 'POST', { content, author });
}

/**
 * 发布社区动态
 */
export async function apiSubmitPost(post: CommunityPost): Promise<any> {
  return await request('/posts', 'POST', post);
}

/**
 * 用户注册
 */
export async function apiRegister(userInfo: any): Promise<any> {
  return await request('/auth/register', 'POST', userInfo);
}

/**
 * 用户登录
 */
export async function apiLogin(credentials: any): Promise<any> {
  return await request('/auth/login', 'POST', credentials);
}
/**
 * 获取真实的热门搜索词排行
 */
export async function apiGetHotKeywords(): Promise<{keyword: string, count: number}[]> {
  return await request('/hot-keywords', 'GET') as any;
}

/**
 * 获取待审核食谱列表 (Admin)
 */
export async function apiGetPendingRecipes(): Promise<Recipe[]> {
  return await request('/admin/pending', 'GET') as Recipe[];
}

/**
 * 审核通过食谱 (Admin)
 */
export async function apiApproveRecipe(id: string): Promise<any> {
  return await request(`/admin/approve/${id}`, 'POST');
}

/**
 * 获取权威热门食谱（服务端算法计算）
 */
export async function apiGetHotRecipes(limit: number = 6): Promise<Recipe[]> {
  return await request(`/recipes/hot?limit=${limit}`, 'GET') as Recipe[];
}
