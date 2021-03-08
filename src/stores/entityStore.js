import entity from "../models/entity/entity"


const entityStore = entity.create({
    id: '1',
    name: 'Документация',
    fullPath: '/',
    speed: 2,
    child: [
        {
            id: '1.1',
            name: 'Информация',
            fullPath: '/info',
            child: [
                {
                    id: '1.1.1',
                    name: 'Правила безопасности',
                    fullPath: '/info/safety_regulations',
                    child: []
                },
                {
                    id: '1.1.2',
                    name: 'Работа с документацией',
                    fullPath: '/info/work_with_the_documentation',
                    child: []
                },
                {
                    id: '1.1.3',
                    name: 'Тип шилда',
                    fullPath: '/info/shield_type',
                    child: []
                },
                {
                    id: '1.1.4',
                    name: 'Сертификат',
                    fullPath: '/info/certificate',
                    child: []
                },
            ]
        },
        {
            id: '1.2',
            name: 'Установка',
            fullPath: '/installation',
            child: []
        },
        {
            id: '1.3',
            name: 'Эксплуатация',
            fullPath: '/operation',
            child: []
        },
        {
            id: '1.4',
            name: 'Обслуживание',
            fullPath: '/service',
            child: [
                {
                    id: '1.4.1',
                    name: 'Личный кабинет',
                    fullPath: '/service/1',
                    child: []
                },
                {
                    id: '1.4.2',
                    name: 'Личный кабинет',
                    fullPath: '/service/2',
                    child: []
                },
                {
                    id: '1.4.3',
                    name: 'Личный кабинет',
                    fullPath: '/service/3',
                    child: []
                },
            ]
        },
        {
            id: '1.5',
            name: 'Детали',
            fullPath: '/details',
            child: []
        },
        {
            id: '1.6',
            name: 'Электрика',
            fullPath: '/electric',
            child: []
        },
        {
            id: '1.7',
            name: 'Смазка',
            fullPath: '/7',
            child: [
                {
                    id: '1.7.1',
                    fullPath: '/7/1',
                    name: 'Личный кабинет',
                    child: []
                },
                {
                    id: '1.7.2',
                    fullPath: '/7/2',
                    name: 'Личный кабинет',
                    path: 'auth',
                    child: []
                },
                {
                    id: '1.7.3',
                    fullPath: '/7/3',
                    name: 'Личный кабинет',
                    child: []
                },
                {
                    id: '1.7.4',
                    fullPath: '/7/4',
                    name: 'Личный кабинет',
                    child: []
                }
            ]
        },
    ]
})
export default entityStore