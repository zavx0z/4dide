import {types} from "mobx-state-tree"
import configModel from "./configModel"
import {config} from '@react-spring/three'

const positionModel = types
    .model("position", {
        x: 0,
        y: 0,
        z: 0,
        config: configModel,
    })
    .preProcessSnapshot(snapshot => {
        switch (snapshot) {
            case undefined:
                break
            default:
                snapshot['config'] = typeof snapshot.config === "undefined" ? configModel.create({config: {}}) : snapshot['config']
                return snapshot
        }
    })
    .volatile(self => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            self.api = controller
        },
        start(x, y, z) {
            if (self.api) {
                self.api.update({positionX: x, positionY: y, positionZ: z})
                // this.set(x, y, z)
                return self.api.start()
                    .then(result => {
                        const {positionX, positionY, positionZ} = result.value
                        this.set(positionX, positionY, positionZ)
                    })
            }
        },
        startX(x) {
            if (self.api) {
                self.api.update({positionX: x, positionY: self.y, positionZ: self.z})
                return self.api.start()
                    .then(result => {
                        const {positionX, positionY, positionZ} = result.value
                        this.set(positionX, positionY, positionZ)
                    })
            }
        },
        startY(y) {
            if (self.api) {
                self.api.update({positionX: self.x, positionY: y, positionZ: self.z})
                return self.api.start()
                    .then(result => {
                        const {positionX, positionY, positionZ} = result.value
                        this.set(positionX, positionY, positionZ)
                    })
            }
        },
        startZ(z) {
            if (self.api) {
                self.api.update({positionX: self.x, positionY: self.y, positionZ: z})
                // this.set(x, y, z)
                return self.api.start()
                    .then(result => {
                        const {positionX, positionY, positionZ} = result.value
                        this.set(positionX, positionY, positionZ)
                    })
            }
        },
        setX(x) {
            self.x = x
        },
        setY(y) {
            self.y = y
        },
        setZ(z) {
            self.z = z
        },
        setAll(number) {
            self.x = self.y = self.z = number
        },
        set(x, y, z) {
            self.x = x
            self.y = y
            self.z = z
        }
    }))
    .views(self => ({
            get default() { //  { mass: 1, tension: 170, friction: 26 }
                return config.default
            },
            get gentle() { //   { mass: 1, tension: 120, friction: 14 }
                return config.gentle
            },
            get wobbly() { //   { mass: 1, tension: 180, friction: 12 }
                return config.wobbly
            },
            get stiff() { // 	{ mass: 1, tension: 210, friction: 20 }
                return config.stiff
            },
            get slow() { // 	{ mass: 1, tension: 280, friction: 60 }
                return config.slow
            },
            get molasses() { // { mass: 1, tension: 280, friction: 120 }
                return config.molasses
            }
        }
    ))
export default positionModel