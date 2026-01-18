// app/login/page.js
"use client"; // Tells Next.js this runs in the browser
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );

  const handleLogin = async () => {
    // Sends a magic link to the user's email
    await supabase.auth.signInWithOtp({ email });
    alert('Check your email for the login link!');
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-3 text-black"
        placeholder="Email"
      />
      <button onClick={handleLogin} className="bg-blue-500 p-3">Login</button>
    </div>
  );
}