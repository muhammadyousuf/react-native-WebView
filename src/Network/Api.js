
import { baseURL } from './URLS';


export async function SendData(payload, url) {
    console.log('payload',payload)
    try {
        let response = await fetch(
            baseURL + `${url}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
        return response
    }
    catch (error) {
        console.error(error);
    }
}



