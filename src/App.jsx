import React from 'react'
import {Space} from "./Space"
import {Universe} from "./Universe"
import {Worlds} from "./containers/Worlds"
import store from "./stores/universeStore"
import Supervisor from "./Supervisor"
import './theme/styles/index.css'
import Configurator from "./Configurator"


const App = () =>
    <Space>
        <Configurator/>
        <Supervisor>
            <Universe>
                <Worlds worlds={store.worlds}/>
            </Universe>
        </Supervisor>
    </Space>
export default App
