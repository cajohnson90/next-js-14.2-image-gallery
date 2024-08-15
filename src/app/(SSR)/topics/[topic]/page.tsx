import { UnsplashImage } from "@/app/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "react-bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: {
    topic: string;
  };
}

export const dynamicParams = false;

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: `${topic} - NextJS 13.5 Image Gallery`,
  };
}

export function generateStaticParams() {
  return ["golf", "space", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response: Response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=3&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and the
        <strong> cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          className={styles.image}
          key={image.urls.raw}
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
        />
      ))}
    </div>
  );
}
