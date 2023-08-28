import Carousel from "@/components/Carousel";
import Image from "next/image";

export default function PropertyPage() {
  return (
    <Carousel>
      <Image
        src="https://unsplash.it/475/205"
        alt="image"
        width={1000}
        height={500}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        style={{ width: "auto", height: "auto" }}
      />
      <Image
        src="https://unsplash.it/476/205"
        alt="image"
        width={1000}
        height={500}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        style={{ width: "auto", height: "auto" }}
      />
      <Image
        src="https://unsplash.it/477/205"
        alt="image"
        width={1000}
        height={500}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        style={{ width: "auto", height: "auto" }}
      />
      <Image
        src="https://unsplash.it/478/205"
        alt="image"
        width={1000}
        height={500}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        style={{ width: "auto", height: "auto" }}
      />
      <Image
        src="https://unsplash.it/479/205"
        alt="image"
        width={1000}
        height={500}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        style={{ width: "auto", height: "auto" }}
      />
    </Carousel>
  );
}
