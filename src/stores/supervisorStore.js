import supervisorModel from "../features/@react-three-mst/models/supervisorModel"

const supervisorStore = supervisorModel.create({
    fov: 1,
    position: {
        x: 0,
        y: 0,
        z: 444,
        config: {
            mass: 4.4,
            tension: 144,
            friction: 44,
            precision: 0.004
        }
    },

})

export default supervisorStore