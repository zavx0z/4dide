import React from 'react'
import Button from "@material-ui/core/Button"
import {useNavigate} from "react-router-dom"
import routes from "../routes"

export default (props) => {
    const navigate = useNavigate()
    return <>
        <Button
            fullWidth
            onClick={() => navigate(routes.login)}
            variant={"contained"}
            color={"primary"}
            {...props}
        >
            Вход
        </Button>
    </>
}