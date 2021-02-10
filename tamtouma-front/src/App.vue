<template>
  <div id='app' class="app">
    <!-- <b-container>
      <b-row align-h='around' class="app">
        <b-col  md='3'>
          <TaskList />
        </b-col>
        <b-col  md='9'>
          <Timer />
        </b-col>
      </b-row>
    </b-container> -->
    <TaskList />
    <Timer />
  </div>
</template>

<script>
import Timer from './components/Timer.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    Timer,
    TaskList
  }
}
</script>

<style lang='scss'>
#app {
  height: 100vh;
}
.app{
  height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 2rem;
  @media (max-width: 375px){
    min-width: 375px !important;
    padding: 0 !important;
    flex-direction: column-reverse !important;
  }
}
</style>
