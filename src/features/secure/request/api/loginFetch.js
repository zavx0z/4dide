import api from "./api"

export default (headers) => fetch(api.login, {headers: headers})
    .then(response => response.json())
    .then(res => res.error ? Promise.reject(res.error) : res)
    .catch((e) => {
        if (typeof e === "string") return Promise.reject(e)
        return Promise.reject('Что-то пошло не так! Попробуйте позже.')
    })