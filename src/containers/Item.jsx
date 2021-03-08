import React from "react";
import {blue} from "@material-ui/core/colors";
import {useNavigate} from "react-router-dom"
import {useUpdate} from "react-three-fiber"
import {Sphere} from "../components/Sphere"
import {observer} from "mobx-react"
import Name from "../components/Name"


export const Item = observer(({item}) => {
        const {init} = item
        const mesh = useUpdate(mesh => init(mesh), [])

        const nav = useNavigate()
        const {clickItem} = item
        const handleClick = (e) => clickItem(e, nav)

        const {coreScale, level, touchZone} = item
        return <>
            <mesh ref={mesh}>
                <Sphere
                    name={'item'}
                    color={blue}
                    scale={[...coreScale]}
                    detail={4 - level}
                    clickHandler={handleClick}
                    opacity={0.4}
                    touchZone={touchZone}
                />
                <Name item={item} clickHandler={handleClick}/>
            </mesh>
        </>
    }
)