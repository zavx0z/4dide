import {observer} from "mobx-react"
import React, {useEffect, useState} from "react"
import {Route, useNavigate, useLocation} from "react-router-dom"
import userStore from "../stores/userStore"

export default observer(({children, ...rest}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const {tokenStore, tokenGenerate} = userStore
    const [valid] = useState(tokenStore && tokenStore === tokenGenerate)
    useEffect(() => {
            !valid && navigate('../../../auth', {replace: true, store: {location: location}})
        }
        , [location, navigate, valid])
    return <Route{...rest} render={() => children}/>
})