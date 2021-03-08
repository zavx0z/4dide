import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {inject, observer} from "mobx-react"
import {Stars} from "@react-three/drei"
import {Item} from "./containers/Item"
import Camera from "./components/Camera"
import {Entity} from "./views/Entity"
import {Parent} from "./containers/Parent"
import AnimationController from "./controllers/AnimationController"


const App = ({root: {entity}}) => {
    const routesGenerator = item => <React.Fragment key={item.id}>
        <Route exact path={item.fullPath} element={<Entity item={item}/>}/>
        {item.child.map(item => routesGenerator(item))}
    </React.Fragment>

    const itemGenerator = (entity) => {
        const {child, id, core} = entity
        return (
            <group key={id} name={entity.name}>
                <AnimationController item={entity}>
                    {core ?
                        <Parent item={entity}>
                            {core && child.map(item => itemGenerator(item))}
                        </Parent>
                        :
                        <Item item={entity}/>
                    }
                </AnimationController>
            </group>
        )
    }
    return <>
        <Camera/>
        <Stars radius={100} factor={2} fade/>
        {itemGenerator(entity)}
        <Routes>
            {routesGenerator(entity)}
        </Routes>
    </>
}
export default inject("root")(observer(App))