import axios from 'axios';
import { httpGet, httpPost, httpPut, httpDelete } from './http';

// Private API
export const createBlog = async (title, author, content, published) => {
  let url = "http://127.0.0.1:8081/api/v1/blog";
  let json = {
    title: title,
    author: author,
    content: content,
    published: published
  }
  const data = await httpPost(url, json);
  return data;
}

/**
 * {id, title, author, content, published}
 * @param {*} json 
 * @returns 
 */
export const updateBlog = async (json) => {
  let url = "http://127.0.0.1:8081/api/v1/blog";
  const data = await httpPut(url, json);
  return data;
}

export const deleteBlog = async (id) => {
  let url = `http://127.0.0.1:8081/api/v1/blog/${id}`;
  const data = await httpDelete(url, null);
  return data;
}

// Public API
export const queryBlogs = async (page, size) => {
  let url = `http://127.0.0.1:8081/api/v1/blogs?page=${page}&size=${size}`;
  const data = await httpGet(url);
  return data;
}

export const queryBlogById = async (id) => {
  let url = `http://127.0.0.1:8081/api/v1/blog/${id}`;
  const data = await httpGet(url);
  return data;
}