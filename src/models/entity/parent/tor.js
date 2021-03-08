import {types} from "mobx-state-tree"

export default types
    .model({})
    .actions(self => ({
        getFullDiameter(core_item) {
            let diameters = 0
            const {child, diameter, is_root} = core_item
            child.forEach(item => {
                diameters += item.diameter
                item.core && (diameters += this.getFullDiameter(item))
            })
            return is_root ? diameters * 2 - diameter : diameters * 2 + diameter
        },
        getFullDiameterVerticalTop(core_item) {
            let diameters = 0
            const {child, diameter, is_root} = core_item
            child.forEach(item => {
                diameters += item.diameter
                item.core && (diameters += this.getFullDiameterVerticalTop(item) / 2)
            })
            return is_root ? diameters * 2 : diameters * 2 + diameter
        }
    }))
    .views(self => ({
        get torScale() {
            const {core, aline, getFullDiameter, getFullDiameterVerticalTop} = self
            if (core) {
                const size = aline === 'VerticalTop' ? getFullDiameterVerticalTop(self) : getFullDiameter(self)
                return [size, size, size]
            }
            return undefined
        },
        get torDetail() {
            const {level} = self
            return 2 / level * 20
        }
    }))