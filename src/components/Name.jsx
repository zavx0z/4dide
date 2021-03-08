import {Text} from "@react-three/drei"
import React from "react"
import {observer} from "mobx-react"
import font from "../theme/Roboto-Regular.ttf"

export default observer(({item, clickHandler}) => {
    const {colorName, nameAnchorX, nameInitPosition, nameAnchorY, initName} = item
    return <Text
        onClick={clickHandler}
        fontSize={0.3}
        textAlign={"center"}
        font={font}
        position={nameInitPosition}
        color={colorName}
        anchorX={nameAnchorX}
        anchorY={nameAnchorY}
        name={'nameText'}
        onSync={initName}
    >
        {item.name}
    </Text>
})