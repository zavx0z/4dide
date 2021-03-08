import header from "../utils/headerWithToken"
import loginFetch from "./loginFetch"

export default () => {
    const headers = header()
    return loginFetch(headers)
}