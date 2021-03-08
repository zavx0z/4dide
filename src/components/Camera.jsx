import * as React from 'react'
import {useThree} from 'react-three-fiber'
import {useEffect, useRef} from "react"
import {inject, observer} from "mobx-react"


const CameraController = ({root: {viewport: {camera}}}) => {
    const ref = useRef()
    const {setDefaultCamera} = useThree()
    const {init} = camera
    useEffect(() => {
        if (typeof ref.current !== 'undefined') {
            setDefaultCamera(ref.current)
            init(ref.current)
        }
    }, [setDefaultCamera, init])
    const {fov, positionV3, rotationV3} = camera
    return <perspectiveCamera ref={ref}
                              fov={fov}
                              position={positionV3}
                              rotation={rotationV3}
    />
}
export default inject('root')(observer(CameraController))