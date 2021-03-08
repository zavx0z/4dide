import viewportModel from "../models/viewport/viewportModel"

const viewportStore = viewportModel.create({
    camera: {
        position: {x: 0, y: 40, z: 100},
        rotation: {x: 0, y: 0, z: 0},
        fov: 30
    }
})
export default viewportStore