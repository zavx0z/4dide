const base64 = require('base-64')

export default () => {
    const headers = new Headers()
    const token = localStorage.getItem('token')
    headers.append("Authorization", "Basic " + base64.encode(`${token}:`))
    headers.append('Content-Type', 'application/json')
    return headers
}