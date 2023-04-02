import {types} from "mobx-state-tree"
import configModel from "./configModel"

const scaleModel = types
    .model({
        x: 1,
        y: 1,
        z: 1,
        config: configModel
    })
    .preProcessSnapshot(snapshot => {
        switch (snapshot) {
            case undefined:
                break
            default:
                snapshot['config'] = typeof snapshot.config === "undefined" ? configModel.create({config: {}}) : snapshot['config']
                return snapshot
        }
    })
    .volatile(_ => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            self.api = controller
        },
        set(x, y, z) {
            self.x = x
            self.y = y
            self.z = z
        },
        start(x, y, z) {
            return self.api.start({scaleX: x, scaleY: y, scaleZ: z, config: {...self['config']}})
        },
    }))

export default scaleModel