import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Togglable from "./Togglable";
import Blog from "./Blog";

describe("<Togglable />", () => {
  const blog = {
    title: "test_title",
    author: "test_author",
    url: "test_url",
    likes: 72,
  };

  let likePost = jest.fn();
  let removePost = jest.fn();

  const blogComponent = (
    <Blog blog={blog} likePost={likePost} removePost={removePost} />
  );

  let container;
  let component;

  beforeEach(() => {
    component = render(
      <Togglable teaser={blog.title}>{blogComponent}</Togglable>
    );
    container = component.container;

    likePost.mockClear();
    removePost.mockClear();
  });

  test("renders only title by default", () => {
    expect(screen.queryByText(blog.title)).toBeInTheDocument();

    expect(screen.queryByText(blog.author)).not.toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(blog.likes)).not.toBeInTheDocument();
  });

  test("expands when button is clicked", async () => {
    const user = userEvent.setup();

    const button = container.querySelector(".togglable button");
    await user.click(button);

    expect(screen.getByText(blog.title)).toBeInTheDocument();
    expect(screen.getByText(blog.author)).toBeInTheDocument();
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(blog.likes)).toBeInTheDocument();
  });

  test("hides when button is clicked", async () => {
    const user = userEvent.setup();

    const button = container.querySelector(".togglable button");
    await user.click(button);

    expect(screen.getByText(blog.url)).toBeInTheDocument();

    await user.click(button);

    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  });

  test("like button is clicked twice", async () => {
    const user = userEvent.setup();

    const button = container.querySelector(".togglable button");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likePost.mock.calls).toHaveLength(2);
  });
});
