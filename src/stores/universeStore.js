import universeModel from "../models/universeModel"
import worldsStore from "./worldsStore"
import supervisorStore from "./supervisorStore"
import {addMiddleware} from "mobx-state-tree"

import bigBoomAction from "../actions/bigBoomAction"
import {setExpand, updatePositionsAction} from "../actions/universeActions"
import {getBBChild} from "../utils/displayPosition"
import perspectivePosition from "../features/@react-three-mst/utils/perspectivePosition"

process.env.REACT_APP_LOGGING && console.log(`[universeStore]: INIT`)
const {atoms, maxLevel} = bigBoomAction(worldsStore)

const universeStore = universeModel.create({
    supervisor: supervisorStore, // камера
    worlds: worldsStore, // атомы в рекурсии
    atoms: atoms, // пути атомов (mobx-state-tree) в мирах
    maxLevel: maxLevel, // рассчитывается в действии инициализации BigBum
    backgroundColor: "#0c1f3c", // цвет пространства
    worldSize: 1,
    worldSpace: 0.14,
})

const worldCenterWithChild = (world, fullHeight) => {
    const {position, size} = world
    const extremePointUp = Math.abs(position.y) - size / 2
    return extremePointUp + fullHeight / 2
}
const aligned = 'LEFT'
const withParent = false
addMiddleware(universeStore, (call, next) => {
    const {name, args, context} = call
    switch (name) {
        case 'setActive':
            const active = args[0]
            if (active) {
                // открываем дочерние элементы (устанавливаем новые координаты)
                const camera = args[1]
                setExpand(context)
                updatePositionsAction(universeStore.worlds, universeStore.worldSpace)

                // устанавливаем камеру
                const {size} = context
                const fullHeight = worldFullHeight(context)
                const visibleWidth = fullHeight * camera.aspect
                let x
                let y
                let z
                switch (aligned) {
                    case 'CENTER':
                        x = 0
                        const {top, bottom, left, right} = getBBChild(context)
                        const visibleHeight = supervisorStore.getVisibleHeight(camera, 444)
                        const visibleWidth = visibleHeight * camera.aspect
                        console.log(visibleWidth, visibleHeight)
                        const visibleHeightWithoutParent = (bottom - top)
                        const visibleWidthWithoutParent = visibleHeightWithoutParent * camera.aspect
                        x = -visibleWidthWithoutParent * 0.5 + (left - right) / 2
                        y = top - (top - bottom) / 2
                        z = supervisorStore.computeDepth(camera.fov, (top - bottom))
                        break
                    case 'RIGHT':
                        x = (size * 0.5) - (visibleWidth * 0.5)
                        break
                    case 'LEFT':
                        if (withParent) { // С родителем
                            x = -(size * 0.5) + (visibleWidth * 0.5)
                            y = -worldCenterWithChild(context, fullHeight)
                            z = supervisorStore.computeDepth(camera.fov, fullHeight) + size * 0.5
                        } else { // Без родителя
                            const {top, bottom, left, right, width, height} = getBBChild(context)
                            const visibleHeight = supervisorStore.getVisibleHeight(camera, 0)
                            const visibleWidth = visibleHeight * camera.aspect
                            console.log(width, height, visibleWidth, visibleHeight)

                            x = (visibleWidth * .5) - (width * .5)

                            const i = perspectivePosition(left, top, 444)
                            console.log(i)
                            y = top - (top - bottom) / 2

                            const depth = supervisorStore.computeDepth(camera.fov, (top - bottom))
                            z = supervisorStore.position.z > 444 ? depth : 444
                        }
                        break
                    default:
                        y = 0
                        z = 44
                }
                const {position} = supervisorStore
                position.set(x, y, z)
                position.start(x, y, z)
                process.env.REACT_APP_LOGGING && console.log(`[AtomStore]: active - ${context['name']}`)
            } else {
                // закрываем все дочерние элементы
                process.env.REACT_APP_LOGGING && console.log(`[AtomStore]: not active - ${context['name']}`)
                context['child'].forEach(world => world.setExpanded(false))
            }
            break
        default:
            break
    }

    return next(call)
})

const worldFullHeight = (world) => {
    const {position, size, child} = world
    if (child.length) {
        const extremePointUp = position.y + size / 2
        const fastAtom = child[child.length - 1]
        const extremePointDown = Math.abs(fastAtom.position.y) + fastAtom.size / 2
        return extremePointUp + extremePointDown
    } else return size
}


export default universeStore