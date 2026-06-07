import json
import os

class DataManager:
    def __init__(self, data_path):
        self.data_path = data_path
        self.data = self._load_data()

    def _load_data(self):
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if "search_stats" not in data:
                    data["search_stats"] = {}
                for r in data.get("recipes", []):
                    if "status" not in r:
                        r["status"] = "approved"
                # 永久保障：确保 AI 创想食谱始终存在
                self._ensure_ai_recipes(data)
                return data
        return {"ingredients": {}, "recipes": [], "articles": [], "posts": [], "search_stats": {}}

    def _ensure_ai_recipes(self, data):
        """启动时自动检测并补全 AI 创想食谱，防止数据覆盖导致丢失。"""
        existing_ids = {r["id"] for r in data.get("recipes", [])}
        ai_recipes = [
            {
                "id": "ai1", "name": "柠檬蜜汁烤鸡翅",
                "image": "/images/recipes/ai_jichi.png",
                "ingredients": ["鸡肉", "柠檬"], "cookingMethod": "烤",
                "cuisine": "创意菜", "difficulty": "简单", "time": "30分钟",
                "steps": ["鸡翅用柠檬汁、蜂蜜、盐腌制30分钟", "烤箱200度烤20分钟", "刷蜜汁再烤5分钟至金黄"],
                "tips": "腌制时间越久越入味。", "rating": 4.5, "ratingCount": 180,
                "author": "AI创想", "status": "approved"
            },
            {
                "id": "ai2", "name": "红薯芝士焗饭",
                "image": "/images/recipes/ai_jushu.png",
                "ingredients": ["红薯", "米饭", "玉米"], "cookingMethod": "烤",
                "cuisine": "创意菜", "difficulty": "简单", "time": "35分钟",
                "steps": ["红薯蒸熟压泥", "与米饭玉米粒混合", "铺芝士180度烤15分钟"],
                "tips": "用马苏里拉芝士拉丝效果更好。", "rating": 4.3, "ratingCount": 120,
                "author": "AI创想", "status": "approved"
            }
        ]
        added = False
        for recipe in ai_recipes:
            if recipe["id"] not in existing_ids:
                data["recipes"].append(recipe)
                added = True
        if added:
            self._save_data_raw(data)

    def _save_data_raw(self, data):
        with open(self.data_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def _save_to_file(self):
        with open(self.data_path, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)

    def get_ingredients(self):
        return self.data.get("ingredients", {})

    def get_cooking_methods(self):
        return self.data.get("cookingMethods", [])

    def get_cuisines(self):
        return self.data.get("cuisines", [])

    def get_all_recipes(self):
        return self.data.get("recipes", [])

    def get_random_recipe(self):
        import random
        recipes = self.data.get("recipes", [])
        return random.choice(recipes) if recipes else None

    def get_recipe_by_id(self, recipe_id):
        for recipe in self.data.get("recipes", []):
            if recipe['id'] == recipe_id:
                return recipe
        return None

    def search_recipes(self, ingredients=None, method=None, cuisine=None, keyword=None):
        """搜索/过滤食谱 (仅返回已审核内容)"""
        results = self.data.get("recipes", [])
        
        # 记录搜索关键词 (用于真实排行)
        if keyword:
            self._record_search(keyword)

        # 过滤已审核通过的
        results = [r for r in results if r.get('status') == 'approved']
        
        if ingredients:
            results = [r for r in results if any(ing in r['ingredients'] for ing in ingredients)]
        if method and method != '全部':
            results = [r for r in results if r['cookingMethod'] == method]
        if cuisine and cuisine != '全部':
            results = [r for r in results if r['cuisine'] == cuisine]
        return results

    def _record_search(self, keyword):
        """内部方法：记录搜索词频"""
        stats = self.data.get("search_stats", {})
        stats[keyword] = stats.get(keyword, 0) + 1
        self.data["search_stats"] = stats
        self._save_to_file()

    def get_hot_keywords(self, limit=10):
        """获取真实的热门搜索排行"""
        stats = self.data.get("search_stats", {})
        sorted_stats = sorted(stats.items(), key=lambda x: x[1], reverse=True)
        return [{"keyword": k, "count": v} for k, v in sorted_stats[:limit]]

    def get_hot_recipes(self, limit=6):
        """权威热门算法：综合考虑评分(rating)和评价人数(ratingCount)"""
        import math
        recipes = self.data.get("recipes", [])
        approved_recipes = [r for r in recipes if r.get('status') == 'approved']
        
        def calculate_hot_score(recipe):
            rating = float(recipe.get('rating', 0))
            count = int(recipe.get('ratingCount', 0))
            # 权威综合加权：评分 * log10(评价人数+1)
            # 确保评价人数极少的满分不会排在评价人数众多的高分前面
            return rating * math.log10(count + 1)

        sorted_recipes = sorted(approved_recipes, key=calculate_hot_score, reverse=True)
        return sorted_recipes[:limit]

    def approve_recipe(self, recipe_id):
        """模拟后台审核操作"""
        for r in self.data.get("recipes", []):
            if r['id'] == recipe_id:
                r['status'] = 'approved'
                self._save_to_file()
                return True
        return False

    def save_recipe(self, recipe):
        if "recipes" not in self.data:
            self.data["recipes"] = []
        # 默认待审核状态 (毕设逻辑)
        recipe['status'] = 'pending'
        self.data["recipes"].append(recipe)
        self._save_to_file()
        return True

    def get_articles(self):
        """获取所有文章 (按评分降序排列)"""
        articles = self.data.get("articles", [])
        return sorted(articles, key=lambda x: x.get('rating', 0), reverse=True)

    def save_article(self, article):
        """保存用户上传的文章"""
        if "articles" not in self.data:
            self.data["articles"] = []
        # 初始化评分字段
        article['rating'] = 0
        article['ratingCount'] = 0
        article['userRatings'] = []
        self.data["articles"].append(article)
        self._save_to_file()
        return True

    def rate_article(self, article_id, score):
        """为文章评分并更新平均分"""
        for a in self.data.get("articles", []):
            if a['id'] == article_id:
                if 'userRatings' not in a:
                    a['userRatings'] = []
                a['userRatings'].append(score)
                a['ratingCount'] = len(a['userRatings'])
                a['rating'] = round(sum(a['userRatings']) / a['ratingCount'], 1)
                self._save_to_file()
                return True
        return False

    def get_pending_recipes(self):
        """获取所有待审核的食谱"""
        return [r for r in self.data.get("recipes", []) if r.get('status') == 'pending']

    def get_community_posts(self):
        # 翻转列表让最新的帖子在前面
        return self.data.get("posts", [])[::-1]

    def save_post(self, post):
        if "posts" not in self.data:
            self.data["posts"] = []
        self.data["posts"].append(post)
        self._save_to_file()
        return True

    def update_post_stats(self, post_id, like_delta=0, comment_delta=0):
        for p in self.data.get("posts", []):
            if p['id'] == post_id:
                p['likes'] = max(0, p.get('likes', 0) + like_delta)
                p['comments'] = max(0, p.get('comments', 0) + comment_delta)
                self._save_to_file()
                return True
        return False

    def add_post_comment(self, post_id, comment_data):
        for p in self.data.get("posts", []):
            if p['id'] == post_id:
                if 'commentList' not in p:
                    p['commentList'] = []
                p['commentList'].append(comment_data)
                p['comments'] = len(p['commentList'])
                self._save_to_file()
                return True
        return False

    # ===== 用户相关 =====
    def get_user(self, nickname):
        """查找用户"""
        users = self.data.get("users", [])
        for user in users:
            if user['nickname'] == nickname:
                return user
        return None

    def add_user(self, user_data):
        """注册新用户"""
        if "users" not in self.data:
            self.data["users"] = []
        self.data["users"].append(user_data)
        self._save_to_file()
        return True

# 单例模式方便引用
data_manager = DataManager(os.path.join(os.path.dirname(__file__), 'data.json'))
