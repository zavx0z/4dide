import {Canvas} from "react-three-fiber"
import React from "react"
import {observer} from "mobx-react"

export const Canva = observer(({children}) => {
    return <>
        <Canvas
            style={{height: "100%", width: "100%"}}
            pixelRatio={window.devicePixelRatio}
            invalidateFrameloop
        >
            {children}
        </Canvas>
    </>
})