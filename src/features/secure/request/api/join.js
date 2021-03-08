import api from "./api"

export default (data) => {
    return fetch(api.join, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        mode: "cors",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(res => res.error ? Promise.reject(res.error) : res)
        .catch((e) => {
            if (typeof e === "string") return Promise.reject(e)
            return Promise.reject('Что-то пошло не так! Попробуйте позже.')
        })
}