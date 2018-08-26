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
        <todo-check-all></todo-check-all>
      </div>

      <div class="col-md-2 center-column">
        <todo-items-remaining></todo-items-remaining>
      </div>

      <div class="col-md-5 text-right">
        <todo-filters></todo-filters>
      </div>

      <div class="col-md-2">
        <todo-clear-completed></todo-clear-completed>
      </div>

    </div>

    <hr />

    <div class="todos-list">
      <b-list-group>
        <transition-group name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutRight">
          <todo-item 
            v-for="(todo, index) in todosFiltered" 
            :key="index" 
            :todo="todo" 
            :index="index" 
            :checkAll="!anyRemaining" />
        </transition-group>
      </b-list-group>
    </div>

    <div class="loading-overlay" v-if="$store.state.loading">
      <div class="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
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
  created() {
    fetchTodos: {
      this.$store.dispatch('fetchTodos');
    }
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
    }
  },
  computed: {
    removeTodo(id) {
      const index = this.$store.state.todos.findIndex(item => item.id == id);
      this.$store.state.todos.splice(index, 1);
    },
    anyCompleted () {
      return this.$store.getters.anyCompleted;
    },
    anyRemaining () {
      return this.$store.getters.anyRemaining;
    },
    showClearCompletedBtn () {
      return this.$store.getters.showClearCompletedBtn;
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered;
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.$store.dispatch('addTodo', {
        'id': this.idForTodo,
        'title': this.newTodo,
        'completed': false,
        'editing': false,
      });
      this.newTodo = '';
      this.idForTodo++;
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

/* Loading overlay */
.loading-overlay {
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-top: 15%;
}

/* Spinner */
.lds-ring {
  display: block;
  margin: 10px auto;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #646464;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #646464 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
