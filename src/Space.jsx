import React from 'react'
import {Provider} from "mobx-react"
import {Canvas} from "@react-three/fiber"
import universeStore from "./stores/universeStore"
import {BrowserRouter as Router} from "react-router-dom"
import Light from "./features/Light"
import {Stars} from "@react-three/drei"

const styles = {height: "100vh", backgroundColor: "rgb(12, 31, 60)"}

export const Space = ({children}) => {
    return <>
        <Canvas
            style={styles}
            onCreated={() => universeStore.toggleReady()}
        >
            <Stars radius={100} factor={1} fade/>
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
