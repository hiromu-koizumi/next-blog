import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Blog from '../../types/blog'
import Layout from "../../components/layout";
import { getBlogs } from "../../lib/api";
import MoreStories from "../../components/more-stories";

export const Search = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [offset, setOffset] = useState<number>(0)
    const router = useRouter();

    const { tag } = router.query

    useEffect(() => {
        setInitBlogs()
    }, [tag])

    const setInitBlogs = async () => {
        console.log(tag, router.query)
        const searchTagBlogs = await getBlogs({ offset: 0, filters: `tags[contains]${tag}` })
        setBlogs(searchTagBlogs)
    }

    const setLoadBlogs = async (newOffset: number) => {
        const newBlogs = await getBlogs({ offset: newOffset, filters: `tags[contains]${tag}` })
        setBlogs([...blogs, ...newBlogs])
    }

    const handleClickLoadBlogs = async () => {
        const newOffset = offset + 10
        setLoadBlogs(newOffset)
        setOffset(newOffset)
    }

    return (
        <Layout>
            {blogs.length ? <MoreStories posts={blogs} /> : <div>No Contents</div>}
            <div className='justify-center flex mt-9'>
                <button
                    type="button"
                    className="inline-flex items-center justify-center w-96 px-10 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleClickLoadBlogs}
                >
                    More
                </button>
            </div>
        </Layout>
    );
}

export default Search
