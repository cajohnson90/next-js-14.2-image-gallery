import { Alert } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Alert>
        <p>
          This is a sample project to showcase and my ability to use the
          <strong> Next JS - 14.2</strong> and it&apos;s feature including:
        </p>
        <ul>
          <li>Using the new App Router</li>
          <li>Static and dynamic server-side rendering</li>
          <li>Incremental static regeneration (ISR)</li>
          <li>Client-side rendering</li>
          <li>Route handlers (API endpoints)</li>
          <li>Metadata API</li>
          <li>And More...</li>
        </ul>
        <p>
          Every page uses a different approach to
          <strong> fetching and caching</strong> data. Click the links in the
          navigation bar to try them out.
        </p>
      </Alert>
      <Alert variant="secondary">
        <p>
          Note: In order to load the data on this site you need to a free API
          key from Unsplash and add it to the local environment file. Also,
          <strong> Unsplash</strong> has a free quota of 50 requests per hour so
          you might start getting errro if you try too often.
        </p>
      </Alert>
    </div>
  );
}
