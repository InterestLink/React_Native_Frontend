API_URL='https://y5pyf47rw4.execute-api.us-east-2.amazonaws.com/dev/'

export const getHelloWorld = async () => {

    const response = await fetch(`${API_URL}helloWorld`)
    const data = await response.json();
    console.log(API_URL)
    return data.body;
}
