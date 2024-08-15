import Link from "next/link";
import { UnsplashImage } from "../../models/unsplash-image";
import Image from "next/image";
import { Metadata } from "next";
import { Alert } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Static Fetching - Next JS 13.4 image gallery",
};

export const revalidate = 15;

export default async function Page() {
  const response: Response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      // cache: "no-cache",
    }
  );
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  const username = image.user.username;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>incremental static regression</strong>. A new
        image is fetches every 15 seconds (after refreshing the page) and then
        served from the cache for the duration.
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
