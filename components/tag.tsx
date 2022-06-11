export type TagProps = {
    label: string,
    handleClick: (tag: string) => void
}
export const Tag = ({ label, handleClick }: TagProps) => <p onClick={() => handleClick(label)} className="z-10 cursor-pointer mt-1 text-sm text-gray-500 bg-slate-100 w-max p-1 rounded">{label}</p>