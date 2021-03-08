import {getParent, types} from "mobx-state-tree"
import {Vector3} from "three"
import animation from "./animations/animation"
import core from "./parent/core"
import tor from "./parent/tor"
import parent from "./parent/parent"
import touch from "./touch"
import name from "./name/name"
import navigate from "./navigate"
import scattering from "./views/scattering"
import verticalTop from "./views/verticalTop"

const entity = types.compose(
    types.model({
        id: types.string,
        name: types.string,
        child: types.array(types.late(() => entity)),
        fullPath: types.string,
    })
        .volatile(self => ({mesh: {}}))
        .actions(self => ({
            init(mesh) {
                self.mesh = mesh
            },
        }))
        .views(self => ({
            get is_root() {
                return self['fullPath'] === '/'
            },
            get level() {
                return self['root'] ? 1 : self['id'].split('.').length
            },
            get count() {
                const idxes = self['id'].split('.')
                return parseInt(idxes[idxes.length - 1])
            },
            get position() {
                const {aline, verticalTopPosition, scatteringPosition} = self
                return aline === 'VerticalTop' ? verticalTopPosition : scatteringPosition
            },
            get diameter() {
                return 1 / this.level
            },
            get radius() {
                return this.diameter * 0.5
            },
            get siblingUp() {
                const {id} = self
                const lastDigit = parseInt(id[id.length - 1])
                const siblingId = id.substring(0, id.length - 1) + (lastDigit - 1).toString()
                return getParent(self, 2).child.find(item => item.id === siblingId)
            },
            get siblingDown() {
                const {id} = self
                const lastDigit = parseInt(id[id.length - 1])
                const siblingId = id.substring(0, id.length - 1) + (lastDigit + 1).toString()
                return getParent(self, 2).child.find(item => item.id === siblingId)
            },
            get boundingBox() {
                const {geometry, scale} = self['mesh'].children[0]
                geometry.computeBoundingBox()

                const {boundingBox: {max, min}} = geometry
                const width = Math.abs(max.x) + Math.abs(min.x)
                const height = Math.abs(max.y) + Math.abs(min.y)
                const depth = Math.abs(max.z) + Math.abs(min.z)

                const {x, y, z} = scale
                return {x: width * x, y: height * y, z: depth * z}
            },
            get vector3() {
                return new Vector3(...this.position)
            },
            get distance() {
                const {is_root, position, parentPosition} = self
                return is_root ? position[0] : position[0] - parentPosition
            },
        }))
    ,
    parent,
    core,
    tor,
    scattering,
    verticalTop,
    name,
    animation,
    touch,
    navigate
)
export default entity