import {getRoot, types} from "mobx-state-tree"
import {Vector3} from "three"
import title from "./titleModel"
import aether from "./aetherModels"

const worlds = types.compose(types
    .model({
        name: '',
        child: types.array(types.late(() => worlds)),
        path: '',
        level: 0,
        local: 0,
        aether: types.array(aether)
    })
    .volatile(self => ({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(0, 0, 0),
        expanded: false, // видимость
        active: false,
        hover: false,
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
        setPosition(x, y, z) {
            self.position = new Vector3(x, y, z)
        },
        setHover(e, bool) {
            e.stopPropagation()
            self.hover = bool
        },
        handleClick() {
        },
    }))
    .views(self => ({
        get color() {
            const percent = 144 / getRoot(self)['maxLevel']
            const blue = self['level'] * percent.toFixed(0)
            // const red = parseInt(255 - self['level'] * percent)
            return `rgb(${blue}, ${blue}, ${blue})%)`
        },
        get size() {
            return 1 / self['level']
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
        // get jsonPath() {
        //     return getRelativePath(getRoot(self).worlds, self)
        // }
    })), title
)


export default worlds