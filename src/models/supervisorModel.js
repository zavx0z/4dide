import {getRoot, types} from "mobx-state-tree"
import {Euler, MathUtils, Vector3} from "three"

export default types
    .model({
        channel: "space"
    })
    .volatile(self => ({
        position: new Vector3(0, 0, 10),
        rotation: new Euler(0, 0, 0),
        animated: false
    }))
    .actions(self => ({
        setAnimate(bool) {
            self.animated = bool
        },
        setPosition(x, y, z) {
            self['position'].set(x, y, z)
        },
        setRotation(x, y, z) {
            self['rotation'].set(x, y, z)
        },
        getVisibleHeight(camera, depth) {
            const cameraOffset = camera.position.z
            if (depth < cameraOffset) depth -= cameraOffset
            else depth += cameraOffset
            const vFOV = MathUtils.degToRad(camera.fov)
            return 2 * Math.tan(vFOV * 0.5) * Math.abs(depth)
        },
        getVisibleWidth(camera, depth) {
            return this.getVisibleHeight(camera, depth) * camera.aspect
        },
        computeDepth(fov, size) {
            return size / 2 / Math.tan(MathUtils.degToRad(fov) * 0.5)
        }
    }))
    .views(self => ({
        get ready() {
            return getRoot(self)['ready']
        }
    }))