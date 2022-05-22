import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Blog from '../types/blog'
import { client } from "../lib/client";

type Props = {
  blogs: Blog[]
}

const Index = ({ blogs }: Props) => {
  // const heroPost = blogs[0]
  // const morePosts = blogs.slice(1)
  console.log(blogs)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">CryptoClips</h2>

            <MoreStories posts={blogs} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  console.log(data.contents, 'data')
  const blogs: Blog[] = data.contents.map((val: any) => {
    return {
      id: val.id,
      title: val.title,
      content: val.content,
      updatedAt: val.updatedAt,
      eyecatch: {
        url: val.eyecatch.url,
        height: val.eyecatch.height,
        width: val.eyecatch.width
      },
      slug: val.slug,
      excerpt: val.excerpt,
      author: {
        name: val.authorName,
        picture: val.authorPicture
      },
      tags: val.tags
    }
  })
  return {
    props: {
      blogs,
    },
  };
}
