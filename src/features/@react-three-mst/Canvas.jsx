import {Canvas as FiberCanvas, useThree} from "@react-three/fiber"
import {ACESFilmicToneMapping, PCFSoftShadowMap} from "three"
import {useEffect} from "react"
import canvasModel from "./models/canvasModel"

export const canvasStore = canvasModel.create({})

export const MobxGlProvider = () => {
    const get = useThree((state) => state.get)
    useEffect(() => canvasStore.setGl(get), [get])
    return <></>
}
const Canvas = ({onCreated, children, ...other}) =>
    <FiberCanvas
        {...other}
        onCreated={({gl}) => {
            Math.min(gl['setPixelRatio'](window.devicePixelRatio), 2)
            gl['shadowMap'].enabled = true
            gl['shadowMap'].type = PCFSoftShadowMap
            gl.toneMapping = ACESFilmicToneMapping
            typeof onCreated !== "undefined" && onCreated()
        }}
    >
        <MobxGlProvider/>
        {children}
    </FiberCanvas>
export default Canvas