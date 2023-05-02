import React, { useEffect } from 'react'
import PostItem from '../components/PostItem'
import PopularPosts from '../components/PopularPosts'
import { useDispatch, useSelector } from 'react-redux'
import Post, { getAllPosts } from '../redux/features/post/post'

const Main = () => {
  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector(state => state.posts)
  
  useEffect(() => {
    dispatch(getAllPosts())
  },[dispatch])

  if (!posts?.length) {
    return <div className='text-xl text-center text-white py-10'>Посты не найдены</div>
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {posts && posts.map(post => <PostItem key={post?._id} post={post}/>)}
        </div>
        <div className='basis-1/5'>
          <div className='text-sm uppercase text-white'>Популярное:</div>
          <PopularPosts/>
          {/* {popularPosts && popularPosts.map(post => <PopularPosts key={post.author} />)} */}
        </div>
      </div>
    </div>
  )
}

export default Main