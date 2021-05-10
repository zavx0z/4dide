import universeModel from "../models/universeModel"
import worldsStore from "./worldsStore"
import supervisorStore from "./supervisorStore"
import {addMiddleware} from "mobx-state-tree"

import bigBoomAction from "../actions/bigBoomAction"
import universeAction from "../actions/universeAction"

process.env.REACT_APP_LOGGING && console.log(`[universeStore]: INIT`)
const {atoms, maxLevel} = bigBoomAction(worldsStore)

const universeStore = universeModel.create({
    supervisor: supervisorStore, // камера
    worlds: worldsStore, // атомы в рекурсии
    atoms: atoms, // пути атомов (mobx-state-tree) в мирах
    maxLevel: maxLevel, // рассчитывается в действии инициализации BigBum
    action: universeAction.create({space: 2})
})
process.env.REACT_APP_LOGGING && console.log("========================================================================")

addMiddleware(worldsStore, (call, next) => {
    const {name, args, context} = call
    switch (name) {
        case 'setActive':
            const active = args[0]
            if (active) {
                const camera = args[1]
                process.env.REACT_APP_LOGGING && console.log(`[UNIVERSE ACTION] setExpand ${context['name']}: установка видимости`)
                universeStore.action['orbit'](context, camera)
                process.env.REACT_APP_LOGGING && console.log(`[AtomStore]: active - ${context['name']}`)
            } else {
                process.env.REACT_APP_LOGGING && console.log(`[AtomStore]: not active - ${context['name']}`)
                context['child'].forEach(world => world.setExpanded(false))
            }
            break
        default:
            break
    }

    return next(call)
})
export default universeStore