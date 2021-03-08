import {types} from "mobx-state-tree"
import {arrX} from "../../utils/arr"

export default types
    .model({}).views(self => ({
        get scatteringPosition() {
            const {radius, is_root, core, parentPosition, parentRadius, childDiameters} = self
            let parentOffset = parentPosition + parentRadius
            if (is_root)
                return arrX(0)
            else if (core && this.count === 1)
                return arrX(parentOffset + radius + childDiameters)
            else if (core)
                return arrX(parentOffset + this.scatteringDiametersSiblingUp + childDiameters)
            else if (!core && this.count === 1)
                return arrX(parentOffset + radius)
            else
                return arrX(parentOffset + this.scatteringDiametersSiblingUp)
        },
        get scatteringDiametersSiblingUp() {
            const {sibling} = self
            let distance = 0
            sibling.forEach(item => {
                if (item.count < this.count && item.core) {
                    distance += (item.radius + item.childDiameters) * 2
                } else if (item.count < this.count) {
                    distance += item.diameter
                }
            })
            return distance + this.radius
        },
    }))