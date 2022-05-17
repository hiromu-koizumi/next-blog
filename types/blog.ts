import Author from './author'

type BlogType = {
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
  author: Author
}

export default BlogType
