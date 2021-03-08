import header from "./utils/headerWithToken"

export default (url) => {
    return fetch(url, {
        headers: header(),
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json())
        .then(res => res.error ? Promise.reject(res.error) : res)
        .catch((e) => {
            if (typeof e === "string") return Promise.reject(e)
            return Promise.reject('Что-то пошло не так! Попробуйте позже.')
        })
}