import {types} from "mobx-state-tree"

const configModel = types
    .model({
        mass: 1, // масса
        tension: 170, // энергия
        friction: 26, // трение
        clamp: false, // остановка анимации за границами
        precision: .01, // точность
        velocity: 0, // начальная скорость
        damping: 1, // Коэффициент демпфирования замедления. Работает только когда frequency определено.
        progress: 0, // При использовании с duration, он решает, с какого расстояния начинать функцию плавности.
        duration: types.maybe(types.number), // если > 0 переключится на анимацию на основе продолжительности вместо
        // физики пружины, значение должно быть указано в миллисекундах (например, duration: 250для продолжительности 250 мс)
        decay: types.maybe(types.number), // number скорости распада. Если передано значение по true умолчанию 0,998
        frequency: types.maybe(types.number), // Собственная частота (в секундах), которая определяет количество
        // отскоков в секунду при отсутствии демпфирования.
        // Когда определено, tension является производным от this и friction является производным от tension и damping.
        round: types.maybe(types.number), // Во время анимации округлите это число до ближайшего кратного. Это from и to
        // значение никогда не закругленные, а также любое значение , переданное в set метод анимированного значения.
        bounce: types.maybe(types.number), // Когда значение выше нуля, пружина будет подпрыгивать, а не прыгать за
        // пределы своего целевого значения.
        restVelocity: types.maybe(types.number), // Наименьшая скорость перед анимацией считается «неподвижной». Если не
        // определено, precision вместо него используется.
    })
    .actions(self => ({
        setMass(float) {
            self.mass = float
        },
        setTension(float) {
            self.tension = float
        },
        setFriction(float) {
            self.friction = float
        },
        set(obj) {
            for (let prop in obj) {
                self[prop] = obj[prop]
            }
        }
    }))
// .views(self => ({
//         get default() { //  { mass: 1, tension: 170, friction: 26 }
//             return config.default
//         },
//         get gentle() { //   { mass: 1, tension: 120, friction: 14 }
//             return config.gentle
//         },
//         get wobbly() { //   { mass: 1, tension: 180, friction: 12 }
//             return config.wobbly
//         },
//         get stiff() { // 	{ mass: 1, tension: 210, friction: 20 }
//             return config.stiff
//         },
//         get slow() { // 	{ mass: 1, tension: 280, friction: 60 }
//             return config.slow
//         },
//         get molasses() { // { mass: 1, tension: 280, friction: 120 }
//             return config.molasses
//         }
//     }
// ))
export default configModel