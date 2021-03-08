import NumberFormat from "react-number-format"
import TextField from "@material-ui/core/TextField"
import React from "react"

const PhoneFormatCustom = ({inputRef, onChange, name, ...other}) =>
    <NumberFormat
        format="+ # ### ### ####"
        allowEmptyFormatting mask="-"
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
                target: {
                    name: name,
                    value: values.value,
                },
            });
        }}
    />

export default ({label, value, onChange, ...other}) => {
    return <>
        <TextField
            label={label}
            fullWidth
            required
            variant={"outlined"}
            value={value}
            onChange={onChange}
            name="phoneFormat"
            id="formatted-phoneFormat-input"
            InputProps={{inputComponent: PhoneFormatCustom}}
            {...other}
        />
    </>
}
