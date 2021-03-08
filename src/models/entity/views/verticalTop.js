import {types} from "mobx-state-tree"
import {arrX} from "../../utils/arr"

export default types
    .model({})
    .views(self => ({
        get verticalTopPosition() {
            const {radius, count, is_root, core, parentPosition, parentRadius} = self
            let parentOffset = parentPosition + parentRadius
            if (is_root)
                return arrX(0)
            else if (count === 1)
                return arrX(parentOffset + radius)
            else if (core)
                return arrX(parentOffset + this.verticalTopDiametersSiblingUp)
            else
                return arrX(parentOffset + this.verticalTopDiametersSiblingUp)
        },
        get verticalTopDiametersSiblingUp() {
            const {sibling} = self
            let distance = 0
            sibling.forEach(item => {
                if (item.count < this.count && item.core) {
                    distance += item.childDiameters + item.diameter
                } else if (item.count < this.count) {
                    distance += item.diameter
                }
            })
            return distance + this.radius
        },
    }))