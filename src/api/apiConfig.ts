import axios from "axios";

const  apiConfig = {
    baseUrl: "https://kinopoiskapiunofficial.tech/api/v2.2/",
    apiKey: "14c5c1fc-3916-4e09-a79c-cde38802b177"
}


export const FetchData = async (type: string) =>{
    const link = `${apiConfig['baseUrl']}${type}`


    return await axios.get(link, {
        headers: {
            'X-API-KEY': apiConfig["apiKey"],
            'Content-Type': 'application/json',
        },
    })
        .catch(err => console.log(err))
}

export default FetchData