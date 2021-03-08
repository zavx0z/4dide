import {types} from "mobx-state-tree"
import network from "./network_model"
import * as serviceWorker from "./serviceWorker"
// https://github.com/duskload/react-device-detect#readme
// https://medium.com/@toricpope/transform-a-react-app-into-a-progressive-web-app-pwa-dea336bd96e6

const model = types
    .model({})
    .volatile(self => ({
        installPrompt: {}
    }))
    .actions(self => ({
        afterCreate() {
            serviceWorker.register()
            window.addEventListener('beforeinstallprompt', self.setInstallPrompt)
        },
        setInstallPrompt(e) {
            e.preventDefault()
            self.installPrompt = e
        },
        install() {
            if (typeof self.installPrompt.prompt !== 'undefined')
                self.installPrompt.prompt()
        },
        updateCache() {
            serviceWorker.unregister()
            setTimeout(() => serviceWorker.register(), 1000)
            setTimeout(() => window.location.reload(), 1000)
        }
    }))
    .views(self => ({
        get buttonVisible() {
            return !!self.online
        }
    }))

export default types.compose(model, network).create({})