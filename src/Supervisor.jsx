import React, {useRef} from 'react'
import {inject, observer} from 'mobx-react'
import {useFrame} from "@react-three/fiber"
import {PerspectiveCamera} from "@react-three/drei"
import {supervisorMove} from "./actions/supervisorActions"


const Supervisor = ({children, universe: {supervisor, action}}) => {
    const ref = useRef(null)
    useFrame(() => {
        // ref.current current.rotation.setFromQuaternion
        // ref.current.rotation.setRotationFromEuler(supervisor.rotation)
        // ref.current.position.lerp([data.position.x, data.position.y, data.position.z], 1)
        ref.current.rotation.setFromVector3(supervisor.rotation)
        supervisorMove(ref.current, supervisor.position,
            () => !supervisor.animated && supervisor.setAnimate(true),
            () => supervisor.animated && supervisor.setAnimate(false))
        // console.log(ref.current.rotation)
        ref.current.position.lerp(supervisor.position, 1)
    })
    return <>
        <PerspectiveCamera
            ref={ref}
            fov={14}
            makeDefault // Registers it as the default camera system-wide (default=false)
        >
        </PerspectiveCamera>
        {/*<OrbitControls/>*/}
        {children}
    </>
}

export default inject('universe')(observer(Supervisor))
