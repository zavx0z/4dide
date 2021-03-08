import header from "./utils/headerWithToken"

export default (url, data) => {
    let filename
    return fetch(url, {
        headers: header(),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
    })
        .then(response => {
            filename = response.headers.get('Content-Disposition').split('filename=')[1]
            return response
        })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
        .catch((e) => {
            console.log()
            if (typeof e === "string") return Promise.reject(e)
            return Promise.reject('Что-то пошло не так! Попробуйте позже.')
        })
}