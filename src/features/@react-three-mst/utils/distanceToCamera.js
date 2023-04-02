import r3fStore from "../r3fStore"
import {Vector3} from "three"

const vect = new Vector3()
export const distanceToCamera = (mesh) => {
    const {camera} = r3fStore
    const point1 = vect.setFromMatrixPosition(camera.matrixWorld).clone()
    const point2 = vect.setFromMatrixPosition(mesh.matrixWorld).clone()
    return point1.distanceTo(point2)
}


