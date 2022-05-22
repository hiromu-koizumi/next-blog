import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string[]
  id: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
  id
}: Props) => {
  return (
    <div key={id} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-lg text-gray-700">
            <a href={`/posts/${slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
          {
            tags?.map(tag => <p className="mt-1 text-sm text-gray-500 bg-slate-100 w-max p-1 rounded">{tag}</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default PostPreview
