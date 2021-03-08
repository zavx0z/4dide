import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React from "react"

export default (props) => {
    const {children, value, index, ...other} = props
    return <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && <Container maxWidth={'xs'}>
            <Grid container direction={"column"} justify={"center"} style={{height: "100%"}}>
                <Grid component={Paper} item container direction={"column"} spacing={2}>
                    {children}
                </Grid>
            </Grid>
        </Container>
        }
    </div>
}