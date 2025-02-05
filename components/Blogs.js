import React from 'react';

const blogs = [
  {
    id: 1,
    title: "Blog Post 1",
    description: "This is the description of the first blog post.",
  },
  {
    id: 2,
    title: "Blog Post 2",
    description: "This is the description of the second blog post.",
  },
  {
    id: 3,
    title: "Blog Post 3",
    description: "This is the description of the third blog post.",
  },
];

const Blogs = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{blog.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
