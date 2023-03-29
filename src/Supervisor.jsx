import React, {useRef} from 'react'
import {inject, observer} from 'mobx-react'
import {useFrame} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"

const Supervisor = ({children, universe: {supervisor}}) => {
    const ref = useRef(null)
    useFrame(() => {
        // .rotation.setFromQuaternion
        // console.log(supervisor.position)
        // console.log(supervisor.rotation)
        // ref.current.rotation.setRotationFromEuler(supervisor.rotation)
        // ref.current.rotation.setFromVector3(supervisor.rotation)
        // supervisorMove(ref.current, supervisor.position,
        //     () => !supervisor.animated && supervisor.setAnimate(true),
        //     () => supervisor.animated && supervisor.setAnimate(false))
        // console.log(ref.current.rotation)
        // ref.current.position.lerp(supervisor.position, 1)
    })
    return <>
        <PerspectiveCamera
            ref={ref}
            fov={11.5}
            position={[0, 0, 100]}
            makeDefault // Registers it as the default camera system-wide (default=false)
        >
        </PerspectiveCamera>
        <OrbitControls/>
        {children}
    </>
}

export default inject('universe')(observer(Supervisor))
