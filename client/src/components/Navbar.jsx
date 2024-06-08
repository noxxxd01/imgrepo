import { GithubIcon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import UploadBtn from "./UploadBtn"

const Navbar = () => {
  return (
    <div className="border-b-[1px] border-b-gray-100">
      <nav className="flex justify-between items-center container mx-auto py-2">
        <h1 className="font-semibold text-lg tracking-wide">imgrepo/</h1>
        <div className="flex gap-1">
          <div className="mr-2">
            <UploadBtn />
          </div>
          <a href="https://github.com/noxxxd01" target="_blank">
            <Button variant="ghost" size="icon">
              <GithubIcon size={20} />
            </Button>
          </a>
          <Button variant="ghost" size="icon">
            <Sun size={20} />
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar