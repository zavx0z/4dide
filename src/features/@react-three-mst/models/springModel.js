import {getParent, types} from "mobx-state-tree"
import {config, Controller} from "@react-spring/three"

const springModel = types
    .model({
        config: types.frozen({}),
    })
    .volatile(self => ({
        controller: new Controller({
            scale: 1,
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            onChange: ({value: {scale, positionX, positionY, positionZ}}) => {
                const {group} = getParent(self, 1)
                if (group) {
                    group.scale.set(scale, scale, scale)
                    group.position.setX(positionX)
                    group.position.setY(positionY)
                    group.position.setZ(positionZ)
                }
            },
            config: self[config]
        })
    }))
    .actions(self => ({
        setAnimationConfig(objConfig) {
            self.config = objConfig
            self['controller'] = new Controller({
                scale: 1,
                positionX: 0,
                positionY: 0,
                positionZ: 0,
                onChange: ({value: {scale, positionX, positionY, positionZ}}) => {
                    const {group} = getParent(self, 1)
                    if (group) {
                        group.scale.set(scale, scale, scale)
                        group.position.setX(positionX)
                        group.position.setY(positionY)
                        group.position.setZ(positionZ)
                    }
                },
                config: objConfig
            })
        },
        set(x,y,z){
            const {controller} = self
            controller.set({positionX: x})
            controller.set({positionY: y})
            controller.set({positionZ: z})
        },
        move(x, y, z) {
            const {controller} = self
            controller.start({positionX: x})
            controller.start({positionY: y})
            controller.start({positionZ: z})
        },
        scale(num) {
            const {controller} = self
            controller.start({scale: num})
        }
    }))

export default springModel