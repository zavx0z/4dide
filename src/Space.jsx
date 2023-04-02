import React from 'react'
import Light from "./features/Light"
import {observer, Provider} from "mobx-react"
import Canvas from "./features/@react-three-mst/Canvas"
import universeStore from "./stores/universeStore"
import {BrowserRouter as Router} from "react-router-dom"

const Space = ({children}) => {
    return <Canvas
        style={{
            height: "100vh",
            backgroundColor: universeStore.backgroundColor,
            touchAction: 'none'
        }}
        onCreated={() => universeStore.toggleReady()}
    >
        <Router>
            <Provider universe={universeStore}>
                <Light/>
                {children}
            </Provider>
        </Router>
    </Canvas>
}
export default observer(Space)