import {canvasStore} from "../Canvas"

export const unitDisplayToDistanceUnit = (unitSize, distance) => {
    const {camera, viewport} = canvasStore
    const height = Math.tan(camera.fov * Math.PI / 180 * 0.5) * distance * 2
    const width = height * camera.aspect
    return width / viewport.width * unitSize
}
export const pxSizeToDistanceUnit = (size, distance) => {
    const {viewport} = canvasStore
    const result = unitDisplayToDistanceUnit(size / viewport.factor, distance)
    return Math.round(result * 100) / 100
}