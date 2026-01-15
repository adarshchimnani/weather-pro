// app/weather/page.js

export default async function WeatherPage({ searchParams }) {
  // 1. Get the city from the URL (e.g., /weather?city=London)
  const city = searchParams.city || 'Paris';
  const apiKey = process.env.WEATHER_API_KEY;

  // 2. Fetch data directly on the server
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Weather in {data.name}</h1>
      <p className="text-4xl">{data.main?.temp}°C</p>
    </div>
  );
}