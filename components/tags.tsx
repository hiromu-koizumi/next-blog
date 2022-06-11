import { Router, useRouter } from "next/router"
import { Tag } from "./tag"

type Props = {
    tags?: string[]
}
export const Tags = ({ tags }: Props) => {
    const router = useRouter()
    return (
        <div className='flex gap-2'>{tags?.map(tag => <Tag key={tag} label={tag} handleClick={() => { router.push(`/tag/${tag}`) }} />)}</div>
    )
}