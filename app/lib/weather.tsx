export async function getWeatherDate(city: string){
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        { next: {revalidate: 3600} }
    );

    if (!res.ok)
        throw new Error('Failed to fetch weather')
    
    return res.json();
}