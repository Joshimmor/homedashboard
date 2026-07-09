export default  async function getEnergyUsage(){
    try{
        const res = await fetch("/data/usage.json")
        if(!res.ok) throw new Error(`API responded ${res.status}`);
        const data = res.json()
        return data
    }
    catch(err){
        console.error("API request error :", err)
    }
    
}