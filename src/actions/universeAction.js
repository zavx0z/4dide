import {getParent, types} from "mobx-state-tree"
import supervisorStore from "../stores/supervisorStore"
// todo refactoring

const universeAction = types
    .model({
        space: 0
    })
    .volatile(self => ({
        fast: null,
        universeBB: null,
        koef: .5
    }))
    .actions(self => ({
        setSpace(value) {
            self.space = value
        },
        setUniverseBB(bb) {
            self.bb = bb
        },
        setFast(world) {
            self.fast = world
        },
        setExpandUp(world) {
            if (world.level === 1) {
                world.setExpanded(true)
            } else {
                const parent = getParent(world, 2)
                parent['child'].forEach(item => item.setExpanded(true))
                this.setExpandUp(parent)
            }
        },
        setExpandDown(world) {
            world.child.forEach(world => world.setExpanded(true))
        },
        updateExpandedParams(world) {
            this.setExpandUp(world)
            this.setExpandDown(world)
        },
        worldFullHeight(world) {
            const {position, size, child} = world
            if (child.length) {
                const extremePointUp = position.y + size / 2
                const fastAtom = child[child.length - 1]
                const extremePointDown = Math.abs(fastAtom.position.y) + fastAtom.size / 2
                return extremePointUp + extremePointDown
            } else return size
        },
        worldCenterWithChild(world, fullHeight) {
            const {position, size} = world
            const extremePointUp = Math.abs(position.y) - size / 2
            return extremePointUp + fullHeight / 2
        },
        _expand(world, parentPosition) {
            if (world.expanded) {
                const {setFast, space, fast} = self
                process.env.REACT_APP_LOGGING && console.log(`expand ${world.name}`)
                const y = fast.position.y - fast.size / 2 - world.size / 2
                world.setPosition(0, y - space, 0)
                setFast(world)
            } else {
                process.env.REACT_APP_LOGGING && console.log(`not expand ${world.name}`)
                world.setPosition(parentPosition.x, parentPosition.y, parentPosition.z)
            }
            world.child.forEach(child => this._expand(child, world.position))
        },
        expandAll() {
            const {worlds} = getParent(self, 1)
            this.setFast(worlds)
            worlds.child.forEach(world => this._expand(world, worlds.position))
            this.setFast(null)
        },
        expand(world, camera) {
            const {worlds} = getParent(self, 1)
            this.updateExpandedParams(world)

            this.setFast(worlds)
            worlds.child.forEach(world => this._expand(world, worlds.position))
            this.setFast(null)

            const {child, size} = world
            const fullHeight = this.worldFullHeight(world)
            const visibleWidth = fullHeight * camera.aspect
            console.log(visibleWidth, size)
            const x = child.length ? Math.abs((size * 0.5) - (visibleWidth * 0.5)) : 0
            const y = -this.worldCenterWithChild(world, fullHeight)
            const z = supervisorStore.computeDepth(camera.fov, fullHeight) + size * 0.5
            supervisorStore.setPosition(x, y, z)
        },
        _orbit(world, parentPosition, moveRad) {
            process.env.REACT_APP_LOGGING && console.log(`orbit Position ${world.name}`)
            if (world.expanded) {
                process.env.REACT_APP_LOGGING && console.log(`orbit expand ${world.name}`)
                const x = self['space'] * Math.cos(moveRad * world.local) + parentPosition.x
                const y = self['space'] * Math.sin(moveRad * world.local) + parentPosition.y
                const position = [x, y, 0]
                world.setPosition(...position)
            } else {
                process.env.REACT_APP_LOGGING && console.log(`orbit not position ${world.name}`)
                world.setPosition(parentPosition.x, parentPosition.y, parentPosition.z)
            }
        },
        orbit(world, camera) {
            const {worlds} = getParent(self, 1)
            this.updateExpandedParams(world)
            this.setFast(worlds)
            const moveRad = ((self['space'] * Math.PI) / world.child.length)
            worlds.child.forEach(world => this._orbit(world, worlds.position, moveRad))
            this.setFast(null)
        }
    }))


export default universeAction