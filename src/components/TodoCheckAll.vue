<template>
    <label>
      <input 
        type="checkbox" 
        :checked="!anyRemaining" 
        @change="completeAllTodos" />
      Check all
    </label>
</template>

<script>
export default {
    name: 'todo-check-all',
    props: {
        anyRemaining: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        completeAllTodos (event) {
            eventBus.$emit('completeAllTodos', event);
        }
    }
}
</script>

<style>
    
</style>