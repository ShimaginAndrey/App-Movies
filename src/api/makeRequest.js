export const makeRequest = (url, options = {}) => {
    return new Promise((resolve,reject) => {
        fetch(url, options)
        .then((response) => {
            if(response.ok) return response.json();
            else throw response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
};