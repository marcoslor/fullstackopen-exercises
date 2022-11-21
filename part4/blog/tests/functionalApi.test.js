const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const api = supertest(app);

const initialPosts = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialPosts.map(blog => new Blog(blog));
  const savePromiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(savePromiseArray);
});

describe("when there is initially some blogs saved", () => {
  describe("deletion of a blog post", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const postsAtStart = await api.get("/api/blogs");
      const postToDelete = postsAtStart.body[0];

      await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

      const postsAtEnd = await api.get("/api/blogs");

      expect(postsAtEnd.body).toHaveLength(initialPosts.length - 1);

      const titles = postsAtEnd.body.map((r) => r.title);

      expect(titles).not.toContain(postToDelete.title);
    });
  });

  describe("updating a blog post", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const postsAtStart = await api.get("/api/blogs");
      const postToUpdate = postsAtStart.body[0];

      const postAt1 = {
        ...postToUpdate,
        likes: 100,
      };

      await api.put(`/api/blogs/${postToUpdate.id}`).send(postAt1).expect(200);

      const getPostAt1 = await api.get("/api/blogs/" + postToUpdate.id);
      expect(getPostAt1.body.likes).toBe(postAt1.likes);

      const postAt2 = {
        ...postToUpdate,
        likes: 14,
      };

      await api.put(`/api/blogs/${postToUpdate.id}`).send(postAt2).expect(200);
      
      const getPostAt2 = await api.get("/api/blogs/" + postToUpdate.id);
      expect(getPostAt2.body.likes).toBe(postAt2.likes);
    });
  });

  describe("getting all blogs", () => {
    test("blogs are returned as json", async () => {
      const postsResponse = await api.get("/api/blogs");

      expect(postsResponse.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(postsResponse.body).toHaveLength(initialPosts.length);
    });

    test("all blogs are returned", async () => {
      const postsResponse = await api.get("/api/blogs");

      const titles = postsResponse.body.map((r) => r.title);
      initialPosts.forEach((post) => {
        expect(titles).toContain(post.title);
      });
    });

    test("unique identifier property of the blog posts is named id", async () => {
      const postsResponse = await api.get("/api/blogs");

      expect(postsResponse.body[0].id).toBeDefined();
    });
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const postsAtStart = await api.get("/api/blogs");
      const postToView = postsAtStart.body[0];

      const resultPost = await api
        .get(`/api/blogs/${postToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(resultPost.body).toEqual(postToView);
    });

    test("fails with statuscode 404 if post does not exist", async () => {
      const nonExistingId = new mongoose.Types.ObjectId();

      await api.get(`/api/blogs/${nonExistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "asdf";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });
});

describe("addition of a new blog", () => {
  test("a blog post can be added", async () => {
    const initialGetResponse = await api.get("/api/blogs");
    const initialPosts = initialGetResponse.body;

    const newPost = {
      title: "Test Post",
      author: "Test Author",
      url: "test",
      likes: 0,
    };

    await api.post("/api/blogs").send(newPost).expect(201);
    const getResponse = await api.get("/api/blogs").expect(200);

    expect(getResponse.body).toHaveLength(initialPosts.length + 1);
  });

  test("a blog posted without likes will have 0 likes by default", async () => {
    const newPost = {
      title: "Test Post",
      author: "Test Author",
      url: "/test",
    };

    const postResponse = await api.post("/api/blogs").send(newPost).expect(201);

    expect(postResponse.body.likes).toBe(0);
  });

  test("a blog post without title and url will not be added", async () => {
    const newPost = {
      author: "Test Author",
    };

    await api.post("/api/blogs").send(newPost).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});