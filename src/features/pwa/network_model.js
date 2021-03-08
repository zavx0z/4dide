import {types} from "mobx-state-tree"

export default types
    .model({})
    .volatile(self => ({
        online: navigator.onLine
    }))
    .actions(self => ({
        afterCreate() {
            window.addEventListener('online', () => self.changeState(true))
            window.addEventListener('offline', () => self.changeState(false))
        },
        changeState(bool) {
            self.online = bool
        }
    }))