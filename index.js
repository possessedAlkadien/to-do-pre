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

function loadTasks() {
	const stored = localStorage.getItem("toDoTasks");
	if (stored) {
		return JSON.parse(stored);
	}
	return items;
}

/** 
*@param {string} item
*@return {HTMLElement}
*/

function createItem(item) {
	const template = document.getElementById("to-do__item-template");

	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  	const textElement = clone.querySelector(".to-do__item-text");
	textElement.textContent = item;

  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");

	if (deleteButton) {
		deleteButton.addEventListener("click", function() {
			clone.remove();

			const items = getTasksFromDOM();
			saveTasks(items);
		});
	}

  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");

	if (duplicateButton) {
		duplicateButton.addEventListener("click", function() {
			const itemName = textElement.textContent;

			const newItem = createItem(itemName);

			listElement.prepend(newItem);

			const items = getTasksFromDOM();
			saveTasks(items);
		});
	}

 	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	if (editButton) {
		editButton.addEventListener("click", function() {
			textElement.setAttribute("contenteditable", "true");
			textElement.focus();
		});
	}

	textElement.addEventListener("blur", function() {
		textElement.setAttribute("contenteditable", "false");
		saveTasks(getTasksFromDOM());
	});

	return clone;
}

function getTasksFromDOM() {
	const tasks = [];
	const itemsNames = listElement.querySelectorAll(".to-do__item-text");
	itemsNames.forEach((el) => tasks.push(el.textContent));

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}

items = loadTasks();

items.forEach((task) => {
	const taskElement = createItem(task);
	listElement.appendChild(taskElement);
});

let currentItems = loadTasks();
currentItems.forEach((task) => {
	const taskElement = createItem(task);
	listElement.appendChild(taskElement);
});

formElement.addEventListener("submit", function(e) {
	e.preventDefault();
	const newTask = inputElement.value.trim();

	if (newTask === "") return;

	const newTaskElement = createItem(newTask);
	listElement.prepend(newTaskElement);

	currentItems = getTasksFromDOM();
	saveTasks(currentItems);

	inputElement.value = "";
});



