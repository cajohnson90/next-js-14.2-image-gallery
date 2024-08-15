"use client";
import { UnsplashImage } from "@/app/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Image, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );

  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsError, setSearchResultsError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get("search-query")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsError(false);
        setSearchResultsLoading(true);

        const response = await fetch(`/api/search?query=${searchQuery}`);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }
  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to the NextJS route handler
        that runs on the server. This route handler then fetches the data from
        the Unsplash API and returns it to the client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label> Search Query</Form.Label>
          <Form.Control
            name="search-query"
            placeholder="e.g cats, hotdogs, houses"
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsError && <p>Something went wrong. Please try again!</p>}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different search</p>
        )}
      </div>

      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              key={image.urls.raw}
              src={image.urls.raw}
              alt={image.description}
              width={250}
              height={250}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
