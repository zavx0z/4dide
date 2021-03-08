import React, {useEffect} from "react"
import {useFrame, useThree} from "react-three-fiber"
import {inject, observer} from "mobx-react"

const EntityPage = ({root: {speed, viewport: {setWidth}}, item}) => {
    const {core, setActive, playAxis, moveNameUp, stopAxis, setFly, moveNameToEntity, moveNameToCore} = item
    const {invalidate} = useThree()
    useEffect(() => {
        setFly(true)
        setActive(true)
        stopAxis()
        invalidate()
        return () => {
            setFly(false)
            setActive(false)
            moveNameUp()
            playAxis()
        }
    }, [invalidate, moveNameUp, playAxis, setActive, setFly, stopAxis])

    useFrame(({camera, viewport, invalidate}) => {
            const {cameraPositionEqual, nameInitWidth} = item
            setWidth(viewport().width)
            speed && invalidate()
            if ((!cameraPositionEqual) && nameInitWidth) {
                const {cameraV3} = item
                camera.lookAt(camera.position.lerp(cameraV3, 0.1))
                core ? moveNameToCore() : moveNameToEntity()
                invalidate()
            }
            cameraPositionEqual && setFly(false)
        }
    )
    return <></>
}
export const Entity = inject("root")(observer(EntityPage))

