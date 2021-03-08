import root from "../models/root"
import entityStore from "./entityStore"
import viewportStore from "./viewportStore"
import {addMiddleware} from "mobx-state-tree"


const rootStore = root
    .create({
        viewport: viewportStore,
        entity: entityStore,
        orbitRotate: true,
        brightness: 4,
        speed: 1
    })

addMiddleware(entityStore, (call, next) => {
    const {name, args, context} = call
    switch (name) {
        case 'setAline':
            const typeAline = args[0]
            const {is_root} = context
            if (is_root)
                switch (typeAline) {
                    case 'scattering':
                        console.log('scattering')
                        rootStore.setAline("scattering")
                        break
                    case 'VerticalTop':
                        console.log('VerticalTop')
                        rootStore.setAline("VerticalTop")
                        break
                    default:
                        break
                }
            break
        default:
            break
    }
    // console.log(call)
    return next(call)
})
export default rootStore