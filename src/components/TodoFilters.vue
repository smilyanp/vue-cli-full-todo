<template>
    <div>
        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'all'}" 
          @click="changeFilter('all')">
            All
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'active'}" 
          @click="changeFilter('active')">
            Active
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : filter == 'completed'}" 
          @click="changeFilter('completed')">
          Completed
        </button>
    </div>
</template>

<script>
export default {
    name: 'todo-filters',
    computed: {
      filter() {
        return this.$store.state.activeFilter;
      }
    },
    methods: {
      changeFilter(filter) {
        this.$store.dispatch('changeFilter', filter);
      }
    }
}
</script>

<style lang="scss">
    
</style>