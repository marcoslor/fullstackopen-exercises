const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");

const mongoose = require("mongoose");
const { createBlog } = require("../utils/model_factory");
const { getAuthenticatedHeader } = require("./authenticated_requests");
const helper = require("./test_helper");

const api = supertest(app);

let initialPosts = [];
let initialUsers = [];

beforeEach(async () => {
  await Blog.deleteMany({});
  const users = await helper.populateUsers();
  console.log("users", users);

  // Each user has 5 posts
  await Promise.all(
    users.flatMap((user) =>
      Array(5)
        .fill()
        .map(() => createBlog({}, user))
    )
  );

  initialUsers = await User.find({}).populate("blogs");
  initialPosts = await Blog.find({}).populate("user");
});

describe("/api/blogs", () => {
  describe("GET", () => {
    test("requires being authenticated", async () => {
      await api.get("/api/blogs").expect(401);
    });
    test("returns all posts when authenticated", async () => {
      const header = await getAuthenticatedHeader(api, initialUsers[0].username, "password");
      const response = await api.get("/api/blogs").set(header).expect(200);
      expect(response.body).toHaveLength(initialUsers[0].blogs.length);
    });
  });
  describe("POST", () => {
    test("requires being authenticated", async () => {
      await api.post("/api/blogs").expect(401);
    });

    describe("when authenticated", () => {
      test("adds a new post belonging to the authenticated user", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );

        const newPost = {
          title: "this is a new post",
          author: "author5",
          url: "url",
        };

        await api.post("/api/blogs").set(header).send(newPost).expect(201);

        const response = await api
          .get("/api/blogs")
          .set(header)
          .expect(200);
        expect(response.body).toHaveLength(
          initialUsers[0].blogs.length + 1
        );
        expect(response.body.map((post) => post.title)).toContain(
          newPost.title
        );
      });
      test("forbids the user to create posts belonging to others", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        const anotherUser = initialUsers[1];

        const newPost = {
          title: "this is a new post",
          author: "author5",
          url: "url",
          user: anotherUser._id,
        };

        await api.post("/api/blogs").set(header).send(newPost).expect(422);
      });
    });
  });
});

describe("/api/blogs/:id", () => {
  describe("GET", () => {
    test("requires being authenticated", async () => {
      await api.get(`/api/blogs/${initialPosts[0].id}`).expect(401);
    });
    describe("when authenticated", () => {
      test("returns the post", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        const response = await api
          .get(`/api/blogs/${initialUsers[0].blogs[0].id}`)
          .set(header)
          .expect(200);
        expect(response.body.title).toEqual(initialUsers[0].blogs[0].title);
      });
      test("returns 404 if post not exist", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        await api
          .get(`/api/blogs/${mongoose.Types.ObjectId()}`)
          .set(header)
          .expect(404);
      });
      test("returns 404 when post does not belong to the authenticated user", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        await api
          .get(`/api/blogs/${initialUsers[1].blogs[0].id}`)
          .set(header)
          .expect(404);
      });
    });
  });
  describe("DELETE", () => {
    test("requires being authenticated", async () => {
      await api.delete(`/api/blogs/${initialPosts[0].id}`).expect(401);
    });
    describe("when authenticated", () => {
      test("deletes own post", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password");
        const post = initialUsers[0].blogs[0];
        await api.delete(`/api/blogs/${post.id}`).set(header).expect(204);
        expect(await Blog.findById(post.id)).toBeNull();
      });
      test("doesn't delete when post does not belong to the authenticated user", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        const post = initialUsers[1].blogs[0];

        await api.delete(`/api/blogs/${post.id}`).set(header).expect(204);
        expect(await Blog.findById(post)).not.toBeNull();
      });
    });
  });
  describe("PUT", () => {
    test("requires being authenticated", async () => {
      await api.put(`/api/blogs/${initialPosts[0].id}`).expect(401);
    });
    describe("when authenticated", () => {
      test("updates own post", async () => {
        const header = await getAuthenticatedHeader(
          api,
          initialUsers[0].username,
          "password"
        );
        const post = initialUsers[0].blogs[0];
        const newPost = {
          title: "new title 13456"
        };

        await api.put(`/api/blogs/${post.id}`).set(header).send(newPost).expect(204);
        expect((await Blog.findById(post.id)).title).toEqual(newPost.title);
      });
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
