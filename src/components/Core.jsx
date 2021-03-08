import {Sphere} from "./Sphere"
import orange from "@material-ui/core/colors/orange"
import React from "react"
import {useNavigate} from "react-router-dom"

export const Core = ({item}) => {
    const {coreScale, coreDetail, touchZone, clickCore} = item
    const nav = useNavigate()
    const handleClick = (e) => clickCore(e, nav)
    return <Sphere
        name={'core'}
        clickHandler={handleClick}
        color={orange}
        scale={[...coreScale]}
        detail={coreDetail}
        touchZone={touchZone}
    />
}