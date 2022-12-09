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
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" placeholder="title" required />
        <br />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" placeholder="author" required />
        <br />
        <label htmlFor="url">Url</label>
        <input type="text" name="url" placeholder="url" required />
        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
};
export default CreateBlog;
