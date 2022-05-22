import PostPreview from './post-preview'
import Blog from '../types/blog'

type Props = {
  posts: Blog[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {posts?.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.eyecatch.url}
          date={post.updatedAt}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
          tags={post.tags}
          id={post.id}
        />
      ))}
    </div>
  )
}

export default MoreStories
