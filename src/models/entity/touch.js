import {getRoot, types} from "mobx-state-tree"

export default types
    .model({})
    .volatile(self => ({
        active: false,
        hovered: false,
        touchDebug: false
    }))
    .actions(self => ({
        setActive(bool) {
            const {level} = self
            self.active = bool
            bool ? getRoot(self).setCurrentLevel(level) : getRoot(self).setPrevLevel(level)
        },
        toggleHover() {
            self.hovered = !self.hovered
        },
        isTarget(event, target) {
            return !!event.intersections.filter(item => item.eventObject.name === target).length
        },
        clickItem(e, nav) {
            e.stopPropagation()
            const {axisAnimate, stopAxis, fullPath, active, touchDebug} = self
            touchDebug && console.log('item click', fullPath)
            axisAnimate && stopAxis()
            !active && nav(fullPath)
        },
        clickCore(e, nav) {
            e.stopPropagation()
            const {is_root, directionBeforeEnter, toggleAline, active, touchDebug, fullPath, child} = self
            switch (directionBeforeEnter) {
                case 'up':
                    if (!active) {
                        touchDebug && console.log("core click", directionBeforeEnter)
                        nav(fullPath)
                        is_root && child.forEach(item => item.nameScaleUpChild())
                        // console.log(directionBeforeEnter, 'prevLevel', getRoot(self).prevLevel, 'currentLevel', getRoot(self).currentLevel, 'level', level)
                    } else if (is_root){
                        toggleAline()
                        console.log("core click", directionBeforeEnter)
                        touchDebug && console.log("notAction", "core click", directionBeforeEnter)
                    }
                    break
                case 'down':
                    if (!active) {
                        // console.log("core click", directionBeforeEnter)
                        touchDebug && console.log("core click", directionBeforeEnter)
                        nav(fullPath)
                    } else if (is_root) {
                        touchDebug && console.log('core root toggle visible')
                        console.log("core click", directionBeforeEnter)
                    }
                    break
                default:
                    touchDebug && console.log('core click', directionBeforeEnter)
                    break
            }
        },
        clickTor(e, nav) {
            const {child, directionBeforeEnter, is_root, level, touchDebug, fullPath} = self
            // console.log(directionBeforeEnter, self.id, self.fullPath)
            switch (directionBeforeEnter) {
                case 'up' :
                    const isExitFromItem = getRoot(self).currentLevel - level === 1
                    const isExitFromSelf = getRoot(self).currentLevel === level
                    // isExitFromItem && e.stopPropagation()
                    // console.log(directionBeforeEnter, 'prevLevel', getRoot(self).prevLevel, 'currentLevel', getRoot(self).currentLevel, 'level', level, 'isExitFromItem', isExitFromItem)
                    child.forEach(item => item.nameScaleUpChild())
                    if (!is_root && isExitFromSelf) {
                        touchDebug && console.log("tor click", directionBeforeEnter, 'self tor')
                        nav('../')
                    } else if (!is_root && isExitFromItem) {
                        touchDebug && console.log("tor click", directionBeforeEnter, 'self tor')
                        nav(fullPath)
                    }
                    break
                case 'down':
                    touchDebug && console.log("tor click", directionBeforeEnter, 'self tor')
                    nav(fullPath)
                    break
                default:
                    touchDebug && console.log('tor click', directionBeforeEnter, 'item.level:', level, 'currentLevel:', getRoot(self).currentLevel)
                    break
            }
        },
        clickHandler(e, nav) {
            const {isTarget, touchDebug} = self
            if (!isTarget(e, 'core') && !isTarget(e, 'item'))
                this.clickTor(e, nav)
            else if (touchDebug) {
                // const {directionBeforeEnter, level} = self
                // const {currentLevel} = getRoot(self)
                // console.log("isItemClick:", isTarget(e, 'item'), directionBeforeEnter, 'item.level:', level, 'currentLevel:', currentLevel)
            }
        }
    }))
    .views(self => ({
        get directionBeforeEnter() {
            return getRoot(self).currentLevel - self['level'] >= 0 ? 'up' : 'down'
        },
        get touchZone() {
            const {currentLevel} = getRoot(self)
            const {core, level, isFold} = self
            const k = 3

            if (core)
                return [0, 0, 0]
            else if (level === currentLevel)
                return [0, 0, 0]
            else if (!isFold && Math.abs(level - currentLevel) === 1) {
                return [0, 0, 0]
            } else
                return [k, k, k]
        },
    }))