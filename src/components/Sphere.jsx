import React, {useState} from "react"

export const Sphere = ({scale, position, clickHandler, color, detail, name}) => {
    const [hovered, setHover] = useState(false)
    const handleOver = (e) => {
        e.stopPropagation()
        setHover(true)
    }
    const handleOut = (e) => {
        e.stopPropagation()
        setHover(false)
    }
    return <>
        <mesh
            onPointerOver={handleOver}
            onPointerOut={handleOut}
            onClick={clickHandler}
            scale={scale}
            position={position}
            name={name}
        >
            <icosahedronBufferGeometry args={[0.5, detail]}/>
            <meshLambertMaterial
                emissive={hovered ? color[800] : color[900]}
                wireframe
                emissiveIntensity={1}
            />
        </mesh>
    </>
}