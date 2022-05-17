// import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
// import Container from '../../components/container'
// import PostBody from '../../components/post-body'
// import Header from '../../components/header'
// import PostHeader from '../../components/post-header'
// import Layout from '../../components/layout'
// import { getPostBySlug, getAllPosts } from '../../lib/api'
// import PostTitle from '../../components/post-title'
// import Head from 'next/head'
// import { CMS_NAME } from '../../lib/constants'
// import markdownToHtml from '../../lib/markdownToHtml'
// import PostType from '../../types/blog'

// type Props = {
//   post: PostType
//   morePosts: PostType[]
//   preview?: boolean
// }

// const Post = ({ post, morePosts, preview }: Props) => {
//   const router = useRouter()
//   console.log(post, 'pooooss')
//   // if (!router.isFallback && !post?.slug) {
//   //   return <ErrorPage statusCode={404} />
//   // }
//   return (
//     <Layout preview={preview}>
//       <Container>
//         <Header />
//         {router.isFallback ? (
//           <PostTitle>Loading…</PostTitle>
//         ) : (
//           <>
//             <article className="mb-32">
//               <Head>
//                 <title>
//                   {post.title} | Next.js Blog Example with {CMS_NAME}
//                 </title>
//                 <meta property="og:image" content={post.eyecatch.url} />
//               </Head>
//               <PostHeader
//                 title={post.title}
//                 coverImage={post.eyecatch.url}
//                 date={post.updatedAt}
//                 author={post.author}
//               />
//               <PostBody content={post.content} />
//             </article>
//           </>
//         )}
//       </Container>
//     </Layout>
//   )
// }

// export default Post

// type Params = {
//   params: {
//     slug: string
//   }
// }

// export async function getStaticProps({ params }: Params) {
//   console.log('udfio')
//   const post = getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'author',
//     'content',
//     'ogImage',
//     'coverImage',
//   ])
//   const content = await markdownToHtml(post.content || '')
//   console.log(content, 'content')
//   console.log(post, 'ps')
//   return {
//     props: {
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }

// export async function getStaticPaths() {
//   const posts = getAllPosts(['slug'])

//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           slug: post.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }
// import { Text, Heading, Box } from '@chakra-ui/react'
import { client } from "../../lib/client";

export default function BlogId({ blog }) {

  return (
    <main>
      <h1 className='text-2xl md:text-3xl font-bold p-4'>{blog.title}</h1>
      {/* <p className='pl-4'>{blog.updatedAt}</p> */}
      <div
        className='p-4'
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/posts/${content.slug}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });
  return {
    props: {
      blog: data.contents[0],
    },
  };
};