import {types} from "mobx-state-tree"
import {arr} from "../../utils/arr"

export default types
    .model({
        paddingSphere: 4
    })
    .actions(self => ({}))
    .views(self => ({
        get core() {
            return !!self['child'].length
        },
        get coreScale() {
            const {level, paddingSphere} = self
            const scale = 1 / level
            return arr(scale - (scale / 100 * paddingSphere))
        },
        get coreDetail() {
            return 6
        }
    }))