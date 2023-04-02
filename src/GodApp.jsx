import React from 'react'
import Space from "./Space"
import {Universe} from "./Universe"
import {Worlds} from "./containers/Worlds"
import store from "./stores/universeStore"
import Supervisor from "./features/@react-three-mst/Supervisor"
import '../src/theme/styles/index.css'
import Configurator from "./Configurator"
import Axis from "./utils/Axis"

const GodApp = _ =>
    <Space>
        <Configurator/>
        <Axis/>
        <Supervisor/>
        <Universe>
            <Worlds worlds={store['worlds']}/>
        </Universe>
    </Space>
export default GodApp