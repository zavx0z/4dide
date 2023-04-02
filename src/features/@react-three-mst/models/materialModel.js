import {types} from "mobx-state-tree"
import configModel from "./configModel"

const materialModel = types
    .model({
        opacity: 1,
        color: '',
        doubleSide: false,
        config: configModel
    })
    .volatile(_ => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            self.api = controller
        },
        setColor(str) {
            self.color = str
        },
        setOpacity(float) {
            self.opacity = float
            self.api && self.api.set({opacity: float})
        },
        startOpacity(value, config) {
            self.api.update({opacity: value, config: typeof config !== "undefined" ? config : {...self['config']}})
            return self.api.start()
        },
        setDoubleSide(bool) {
            self.doubleSide = bool
        }
    }))
export default materialModel