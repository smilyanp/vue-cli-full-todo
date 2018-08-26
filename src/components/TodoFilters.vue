<template>
    <div>
        <button 
          class="btn btn-light" 
          :class="{ active : activeFilter == 'all'}" 
          @click="changeFilter('all')">
            All
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : activeFilter == 'active'}" 
          @click="changeFilter('active')">
            Active
        </button>

        <button 
          class="btn btn-light" 
          :class="{ active : activeFilter == 'completed'}" 
          @click="changeFilter('completed')">
          Completed
        </button>
    </div>
</template>

<script>
export default {
    name: 'todo-filters',
    computed: {
      activeFilter() {
        return this.$store.state.activeFilter;
      }
    },
    methods: {
      changeFilter(activeFilter) {
        this.$store.dispatch('changeFilter', activeFilter);
      }
    }
}
</script>

<style lang="scss">
    
</style>