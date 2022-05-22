import Author from './author'

type BlogType = {
  id: string
  title: string
  content: string
  updatedAt: string
  eyecatch: {
    url: string
    height: number,
    width: number
  }
  slug: string,
  excerpt: string,
  author: Author,
  tags: string[]
}

export default BlogType
