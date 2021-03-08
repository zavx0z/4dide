import authenticate from "../features/secure/routes"

export default {
    home: "/",
    messengers: '/messengers',
    videoHostings: '/videohostings',
    get statistic() {
        return `${this.videoHostings}/statistic`
    },
    get classification() {
        return `${this.videoHostings}/classification`
    },

    ...authenticate,
}