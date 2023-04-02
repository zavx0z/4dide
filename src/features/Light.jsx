import React from 'react'

const k = 1.5

const Light = _ =>
    <group name={'light'}>
        <ambientLight intensity={0.7}/>
        <spotLight
            intensity={0.7}
            position={[2 * k, 2 * k, 12]}
            penumbra={0.7}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            castShadow={true}
        />
    </group>
export default Light