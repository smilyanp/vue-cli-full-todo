import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        activeFilter: 'all',
        todos: [
            {
              'id': 1,
              'title': 'First to do for the day',
              'completed': false,
              'editing': false,
            },
            {
              'id': 2,
              'title': 'Second to do for the day',
              'completed': false,
              'editing': false,
            }
        ]
    },
    getters: {
        remaining (state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyCompleted (state) {
            return state.todos.filter((todo) => todo.completed).length;
        },
        anyRemaining (state, getters) {
            console.log(getters.remaining);
            return getters.remaining > 0;
        },
        showClearCompletedBtn (state, getters) {
            return getters.anyCompleted > 0;
        },
        todosFiltered (state) {
            switch (state.activeFilter) {
                case 'all':
                    return state.todos;

                case 'active':
                    return state.todos.filter((todo) => todo.completed == false);

                case 'completed':
                    return state.todos.filter((todo) => todo.completed == true);

                default:
                    return state.todos;
          }
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        clearCompleted(state) {
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
        changeFilter(state, filter) {
            state.activeFilter = filter;
        },
        doneEdit(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id);
            state.todos.splice(index, 1, todo);
        },
        removeTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id);
            state.todos.splice(index, 1);
        },
        checkAll(state, event) {
            state.todos = state.todos.filter((todo) => todo.completed = event.target.checked);
        }
    },
    actions: {
        addTodo(context, todo) {
            context.commit('addTodo', todo);
        },
        clearCompleted(context) {
            context.commit('clearCompleted');
        },
        changeFilter(context, filter) {
            context.commit('changeFilter', filter);
        },
        doneEdit(context, todo) {
            context.commit('doneEdit', todo);
        },
        removeTodo(context, id) {
            context.commit('removeTodo', id);
        },
        checkAll(context, event) {
            context.commit('checkAll', event);
        }
    }
});