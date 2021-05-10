import {getPath} from "mobx-state-tree"

const normalizePath = (name) => name.toLowerCase().replace(/ /g, '_').replace(/\//g, '-')
let atoms = []
let maxLevel = 0
let parentAether = []

const divideParentHeight = (idx, item, world) => {
    item.setWidth(world.size)
    item.setHeight(world.size / world.aether.length)
    const y = (item.height * idx) - (world.size / 2) + item.height / 2
    item.setPosition(0, y, world.size / 2)
}
const createWorld = (world, parentLevel, localCount, parentPath) => {
    const path = typeof parentPath === "undefined" ? '/' : parentPath === '/' ? encodeURIComponent(normalizePath(world.name)) : parentPath + '/' + encodeURIComponent(normalizePath(world.name))
    const level = typeof parentPath === "undefined" ? 1 : parentLevel
    const local = typeof localCount === "undefined" ? 1 : localCount

    const atomPath = getPath(world)
    atoms.push(atomPath)
    level > maxLevel && (maxLevel = level)

    world.setLevel(level)
    world.setLocal(local)
    world.setPath(path)

    world.aether.forEach((item, idx) => {
        switch (item.flow) {
            case 'storage':
                parentAether.push(item)
                break
            default:
                const parent = parentAether.find(parent => parent.name === item.name)
                item.setParentPosition(...parent.position)
                break
        }
        divideParentHeight(idx, item, world)
    })

    process.env.REACT_APP_LOGGING &&
    console.log(`createWorld: ${world.name}
    Глубина: ${world.level}
    Индекс: ${maxLevel}
    URL: ${world.path}
    Атом: ${atomPath}
    Aether: ${world.aether.map(item => `{Name: ${item.name} Flow: ${item.flow}}`)}
    `)

    if (world.child.length) {
        let childLocal = 0
        world.child.forEach(item => {
            childLocal += 1
            const itemLevel = level + 1
            let selfLocal = childLocal
            createWorld(item, itemLevel, selfLocal, path)
        })
    }
}
const bigBoomAction = worldsStore => {
    createWorld(worldsStore)
    process.env.REACT_APP_LOGGING && console.log(`bigBoomAction: Сгенерировано путей атомов ${atoms.length} шт., Максимальная глубина вложенности: ${maxLevel}`)
    // console.log(parentAether)
    return {atoms: atoms, maxLevel: maxLevel}
}
export default bigBoomAction