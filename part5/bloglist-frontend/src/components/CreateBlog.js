const CreateBlog = ({ submitBlog }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    submitBlog(blog);
  };
  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={onSubmit} >
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="blog-form--title" placeholder="title" required />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="blog-form--author" placeholder="author" required />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input type="text" name="url" id="blog-form--url" placeholder="url" required />
        </div>
        <input type="submit" id="blog-form--submit" value="Create"  />
      </form>
    </>
  );
};
export default CreateBlog;
