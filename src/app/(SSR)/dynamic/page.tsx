import Link from "next/link";
import { UnsplashImage } from "../../models/unsplash-image";
import Image from "next/image";
import { Metadata } from "next";
import { Alert } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Static Fetching - Next JS 14.2 image gallery",
};

export const revalidate = 0;

export default async function Page() {
  const response: Response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      cache: "no-cache",
    }
  );
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  const username = image.user.username;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically</strong>. Every time you
        refresh the page, you get a new image from the Unsplash API.
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
