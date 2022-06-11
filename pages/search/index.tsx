import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Blog from '../../types/blog'
import Layout from "../../components/layout";
import { getBlogs } from "../../lib/api";
import MoreStories from "../../components/more-stories";
import { Loading } from "../../components/loading";

export const Search = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [offset, setOffset] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const { q } = router.query

    useEffect(() => {
        setIsLoading(true)
        setInitBlogs()
    }, [q])

    const setInitBlogs = async () => {
        console.log(q, router.query)
        const searchWordBlogs = await getBlogs({ offset: 0, filters: `title[contains]${q}` })
        setBlogs(searchWordBlogs)
        setIsLoading(false)
        //loading finish
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

    const BlogsDom = () => {
        return (
            <>
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
            </>
        )
    }

    return (
        <Layout>
            {
                isLoading ? <Loading /> : blogs.length ? <BlogsDom /> : <div>No Contents</div>
            }
        </Layout>
    );
}

export default Search
