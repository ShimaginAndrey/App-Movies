import queryString from "query-string";
export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY_3 = "bf8fadea71ace47aa4ffdb4daaade617";
export const API_KEY_4 = 
'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjhmYWRlYTcxYWNlNDdhYTRmZmRiNGRhYWFkZTYxNyIsInN1YiI6IjYxZmQzZGMzNmYzMWFmMDBiYTAzYTZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rgtY_b1C1bsb_4Rngy424WRyVQhvRFYW-zK5Vr2dsQ';

import {makeRequest} from './makeRequest';

class RequestApi {

    get(url, options = {}) {
        const {params} = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        }

        return makeRequest(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
        });
    }

    post(url, options) {
        const {params = {}, body = {}} = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return makeRequest(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    delete(url, options) {
        const {params = {}, body = {}} = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        }

        return makeRequest(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
}

const instance = new RequestApi();
export {instance as RequestApi};