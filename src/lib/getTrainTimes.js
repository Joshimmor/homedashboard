export default async function getTrainTimes(line, latitude, longitude){
    try{
        const url = `https://mta-train-service.vercel.app/${line}?Latitude=${latitude}&Longitude=${longitude}`;
        const res =  await fetch(url);
        if(!res.ok) throw new Error(`API responded ${res.status}`);
        const data = await res.json();
        return data;
    }
    catch(err){
        console.error('Fetch to MTA train time api has failed: ',err);
        return {}
    }
}

