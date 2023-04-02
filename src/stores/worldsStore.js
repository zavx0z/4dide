import worldModel from "../models/worldModel"
import atoms from "../data/atoms"
import {addMiddleware} from "mobx-state-tree"

const log = (msg) => process.env.REACT_APP_LOG_WORD && console.log(msg)

const worldsStore = worldModel.create(atoms)

const normalOpacity = 1
const hoverOpacity = .44

addMiddleware(worldsStore, (call, next) => {
    const {name, args, context} = call
    switch (name) {
        case "setHover":
            const hover = args[0]
            const {material, name} = context
            log(`setHover: ${name} - ${hover}`)
            material.startOpacity(hover ? hoverOpacity : normalOpacity)
            break
        case "setActive":
            if (args[0]) {
                log(`setActive: ${context['name']} - ${args[0]}`)
            }
            break
        case "setPosition":
            process.env.REACT_APP_LOG_WORD &&
            console.log(`setPosition: ${context['name']}`)
            break
        default:
            break
    }
    return next(call)
})

export default worldsStore