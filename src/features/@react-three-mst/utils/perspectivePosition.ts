import { canvasStore } from "../Canvas"

/**
 * Конвертирует координаты из 3D пространства в 2D пространство с помощью перспективной проекции.
 * @param x - Координата X в 3D пространстве.
 * @param y - Координата Y в 3D пространстве.
 * @param distance - (Опционально) Расстояние между камерой и экраном.
 * @returns Массив, содержащий координаты X и Y в 2D пространстве.
 */
const perspectivePosition = (x: number, y: number, distance = canvasStore.camera.distanceToCanvas): [number, number] => {
    // Проверка доступности canvasStore.
    if (!canvasStore) {
        throw new Error("Хранилище канваса недоступно.")
    }

    // Проверка наличия необходимых свойств в canvasStore.
    if (!canvasStore.camera || !canvasStore.camera.fov || !canvasStore.viewport || !canvasStore.viewport.aspect) {
        throw new Error("Необходимые свойства отсутствуют в хранилище канваса.")
    }

    // Получение значений из canvasStore.
    const { camera: { fov }, viewport: { aspect } } = canvasStore

    // Расчёт вертикального угла обзора (в радианах).
    const vFOV = fov * Math.PI / 180

    // Расчёт расстояния от камеры до экрана.
    const distanceToScreen = Math.hypot(canvasStore.camera.position.x, canvasStore.camera.position.y, distance)

    // Расчёт высоты экрана.
    const height = 2 * Math.tan(vFOV / 2) * distanceToScreen

    // Конвертация координат в 2D пространство.
    const screenX = (x * height * aspect) / 2
    const screenY = (y * height) / 2

    // Возврат результатов.
    return [screenX, screenY]
}

export default perspectivePosition
