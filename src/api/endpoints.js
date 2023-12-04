const API_KEY ='YzidmPkUpdESwiMdH0EwAtjDAJXXwjG8'
const BASE_API = 'https://api.apilayer.com'


const REQUEST_HEADERS = {
    headers: {
        apiKey: API_KEY
    }
}

const fixerApi = (url) => `${BASE_API}/fixer/${url}`

const API = {
    CURRENCY: {
        convert: (to, from, amount) => fixerApi(`convert?to=${to}&from=${from}&amount=${amount}`),
        symbols: fixerApi ('symbols')
    }
}


export {
    REQUEST_HEADERS,
    API
}


