<template>
    <b-list-group-item class="todo-item">
        <div class="row">
          
          <div class="col-md-1 center-column">
            <input 
              type="checkbox" 
              v-model="completed" 
              @change="doneEdit" />
          </div>

          <div class="col-md-7 center-column">
            
            <div 
              v-if="!editing" 
              @dblclick="editTodo" 
              class="todo-title" 
              :class="{ completed : completed }">
                {{ title }}
            </div>

            <input 
              v-else 
              v-focus 
              v-model="title" 
              @blur="doneEdit" 
              @keyup.enter="doneEdit"
              @keyup.esc="cancelEdit"
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
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': ''
        }
    },
    directives: {
        focus: {
          inserted: function (el) {
            el.focus()
          }
        }
    },

    // Watch props when they change
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    methods: {
        removeTodo(index) {
            this.$emit('removedTodo', index);
        },
        cancelEdit () {
          this.editing = false;
          this.title = this.beforeEditCache;
        },
        editTodo () {
            this.beforeEditCache = this.title;
            this.editing = true;
        },
        doneEdit () {
            if (this.title.trim().length === 0) {
                return;
            }
            this.editing = false;
            this.$emit('finishedEdit', {
                'index': this.index,
                'todo': {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing
                }
            });
        },
    }
}
</script>

<style lang="scss">
    
</style>