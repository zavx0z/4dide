const registerValidSW = (swUrl, config) => {
    console.log(navigator)
    navigator.serviceWorker.register(swUrl)
        .then(registration => {

            console.log('1')
            registration.onupdatefound = () => {
                console.log('2')
                const installingWorker = registration.installing
                console.log(registration)
                console.log(installingWorker == null)
                if (installingWorker === null) return

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // На этом этапе обновленное предварительно кэшированное содержимое было выбрано,
                            // но предыдущий работник службы все еще будет обслуживать предыдущее содержимое,
                            // пока все клиентские вкладки не будут закрыты.
                            console.log('Новый контент доступен и будет использоваться,' +
                                ' когда все вкладки для этой страницы закрыты.')
                            if (config && config.onUpdate) config.onUpdate(registration)

                        } else {
                            // К этому моменту все было переделано.
                            console.log('Содержимое кэшируется для автономного использования.')
                            if (config && config.onSuccess) config.onSuccess(registration)
                        }
                    }
                }
            }
        })
        .catch(error => console.error("Ошибка при регистрации сервисного работника:", error))
}

export const register = config => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = 'https://192.168.0.17:80/service-worker.js'
            registerValidSW(swUrl, config)
        })
    }
}

export const unregister = () => {
    if ('serviceWorker' in navigator)
        navigator.serviceWorker.ready.then(registration => registration.unregister())
}
