import { Todo } from "../todos/models/todo.model";

/**
 * Crea el html para el todo
 * @param {Todo} todo 
 * @returns {HTMLElement} todo Html 
 */
export const createTodoHTML = (todo)=>{
    if(!todo) throw new Error('A Todo object is requerid');

    const {done, description, id} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if(todo.done)
        liElement.classList.add('completed');
    return liElement;
}