import React from "react"
import {blue} from "@material-ui/core/colors"
import {useNavigate} from "react-router-dom"
import {useUpdate} from "react-three-fiber"
import {inject, observer} from "mobx-react"
import {DoubleSide} from "three"
import {Core} from "../components/Core"
import Name from "../components/Name"


const ParentComponent = ({root: {aline}, children, item}) => {
    const {init} = item
    const mesh = useUpdate((mesh) => init(mesh), [])

    const {clickHandler} = item
    const nav = useNavigate()
    const handleClick = (e) => clickHandler(e, nav)

    const {hovered, active, toggleHover, torScale, torDetail} = item
    return <>
        <group ref={mesh}>
            <mesh
                scale={torScale}
                name={'tor'}
                onPointerOver={toggleHover}
                onPointerOut={toggleHover}
                onClick={handleClick}
                visible={aline !== 'VerticalTop'}
            >
                <torusBufferGeometry args={[0.25, 0.25, torDetail, torDetail]}/>
                <meshLambertMaterial
                    side={DoubleSide}
                    emissive={blue[900]}
                    wireframe
                    doubleSided={true}
                    opacity={hovered || active ? 0.14 : 0.2}
                    transparent={true}
                />
            </mesh>
            <Name item={item} clickHandler={handleClick}/>
            <Core item={item}/>
        </group>
        {children}
    </>
}
export const Parent = inject('root')(observer(ParentComponent))