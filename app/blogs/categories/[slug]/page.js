"use client"
import React from 'react'
import CatBlogs from '@/components/Category'
import { useParams } from 'next/navigation'
const page = () => {
  const params = useParams()
  // console.log(params)
  return (
    <div>
      <CatBlogs cat = {params.slug} />
   
    </div>
  )
}

export default page
