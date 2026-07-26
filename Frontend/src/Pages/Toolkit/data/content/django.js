export default {
  topics: [
    {
      id: "models",
      title: "Models & ORM",
      sections: [
        {
          heading: "Defining a model",
          description: "Django models are Python classes that map to database tables. Each field type corresponds to a SQL column.",
          language: "python",
          code: `from django.db import models

class Post(models.Model):
    title   = models.CharField(max_length=200)
    slug    = models.SlugField(unique=True)
    body    = models.TextField()
    author  = models.ForeignKey("auth.User", on_delete=models.CASCADE, related_name="posts")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title`,
        },
        {
          heading: "QuerySet API",
          description: "Django's ORM returns lazy QuerySets — the DB is only hit when you evaluate them.",
          language: "python",
          code: `# All published posts
posts = Post.objects.filter(is_published=True)

# Single object (raises DoesNotExist if missing)
post = Post.objects.get(slug="hello-world")

# get_or_404 shortcut in views
from django.shortcuts import get_object_or_404
post = get_object_or_404(Post, slug=slug)

# Chained filters
recent = Post.objects.filter(is_published=True).order_by("-created")[:10]

# Create / update / delete
Post.objects.create(title="New Post", slug="new-post", body="...")
Post.objects.filter(id=1).update(is_published=True)
Post.objects.get(id=1).delete()`,
        },
        {
          heading: "Migrations",
          description: "Django auto-generates migration files from model changes.",
          language: "bash",
          code: `# Detect model changes and generate a migration
python manage.py makemigrations

# Apply all pending migrations
python manage.py migrate

# Show migration status
python manage.py showmigrations

# Revert to a specific migration
python manage.py migrate myapp 0003`,
        },
      ],
    },
    {
      id: "views-urls",
      title: "Views & URLs",
      sections: [
        {
          heading: "Function-based views",
          description: "FBVs receive a HttpRequest and must return a HttpResponse.",
          language: "python",
          code: `from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST"])
def post_list(request):
    if request.method == "GET":
        posts = list(Post.objects.values("id", "title", "slug"))
        return JsonResponse({"posts": posts})

    if request.method == "POST":
        import json
        data = json.loads(request.body)
        post = Post.objects.create(**data)
        return JsonResponse({"id": post.id}, status=201)`,
        },
        {
          heading: "Class-based views",
          description: "CBVs split request handling by method and support mixins for common patterns.",
          language: "python",
          code: `from django.views import View
from django.shortcuts import render, redirect

class PostDetailView(View):
    def get(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        return render(request, "posts/detail.html", {"post": post})

    def post(self, request, slug):
        # Handle comment submission etc.
        return redirect("post-detail", slug=slug)

# Generic CBVs (even less boilerplate)
from django.views.generic import ListView, DetailView

class PostListView(ListView):
    model = Post
    template_name = "posts/list.html"
    context_object_name = "posts"
    queryset = Post.objects.filter(is_published=True)`,
        },
        {
          heading: "URL configuration",
          description: "urls.py maps URL patterns to views. Use path() for simple routes and include() to compose apps.",
          language: "python",
          code: `# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("",           views.PostListView.as_view(), name="post-list"),
    path("<slug:slug>/", views.PostDetailView.as_view(), name="post-detail"),
]

# project/urls.py
from django.urls import path, include

urlpatterns = [
    path("admin/",  admin.site.urls),
    path("posts/",  include("myapp.urls")),
    path("api/",    include("api.urls")),
]`,
        },
      ],
    },
    {
      id: "templates",
      title: "Templates",
      sections: [
        {
          heading: "Template syntax",
          description: "Django's template language uses {{ }} for variables and {% %} for tags.",
          language: "html",
          code: `<!-- Variable output -->
<h1>{{ post.title }}</h1>
<p>By {{ post.author.get_full_name|default:"Anonymous" }}</p>

<!-- Filters -->
<time>{{ post.created|date:"N j, Y" }}</time>
<p>{{ post.body|truncatewords:30|linebreaks }}</p>

<!-- For loop -->
{% for post in posts %}
  <article>
    <a href="{% url 'post-detail' slug=post.slug %}">{{ post.title }}</a>
  </article>
{% empty %}
  <p>No posts yet.</p>
{% endfor %}

<!-- Conditional -->
{% if user.is_authenticated %}
  <a href="{% url 'logout' %}">Logout</a>
{% else %}
  <a href="{% url 'login' %}">Login</a>
{% endif %}`,
        },
        {
          heading: "Template inheritance",
          description: "base.html defines the shell; child templates override {% block %} regions.",
          language: "html",
          code: `<!-- base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{% block title %}Site{% endblock %}</title>
</head>
<body>
  {% include "partials/nav.html" %}
  <main>{% block content %}{% endblock %}</main>
</body>
</html>

<!-- posts/list.html -->
{% extends "base.html" %}

{% block title %}Posts — Site{% endblock %}

{% block content %}
  {% for post in posts %}
    <h2>{{ post.title }}</h2>
  {% endfor %}
{% endblock %}`,
        },
      ],
    },
    {
      id: "admin-forms",
      title: "Admin & Forms",
      sections: [
        {
          heading: "Registering models with admin",
          description: "A few lines in admin.py gives you a full CRUD interface for free.",
          language: "python",
          code: `from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display  = ("title", "author", "created", "is_published")
    list_filter   = ("is_published", "created")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "created"`,
        },
        {
          heading: "Model forms",
          description: "ModelForm auto-generates form fields from a model — avoids duplicating field definitions.",
          language: "python",
          code: `from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "body", "is_published"]

# In a view
def create_post(request):
    form = PostForm(request.POST or None)
    if form.is_valid():
        post = form.save(commit=False)
        post.author = request.user
        post.save()
        return redirect("post-list")
    return render(request, "posts/form.html", {"form": form})`,
        },
      ],
    },
  ],
};
