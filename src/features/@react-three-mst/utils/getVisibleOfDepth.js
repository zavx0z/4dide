import {MathUtils} from "three"
import {canvasStore} from "../Canvas"


export const getVisibleHeight = (camera, depth) => {
    const cameraOffset = camera.position.z
    if (depth < cameraOffset) depth -= cameraOffset
    else depth += cameraOffset
    const vFOV = MathUtils.degToRad(camera.fov)
    return 2 * Math.tan(vFOV * 0.5) * Math.abs(depth)
}
export const getVisibleWidth = (camera, depth) => {
    return getVisibleHeight(camera, depth) * camera.aspect
}
export const factor = (camera) => getVisibleWidth(typeof camera !== 'undefined' ? camera : canvasStore.camera, 0) / window.innerWidth