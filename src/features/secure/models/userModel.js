import {applySnapshot, flow, types} from "mobx-state-tree"
import join from "../request/api/join"
import loginPassword from "../request/api/loginPassword"
import loginToken from "../request/api/loginToken"

const preprocessor = (snapshot) => {
    return {id: snapshot.id, phone: snapshot.login}
}
export default types
    .model({
        id: types.maybe(types.number),
        phone: types.maybe(types.string),
    })
    .preProcessSnapshot(preprocessor)
    .volatile(self => ({
        loading: false,
        password: types.maybe(types.string),
    }))
    .actions(self => ({
        afterCreate() {
            self.tokenStore && self.reLogin()
        },
        setPhone(phone) {
            self.phone = phone
        },
        setPassword(password) {
            self.password = password
        },
        toggleLoading() {
            self.loading = !self.loading
        },
        login: flow(function* (phone, password) {
            self.toggleLoading()
            try {
                const data = yield loginPassword(phone, password)
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.toggleLoading()
            } catch (e) {
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        reLogin: flow(function* () {
            self.toggleLoading()
            try {
                const data = yield loginToken()
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.toggleLoading()
            } catch (e) {
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        join: flow(function* (login, password) {
            self.toggleLoading()
            try {
                const data = yield join({login: login, password: password})
                console.log(data)
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.toggleLoading()
            } catch (e) {
                console.log(e)
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        logOut() {
            self.setPhone('')
            self.setPassword('')
            self.removeToken()
            self.removeExpiration()
        },
        setToken(token) {
            localStorage.setItem('token', token)
        },
        removeToken() {
            localStorage.removeItem('token')
        },
        setExpiration(expiration) {
            localStorage.setItem('expiration', expiration)
        },
        removeExpiration() {
            localStorage.removeItem('expiration')
        },
    }))
    .views(self => ({
        get tokenStore() {
            return localStorage.getItem('token')
        },
        get expirationStore() {
            return localStorage.getItem('expiration')
        },
        get isAuthenticated() {
            return !!(self.phone && self.tokenStore)
        },
    }))