"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to /weather?city=USER_INPUT
    router.push(`/weather?city=${term}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Enter city..."
        className="p-2 rounded-l text-black"
      />
      <button className="bg-blue-600 p-2 rounded-r">Search</button>
    </form>
  );
}