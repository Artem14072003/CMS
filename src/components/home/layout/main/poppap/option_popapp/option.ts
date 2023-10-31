
export const title = {
    required: "Заполните поле",
        maxLength: {
        value: 100,
            message: 'Слишком длинный title'
    }
}

export const category = {
    pattern: {
        value: /^[a-zA-ZА-я\s]+$/,
        message: "Только буквы"
    },
    required: "Заполните поле",
    maxLength: {
        value: 50,
        message: 'Слишком длинный'
    }
}

export const units = {
    required: "Заполните поле",
    pattern: {
        value: /^[a-zA-ZА-я\s]+$/,
        message: "Только буквы"
    },
    maxLength: {
        value: 2,
        message: 'Слишком длинный'
    }
}

export const discount = {
    required: 'Обязательное поле',
    valueAsNumber: true,
    min: {
        value: 0,
        message: 'Введите скидку от 0'
    },
    max: {
        value: 100,
        message: 'Дискон не может превышать 100%'
    }
}

export const description = {
    required: "Обязательное поле!"
}

export const count = {
    valueAsNumber: true,
    min: {
        value: 1,
        message: 'Минимальное количество от 1'
    }
}

export const price = {
    valueAsNumber: true,
    min: {
        value: 0.1,
        message: "Цена от $0.1"
    }
}