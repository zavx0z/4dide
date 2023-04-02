export const getBBChild = (world) => {
    // Функция находит bounding box (охватывающий прямоугольник) дочерних элементов объекта world
    // и возвращает объект с координатами границ bounding box
    const {child} = world
    let left = Infinity, right = -Infinity, top = -Infinity, bottom = Infinity
    // Перебираем все дочерние объекты
    for (let i = 0; i < child.length; i++) {
        const obj = child[i]
        // Вычисляем координаты верхней и нижней грани объекта
        const objTop = obj.position.y + obj.size * 0.5
        const objBottom = obj.position.y - obj.size * 0.5
        // Если текущий объект правее, чем предыдущий, то обновляем координату правой грани
        if (obj.position.x + obj.size * 0.5 > right)
            right = obj.position.x + obj.size * 0.5
        // Если текущий объект левее, чем предыдущий, то обновляем координату левой грани
        if (obj.position.x - obj.size * 0.5 < left)
            left = obj.position.x - obj.size * 0.5
        // Если текущий объект выше, чем предыдущий, то обновляем координату верхней грани
        if (objTop > top)
            top = objTop
        // Если текущий объект ниже, чем предыдущий, то обновляем координату нижней грани
        if (objBottom < bottom)
            bottom = objBottom
    }
    const width = right - left
    const height = top - bottom
    return {top, right, bottom, left, width, height}
}
const getBBParentChild = (world) => {
    // Получаем ограничивающий прямоугольник для всех дочерних элементов объекта world
    const childBB = getBBChild(world)
    // Рассчитываем координаты родительского элемента
    const parentX = world.position.x
    const parentY = world.position.y
    const parentSize = world.size
    // Рассчитываем координаты ограничивающего прямоугольника для родительского элемента
    const parentLeft = parentX - parentSize * .5
    const parentRight = parentX + parentSize * .5
    const parentTop = parentY + parentSize * .5
    const parentBottom = parentY - parentSize * .5
    // Рассчитываем координаты ограничивающего прямоугольника для всех дочерних элементов и родительского элемента
    const top = Math.max(childBB.top, parentTop)
    const right = Math.max(childBB.right, parentRight)
    const bottom = Math.min(childBB.bottom, parentBottom)
    const left = Math.min(childBB.left, parentLeft)
    // Возвращаем объект с координатами ограничивающего прямоугольника
    const height = ''
    const width = ''
    return {top, right, bottom, left, height, width}
}
const alignElements = (context, supervisorStore, camera, width, height, alignment) => {
    const {top, right, bottom, left} = getBBChild(context)
    // Рассчитываем высоту и ширину Bounding Box
    const bbHeight = bottom - top
    const bbWidth = right - left
    // Вычисляем глубину камеры на основе высоты и ширины Bounding Box
    const depth = Math.max(bbWidth / width, bbHeight / height) * supervisorStore.computeDepth(camera.fov, height)
    // Определяем центр Bounding Box
    const centerX = (Math.abs(left) + Math.abs(right)) / 2 * Math.sign(left)
    const centerY = (Math.abs(top) + Math.abs(bottom)) / 2 * Math.sign(top)
    // Выравниваем элементы по горизонтали
    let x
    switch (alignment) {
        case 'left':
            x = left + width / 2
            break
        case 'center':
            x = centerX
            break
        case 'right':
            x = right - width / 2
            break
        default:
            throw new Error(`Unknown alignment option: ${alignment}`)
    }
    // Рассчитываем позицию камеры
    const y = centerY
    const z = depth + height / 2
    // Возвращаем объект с координатами камеры
    return {x, y, z}
}
