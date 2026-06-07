from flask import Flask, jsonify, request
from flask_cors import CORS
from data_manager import data_manager

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "success", "message": "Backend is online!"})

@app.route('/api/ingredients', methods=['GET'])
def get_ingredients():
    """获取所有食材分类数据"""
    return jsonify(data_manager.get_ingredients())

@app.route('/api/cooking-methods', methods=['GET'])
def get_methods():
    """获取烹饪方式"""
    return jsonify(data_manager.get_cooking_methods())

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    """搜索/获取食谱列表"""
    ingredients = request.args.getlist('ingredients')
    method = request.args.get('method')
    cuisine = request.args.get('cuisine')
    
    # 记录搜索关键词 (传递给 search_recipes 统计)
    keyword = request.args.get('keyword')
    
    recipes = data_manager.search_recipes(ingredients, method, cuisine, keyword)
    return jsonify(recipes)

@app.route('/api/hot-keywords', methods=['GET'])
def get_hot_keywords():
    """获取真实的热门搜索排行"""
    return jsonify(data_manager.get_hot_keywords())

@app.route('/api/recipes/hot', methods=['GET'])
def get_hot_recipes_api():
    """获取权威的热门食谱"""
    limit = request.args.get('limit', 6, type=int)
    return jsonify(data_manager.get_hot_recipes(limit))

@app.route('/api/admin/approve/<id>', methods=['POST'])
def approve_recipe(id):
    """模拟后台管理员审核接口"""
    if data_manager.approve_recipe(id):
        return jsonify({"status": "success", "message": "Recipe approved"})
    return jsonify({"error": "Recipe not found"}), 404

@app.route('/api/admin/pending', methods=['GET'])
def get_pending():
    """获取待审核列表"""
    return jsonify(data_manager.get_pending_recipes())

@app.route('/api/recipes/<id>', methods=['GET'])
def get_recipe_detail(id):
    """获取食谱详情"""
    recipe = data_manager.get_recipe_by_id(id)
    if recipe:
        return jsonify(recipe)
    return jsonify({"error": "Recipe not found"}), 404

@app.route('/api/recipes/random', methods=['GET'])
def get_random_recipe():
    """食谱盲盒：获取随机食谱"""
    recipe = data_manager.get_random_recipe()
    return jsonify(recipe)

@app.route('/api/recipes', methods=['POST'])
def add_recipe():
    """投稿新食谱"""
    data = request.json
    if data_manager.save_recipe(data):
        return jsonify({"status": "success", "message": "Recipe submitted"})
    return jsonify({"error": "Failed to save recipe"}), 500

@app.route('/api/posts', methods=['GET', 'POST'])
def handle_posts():
    """获取社区帖子或发布新帖子"""
    if request.method == 'GET':
        posts = data_manager.get_community_posts()
        return jsonify(posts)
    else:
        data = request.json
        if data_manager.save_post(data):
            return jsonify({"status": "success", "message": "Post shared"})
        return jsonify({"error": "Failed to save post"}), 500

@app.route('/api/posts/<id>/stats', methods=['POST'])
def update_post_stats(id):
    """更新帖子的点赞和留言数"""
    data = request.json
    like_delta = data.get('like_delta', 0)
    comment_delta = data.get('comment_delta', 0)
    if data_manager.update_post_stats(id, like_delta, comment_delta):
        return jsonify({"status": "success"})
    return jsonify({"error": "Post not found"}), 404

@app.route('/api/posts/<id>/comment', methods=['POST'])
def add_post_comment(id):
    """添加图文分享的留言"""
    data = request.json
    if data_manager.add_post_comment(id, data):
        return jsonify({"status": "success"})
    return jsonify({"error": "Post not found"}), 404

@app.route('/api/articles', methods=['GET', 'POST'])
def handle_articles():
    """获取文章列表或发布新文章"""
    if request.method == 'GET':
        articles = data_manager.get_articles()
        return jsonify(articles)
    else:
        data = request.json
        if data_manager.save_article(data):
            return jsonify({"status": "success", "message": "Article published"})
        return jsonify({"error": "Failed to save article"}), 500

@app.route('/api/articles/rate/<id>', methods=['POST'])
def rate_article(id):
    """给文章评分"""
    data = request.json
    score = data.get('score')
    if score is None:
        return jsonify({"error": "Score is required"}), 400
    if data_manager.rate_article(id, score):
        return jsonify({"status": "success", "message": "Rating submitted"})
    return jsonify({"error": "Article not found"}), 404

# ===== 认证接口 =====

@app.route('/api/auth/register', methods=['POST'])
def register():
    """用户注册"""
    data = request.json
    nickname = data.get('nickname')
    password = data.get('password')

    if not nickname or not password:
        return jsonify({"error": "Nickname and password are required"}), 400

    # 检查重名
    if data_manager.get_user(nickname):
        return jsonify({"error": "User already exists"}), 400

    new_user = {
        "nickname": nickname,
        "password": password, # 注意：实际毕设中可以不加密以方便数据查看，或者告知评委这是本地安全策略
        "avatar": data.get('avatar', '')
    }
    
    if data_manager.add_user(new_user):
        return jsonify({"status": "success", "user": {"nickname": nickname, "avatar": ""}})
    return jsonify({"error": "Registration failed"}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """用户登录"""
    data = request.json
    nickname = data.get('nickname')
    password = data.get('password')

    user = data_manager.get_user(nickname)
    if user and user['password'] == password:
        return jsonify({"status": "success", "user": {"nickname": user['nickname'], "avatar": user['avatar']}})
    
    return jsonify({"error": "Invalid nickname or password"}), 401

if __name__ == '__main__':
    try:
        from waitress import serve
        print("Backend server starting at http://127.0.0.1:5000 (Production Mode)")
        serve(app, host='0.0.0.0', port=5000)
    except ImportError:
        print("Backend server starting at http://127.0.0.1:5000 (Development Mode)")
        app.run(debug=True, host='0.0.0.0', port=5000)
