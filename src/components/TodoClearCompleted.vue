<template>
    <b-button 
      size="sm" 
      variant="danger" 
      v-if="showClearCompletedBtn"
      @click="clearCompleted">
        <font-awesome-icon icon="trash" /> 
        Clear completed
    </b-button>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    props: {
        showClearCompletedBtn: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clearCompleted() {
            eventBus.$emit('clearCompleted');
        }
    }
}
</script>

<style lang="scss">
    
</style>