import React from 'react'
import {Route, Routes} from "react-router-dom"
import World from "../components/World"

export const Worlds = ({worlds}) => {
    process.env.REACT_APP_LOGGING && console.log('[WORLDS]: generate')
    const generator = (world) => {
        const routes = []
        let key = 0
        const viewsGenerator = (item) => {
            key += 1
            routes.push(<Route key={key} path={item.path} element={<World atom={item}/>}/>)
            item.child.map(item => viewsGenerator(item))
        }
        viewsGenerator(world)
        return routes
    }
    return <Routes>{generator(worlds)}</Routes>
}