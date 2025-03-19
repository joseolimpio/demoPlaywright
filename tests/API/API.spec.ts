import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API tests with JSONPlaceholder', () => {
  
  test('GET - get a list of posts', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThanOrEqual(10);
    const firstPost = responseBody[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET - get a unique post', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${baseUrl}/posts/${postId}`);
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('POST - create a post', async ({ request }) => {
    const newPost = {
      title: 'POST test',
      body: 'this is a playwright test for a POST',
      userId: 1
    };
    const response = await request.post(`${baseUrl}/posts`, {
      data: newPost
    });
    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
  });

  test('PUT - updating an existing post', async ({ request }) => {
    const postId = 1;
    const updatedData = {
      title: 'Updated Title',
      body: 'This is a playwright test for a PUT',
      userId: 1
    };
    const response = await request.put(`${baseUrl}/posts/${postId}`, {
      data: updatedData
    });
    expect(response.status()).toBe(200);
    const updatedPost = await response.json();
    expect(updatedPost.id).toBe(postId);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
  });

  test('DELETE - delete a post', async ({ request }) => {
    const postId = 1;
    const response = await request.delete(`${baseUrl}/posts/${postId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Object.keys(responseBody).length).toBe(0);
  });
});