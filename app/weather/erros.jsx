"use client"; // Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="mt-2 text-slate-400">{error.message}</p>
      <button
        onClick={() => reset()} // Attempts to re-render the segment
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}