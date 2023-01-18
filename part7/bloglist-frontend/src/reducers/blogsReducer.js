import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  // This way, the initial state is null, it will be possible to check if the
  // blogs have been fetched from the server or not.
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlogById(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlogById(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  }
});

export const { setBlogs, addBlog, updateBlogById, removeBlogById } =
  blogsSlice.actions;

export const blogsServiceActions = (service) => {
  return {
    getAll: () => async (dispatch) => {
      const blogs = await service.getAll();
      dispatch(setBlogs(blogs));
    },
    createBlog: (blog) => async (dispatch) => {
      const newBlog = await service.create(blog);
      dispatch(addBlog(newBlog));
    },
    likeBlog: (blog) => async (dispatch) => {
      const updatedBlog = await service.put(blog.id, {
        likes: blog.likes + 1,
      });
      dispatch(updateBlogById(updatedBlog));
    },
    removeBlog: (blog) => async (dispatch) => {
      await service.remove(blog.id);
      dispatch(removeBlogById(blog.id));
    },
    createComment: (blog, comment) => async (dispatch) => {
      const updatedBlog = await service.createComment(blog.id, comment);
      dispatch(updateBlogById(updatedBlog));
    }
  };
};

export default blogsSlice.reducer;