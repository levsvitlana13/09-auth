
'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return <p>Failed to fetch note details. {error.message}</p>;
}
