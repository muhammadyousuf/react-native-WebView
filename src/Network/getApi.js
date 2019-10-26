
import { baseURL } from './URLS';

export default async function FetchData(url) {
    console.log(url)
    try {
        let response = await fetch(
            baseURL + `${url}`,
            {
                method: 'GET',
            })
        return response
    }
    catch (error) {
        console.error(error);
    }
}