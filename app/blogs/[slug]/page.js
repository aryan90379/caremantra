"use client"
import React, { useEffect, useState } from 'react';
import { fetchArticle } from '@/actions/useractions';

const Blog = () => {
  const [article, setArticle] = useState(null);

  const getData = async () => {
    let article = await fetchArticle();
    setArticle(article);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='text-black mt-24'>
      <h1>yeh kya hai be</h1>
      {article && <div>{JSON.stringify(article)}</div>}

    </div>
  );
};

export default Blog;