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
  const heroPost = blogs[0]
  const morePosts = blogs.slice(1)
  console.log(blogs)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.eyecatch.url}
              date={heroPost.updatedAt}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
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
      }

    }
  })
  return {
    props: {
      blogs,
    },
  };
}
