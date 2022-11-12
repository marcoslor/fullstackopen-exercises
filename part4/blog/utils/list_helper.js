const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikesCount = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikesCount);
};

const mostBlogs = (blogs) => {
  const authored = blogs.map((blog) => blog.author);
  const uniqueAuthors = [...new Set(authored)];
  
  const authorBlogs = uniqueAuthors.map((author) => {
    return {
      author,
      blogs: authored.filter((a) => a === author).length,
    };
  });
  const mostBlogsCount = Math.max(...authorBlogs.map((author) => author.blogs));

  return authorBlogs.find((author) => author.blogs === mostBlogsCount);
};

const mostLikes = (blogs) => {
  const authored = blogs.map((blog) => blog.author);
  const uniqueAuthorsList = [...new Set(authored)];

  const authorBlogLikes = uniqueAuthorsList.map((author) => {
    return {
      author,
      likes: blogs.filter((blog) => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0),
    };
  });
  const mostLikedCount = Math.max(
    ...authorBlogLikes.map((author) => author.likes)
  );

  return authorBlogLikes.find((author) => author.likes === mostLikedCount);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
