import {getRoot, types} from "mobx-state-tree"

export default types
    .model({})
    .views(self => ({
        get directionFly() {
            return getRoot(self).prevLevel >= getRoot(self).currentLevel ? 'down' : 'up'
        },
    }))