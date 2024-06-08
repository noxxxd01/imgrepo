import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import EditBtn from "./EditBtn";
import { Trash } from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";

const Gallery = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        const response = await axios.get('https://imgrepo.onrender.com/api');
        setImages(response.data);
    };

    const deleteImage = async (id) => {
        try {
            await axios.delete(`https://imgrepo.onrender.com/api/${id}`)
            fetchImages();
        } catch (error) {
            console.error('Error deleting image: ', error)
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="columns-2 gap-4 space-y-4 lg:columns-5 md:columns-3">
            {images.map(image => (
                <div key={image._id} className="group mb-6">
                    <div className="break-inside-avoid relative overflow-hidden group">
                        <img src={image.image} alt="img" className="h-auto max-w-full rounded-lg mb-2 cursor-pointer" />
                        <div className="absolute w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-6 right-3 text-white">
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="icon" disabled>
                                        <EditBtn imageId={image._id} />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => deleteImage(image._id)}>
                                        <Trash size={15} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Label className="text-md font-semibold px-2">{image.name}</Label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
