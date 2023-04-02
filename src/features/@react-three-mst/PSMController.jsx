import {useGesture} from "@use-gesture/react"
import {a, useSpring, useSpringRef} from "@react-spring/three"
import {Box3, DoubleSide, FrontSide, Mesh} from "three"
import React, {useEffect, useRef} from "react"
import perspectivePosition from "./utils/perspectivePosition"

const PSMController = ({model, children, ...other}) => {
    const {position, scale, material, bounds, draggable, init, setHover, setPinched} = model
    const drag = ({event: {stopPropagation, spaceX, spaceY}}) => {
        if (draggable) {
            stopPropagation()
            // console.log(spaceX, spaceY)
            // console.log(...perspectivePosition(spaceX, spaceY), position.z)
            position.start(...perspectivePosition(spaceX, spaceY), position.z)
        }
    }
    const hover = ({event: {stopPropagation}, active}) => {
        stopPropagation()
        setHover(active)
    }
    const bind = useGesture(
        {
            onDrag: drag,
            onDragStart: () => setPinched && setPinched(true),
            onDragEnd: () => setPinched && setPinched(false),
            onHover: hover,
            // onPinch: state => doSomethingWith(state),
            // onPinchStart: state => doSomethingWith(state),
            // onPinchEnd: state => doSomethingWith(state),
            // onScroll: state => doSomethingWith(state),
            // onScrollStart: state => doSomethingWith(state),
            // onScrollEnd: state => doSomethingWith(state),
            // onMove: state => doSomethingWith(state),
            // onMoveStart: state => console.log(state),
            // onMoveEnd: state => doSomethingWith(state),
            // onWheel: state => doSomethingWith(state),
            // onWheelStart: state => doSomethingWith(state),
            // onWheelEnd: state => doSomethingWith(state),
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
    // useHelper(group, BoxHelper, 'cyan')
    useEffect(() => {
        if (typeof group.current !== "undefined") {
            process.env.REACT_APP_LOGGING && console.log(group.current)
            process.env.REACT_APP_LOGGING && console.log(new Box3().setFromObject(group.current).min)
        }
    }, [group])
    const changeOpacity = value => {
        group.current['material'].opacity = value
        group.current['children'].forEach(child => (child instanceof Mesh) && (child.material.opacity = value))
    }
    const materialAPI = useSpringRef()
    useSpring(() => ({
        ref: materialAPI,
        opacity: material.opacity,
        onChange: ({value: {opacity}}) => changeOpacity(opacity)
    }))

    useEffect(() => {
        changeOpacity(material.opacity)
        init(positionAPI.current[0], scaleAPI.current[0], materialAPI.current[0])
    }, [init, material.opacity, materialAPI, positionAPI, scaleAPI])
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
            {...other}
        >
            <a.meshStandardMaterial
                color={model.material.color}
                // opacity={model.material.opacity}
                transparent={true}
                side={model.material.doubleSide ? DoubleSide : FrontSide}
                // depthWrite={!model.material.doubleSide}
                // depthTest={!model.material.doubleSide}
                wireframe={true}
            />
            {children}
        </a.mesh>
    </>
}
export default PSMController