import {getRoot, types} from "mobx-state-tree"
import {MathUtils, Vector3} from "three"

export default types
    .model({})
    .volatile(self => ({
        aline: types.enumeration('aline', ["VerticalTop", "scattering"]),
        fly: false
    }))
    .actions(self => {
        const root = getRoot(self)
        return {
            afterCreate() {
                this.setAline('VerticalTop')
                root.setAline("VerticalTop")
            },
            setFly(bool) {
                self.fly = bool
            },
            setAline(typeAline) {
                self.aline = typeAline
            },
            toggleAline() {
                const {aline, setAline} = self
                aline === 'scattering' ? setAline('VerticalTop') : setAline('scattering')
            },
            rotateOrbit() {
                const {aline, scattering, verticalTop, mesh: {position}, distance} = self
                const {x: parentX, y: parentY} = self['parentMeshPosition']
                const rootAline = root.aline
                switch (rootAline === aline ? aline : rootAline) {
                    case 'scattering':
                        position.x = parentX + distance * Math.sin(scattering)
                        position.y = parentY + distance * Math.cos(scattering)
                        root.orbitRotate && (self.alphaRotate += self['speedRotateOrbit'])
                        break
                    case 'VerticalTop':
                        position.x = parentX + distance * Math.sin(verticalTop)
                        position.y = parentY + distance * Math.cos(verticalTop)
                        break
                    default:
                        console.log(aline)
                }
            },
        }
    })
    .views(self => {
        const root = getRoot(self)
        return {
            get scattering() {
                const {sibling, count, alphaRotate} = self
                const countOrbits = sibling.length ? sibling.length : 1
                const deg = (360 / countOrbits * count) * alphaRotate
                return MathUtils.degToRad(deg)
            },
            get speedRotateOrbit() {
                const {level, count} = self
                const {rootSpeed} = root
                return (rootSpeed) * (level * 1 / count)
            },
            get verticalTop() {
                return MathUtils.degToRad(180)
            },
            get distanceCamera() {
                const {fov, aspect} = getRoot(self).viewport.camera.three
                const distance = self['boundingBox'].x * 0.54 / Math.tan(MathUtils.degToRad(fov) * 0.5)
                return aspect > 1 ? distance : distance / aspect
            },
            get distanceCameraVerticalTop() {
                const {fov} = getRoot(self).viewport.camera.three
                const {radius, core, is_root, boundingBox, diameter} = self
                let visibleHeight
                if (core) {
                    visibleHeight = is_root ? (boundingBox.x * 0.5) + radius : (boundingBox.x * 0.54) + radius
                } else
                    visibleHeight = diameter
                return visibleHeight * 0.5 / Math.tan(MathUtils.degToRad(fov) * 0.5)
            },
            get cameraV3() {
                const {core, distanceCamera, distanceCameraVerticalTop, mesh: {position}} = self
                switch (root.aline) {
                    case "scattering":
                        const {x, y} = position
                        return new Vector3(x, y, distanceCamera)
                    case 'VerticalTop':
                        if (core) {
                            const {radius, boundingBox} = self
                            const visibleWidth = ((boundingBox.x * 0.5) + radius) * getRoot(self).viewport.camera.three.aspect
                            const x = position.x + visibleWidth / 2 - radius
                            const y = position.y - ((boundingBox.y * 0.5) - radius) / 2
                            return new Vector3(x, y, distanceCameraVerticalTop)
                        } else {
                            const {x, y} = position
                            return new Vector3(x, y, distanceCamera)
                        }
                    default:
                        return new Vector3(0, 0, 0)
                }

            },

        }
    })