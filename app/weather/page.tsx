import { getWeatherData } from "../lib/weather";

const Home = async () => {

    const data = await getWeatherData('Paris'); //Deafult City

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Weather in {data.name}</h1>
            <p className="text-4xl">{data.main.temp}°C</p>
            <p>Condition: {data.weather[0].description}</p>
        </div>
    ); 
}

export default Home