import API from "../../../../request/API"

export default {
    get root() {
      return `${API.root}/auth`
    },
    get token(){
        return `${this.root}/token`
    },
    get join(){
        return `${this.root}/join`
    },
    get login(){
        return `${this.root}/login`
    },
}
