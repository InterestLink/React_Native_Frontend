import {API_URL, API_KEY} from '@env'

export const getHelloWorld = async () => {

    const response = await fetch(`${API_URL}helloWorld`);
    const data = await response.json();
    console.log(API_URL)
    return data.body;
}

export const getUser = async () => {
    const response = await fetch(`${API_URL}getUser`);
    const data = await response.json();
    console.log(API_URL)
    return data.body;
}
