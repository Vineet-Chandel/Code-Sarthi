export default {
  topics: [
    {
      id: "routes",
      title: "Routes & Views",
      sections: [
        {
          heading: "Basic routing",
          description: "Decorators map HTTP verbs + URL patterns to Python functions.",
          language: "python",
          code: `from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, Flask!"

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "POST":
        data = request.get_json()
        return jsonify(data), 201
    return jsonify({"users": []})

@app.route("/users/<int:user_id>", methods=["GET", "DELETE"])
def user(user_id):
    if request.method == "DELETE":
        return "", 204
    return jsonify({"id": user_id})`,
        },
        {
          heading: "Request object",
          description: "flask.request contains all incoming data — body, headers, args, files.",
          language: "python",
          code: `from flask import request

# JSON body
data = request.get_json()            # parses Content-Type: application/json
data = request.get_json(force=True)  # ignores Content-Type header

# Query string: /search?q=flask&page=2
q    = request.args.get("q", "")
page = request.args.get("page", 1, type=int)

# Form data
name  = request.form.get("name")
email = request.form["email"]

# Headers
token = request.headers.get("Authorization")`,
        },
        {
          heading: "Responses",
          description: "Return a string, tuple, or use make_response for full control.",
          language: "python",
          code: `from flask import jsonify, make_response, redirect, url_for

# JSON response (auto Content-Type)
return jsonify({"message": "ok"})

# Status code
return jsonify({"error": "Not found"}), 404

# Full response object
resp = make_response(jsonify({"data": result}), 200)
resp.headers["X-Request-Id"] = "abc123"
return resp

# Redirect
return redirect(url_for("index"))`,
        },
      ],
    },
    {
      id: "templates",
      title: "Templates",
      sections: [
        {
          heading: "Jinja2 basics",
          description: "Flask uses Jinja2 for templating. render_template() renders from the /templates directory.",
          language: "python",
          code: `from flask import render_template

@app.route("/about")
def about():
    return render_template("about.html", title="About Us", year=2024)`,
        },
        {
          heading: "Template syntax",
          description: "Jinja2 uses {{ }} for output and {% %} for logic — very similar to Django templates.",
          language: "html",
          code: `{# base.html #}
<!DOCTYPE html>
<html>
<head><title>{% block title %}Site{% endblock %}</title></head>
<body>
  {% block content %}{% endblock %}
</body>
</html>

{# about.html #}
{% extends "base.html" %}
{% block title %}{{ title }}{% endblock %}
{% block content %}
  <h1>{{ title }}</h1>
  <p>Year: {{ year }}</p>
  {% for item in items %}
    <li>{{ item | upper }}</li>
  {% endfor %}
{% endblock %}`,
        },
      ],
    },
    {
      id: "blueprints",
      title: "Blueprints",
      sections: [
        {
          heading: "Creating a blueprint",
          description: "Blueprints split a Flask app into reusable, modular components.",
          language: "python",
          code: `# auth/routes.py
from flask import Blueprint

auth = Blueprint("auth", __name__, url_prefix="/auth")

@auth.route("/login", methods=["GET", "POST"])
def login():
    return "Login page"

@auth.route("/logout")
def logout():
    return "Logged out"

# app.py
from auth.routes import auth
app.register_blueprint(auth)
# → /auth/login, /auth/logout`,
        },
        {
          heading: "App factory pattern",
          description: "Wrap app creation in a function to support multiple configs and testing.",
          language: "python",
          code: `# app/__init__.py
from flask import Flask

def create_app(config="config.ProductionConfig"):
    app = Flask(__name__)
    app.config.from_object(config)

    from .auth.routes import auth
    from .api.routes  import api
    app.register_blueprint(auth)
    app.register_blueprint(api)

    return app

# run.py
from app import create_app
app = create_app("config.DevelopmentConfig")`,
        },
      ],
    },
    {
      id: "extensions",
      title: "Common Extensions",
      sections: [
        {
          heading: "Flask-SQLAlchemy",
          description: "ORM integration — define models as Python classes, query with the SQLAlchemy session.",
          language: "python",
          code: `from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

# In create_app:
db.init_app(app)

# Querying
user = User.query.filter_by(email="a@b.com").first_or_404()
db.session.add(User(email="new@b.com"))
db.session.commit()`,
        },
        {
          heading: "flask-login — session auth",
          description: "Manage user sessions with @login_required decorator and current_user proxy.",
          language: "python",
          code: `from flask_login import LoginManager, login_user, logout_user, login_required, current_user

login_manager = LoginManager()
login_manager.login_view = "auth.login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth.route("/login", methods=["POST"])
def login():
    user = User.query.filter_by(email=request.form["email"]).first()
    login_user(user, remember=True)
    return redirect(url_for("dashboard"))

@app.route("/dashboard")
@login_required
def dashboard():
    return f"Hello, {current_user.email}"`,
        },
      ],
    },
  ],
};
