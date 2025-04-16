'use client';

import { useEffect, useState } from "react";

export default function MyComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Runs only in the browser
  }, []);

  return (
    <div>
      {isClient ? (
        <p>Client-side content: {document.title}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
