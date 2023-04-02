import {getParent} from "mobx-state-tree"


let fastElement = null
const _expand = (world, parentPosition, worldSpace) => {
    if (world.expanded) {
        process.env.REACT_APP_LOGGING && console.log(`expand ${world.name}`)
        const y = fastElement.position.y - fastElement.size / 2 - world.size / 2
        world.position.set(0, y - worldSpace, 0)
        world.position.start(0, y - worldSpace, 0)
        fastElement = world
    } else {
        process.env.REACT_APP_LOGGING && console.log(`not expand ${world.name}`)
        world.position.set(parentPosition.x, parentPosition.y, parentPosition.z)
        world.position.start(parentPosition.x, parentPosition.y, parentPosition.z)
    }

    world.child.forEach(child => _expand(child, world.position, worldSpace))
}

export const updatePositionsAction = (worlds, worldSpace) => {
    process.env.REACT_APP_LOG_ARCH && console.log(`[UNIVERSE ACTION] updatePositionsAction:`)
    worlds.position.start(0, 0, 0)
    fastElement = worlds
    worlds.child.forEach(world => _expand(world, worlds.position, worldSpace))
}

const expandParent = (world) => {
    if (world.level === 1) {
        world.setExpanded(true)
    } else {
        const parent = getParent(world, 2)
        parent['child'].forEach(item => item.setExpanded(true))
        expandParent(parent)
    }
}
export const setExpand = (world) => {
    expandParent(world)
    world.child.forEach(world => world.setExpanded(true))
}