<template>
  <div id="app" class="container">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 20px;
}
.container {
  max-width: 700px;
  margin: 0 auto;
}
</style>
