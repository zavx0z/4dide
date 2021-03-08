import api from "./api"

export default (data) => {
    return fetch(api.token, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(res => res.error ? Promise.reject(res.error) : res)
}