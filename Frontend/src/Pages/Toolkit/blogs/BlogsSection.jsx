import { useState, useEffect } from "react";
import { blogData } from "./blogData";
import BlogCategoryGrid from "./BlogCategoryGrid";
import BlogPostList from "./BlogPostList";
import BlogPostDetail from "./BlogPostDetail";

export default function BlogsSection({ 
  initialCategoryId = null, 
  initialPostId = null,
  showSavedOnly = false,
  savedBlogs = [],
  onToggleBlogSave
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

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
        isBookmarked={savedBlogs.includes(selectedPost.id)}
        onToggleBookmark={onToggleBlogSave}
      />
    );
  }

  if (selectedCategory) {
    return (
      <BlogPostList
        category={selectedCategory}
        onBack={handleBackToCategories}
        onSelectPost={(id) => handleSelectPost(id, selectedCategory)}
        bookmarkedIds={savedBlogs}
        onToggleBookmark={onToggleBlogSave}
        showSavedOnly={showSavedOnly}
      />
    );
  }

  return (
    <BlogCategoryGrid
      categories={blogData.categories}
      onSelectCategory={handleSelectCategory}
      onSelectPost={handleSelectPost}
      bookmarkedIds={savedBlogs}
      onToggleBookmark={onToggleBlogSave}
      showSavedOnly={showSavedOnly}
    />
  );
}
