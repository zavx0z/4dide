export default {
    root: `${process.env.REACT_APP_HOST}/api`,
    get items() {
        return `${this.root}/items`
    },
    get coreIp(){
        return `${this.root}/core_ip`
    }
}
