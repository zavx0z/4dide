import {types} from "mobx-state-tree"

const aether = types.model({
    name: types.string,
    flow: ''
})
    .volatile(self => ({
        position: [0, 0, 0],
        parentPosition: [0, 0, 0],
        width: 0,
        height: 0,
    }))
    .actions(self => ({
        setPosition(x, y, z) {
            self.position = [x, y, z]
        },
        setParentPosition(x, y, z) {
            self.parentPosition = [x, y, z]
        },
        setWidth(width) {
            self.width = width
        },
        setHeight(height) {
            self.height = height
        }

    }))
    .views(self => ({
        get color() {
            switch (self['flow']) {
                case 'in':
                    return "#36ad44"
                case 'out':
                    return "#6675f8"
                default:
                    return "#fff"
            }
        },
        get parentSocketPosition() {
            const [x, y, z] = self['parentPosition']
            return [x, y, z + 0.4]
        }
    }))
export default aether