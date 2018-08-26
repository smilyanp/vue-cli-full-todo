<template>
  <div>
    <input 
      type="text" 
      class="todo-input form-control-lg form-control" 
      placeholder="What shall I do next?" 
      v-model="newTodo" 
      @keyup.enter="addTodo" />

    <hr />

    <div class="row controls">

      <div class="col-md-2 center-column">
        <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      </div>

      <div class="col-md-2 center-column">
        <todo-items-remaining :remaining="remaining"></todo-items-remaining>
      </div>

      <div class="col-md-5 text-right">
        <todo-filters></todo-filters>
      </div>

      <div class="col-md-2">
        <todo-clear-completed :showClearCompletedBtn="showClearCompletedBtn"></todo-clear-completed>
      </div>

    </div>

    <hr />

    <div class="todos-list">
      <b-list-group>
        <transition-group name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutRight">
          <todo-item 
            v-for="(todo, index) in todosFiltered" 
            :key="todo.id" 
            :todo="todo" 
            :index="index" 
            :checkAll="!anyRemaining" />
        </transition-group>
      </b-list-group>
    </div>

  </div>
</template>

<script>
import TodoItem from './TodoListItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFilters from './TodoFilters';
import TodoClearCompleted from './TodoClearCompleted';

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilters,
    TodoClearCompleted
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      filter: 'all',
      beforeEditCache: '',
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
    }
  },
  created() {
    eventBus.$on('removedTodo', (index) => this.removeTodo(index));
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data));
    eventBus.$on('completeAllTodos', (event) => this.completeAllTodos(event));
    eventBus.$on('filterChanged', (filter) => this.filter = filter);
    eventBus.$on('clearCompleted', () => this.clearCompleted());
  },
  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyCompleted () {
      return this.todos.filter((todo) => todo.completed).length;
    },
    anyRemaining () {
      return this.remaining > 0;
    },
    showClearCompletedBtn () {
      return this.anyCompleted > 0;
    },
    todosFiltered () {
      switch (this.filter) {
        case 'all':
          return this.todos;

        case 'active':
          return this.todos.filter((todo) => todo.completed == false);

        case 'completed':
          return this.todos.filter((todo) => todo.completed == true);

        default:
          return this.todos;
      }
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        'id': this.idForTodo,
        'title': this.newTodo,
        'completed': false,
        'editing': false,
      });
      this.newTodo = '';
      this.idForTodo++;
    },
    removeTodo (index) {
      this.todos.splice(index, 1);
    },
    completeAllTodos (event) {
      this.todos.forEach((todo) => todo.completed = event.target.checked);
    },
    clearCompleted () {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    finishedEdit (data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  }
}
</script>

<style lang="scss">

@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');

.todos-list {
  margin-top: 20px;

  .todo-item {
    animation-duration: 0.2s;
  }
}
.completed {
  text-decoration: line-through;
}
.center-column {
  flex-direction: column;
  justify-content: center;
  display: flex;
}
.controls label {
  margin-bottom: 0;
}
</style>
