'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return <p>Failed to fetch notes. {error.message}</p>;
}
