import React from 'react'

export default ({args, ...props}) => {
    return <>
        <mesh receiveShadow={true} {...props}>
            <planeBufferGeometry args={args}/>
            <meshStandardMaterial color={'#2d2d2d'}/>
        </mesh>
    </>
}