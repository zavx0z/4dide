import worldModel from "./worldModel"
import {getRelativePath, resolvePath, types} from "mobx-state-tree"
import supervisorModel from "../features/@react-three-mst/models/supervisorModel"

const universeModel = types
    .model({
        worlds: worldModel, // атомы в рекурсии
        atoms: types.array(types.string), // пути атомов в мирах
        supervisor: supervisorModel,
        maxLevel: 0,
        space: 0.004,
        backgroundColor: "#fff",
        worldSize: .005,
        worldSpace: .005,
    })
    .volatile(self => ({
        expanded: false,
        ready: false, // флаг, служит для запуска
    }))
    .actions(self => ({
        setWorldSpace: (space) => {
            self.worldSpace = space
        },
        setWorldSize: (size) => {
            self.worldSize = size
        },
        setBackgroundColor(color) {
            self.backgroundColor = color
        },
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

