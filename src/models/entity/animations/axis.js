import {getRoot, types} from "mobx-state-tree"

export default types
    .model({})
    .volatile(self => ({
        _axisAnimate: true
    }))
    .actions(self => {
        const root = getRoot(self)
        return {
            rotateAxis() {
                const {mesh: {children}} = self
                const {rotation} = children[0]
                root.orbitRotate && (rotation.z -= self['speedRotateAxis'])

                if (root.orbitRotate && children.length > 2) {
                    const item = children[2]
                    item.rotation.z -= self['speedRotateAxis']
                }
            },
            playAxis() {
                self._axisAnimate = true
            },
            stopAxis() {
                self._axisAnimate = false
            }
        }
    })
    .views(self => {
        const root = getRoot(self)
        return {
            get speedRotateAxis() {
                const {rootSpeed} = root
                const {level, count} = self
                return (rootSpeed * 10) * (1 + level / count)
            },
            get axisAnimate() {
                const {speedRotateAxis, _axisAnimate} = self
                return speedRotateAxis && _axisAnimate
            }
        }
    })