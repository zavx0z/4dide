import {types} from "mobx-state-tree"
import cameraModel from "./cameraModel"

export default types
    .model({
        camera: cameraModel
    })
    .volatile(self => ({
        width: 0.1
    }))
    .actions(self => ({
        setWidth(float) {
            self.width = float
        }
    }))
    .views(self => ({}))