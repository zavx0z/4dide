import header from "./utils/headerWithToken"

export default (url, data) => {
    return fetch(url, {
        headers: header(),
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(res => res.error ? Promise.reject(res.error) : res)
        .catch((e) => {
            console.log()
            if (typeof e === "string") return Promise.reject(e)
            return Promise.reject('Что-то пошло не так! Попробуйте позже.')
        })
}