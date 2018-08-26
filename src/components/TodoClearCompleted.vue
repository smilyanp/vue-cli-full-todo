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
    computed: {
        showClearCompletedBtn() {
            return this.$store.getters.showClearCompletedBtn;
        }
    },
    methods: {
        clearCompleted() {
          this.$store.dispatch('clearCompleted');
        }
    }
}
</script>

<style lang="scss">
    
</style>