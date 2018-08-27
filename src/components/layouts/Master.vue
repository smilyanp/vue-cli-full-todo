<template>
    <div id="app">

        <b-navbar toggleable="md" type="dark" variant="info">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <li class="nav-item"><router-link :to="{ name: 'home' }" class="nav-link">Home</router-link></li>
              <li class="nav-item"><router-link :to="{ name: 'about' }" class="nav-link">About</router-link></li>
              <li class="nav-item"><router-link :to="{ name: 'login' }"class="nav-link">Login</router-link></li>
              <li class="nav-item"><router-link :to="{ name: 'register' }" class="nav-link">Register</router-link></li>
              <li class="nav-item"><router-link :to="{ name: 'todos' }" class="nav-link">App</router-link></li>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .container {
        padding-top: 40px;
    }
</style>