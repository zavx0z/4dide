import {getParent, getRoot, types} from "mobx-state-tree"
import orbitAnimation from "./orbit"
import axis from "./axis"
import {MathUtils} from "three"


const animation = types
    .model({})
    .volatile(self => ({
        alphaRotate: 1,
        speed: 1,
    }))
    .actions(self => ({
        playAxisAllChild() {
            const {child} = self
            child.forEach(item => item.playAxis())
        },
        getVisibleHeight(z) {
            const camera = getRoot(self).viewport.camera.three
            let depth = z
            // compensate for cameras not positioned at z=0
            const cameraOffset = camera.position.z
            if (depth < cameraOffset) depth -= cameraOffset
            else depth += cameraOffset
            // vertical fov in radians
            const vFOV = MathUtils.degToRad(camera.fov)
            // Math.abs to ensure the result is always positive
            return 2 * Math.tan(vFOV * 0.5) * Math.abs(depth)
        },
        getVisibleWidth(z) {
            const camera = getRoot(self).viewport.camera.three
            return this.getVisibleHeight(z) * camera.aspect
        }
    }))
    .views(self => ({
        get visibleHeight() {
            return self['getVisibleHeight'](this.position[2])
        },
        get visibleWidth() {
            return self['getVisibleWidth'](this.position[2])
        },
        get percentVisible() {
            const {aspect} = getRoot(self).viewport.camera.three
            const percent = (orient) => (self['boundingBox'].x / (self[orient] / 100)).toFixed(2)
            return aspect > 1 ? percent('visibleHeight') : percent('visibleWidth')
        },
        get isFold() {
            const {is_root} = self
            return is_root ? false : !!getParent(self, 2).child.find(item => item.core)
        },
        get cameraPositionEqual() {
            const {cameraV3, level, is_root} = self
            const {viewport: {camera: {three}}} = getRoot(self)
            if (typeof three !== "undefined") {
                const {position} = three
                const fixed = level
                if (is_root)
                    return (position.z.toFixed(fixed) === cameraV3.z.toFixed(fixed))
                else
                    return (position.z.toFixed(fixed) === cameraV3.z.toFixed(fixed)
                        && position.x.toFixed(fixed) === cameraV3.x.toFixed(fixed)
                        && position.y.toFixed(fixed) === cameraV3.y.toFixed(fixed)
                    )
            } else return false
        },
    }))
export default types.compose(animation, orbitAnimation, axis)