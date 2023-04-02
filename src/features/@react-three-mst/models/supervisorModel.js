import {types} from "mobx-state-tree"
import positionModel from "./positionModel"
import {MathUtils} from "three"

const supervisorModel = types
    .model({
        position: positionModel,
        fov: types.number,
    })
    .actions(self => ({
        setFov(fov) {
            self.fov = fov
        },
        setX(num) {
            self.x = num
        },
        setY(num) {
            self.y = num
        },
        setZ(num) {
            self.z = num
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
        },
        getWidthAtDepth(camera, depth, width) {
            const visibleHeight = self['getVisibleHeight'](camera, depth)
            const visibleWidth = visibleHeight * camera.aspect
            const widthAtDepth = width * (visibleWidth / camera.viewportWidth)
            return widthAtDepth
        }
    }))
export default supervisorModel