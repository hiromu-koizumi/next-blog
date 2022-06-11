import { client } from "./client";
import Blog from '../types/blog'

export type GetBlogsQueries = {
  offset: number
  filters?: string
}

export const getBlogs = async (queries?: GetBlogsQueries) => {
  const data = await client.get({
    endpoint: "blogs",
    queries
  });
  console.log(queries)
  const initBlogs: Blog[] = data.contents.map((val: any) => {
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
  return initBlogs
}
