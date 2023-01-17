//importamos el html del archivo app.html utilizando ?raw que s propio de vite para leer archivos html e importarlos
import appHtml from './app.html?raw';
import todoStore, {Filter} from '../store/todo.store';
import {renderTodos, renderPending} from '../use-cases';

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
};

/**
 * Aplicación inicial que construye el sitio web
 * @param {String} elementId 
 */
export const App = (elementId) => {

    /**
     * Función que muestra los todos del state
     */
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        const count = todoStore.getTodos(Filter.Pending).length;
        renderPending(ElementIds.PendingCountLabel, count);
    }

    /**
     *función anonima autoinvocada , inicializa la aplicación
     */
    (() => {
        const app = document.createElement('div');
        app.innerHTML = appHtml;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias Html, se crean aqui despues de haber sido creados los elementos html
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    //lista desordenada de elementos TODO
    const todoListUL = document.querySelector(ElementIds.TodoList);
    //botón borrar completados
    const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);
    //botones filtros
    const filtersLIs = document.querySelectorAll(ElementIds.TodoFilters);

    //listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        const value = event.target.value.trim();
        if (value.length === 0) return;
        todoStore.addTodo(value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const selectedElement = event.target.closest('[data-id]');
        const selectedTodoId = selectedElement.getAttribute('data-id');
        todoStore.toggleTodo(selectedTodoId);
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        //mi solución
        /*const selectedElementType = event.target.nodeName;
        if(selectedElementType !== "BUTTON") return;
        const selectedElement = event.target.closest('[data-id]');
        const selectedTodoId= selectedElement.getAttribute('data-id');
        todoStore.deleteTodo(selectedTodoId);
        displayTodos();*/
        const isDestroyElement = event.target.className === 'destroy';
        const selectedElement = event.target.closest('[data-id]');
        if (!selectedElement || !isDestroyElement) return;
        todoStore.deleteTodo(selectedElement.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (event) => {
            filtersLIs.forEach(element => element.classList.remove('selected'));
            const element = event.target;
            element.classList.add('selected');

            switch (element.text) {
                case 'Todos':
                    todoStore.setFilter(Filter.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filter.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filter.Completed);
                    break;
                default: throw new Error(`The selected option ${element.text} is not valid`);
            }
            displayTodos();
        });
    });

}