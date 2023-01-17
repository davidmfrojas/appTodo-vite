import { createTodoHTML } from "./create-todo-html";

let element;

/**
 * Función que renderiza en el hhtml los todos
 * @param {String} htmlElementId id del elemento html donde renderizar los todos
 * @param {Array<Todo>} todos todos a renderizar
 */
export const renderTodos = (htmlElementId, todos = []) => {
    if(!element) 
        element = document.querySelector(htmlElementId);
    if(!element) throw new Error(`Element ${htmlElementId} not found`);

    element.innerHTML = '';

    todos.forEach(todo =>{
        const todoHtml = createTodoHTML(todo);
        element.append(todoHtml);
    });
}