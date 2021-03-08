import React, {useEffect, useRef, useState} from "react";
import red from "@material-ui/core/colors/red"
import {useNavigate} from "react-router-dom"
import * as THREE from "three"
import {MathUtils} from "three"

export default ({props, item}) => {
    const navigate = useNavigate()
    const [hovered, setHover] = useState(false)
    const clickHandler = () => navigate('../')
    const {diameter} = item
    const mesh = useRef()
    useEffect(() => {
        const finalMatrix = new THREE.Matrix4()
        const scale = 0.1
        finalMatrix.makeScale(scale, scale, scale)
        finalMatrix.setPosition(0, diameter / 6, 0)
        const rotationMatrix = new THREE.Matrix4()
        rotationMatrix.makeRotationZ(MathUtils.degToRad(-35))
        mesh.current.applyMatrix4(rotationMatrix.multiply(finalMatrix))
    }, [diameter])
    return <>
        <mesh
            {...props}
            ref={mesh}
            onClick={clickHandler}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <icosahedronBufferGeometry args={[0.4, 3]}/>
            <meshLambertMaterial
                emissive={hovered ? red[800] : red[900]}
                wireframe
            />
        </mesh>
    </>
}
