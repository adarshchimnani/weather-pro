// app/weather/page.js
import { addFavorite } from './actions';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function WeatherPage({ searchParams }) {
  const city = searchParams.city || 'London';
  
  // Fetch weather data (as we did in Step 1)
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
  const data = await res.json();

  // Fetch the user's saved favorites from Supabase
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
  const { data: favorites } = await supabase.from('favorites').select('city_name');

  return (
    <div className="p-10">
      <div className="bg-slate-800 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-5xl">{data.main?.temp}°C</p>
        
        {/* We use a form with a Server Action */}
        <form action={async () => {
          "use server";
          await addFavorite(data.name);
        }}>
          <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded">
            ⭐ Save to Favorites
          </button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Your Saved Cities:</h2>
        <ul className="list-disc ml-5">
          {favorites?.map((fav, index) => (
            <li key={index}>{fav.city_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}