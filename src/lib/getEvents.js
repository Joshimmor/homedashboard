export default async function getEvents(){
    try{
        const res = await fetch(`${import.meta.env.VITE_APP_EVENTS}`)
        if(!res.ok) throw new Error(`API responded ${res.status}`);
        const data = res.json()
        return data
    }
    catch(err){
        console.error("API request error :", err)
    }
}