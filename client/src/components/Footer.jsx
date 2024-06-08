import { GithubIcon } from "lucide-react"

const Footer = () => {
  return (
    <div className="border-t-[1px] border-t-gray-100 py-2 text-xs items-center gap-2 flex justify-center">
        Create by <GithubIcon size={15} /> <a href="https://github.com/noxxxd01" target="_blank" className="underline">noxxxd01</a>
    </div>
  )
}

export default Footer