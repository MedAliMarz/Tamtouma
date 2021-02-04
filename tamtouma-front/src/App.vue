<template>
  <div id='app'>
    <b-container fluid='md'>
      <b-row align-v='center' align-h='around'>
        <b-col  md='3'>
          <TaskList />
        </b-col>
        <b-col  md='8'>
          <Timer />
        </b-col>
      </b-row>
    </b-container>
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
.row{
  height: 100%;
}
.col{
  height: 100%;
}
</style>
