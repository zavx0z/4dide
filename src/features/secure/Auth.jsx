import React from 'react'
import {Route, Routes} from "react-router-dom"
import ModalAuth from "./views/modal/ModalAuth"

export default ({redirect}) =>
    <Routes>
        <Route path={":authPath"} element={<ModalAuth redirect={redirect}/>}/>
    </Routes>
