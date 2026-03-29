import { SQLiteDatabase } from "expo-sqlite";
import * as QuestionsQueries from "../queries/QuestionsQueries";

export const seedQuestions = async (db: SQLiteDatabase) => {
    // Основы экономики
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое спрос?", 1,0,0,0, "Желание купить", "Предложение товара", "Цена", "Доход", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое предложение?", 0,1,0,0, "Спрос", "Количество товара", "Цена", "Доход", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на спрос?", 1,1,0,1, "Цена", "Доход", "Масса", "Вкус", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое рынок?", 1,0,0,0, "Место обмена", "Завод", "Школа", "Дом", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие бывают товары?", 1,1,0,1, "Потребительские", "Производственные", "Геометрические", "Услуги", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое услуга?", 0,0,1,0, "Товар", "Деньги", "Деятельность", "Цена", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на предложение?", 1,1,0,1, "Цена", "Технологии", "Возраст", "Издержки", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое цена?", 0,1,0,0, "Доход", "Стоимость товара", "Спрос", "Рынок", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие ресурсы есть?", 1,1,1,0, "Труд", "Капитал", "Земля", "Музыка", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое прибыль?", 0,0,1,0, "Расход", "Налог", "Доход минус расход", "Цена", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что относится к расходам?", 1,1,0,1, "Аренда", "Зарплата", "Прибыль", "Материалы", 1]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое конкуренция?", 1,0,0,0, "Соперничество", "Доход", "Цена", "Товар", 1]);

    // Личные финансы
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое бюджет?", 1,0,0,0, "План доходов", "Расход", "Кредит", "Налог", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что относится к доходам?", 1,1,0,1, "Зарплата", "Бизнес", "Долг", "Подарок", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что относится к расходам?", 1,1,0,1, "Еда", "Жилье", "Доход", "Транспорт", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое сбережения?", 0,1,0,0, "Расходы", "Накопления", "Долг", "Цена", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое кредит?", 1,0,0,0, "Заем денег", "Доход", "Сбережения", "Налог", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на бюджет?", 1,1,0,1, "Доход", "Расход", "Возраст", "Цены", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие есть активы?", 1,1,0,1, "Деньги", "Недвижимость", "Долг", "Инвестиции", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое инвестиции?", 0,0,1,0, "Расход", "Налог", "Вложение денег", "Кредит", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие расходы обязательны?", 1,1,0,1, "Жилье", "Еда", "Игры", "Коммунальные", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое долг?", 1,0,0,0, "Обязательство вернуть", "Доход", "Прибыль", "Цена", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что уменьшает расходы?", 1,1,0,1, "Планирование", "Скидки", "Кредиты", "Экономия", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что увеличивает доход?", 1,1,0,1, "Работа", "Бизнес", "Расходы", "Инвестиции", 2]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое налог?", 0,1,0,0, "Доход", "Платеж государству", "Кредит", "Цена", 2]);

    // Основы химии
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое атом?", 1,0,0,0, "Мельчайшая частица", "Молекула", "Элемент", "Ион", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое молекула?", 0,1,0,0, "Атом", "Связанные атомы", "Ион", "Элемент", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие части атома?", 1,1,1,0, "Протон", "Нейтрон", "Электрон", "Молекула", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое элемент?", 1,0,0,0, "Один тип атомов", "Молекула", "Смесь", "Раствор", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что показывает таблица Менделеева?", 1,1,0,1, "Элементы", "Атомный номер", "Скорость", "Массу", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое химическая реакция?", 0,0,1,0, "Движение", "Сила", "Превращение веществ", "Температура", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие состояния вещества?", 1,1,1,0, "Твердое", "Жидкое", "Газ", "Сила", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое ион?", 1,0,0,0, "Заряженная частица", "Атом", "Молекула", "Элемент", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое смесь?", 0,1,0,0, "Чистое вещество", "Сочетание веществ", "Атом", "Ион", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие есть типы реакций?", 1,1,1,0, "Соединение", "Разложение", "Замещение", "Движение", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое раствор?", 0,0,1,0, "Атом", "Элемент", "Смесь веществ", "Газ", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на реакцию?", 1,1,0,1, "Температура", "Концентрация", "Цвет", "Катализатор", 3]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое масса вещества?", 0,1,0,0, "Объем", "Количество вещества", "Скорость", "Сила", 3]);

    // Химические реакции
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое химическая реакция?", 1,0,0,0, "Превращение веществ", "Движение тел", "Сила", "Температура", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие бывают реакции?", 1,1,1,0, "Соединение", "Разложение", "Замещение", "Движение", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Реакция соединения это?", 0,1,0,0, "Разделение веществ", "Образование одного", "Скорость", "Температура", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Реакция разложения это?", 1,0,0,0, "Распад вещества", "Соединение", "Сила", "Давление", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что нужно для реакции?", 1,1,0,1, "Реагенты", "Энергия", "Цвет", "Температура", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое реагенты?", 0,0,1,0, "Продукты", "Катализатор", "Исходные вещества", "Энергия", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое продукты?", 1,0,0,0, "Результат реакции", "Реагенты", "Энергия", "Скорость", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на скорость?", 1,1,0,1, "Температура", "Концентрация", "Цвет", "Катализатор", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое катализатор?", 0,1,0,0, "Замедляет реакцию", "Ускоряет реакцию", "Останавливает", "Создает", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие признаки реакции?", 1,1,1,0, "Газ", "Осадок", "Цвет", "Скорость", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое уравнение реакции?", 0,0,1,0, "Формула вещества", "Скорость", "Запись реакции", "Температура", 4]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что сохраняется в реакции?", 1,0,0,0, "Масса", "Цвет", "Температура", "Скорость", 4]);

    // Основы социологии
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое общество?", 1,0,0,0, "Группа людей", "Организация", "Государство", "Семья", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое социальная группа?", 0,1,0,0, "Один человек", "Объединение людей", "Дом", "Школа", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие есть группы?", 1,1,0,1, "Малые", "Большие", "Физические", "Формальные", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое норма?", 0,0,1,0, "Закон", "Правило", "Ожидаемое поведение", "Наказание", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое роль?", 1,0,0,0, "Модель поведения", "Работа", "Игра", "Задача", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие институты есть?", 1,1,1,0, "Семья", "Образование", "Государство", "Скорость", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое социализация?", 0,1,0,0, "Обучение", "Освоение норм", "Работа", "Игра", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на поведение?", 1,1,0,1, "Культура", "Группа", "Масса", "Нормы", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое статус?", 1,0,0,0, "Положение человека", "Доход", "Возраст", "Рост", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие статусы бывают?", 1,1,0,1, "Социальный", "Личный", "Физический", "Профессиональный", 5]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое культура?", 0,0,1,0, "Наука", "Искусство", "Ценности и нормы", "Экономика", 5]);

    // Основы AI
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое AI?", 1,0,0,0, "Искусственный интеллект", "Компьютер", "Программа", "Алгоритм", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Где используется AI?", 1,1,0,1, "Медицина", "Игры", "Скорость", "Транспорт", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое данные?", 0,1,0,0, "Модель", "Информация", "Алгоритм", "Код", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что делает модель?", 1,0,0,0, "Предсказывает", "Хранит", "Удаляет", "Пишет", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие типы AI?", 1,1,0,1, "Слабый", "Сильный", "Быстрый", "Общий", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое алгоритм?", 0,0,1,0, "Данные", "Код", "Последовательность шагов", "Сеть", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое обучение?", 1,0,0,0, "Изменение модели", "Удаление данных", "Запуск", "Копирование", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что нужно для AI?", 1,1,0,1, "Данные", "Модель", "Музыка", "Вычисления", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое prediction?", 0,1,0,0, "Данные", "Предсказание", "Ошибка", "Сеть", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое ошибка?", 1,0,0,0, "Разница результата", "Ответ", "Данные", "Код", 6]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на качество?", 1,1,0,1, "Данные", "Модель", "Цвет", "Параметры", 6]);

    // Машинное обучение
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое ML?", 1,0,0,0, "Обучение моделей", "Код", "Данные", "Сеть", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Обучение с учителем?", 1,0,0,0, "Есть ответы", "Нет данных", "Нет модели", "Нет кода", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Без учителя?", 0,1,0,0, "Есть ответы", "Нет ответов", "Нет данных", "Нет кода", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие задачи ML?", 1,1,0,1, "Классификация", "Регрессия", "Музыка", "Кластеризация", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое датасет?", 0,0,1,0, "Модель", "Алгоритм", "Набор данных", "Код", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое train?", 1,0,0,0, "Обучение", "Тест", "Ошибка", "Данные", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое test?", 0,1,0,0, "Обучение", "Проверка", "Ошибка", "Модель", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на модель?", 1,1,0,1, "Данные", "Алгоритм", "Цвет", "Параметры", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое overfitting?", 1,0,0,0, "Переобучение", "Ошибка", "Модель", "Код", 7]);
    await db.runAsync(QuestionsQueries.INSERT, ["Метрики качества?", 1,1,0,1, "Accuracy", "Precision", "Speed", "Recall", 7]);

    // Нейронные сети
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое нейрон?", 1,0,0,0, "Элемент сети", "Данные", "Код", "Ответ", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое слой?", 0,1,0,0, "Модель", "Набор нейронов", "Данные", "Код", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие слои бывают?", 1,1,1,0, "Входной", "Скрытый", "Выходной", "Скорость", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое вес?", 1,0,0,0, "Параметр связи", "Ответ", "Данные", "Код", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое функция активации?", 0,0,1,0, "Данные", "Вес", "Функция нейрона", "Код", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие функции есть?", 1,1,0,1, "ReLU", "Sigmoid", "Speed", "Tanh", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое forward pass?", 1,0,0,0, "Прямой проход", "Обучение", "Ошибка", "Тест", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое backprop?", 0,1,0,0, "Прямой проход", "Обратное распространение", "Данные", "Код", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что делает обучение?", 1,0,0,0, "Меняет веса", "Удаляет", "Создает", "Копирует", 8]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что влияет на сеть?", 1,1,0,1, "Данные", "Архитектура", "Цвет", "Параметры", 8]);

    // Базовый английский
    await db.runAsync(QuestionsQueries.INSERT, ["Перевод 'hello'?", 1,0,0,0, "привет", "пока", "спасибо", "да", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Перевод 'book'?", 0,1,0,0, "ручка", "книга", "стол", "дом", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие глаголы?", 1,1,0,1, "go", "eat", "table", "run", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Past of go?", 0,0,1,0, "goed", "goes", "went", "going", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["He ___ a student", 0,1,0,0, "am", "is", "are", "be", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие прилагательные?", 1,1,0,1, "big", "small", "run", "happy", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Перевод 'water'?", 1,0,0,0, "вода", "еда", "огонь", "земля", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["I ___ happy", 1,0,0,0, "am", "is", "are", "be", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие существительные?", 1,1,0,1, "house", "car", "run", "dog", 9]);
    await db.runAsync(QuestionsQueries.INSERT, ["Перевод 'friend'?", 0,1,0,0, "враг", "друг", "брат", "дом", 9]);

    // Основы музыки
    await db.runAsync(QuestionsQueries.INSERT, ["Сколько нот?", 0,1,0,0, "5", "7", "8", "10", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Нота C это?", 1,0,0,0, "До", "Ре", "Ми", "Фа", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие ноты есть?", 1,1,1,0, "До", "Ре", "Ми", "HTML", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое ритм?", 0,0,1,0, "Звук", "Темп", "Повторение", "Нота", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое мелодия?", 1,0,0,0, "Последовательность звуков", "Ритм", "Темп", "Громкость", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие инструменты?", 1,1,0,1, "Гитара", "Пианино", "Код", "Барабаны", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое темп?", 0,1,0,0, "Громкость", "Скорость музыки", "Звук", "Нота", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Нота G это?", 0,0,1,0, "До", "Ре", "Соль", "Ля", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Какие жанры?", 1,1,0,1, "Рок", "Поп", "Скорость", "Джаз", 10]);
    await db.runAsync(QuestionsQueries.INSERT, ["Что такое октава?", 1,0,0,0, "8 нот", "5 нот", "10 нот", "3 ноты", 10]);
};