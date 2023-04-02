import {getParent, getRoot, types} from "mobx-state-tree"
import title from "./titleModel"
import baseModel from "../features/@react-three-mst/models/baseModel"

const worlds = types.compose(baseModel, types
    .model({
        name: '',
        child: types.array(types.late(() => worlds)),
        path: '',
        level: 0,
        local: 0,
    })
    .volatile(self => ({
        expanded: false, // видимость
        active: false,
    }))
    .actions(self => ({
        setActive(bool) {
            self.active = bool
        },
        setExpanded(bool) {
            self.expanded = bool
        },
        setLevel(level) {
            self.level = level
        },
        setLocal(local) {
            self.local = local
        },
        setPath(path) {
            self.path = path
        },
        handleClick() {
        },
    }))
    .views(self => ({
        get size() {
            const {worldSize} = getRoot(self)
            return worldSize / self['level']
        },
        get title() {
            return self.name
        },
        get ready() {
            return getRoot(self)['ready']
        },
        get sizeGeometry() {
            const {size} = self
            return [size, size, size]
        },
        get parent() {
            let parent
            try {
                parent = getParent(self, 2)
                if (parent.$treenode.type.name !== self.$treenode.type.name)
                    parent = null
            } catch (e) {
                return null
            }
            return parent
        },
        get parentActive() {
            try {
                return getParent(self, 2)['active']
            } catch (_) {
                return true
            }
        }
        // get jsonPath() {
        //     return getRelativePath(getRoot(self).worlds, self)
        // }
    })), title
).named('world')


export default worlds