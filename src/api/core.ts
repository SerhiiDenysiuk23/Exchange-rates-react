import {ApiData} from "../types/currency";

const URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"

export const requestAPI = async () => {
    try {
        const response = await fetch(URL, {
            method: "Get"
        })
        return await response.json() as ApiData[]
    }
    catch (e){
        console.log(e)
    }
}