

export default async function getWeatherForecast(){
    try{
        const res =  await fetch(`https://api.weatherapi.com/v1/forecast.json?q=11421&key=${import.meta.env.VITE_APP_WEATHER_API}`)
        
        if(!res.ok) throw new Error(`API responded ${res.status}`);
        const data = res.json()
        return data
    }
    catch(err){
        console.error("API request error :", err)
    }

}