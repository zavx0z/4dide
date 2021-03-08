import {types} from "mobx-state-tree"
import entity from "./entity/entity"
import viewportModel from "./viewport/viewportModel"


export default types
    .model({
        entity: entity,
        viewport: viewportModel,
        brightness: 4,
        orbitRotate: false,
        speed: 1,
        aline: ''
    })
    .volatile(self => ({
        prevLevel: 0,
        currentLevel: 1,
    }))
    .actions(self => ({
        setCurrentLevel(level) {
            self.currentLevel = level
        },
        setPrevLevel() {
            self.prevLevel = self.currentLevel
        },
        setAline(typeAline) {
            self.aline = typeAline
        },
        incrementSpeed() {
            self.speed += 1
        },
        decrementSpeed() {
            self.speed -= 1
        },
        toggleOrbitRotate() {
            self.orbitRotate = !self.orbitRotate
        },
    }))
    .views(self => ({
        get rootSpeed() {
            const {speed} = self
            return (speed / 10000) * speed
        }
    }))
