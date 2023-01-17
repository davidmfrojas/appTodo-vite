/*
Se utilizan para almacenar la información relevante de la aplicación y manejar el estado global de la aplicación
es un epacio especial centralizado
algunas librerias es Pinia y Redux toolkit, RXjS (objetos reactivos)
*/

import {Todo} from '../todos/models/todo.model';

/**
 * enumerado de filtros
 */
export const Filter = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

/**
 *Store que maneja el estado de la aplicación
 */
const state = {
    //lista de todos
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad')
    ],
    filter: Filter.All,
}

/**
 * Función que inicializa el store
 */
const initStore = () => {
    loadStore();
    console.log('InitStore DR');
}

/**
 * 
 */
const loadStore = () => {
    const saveState = localStorage.getItem('state');
    if(!saveState) return;
    const loadedState = JSON.parse(saveState);
    //se lee las propiedades para evitar que sean manipuladas en el localstorage
    const {todos = [], filter = Filter.All} = loadedState;
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Obtiene el listado de todos según el filtro indicado
 * @param {Filter} filter filter
 */
const getTodos = (filter = Filter.All) => {
    let todos;
    switch (filter) {
        case Filter.All:
            todos = [...state.todos];
            break; //[...array] operador spread, clona el array
        case Filter.Completed:
            todos = state.todos.filter(t => t.done);
            break;
        case Filter.Pending:
            todos = state.todos.filter(t => !t.done);
            break;
        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
    return todos;
}

/**
 * Agrega un nuevo todo al listado
 * @param {String} description //description to the new todo
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is requerid');

    const newTodo = new Todo(description);
    state.todos.push(newTodo);
    saveStateToLocalStorage();
}

/**
 * Cambia el estado del todo a su valor opuesto
 * @param {String} todoId Todo identifier
 */
const toggleTodo = (todoId) => {
    //map, retorna un nuevo arreglo con el resutado devuelto por el callback en cada iteración
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * Elimina el todo con el id especificado
 * @param {String} todoId Todo identifier
 */
const deleteTodo = (todoId) => {
    const selectedTodo = state.todos.find(t => t.id === todoId);
    if (!selectedTodo) throw new Error(`Todo with id: ${todoId} was not found`);
    state.todos = state.todos.filter(t => t.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * Elimina todos los todos completados
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(t => !t.done);
    saveStateToLocalStorage();
}

/**
 * Establece el filtro
 * @param {Filter} newFilter new filter
 */
const setFilter = (newFilter = Filter.All) => {
    //validar si existe
    if (!Object.keys(Filter).includes(newFilter)) throw new Error(`Option ${filter} is not valid.`);
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * Retorna el filtro actual
 */
const getCurrentFilter = () => {
    return state.filter;
}

const todoStore = {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}

export default todoStore;