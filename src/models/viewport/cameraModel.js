import {types} from "mobx-state-tree"
import v3 from "../utils/v3"
import {Vector3, Euler} from "three"


const cameraModel = types
    .model({
        position: v3,
        rotation: v3,
        fov: 75
    })
    .volatile(self => ({
        three: undefined,
    }))
    .actions(self => ({
        afterCreate() {
        },
        init(three) {
            self.three = three
        },
    }))
    .views(self => ({
        get positionV3() {
            const {position: {x, y, z}} = self
            return new Vector3(x, y, z)
        },
        get rotationV3() {
            const {three} = self
            const {rotation: {x, y, z}} = self
            return typeof three !== "undefined" ? three.rotation : new Euler(x, y, z)
        }
    }))
export default cameraModel