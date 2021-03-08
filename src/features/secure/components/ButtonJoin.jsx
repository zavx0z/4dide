import React from 'react'
import Button from "@material-ui/core/Button"
import {useNavigate} from "react-router-dom"
import routes from "../routes"

export default (props) => {
    const navigate = useNavigate()
    return <>
        <Button
            onClick={() => navigate(routes.join)}
            fullWidth
            variant={"contained"}
            color={"primary"}
            {...props}
        >
            Регистрация
        </Button>
    </>
}