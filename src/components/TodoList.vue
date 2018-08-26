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
        <label>
          <input 
            type="checkbox" 
            :checked="!anyRemaining" 
            @change="completeAllTodos" />
          Check all
        </label>
      </div>

      <div class="col-md-2 center-column">
        {{ remaining }} items left
      </div>

      <div class="col-md-5 text-right">
        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'all'}" 
          @click="filter = 'all'">
            All
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'active'}" 
          @click="filter = 'active'">
            Active
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'completed'}" 
          @click="filter = 'completed'">
          Completed
        </button>
      </div>

      <div class="col-md-2">
        <b-button 
          size="sm" 
          variant="danger" 
          v-if="showClearCompletedBtn"
          @click="clearCompleted">
            <font-awesome-icon icon="trash" /> 
            Clear completed
        </b-button>
      </div>

    </div>

    <hr />

    <div class="todos-list">
      <b-list-group>
        <transition-group name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutRight">
          <b-list-group-item v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
            <div class="row">
              
              <div class="col-md-1 center-column">
                <input 
                  type="checkbox" 
                  v-model="todo.completed" />
              </div>

              <div class="col-md-7 center-column">
                
                <div 
                  v-if="!todo.editing" 
                  @dblclick="editTodo(todo)" 
                  class="todo-title" 
                  :class="{ completed : todo.completed }">
                    {{ todo.title }}
                </div>

                <input 
                  v-else 
                  v-focus 
                  v-model="todo.title" 
                  @blur="doneEdit(todo)" 
                  @keyup.enter="doneEdit(todo)"
                  @keyup.esc="cancelEdit(todo)"
                  type="text" 
                  class="form-control" />
              </div>

              <div class="col-md-4 text-right">
                <b-button size="sm" variant="danger" @click="removeTodo(index)">
                  <font-awesome-icon icon="trash" />
                </b-button>
              </div>

            </div>
          </b-list-group-item>
        </transition-group>
      </b-list-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
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
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
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
    editTodo (todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit (todo) {
      if (todo.title.trim().length === 0) {
        return;
      }
      todo.editing = false;
    },
    cancelEdit (todo) {
      todo.editing = false;
      todo.title = this.beforeEditCache;
    },
    removeTodo (index) {
      this.todos.splice(index, 1);
    },
    completeAllTodos (event) {
      this.todos.forEach((todo) => todo.completed = event.target.checked);
    },
    clearCompleted (event) {
      this.todos = this.todos.filter((todo) => !todo.completed);
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
