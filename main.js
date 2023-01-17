import './style.css';
import {App} from './srcs/todos/app';
import todoStore from './srcs/store/todo.store';

todoStore.initStore();

App('#app');