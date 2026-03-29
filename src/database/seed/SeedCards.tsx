import { SQLiteDatabase } from "expo-sqlite";
import * as CardsQueries from "../queries/CardsQueries";

export const seedCards = async (db: SQLiteDatabase) => {
    // Основы механики
    await db.runAsync(CardsQueries.INSERT, ["Что изучает механика?", "Движение и взаимодействие тел", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое скорость?", "Путь за время", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое ускорение?", "Изменение скорости", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Единица силы?", "Ньютон", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое масса?", "Мера инертности", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Первый закон Ньютона?", "Закон инерции", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Второй закон Ньютона?", "F=ma", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Третий закон Ньютона?", "Действие равно противодействию", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое путь?", "Длина траектории", 1]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое сила?", "Мера взаимодействия", 1]);

    // Формулы по кинематике
    await db.runAsync(CardsQueries.INSERT, ["Формула скорости", "v = s/t", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Формула пути", "s = vt", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Формула ускорения", "a = v/t", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Равномерное движение путь", "s = vt", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Скорость через путь", "v = s/t", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Ускорение через время", "a = Δv/t", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Начальная скорость", "v₀", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Конечная скорость", "v", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Время движения", "t", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Путь обозначение", "s", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Ускорение обозначение", "a", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Скорость обозначение", "v", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Δv это?", "Изменение скорости", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Равноускоренное движение", "a = const", 2]);
    await db.runAsync(CardsQueries.INSERT, ["Без ускорения", "a = 0", 2]);

    // Основы Python
    await db.runAsync(CardsQueries.INSERT, ["Как объявить переменную?", "x = 5", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Тип строки", "str", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Тип числа", "int", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Список в Python", "list", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Словарь", "dict", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Булев тип", "bool", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Условие начинается с", "if", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Иначе", "else", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Цикл for", "for", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Цикл while", "while", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Функция объявление", "def", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Вывод в консоль", "print()", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Ввод данных", "input()", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Длина списка", "len()", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Добавить в список", "append()", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Удалить элемент", "remove()", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Импорт модуля", "import", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Комментарий", "#", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Равенство", "==", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Не равно", "!=", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Больше", ">", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Меньше", "<", 3]);
    await db.runAsync(CardsQueries.INSERT, ["И логическое", "and", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Или логическое", "or", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Не логическое", "not", 3]);
    await db.runAsync(CardsQueries.INSERT, ["True значение", "Истина", 3]);
    await db.runAsync(CardsQueries.INSERT, ["False значение", "Ложь", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Кортеж", "tuple", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Множество", "set", 3]);
    await db.runAsync(CardsQueries.INSERT, ["Индекс начинается с", "0", 3]);

    // Структуры данных
    await db.runAsync(CardsQueries.INSERT, ["FIFO структура", "Очередь", 4]);
    await db.runAsync(CardsQueries.INSERT, ["LIFO структура", "Стек", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Ключ-значение", "Словарь", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Уникальные элементы", "Множество", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Последовательность", "Список", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Добавление в стек", "push", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Удаление из стека", "pop", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Очередь добавление", "enqueue", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Очередь удаление", "dequeue", 4]);
    await db.runAsync(CardsQueries.INSERT, ["Фиксированный список", "Массив", 4]);

    // Алгоритмы
    await db.runAsync(CardsQueries.INSERT, ["Простой поиск", "Линейный", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Быстрый поиск", "Бинарный", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Сортировка пузырьком", "Bubble sort", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Быстрая сортировка", "Quick sort", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Сложность O(n)", "Линейная", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Сложность O(log n)", "Логарифмическая", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Сложность O(n²)", "Квадратичная", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Что такое рекурсия", "Функция вызывает себя", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Минимум поиск", "min()", 5]);
    await db.runAsync(CardsQueries.INSERT, ["Максимум поиск", "max()", 5]);

    // Основы веб-разработки
    await db.runAsync(CardsQueries.INSERT, ["Язык разметки", "HTML", 6]);
    await db.runAsync(CardsQueries.INSERT, ["Стилизация", "CSS", 6]);
    await db.runAsync(CardsQueries.INSERT, ["Логика сайта", "JavaScript", 6]);
    await db.runAsync(CardsQueries.INSERT, ["Тег ссылки", "<a>", 6]);
    await db.runAsync(CardsQueries.INSERT, ["HTTP метод получения", "GET", 6]);
    await db.runAsync(CardsQueries.INSERT, ["Запрос к API", "fetch()", 6]);

    // Everyday English
    await db.runAsync(CardsQueries.INSERT, ["привет", "hello", 7]);
    await db.runAsync(CardsQueries.INSERT, ["пока", "bye", 7]);
    await db.runAsync(CardsQueries.INSERT, ["спасибо", "thank you", 7]);
    await db.runAsync(CardsQueries.INSERT, ["пожалуйста", "please", 7]);
    await db.runAsync(CardsQueries.INSERT, ["да", "yes", 7]);
    await db.runAsync(CardsQueries.INSERT, ["нет", "no", 7]);
    await db.runAsync(CardsQueries.INSERT, ["человек", "person", 7]);
    await db.runAsync(CardsQueries.INSERT, ["еда", "food", 7]);
    await db.runAsync(CardsQueries.INSERT, ["вода", "water", 7]);
    await db.runAsync(CardsQueries.INSERT, ["дом", "house", 7]);
    await db.runAsync(CardsQueries.INSERT, ["идти", "go", 7]);
    await db.runAsync(CardsQueries.INSERT, ["есть", "eat", 7]);
    await db.runAsync(CardsQueries.INSERT, ["делать", "do", 7]);
    await db.runAsync(CardsQueries.INSERT, ["большой", "big", 7]);
    await db.runAsync(CardsQueries.INSERT, ["маленький", "small", 7]);
    await db.runAsync(CardsQueries.INSERT, ["счастливый", "happy", 7]);
    await db.runAsync(CardsQueries.INSERT, ["друг", "friend", 7]);
    await db.runAsync(CardsQueries.INSERT, ["работа", "work", 7]);
    await db.runAsync(CardsQueries.INSERT, ["время", "time", 7]);
    await db.runAsync(CardsQueries.INSERT, ["день", "day", 7]);

    // Basic Grammar
    await db.runAsync(CardsQueries.INSERT, ["I ___ a student", "am", 8]);
    await db.runAsync(CardsQueries.INSERT, ["He ___ a teacher", "is", 8]);
    await db.runAsync(CardsQueries.INSERT, ["They ___ friends", "are", 8]);
    await db.runAsync(CardsQueries.INSERT, ["Do you ___ coffee?", "like", 8]);
    await db.runAsync(CardsQueries.INSERT, ["He ___ not go", "does", 8]);
    await db.runAsync(CardsQueries.INSERT, ["Past of go", "went", 8]);
    await db.runAsync(CardsQueries.INSERT, ["Past of eat", "ate", 8]);
    await db.runAsync(CardsQueries.INSERT, ["in используется для?", "внутри", 8]);
    await db.runAsync(CardsQueries.INSERT, ["on используется для?", "на поверхности", 8]);
    await db.runAsync(CardsQueries.INSERT, ["at используется для?", "точка места", 8]);

    // История Казахстана
    await db.runAsync(CardsQueries.INSERT, ["Столица Казахстана", "Астана", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Год независимости", "1991", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Первый президент", "Назарбаев", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Национальная валюта", "тенге", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Казахское ханство год", "1465", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Известный хан", "Абылай хан", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Степное государство", "Кочевое", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Шелковый путь проходил", "Через Казахстан", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Город Алматы ранее", "Верный", 9]);
    await db.runAsync(CardsQueries.INSERT, ["Государственный язык", "Казахский", 9]);

    // Ноты и их обозначения
    await db.runAsync(CardsQueries.INSERT, ["До", "C", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Ре", "D", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Ми", "E", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Фа", "F", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Соль", "G", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Ля", "A", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Си", "B", 10]);
    await db.runAsync(CardsQueries.INSERT, ["Октава", "8 нот", 10]);
};