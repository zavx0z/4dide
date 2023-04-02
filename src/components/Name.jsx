import React from "react"
import {Text} from "@react-three/drei"
import SourceCodePro from "../theme/fonts/Roboto-Regular.ttf"
import {Card, Paper} from "@mui/material"

const Name = ({hover, readyTransform, world, position, scale, title, getVisibleWidth}) => {
    // const {camera} = useThree()
    // const [sync, setSync] = useState(null)
    // const onUpdate = (text => {
    //     if (sync && readyTransform) {
    //         text.scale.x !== scale[0] && text.scale.fromArray(scale)
    //
    //         text.geometry.computeBoundingBox()
    //         const {max, min} = text.geometry.boundingBox
    //         const width = max.x - min.x
    //         const fullWidth = getVisibleWidth(camera, world.size / 2)
    //         let busy = world.active ? world.size : world.size * 2 - (world.size * 1.5)
    //         busy += 0.04
    //         const emptyWidth = fullWidth - busy
    //
    //         // console.log(text.text, width, emptyWidth, busy)
    //         if (emptyWidth - width < 0) {
    //             if (title.split(' ').length > 1) {
    //                 text.maxWidth = emptyWidth
    //             } else {
    //                 const k = emptyWidth / width
    //                 text.scale.x = k
    //                 text.scale.y = k
    //                 text.scale.z = k
    //             }
    //         }
    //     }
    // }, [readyTransform])
    return <>
        <Paper>
            <Text
                // onUpdate={onUpdate}
                anchorX={'center'}
                textAlign={'center'}
                anchorY={"center"}
                position={position}
                scale={scale}
                color={hover ? "#6476ec" : "#ffffff"}
                font={SourceCodePro}
                onHover={(e) => e.stopPropagation()}
                // maxWidth={1}
                // onSync={setSync}
            >
                {title}
            </Text>
        </Paper>
    </>
}
export default Name