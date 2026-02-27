let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

/**
 * объявление параметров
 * @param {string} item
 * @param {string []} tasks 
*/


/**
 * загрузка задач из локальной памяти, если есть, 
 * с помощью парсинга JSON;
 * если нет, то стандартный массив задач
 * 
 * @returns {string []}
 */

function loadTasks() {
	const stored = localStorage.getItem("toDoTasks");
	if (stored) {
		return JSON.parse(stored);
	}
	return items;
}

/** 
 * создание элемента с задачей из шаблона, заполнеине
 * его текстом с возможностью редактирования,
 * удаления и дублирования
 * 
 *@return {HTMLElement}
 */

function createItem(item) {
	const template = document.getElementById("to-do__item-template");

	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  	const textElement = clone.querySelector(".to-do__item-text");
	textElement.textContent = item;


	try {
		const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
		deleteButton.addEventListener("click", function() {
			clone.remove();

			updateTasks();
		});
		
	}
	catch (err) {
		console.warn("Возникла проблема с кнопкой удаления:", err);
	}

	try {
		const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
		duplicateButton.addEventListener("click", function() {
			const itemName = textElement.textContent;

			const newItem = createItem(itemName);

			listElement.prepend(newItem);

			updateTasks();
		});
	}
	catch (err) {
		console.warn("Возникла проблема с кнопкой дублирования:",err);
	}

	try {
		const editButton = clone.querySelector(".to-do__item-button_type_edit");

		editButton.addEventListener("click", function() {
			textElement.setAttribute("contenteditable", "true");
			textElement.focus();
		});
		
	}
	catch (err) {
		console.warn("Возникли проблемы с кнопкой редактирования:", err);
	}

	textElement.addEventListener("blur", function() {
		textElement.setAttribute("contenteditable", "false");
		saveTasks(getTasksFromDOM());
	});

	return clone;
}

/**
 * обновление списка задач в локальной памяти
 * с извлечением текущих задач из DOM
 */

function updateTasks() {
	const items = getTasksFromDOM();
	saveTasks(items);
}

/**
 * извлечение массива текстов всех задач
 * из DOM
 * 
 * @returns {string[]}
 */

function getTasksFromDOM() {
	const tasks = [];
	const itemsNames = listElement.querySelectorAll(".to-do__item-text");
	itemsNames.forEach(function(el) {
        tasks.push(el.textContent);
    });

	return tasks;
}

/**
 * сохранение массива задач в локальную память
 */

function saveTasks(tasks) {
	localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}


items = loadTasks();
items.forEach(function(task) {
    const taskElement = createItem(task);
    listElement.append(taskElement);
});

formElement.addEventListener("submit", function(e) {
	e.preventDefault();
	const newTask = inputElement.value.trim();

	if (!newTask) return;

	const newTaskElement = createItem(newTask);
	listElement.prepend(newTaskElement);

	updateTasks();

	inputElement.value = "";
});



