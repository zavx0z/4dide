import {types} from "mobx-state-tree"
import {Vector3} from "three"

export default types
    .model({
        colorName: 'white',
        nameAnchorX: 'left',
        nameAnchorY: "middle",
    })
    .volatile(self => ({
        nameInitWidth: 0,
        nameInitHeight: 0
    }))
    .actions(self => ({
        initName(text) {
            const {core, nameScaleUpChild} = self
            self.nameInitWidth = text.geometry.boundingBox.max.x - text.geometry.boundingBox.min.x
            self.nameInitHeight = text.geometry.boundingBox.max.y - text.geometry.boundingBox.min.y
            core && nameScaleUpChild()
        },
        setNameAnchorX(aline) {
            self.nameAnchorX = aline
        },
        setNameAnchorY(aline) {
            self.nameAnchorY = aline
        },
        namePositionRight(item) {
            const {nameInitPosition, visibleWidth, nameInitWidth, diameter, nameHeightMaxScale, name3d} = item
            const emptyWidth = visibleWidth - diameter
            const scaleWidth = emptyWidth / nameInitWidth * 0.8
            const scale = scaleWidth > nameHeightMaxScale ? nameHeightMaxScale : scaleWidth
            name3d.position.lerp(new Vector3(...nameInitPosition), 0.2)
            name3d.scale.lerp(new Vector3(scale, scale, scale), 0.6)
        },
        moveNameToEntity() {
            const {fly, name3d, nameWidth, level} = self
            if (typeof nameWidth !== 'undefined' && fly) {
                const k = level * 4

                const x = -nameWidth / 2 / k
                const y = 1 / level / 2
                name3d.position.lerp(new Vector3(x, y, 0), 0.2)

                const scale = 1 / k
                name3d.scale.lerp(new Vector3(scale, scale, scale), 0.2)
            }
        },
        moveNameToCore() {
            const {name3d, diameter, visibleWidth, nameInitWidth} = self
            const emptyWidth = visibleWidth - diameter
            if (diameter > emptyWidth) {
                const {cameraV3, getVisibleWidth, radius} = self
                const visibleWidth = getVisibleWidth(radius)
                const x = cameraV3.x - visibleWidth / 2
                name3d.position.lerp(new Vector3(x, 0, radius), 0.2)

                const scale = visibleWidth / nameInitWidth
                name3d.scale.lerp(new Vector3(scale, scale, scale), 0.6)
            } else {
                this.namePositionRight(self)
            }
            this.nameScalePositionChilds()
        },
        nameScalePositionChilds() {
            const {namePositionRight} = self
            self.child.forEach(item => namePositionRight(item))
        },
        nameScaleUpChild() {
            self.child.forEach(item => {
                let start = Date.now()
                const animate = timestamp => {
                    let interval = Date.now() - start
                    this.namePositionRight(item)
                    if (interval < 1000) requestAnimationFrame(animate)
                }
                requestAnimationFrame(animate)
            })
        },
        moveNameUp() {
            let start = Date.now();
            // const {name3d, nameInitPosition} = self
            const animate = timestamp => {
                let interval = Date.now() - start


                this.namePositionRight(self)

                // name3d.position.lerp(new Vector3(...nameInitPosition), 0.2)
                // const scale = 1
                // name3d.scale.lerp(new Vector3(scale, scale, scale), 0.2)

                if (interval < 1000) requestAnimationFrame(animate)
            }

            requestAnimationFrame(animate)
        },
    }))
    .views(self => {
        return {
            get name3d() {
                const {mesh} = self
                return mesh.children.find(item => item.name === 'nameText')
            },
            get nameInitPosition() {
                const {radius} = self
                return [radius, 0, 0]
            },
            get nameHeightMaxScale() {
                const {diameter, nameInitHeight} = self
                return diameter / nameInitHeight
            },
            get nameWidth() {
                const {geometry} = this.name3d
                const {boundingBox: {max, min}} = geometry
                geometry.computeBoundingBox()
                if (max.x === -Infinity)
                    return undefined
                return (max.x - min.x)
            }
        }
    })