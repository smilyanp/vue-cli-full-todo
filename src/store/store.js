import Vue from 'vue';
import Vuex from 'vuex';
import db from '../firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({

    // THE STATE
    state: {
        activeFilter: 'all',
        loading: true,
        todos: []
    },

    // GETTING DATA FROM THE STATE
    getters: {
        remaining (state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyCompleted (state) {
            return state.todos.filter((todo) => todo.completed).length;
        },
        anyRemaining (state, getters) {
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

    // UPDATING THE STATE
    mutations: {
        fetchTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id);
            state.todos.splice(index, 1, todo);
        },
        removeTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id);
            state.todos.splice(index, 1);
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        changeFilter(state, filter) {
            state.activeFilter = filter;
        },
        checkAll(state, checked) {
            state.todos.forEach(todo => (todo.completed = checked));
        }
    },

    // AJAX
    actions: {
        fetchTodos(context) {
            context.state.loading = true;

            db.collection('todos').get()
                .then(quierySnapshot => {
                    let todos = [];
                    quierySnapshot.forEach(doc => {
                        todos.push({
                            id: doc.id,
                            title: doc.data().title,
                            completed: doc.data().completed,
                            timestamp: doc.data().timestamp
                        });
                    });

                    const todosSorted = todos.sort((a, b) => {
                        return a.timestamp.seconds - b.timestamp.seconds;
                    });

                    context.commit('fetchTodos', todosSorted);
                    context.state.loading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        addTodo(context, todo) {
            context.state.loading = true;

            db.collection('todos').add({
                title: todo.title,
                completed: false,
                timestamp: new Date()
            })
            .then(docRef => {
                context.commit('addTodo', {
                    id: docRef.id,
                    title: todo.title,
                    completed: false
                });
                context.state.loading = false;
            })
            .catch(error => {
                console.log(error);
            });
        },
        removeTodo(context, id) {
            context.state.loading = true;

            db.collection('todos').doc(id).delete()
                .then(() => {
                    context.commit('removeTodo', id);
                    context.state.loading = false;
                });
        },
        updateTodo(context, todo) {
            context.state.loading = true;

            db.collection('todos').doc(todo.id).set({
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                    timestamp: new Date()
                })
                .then(() => {
                    context.commit('updateTodo', todo);
                    context.state.loading = false;
                })
        },
        clearCompleted(context) {
            context.state.loading = true;

            db.collection('todos').where('completed', '==', true).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                            .then(() => {
                                context.commit('clearCompleted');
                                context.state.loading = false;
                            });
                    });
                });
        },
        changeFilter(context, filter) {
            context.commit('changeFilter', filter);
        },
        checkAll(context, checked) {
            context.state.loading = true;

            db.collection('todos').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        completed: checked
                    })
                    .then(() => {
                        context.commit('checkAll', checked);
                        context.state.loading = false;
                    });
                });
            })
        }
    }
});