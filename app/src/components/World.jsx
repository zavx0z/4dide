import React, {useEffect} from "react"
import {observer} from "mobx-react"
import {invalidate, useThree} from "@react-three/fiber"

const World = ({atom}) => {
    const {camera} = useThree()
    useEffect(() => {
        if (atom.ready) {
            process.env.REACT_APP_LOGGING && console.log(`[WORLD]: activate ${atom.name}`)
            atom.setActive(true, camera)
            invalidate()
        }
        return () => {
            process.env.REACT_APP_LOGGING && console.log(`[WORLD]: deactivate ${atom.name}`)
            atom.setActive(false)
        }
    }, [atom, atom.ready, camera])

    return <></>
}
export default observer(World)

