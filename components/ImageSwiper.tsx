import Carousel from "./Carousel";
import Image from "next/image";

const ImageSwiper = ({
  photos,
}: {
  photos: {
    url: string;
    id: number;
  }[];
}) => {
  return (
    <Carousel>
      {photos.map((photo) => (
        <Image
          src={photo.url}
          alt={`image-${photo.id}`}
          width={1000}
          height={500}
          sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        />
      ))}
    </Carousel>
  );
};

export default ImageSwiper;
