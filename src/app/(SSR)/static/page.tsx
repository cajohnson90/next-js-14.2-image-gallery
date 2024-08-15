import Link from "next/link";
import { UnsplashImage } from "../../models/unsplash-image";
import Image from "next/image";
import { Metadata } from "next";
import { Alert } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Static Fetching - Next JS 13.4 image gallery",
};

/*
   Rendering and caching the page at compile time.
 */
export default async function Page() {
  const response: Response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  console.log(response);
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  const username = image.user.username;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at build time</strong>. Even
        though the Unsplash API always returns a new image, we see the same
        image after refreshing the page until we compile again.
      </Alert>
      <Image
        className="rounded shadow mw-100 h-100"
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
      />
      by
      <Link target="_blank" href={`/users/${username}`}>
        {username}
      </Link>
    </div>
  );
}
