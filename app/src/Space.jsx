import React from 'react'
import {Provider} from "mobx-react"
import {Canvas} from "@react-three/fiber"
import universeStore from "./stores/universeStore"
import {BrowserRouter as Router} from "react-router-dom"
import Light from "./features/Light"

const styles = {height: "100vh", backgroundColor: "#222222"}

export const Space = ({children}) => {
    return <>
        <Canvas
            style={styles}
            shadowMap
            invalidateFrameloop={true}
            onCreated={() => universeStore.toggleReady()}
        >
            <Router>
                <Provider universe={universeStore}>
                    <Light/>
                    {/*<axesHelper args={[1.5, 1.5, 1.5]} position={[0, 0, 0]}/>*/}
                    {children}
                </Provider>
            </Router>
        </Canvas>
    </>
}