import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import { getBlogs } from '../lib/api'
import Blog from '../types/blog'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  initBlogs: Blog[]
}

const Index = ({ initBlogs }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [offset, setOffset] = useState<number>(0)
  const router = useRouter();

  useEffect(() => {
    setBlogs(initBlogs)
    router.events.on('routeChangeComplete', setInitBlogs);
    return () => {
      router.events.off('routeChangeComplete', setInitBlogs)
    }
  }, [])

  const setInitBlogs = () => {
    console.log('routeChangeComplete')
    setBlogs(initBlogs)
  }

  const setLoadBlogs = async (newOffset: number) => {
    const newBlogs = await getBlogs({ offset: newOffset })
    setBlogs([...blogs, ...newBlogs])
  }

  const handleClickLoadBlogs = async () => {
    const newOffset = offset + 10
    setLoadBlogs(newOffset)
    setOffset(newOffset)
  }

  return (
    <Layout>
      <MoreStories posts={blogs} />
      <div className='justify-center flex mt-9'>
        <button
          type="button"
          className="inline-flex items-center justify-center w-96 px-10 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClickLoadBlogs}
        >
          More
        </button>
      </div>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const initBlogs = await getBlogs()
  return {
    props: {
      initBlogs,
    },
  };
}
