import {observer} from "mobx-react"
import {PerspectiveCamera} from "@react-three/drei"
import React, {useEffect} from "react"
import {animated, useSpring, useSpringRef} from "@react-spring/three"
import supervisorStore from "../../stores/supervisorStore"

const AnimatedCamera = animated(PerspectiveCamera)
const Supervisor = () => {
    const positionAPI = useSpringRef()
    const [{positionX, positionY, positionZ}] = useSpring(() => ({
        ref: positionAPI,
        positionX: supervisorStore.position.x,
        positionY: supervisorStore.position.y,
        positionZ: supervisorStore.position.z,
        config: supervisorStore.position.config
    }))
    useEffect(() => {
        supervisorStore.position.setAPI(positionAPI.current[0])
    }, [positionAPI])
    // useEffect(() => console.log(positionZ), [positionZ])
    return <>
        <AnimatedCamera
            position-x={positionX}
            position-y={positionY}
            position-z={positionZ}
            fov={supervisorStore.fov}
            makeDefault
        />
    </>
}
export default observer(Supervisor)