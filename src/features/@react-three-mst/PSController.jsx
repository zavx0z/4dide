import {useGesture} from "@use-gesture/react"
import {a, config, useSpring, useSpringRef} from "@react-spring/three"
import {useEffect, useRef} from "react"
import perspectivePosition from "./utils/perspectivePosition"

import {types} from "mobx-state-tree"
import scaleModel from "./models/scaleModel"
import positionModel from "./models/positionModel"
import {canvasStore} from "./Canvas"

config.fast = {mass: .01, tension: 444, friction: 14, delay: 1000}

export const psController = types
    .model({
        scale: scaleModel,
        position: positionModel,
        hovered: false,
        pinched: false,
        selected: false,
    })
    .preProcessSnapshot(snapshot => {
        switch (snapshot) {
            case undefined:
                break
            default:
                snapshot['position'] = typeof snapshot.position === "undefined" ? positionModel.create({config: {}}) : snapshot['position']
                snapshot['scale'] = typeof snapshot.scale === "undefined" ? scaleModel.create({config: {}}) : snapshot['scale']
                return snapshot
        }
    })
    .views(self => ({
        get bounds() {
            const {width, height} = canvasStore.viewport
            return {
                left: -width / 2,
                right: width / 2,
                top: -height / 2,
                bottom: height / 2
            }
        }
    }))
    .actions(self => ({
        init(positionAPI, scaleAPI) {
            const {position, scale} = self
            position.api = positionAPI
            scale.api = scaleAPI
        },
        setHover(bool) {
            console.log('hovered', bool)
            self.hovered = bool
        },
        setPinched(bool) {
            self.pinched = bool
            bool && this.setSelected(!self.selected)
        },
        setSelected(bool) {
            self.selected = bool
        }
    }))

const PSController = ({model, children}) => {
    const {position, scale, bounds, dragDisable, init, setHover, setPinched} = model
    const drag = ({event: {stopPropagation, spaceX, spaceY}}) => {
        if (!dragDisable) {
            stopPropagation()
            position.start(...perspectivePosition(spaceX, spaceY), position.z)
        }
    }
    const bind = useGesture(
        {
            onDrag: drag,
            onDragStart: () => setPinched && setPinched(true),
            onDragEnd: () => setPinched && setPinched(false),
            onHover: (state) => setHover && setHover(state.active),
        }, {drag: {bounds: bounds}}
    )


    const positionAPI = useSpringRef()
    const [{positionX, positionY, positionZ}] = useSpring(() => ({
        ref: positionAPI,
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
        // onResolve: result => console.log(result),
        config: position.config
    }))

    const scaleAPI = useSpringRef()
    const [{scaleX, scaleY, scaleZ}] = useSpring(() => ({
        ref: scaleAPI,
        scaleX: scale.x,
        scaleY: scale.y,
        scaleZ: scale.z,
    }))
    const group = useRef()
    useEffect(() => {
        init(positionAPI.current[0], scaleAPI.current[0])
    }, [init, positionAPI, scaleAPI])
    return <>
        <a.mesh
            ref={group}
            position-x={positionX}
            position-y={positionY}
            position-z={positionZ}
            scale-x={scaleX}
            scale-y={scaleY}
            scale-z={scaleZ}
            {...bind()}
        >
            {children}
        </a.mesh>
    </>
}
export default PSController