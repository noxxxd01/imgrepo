import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu"
import { useState } from 'react';
import axios from 'axios';

const UploadBtn = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onFileChange = e => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
  };
  
  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        setMessage('Please select a file to upload');
        return;
    }

    const formData = new FormData();
    formData.append('image', file)
    formData.append('name', name)

    try {
      const res = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMessage('Image uploaded successfully')
      console.log(res.data);

      window.location.reload();
    } catch(err) {
      console.error(err)
      setMessage('Error uploading image')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Upload an image</DialogTitle>
            <DialogDescription>
              Upload an image for fun. Click upload when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
                <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer">
                        <Input className="border-0" type="file" onChange={onFileChange} required />
                    </ContextMenuTrigger>
                </ContextMenu>
            </div>
            
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3 mt-1"
              value={name}
              onChange={onNameChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
            {message? <p></p> : <p></p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadBtn;