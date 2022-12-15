/* eslint-disable jest/expect-expect */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#login").should("be.visible");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/users", {
        username: "user",
        name: "User",
        password: "password",
      });
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("wrong");
      cy.get("#login").submit();

      cy.contains("invalid username or password");
      cy.get(".alert.error").should("have.css", "background-color", "rgb(244, 67, 54)");
    });

    it("succeeds with correct credentials", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("password");
      cy.get("#login").submit();

      cy.contains("Logged in successfully");
      cy.get(".alert.success").should(
        "have.css",
        "background-color",
        "rgb(76, 175, 80)"
      );
    });

    describe("When logged in", function () {
      const testBlog = {
        title: "Blog Title",
        author: "Blog Author",
        url: "http://blog.com"
      };

      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "user",
          password: "password",
        }).then((response) => {
          localStorage.setItem("token", JSON.stringify(response.body));
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog can be created", function () {
        cy.contains("Add blog post").click();
        cy.get("#blog-form--title").type("Blog Title");
        cy.get("#blog-form--author").type("Blog Author");
        cy.get("#blog-form--url").type("http://blog.com");
        cy.get("#blog-form--submit").click();

        // Toggle is hidden by default
        cy.contains("Blog Title");
      });

      it("A blog can be liked", function () {
        cy.createBlog(testBlog);

        cy.visit("http://localhost:3000");

        //click on button with text "open"
        cy.contains("Open").click();
        cy.contains("Likes: 0").should("be.visible");
        cy.get(".blog ul button").contains("like").click();
        cy.contains("Likes: 1").should("be.visible");
      });

      it("A blog can be deleted", function () {
        cy.createBlog(testBlog);

        cy.visit("http://localhost:3000");

        cy.contains("Open").click();
        cy.contains("button", "remove").click();
        cy.contains("Blog Title").should("not.exist");
      });

      it("Blogs are sorted by likes", function () {
        const blog1 = {
          title: "Blog Title 1",
          author: "Blog Author 1",
          url: "http://blog.com",
        };
        const blog2 = {
          title: "Blog Title 2",
          author: "Blog Author 2",
          url: "http://blog.com",
        };
        cy.createBlog(blog1);
        cy.createBlog(blog2);

        cy.visit("http://localhost:3000");

        // Open both toggles
        cy.contains("Open").click();
        cy.contains("Open").click();

        cy.contains(blog1.title).parent().contains("like").click().click();
        // Assert that the first blog has 2 likes
        cy.contains(blog1.title).parent().contains("Likes: 2");
        // Assert that the first blog is first
        cy.get(".blog").first().contains(blog1.title);

        cy.contains(blog2.title).parent().contains("like").click().click().click();
        // Assert that the second blog has 3 likes
        cy.contains(blog2.title).parent().contains("Likes: 3");
        // Assert that the second blog is first
        cy.get(".blog").first().contains(blog2.title);
      });
    });
  });
});
