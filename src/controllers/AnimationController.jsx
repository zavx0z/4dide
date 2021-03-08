import React from 'react'
import {inject, observer} from 'mobx-react'
import {useFrame} from "react-three-fiber"

const AnimationController = ({root: {viewport}, item, children}) => {
    const {axisAnimate, rotateAxis, rotateOrbit} = item
    const {speed} = viewport

    useFrame(({invalidate}) => {
        rotateOrbit()
        axisAnimate && rotateAxis()
        speed && invalidate()
    })
    return <>{children}</>
}

export default inject("root")(observer(AnimationController))