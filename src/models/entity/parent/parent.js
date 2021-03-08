import {getParent, types} from "mobx-state-tree"
import {Vector3} from "three"

export default types
    .model({})
    .views(self => {
        const parent = self['is_root'] ? undefined : getParent(self, 2)
        return {
            get parentMeshPosition() {
                const {is_root} = self
                return is_root ? new Vector3(0, 0, 0) : parent.mesh.position
            },
            get parentRadius() {
                const {level} = self
                const parentDiameter = 1 / (level - 1)
                return parentDiameter / 2
            },
            get parentScale() {
                const {is_root} = self
                return is_root ? 1 : parent.coreScale[0]
            },
            get parentPosition() {
                const {is_root} = self
                return is_root ? 0 : parent.position[0]
            },
            get sibling() {
                const {is_root} = self
                return (is_root || typeof parent.child === "undefined") ? [] : parent.child
            },
            get childDiameters() {
                let childR = 0
                self['child'].forEach(item => childR += item.diameter)
                return childR
            },
        }
    })