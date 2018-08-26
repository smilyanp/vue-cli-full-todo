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
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining;
        }
    },
    methods: {
        completeAllTodos (event) {
            this.$store.dispatch('checkAll', event);
        }
    }
}
</script>

<style>
    
</style>