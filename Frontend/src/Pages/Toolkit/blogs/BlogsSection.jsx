import { useState, useEffect } from "react";
import { blogData } from "./blogData";
import BlogCategoryGrid from "./BlogCategoryGrid";
import BlogPostList from "./BlogPostList";
import BlogPostDetail from "./BlogPostDetail";

const BOOKMARKS_KEY = "codesarthi_toolkit_blog_bookmarks";

export default function BlogsSection({ initialCategoryId = null, initialPostId = null }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Handle deep link / initial props mounting or updates
  useEffect(() => {
    if (initialCategoryId || initialPostId) {
      let targetCat = null;
      let targetPost = null;

      if (initialCategoryId) {
        targetCat = blogData.categories.find((c) => c.id === initialCategoryId) || null;
      }
      if (initialPostId) {
        if (!targetCat) {
          // Find which category holds this post if category wasn't specified
          for (const cat of blogData.categories) {
            const found = (cat.posts || []).find((p) => p.id === initialPostId);
            if (found) {
              targetCat = cat;
              targetPost = found;
              break;
            }
          }
        } else {
          targetPost = (targetCat.posts || []).find((p) => p.id === initialPostId) || null;
        }
      }

      if (targetCat) setSelectedCategory(targetCat);
      if (targetPost) setSelectedPost(targetPost);
    }
  }, [initialCategoryId, initialPostId]);

  // Save bookmarks to localStorage whenever they change
  const handleToggleBookmark = (postId) => {
    setBookmarkedIds((prev) => {
      const isSaved = prev.includes(postId);
      const updated = isSaved ? prev.filter((id) => id !== postId) : [...prev, postId];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving blog bookmark to localStorage", e);
      }
      return updated;
    });
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedPost(null);
  };

  const handleSelectPost = (postId, optionalCat = null) => {
    const cat = optionalCat || selectedCategory || blogData.categories[0];
    const post = (cat?.posts || []).find((p) => p.id === postId) || null;
    if (cat) setSelectedCategory(cat);
    if (post) setSelectedPost(post);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedPost(null);
  };

  const handleBackToCategoryList = () => {
    setSelectedPost(null);
  };

  if (selectedPost && selectedCategory) {
    return (
      <BlogPostDetail
        post={selectedPost}
        category={selectedCategory}
        onBack={handleBackToCategoryList}
        onSelectPost={(id) => handleSelectPost(id, selectedCategory)}
        isBookmarked={bookmarkedIds.includes(selectedPost.id)}
        onToggleBookmark={handleToggleBookmark}
      />
    );
  }

  if (selectedCategory) {
    return (
      <BlogPostList
        category={selectedCategory}
        onBack={handleBackToCategories}
        onSelectPost={(id) => handleSelectPost(id, selectedCategory)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
      />
    );
  }

  return (
    <BlogCategoryGrid
      categories={blogData.categories}
      onSelectCategory={handleSelectCategory}
      onSelectPost={handleSelectPost}
      bookmarkedIds={bookmarkedIds}
      onToggleBookmark={handleToggleBookmark}
    />
  );
}
