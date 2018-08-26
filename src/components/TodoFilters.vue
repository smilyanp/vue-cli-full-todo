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
    data() {
        return {
            'filter': 'all'
        }
    },
    methods: {
        changeFilter(filter) {
            this.filter = filter;
            eventBus.$emit('filterChanged', this.filter);
        }
    }
}
</script>

<style lang="scss">
    
</style>