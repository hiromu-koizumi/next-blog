import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import { getBlogs } from '../lib/api'
import Head from 'next/head'
import Blog from '../types/blog'
import { useEffect, useState } from 'react'

type Props = {
  initBlogs: Blog[]
}

const Index = ({ initBlogs }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [offset, setOffset] = useState<number>(0)

  useEffect(() => {
    setBlogs(initBlogs)
  }, [])

  useEffect(() => {
    const set = async () => {
      const newBlogs = await getBlogs({ offset })
      setBlogs([...blogs, ...newBlogs])
    }
    set()
  }, [offset])

  const handleClickLoadBlogs = async () => {
    setOffset(offset + 10)
  }

  return (
    <>
      <Layout>
        <Head>
          <title>CryptoClips</title>
        </Head>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">CryptoClips</h2>
            <MoreStories posts={blogs} />
            <div className='justify-center flex mt-9'>
              <button
                type="button"
                className="inline-flex items-center px-10 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClickLoadBlogs}
              >
                More
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
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
