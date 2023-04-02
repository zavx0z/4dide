
import {getPath} from "mobx-state-tree"

const normalizePath = (name) => name.toLowerCase().replace(/ /g, '_').replace(/\//g, '-')
let atoms = []
let maxLevel = 0

const createWorld = (world, parentLevel, localCount, parentPath) => {
    // >>>>  in recursive function
    const path = typeof parentPath === "undefined" ? '/' : parentPath === '/' ? encodeURIComponent(normalizePath(world.name)) : parentPath + '/' + encodeURIComponent(normalizePath(world.name))
    const level = typeof parentPath === "undefined" ? 1 : parentLevel
    const local = typeof localCount === "undefined" ? 1 : localCount

    const atomPath = getPath(world)
    atoms.push(atomPath)
    level > maxLevel && (maxLevel = level)

    world.setLevel(level)
    world.setLocal(local)
    world.setPath(path)
    world.setDraggable(false)
    world.material.setDoubleSide(true)

    world.position.config.set({
        mass: 4.4,
        tension: 240,
        friction: 44,
        precision: 0.215
    })

    process.env.REACT_APP_LOGGING &&
    console.log(`createWorld: ${world.name}
    Глубина: ${world.level}
    Индекс: ${maxLevel}
    URL: ${world.path}
    Атом: ${atomPath}
    `)
    // >>>>  in recursive function
    if (world.child.length) {
        let childLocal = 0
        world.child.forEach(item => {
            childLocal += 1
            const itemLevel = level + 1
            let selfLocal = childLocal
            createWorld(item, itemLevel, selfLocal, path)
        })
    }
    // >>>> out recursive function
    const percent = 144 / maxLevel
    const number = level * percent.toFixed(0)
    world.material.setColor(`rgb(0, 0, ${number})%)`)
}
const bigBoomAction = worldsStore => {
    createWorld(worldsStore)
    process.env.REACT_APP_LOGGING && console.log(`bigBoomAction: Сгенерировано путей атомов ${atoms.length} шт., Максимальная глубина вложенности: ${maxLevel}`)
    return {atoms: atoms, maxLevel: maxLevel}
}
export default bigBoomAction