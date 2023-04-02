import {types} from "mobx-state-tree"
import positionModel from "./positionModel"
import scaleModel from "./scaleModel"
import materialModel from "./materialModel"
import {config} from "@react-spring/three"
import {canvasStore} from "../Canvas"

config.fast = {mass: .01, tension: 444, friction: 14, delay: 1000}

const baseModel = types
    .model({
        scale: scaleModel,
        position: positionModel,
        material: materialModel,
        hovered: false,
        pinched: false,
        selected: false,
        draggable: false,
    })
    .preProcessSnapshot(snapshot => {
        switch (snapshot) {
            case undefined:
                break
            default:
                snapshot['position'] = typeof snapshot.position === "undefined" ? positionModel.create({config: {}}) : snapshot['position']
                snapshot['scale'] = typeof snapshot.scale === "undefined" ? scaleModel.create({config: {}}) : snapshot['scale']
                snapshot['material'] = typeof snapshot.material === "undefined" ? materialModel.create({config: {}}) : snapshot['material']
                return snapshot
        }
    })
    .views(self => ({
        get bounds() {
            const {width, height} = canvasStore.viewport
            return {
                left: -width / 2,
                right: width / 2,
                top: -height / 2,
                bottom: height / 2
            }
        }
    }))
    .actions(self => ({
        init(positionAPI, scaleAPI, materialAPI) {
            const {position, scale, material} = self
            position.api = positionAPI
            scale.api = scaleAPI
            material.api = materialAPI

        },
        setHover(bool) {
            // console.log('hovered', bool)
            self.hovered = bool
        },
        setPinched(bool) {
            self.pinched = bool
            bool && this.setSelected(!self.selected)
        },
        setSelected(bool) {
            self.selected = bool
        },
        setDraggable(bool) {
            self.draggable = bool
        }
    }))
export default baseModel