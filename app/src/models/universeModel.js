import worldModel from "./worldModel"
import {getRelativePath, resolvePath, types} from "mobx-state-tree"
import supervisorModel from "./supervisorModel"
import universeAction from "../actions/universeAction"

const universeModel = types
    .model({
        worlds: worldModel, // атомы в рекурсии
        atoms: types.array(types.string), // пути атомов в мирах
        supervisor: supervisorModel,
        action: universeAction,
        maxLevel: 0,
    })
    .volatile(self => ({
        expanded: false,
        ready: false, // флаг, служит для запуска
    }))
    .actions(self => ({
        toggleReady() {
            process.env.REACT_APP_LOGGING && console.log('[UNIVERSE]: set ready')
            self.ready = true
        },
        extract(atomPath) {
            return resolvePath(self['worlds'], atomPath)
        },
        getFastAtom(path) {
            const {atoms} = self
            const idx = atoms.indexOf(path)
            const pathUp = atoms[idx - 1]
            return this.extract(pathUp)
        },
        getPath(atom) {
            return getRelativePath(self['worlds'], atom)
        },
    }))
    .views(self => ({}))
export default universeModel

