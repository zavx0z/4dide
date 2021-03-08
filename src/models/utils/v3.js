import {types} from "mobx-state-tree"

export default types
    .model({
        x: 0.0,
        y: 0.0,
        z: 0.0
    })
    .actions(self => ({
        setPosition(x, y, z) {
            self.x = x
            self.y = y
            self.z = z
        }
    }))