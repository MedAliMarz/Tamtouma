import Vue from 'vue'
import Vuex from 'vuex'
import { createHash } from 'crypto'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tasks (pomodoro task)
    /*
     {
        id:string -> hash
        name: string,
        iterations: number,
        finishedIterations: number;
        completed: boolean
      }
    */
    tasks: [{
      id: 'blabla',
      name: 'Testing',
      iterations: 3,
      finishedIterations: 1,
      completed: false
    }]

  },
  mutations: {
    // add a task
    addTask (state, task) {
      state.tasks.push(task)
    },
    // remove a task
    removeTask (state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    // complete a task (change the completed session number)
    increaseIteration (state, id) {
      const task = state.tasks.find(task => task.id === id)
      if (!task.completed) {
        task.finishedIterations++
        task.completed = task.finishedIterations === task.iterations
      }
    }

  },
  actions: {
    // create a task
    createTask ({ commit }, task) {
      const hash = createHash('sha256')

      hash.on('readable', () => {
        const data = hash.read()
        if (data) {
          const id = data.toString('hex')
          commit('addTask', { id, name: task.name, iterations: task.iterations, finishedIterations: 0, completed: false })
        }
      })
      hash.write(task.toString())
      hash.end()
    },
    // delete a task
    deleteTask ({ commit }, taskId) {
      commit('removeTask', taskId)
    },
    // increase the iterations of a task
    increaseTaskIterations ({ commit }, taskId) {
      commit('increaseIteration', taskId)
    }
  },
  getters: {
    allTasks: (state) => state.tasks,
    currentTask: (state) => state.tasks[0],
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    notCompletedTasks: (state) => state.tasks.filter(task => !task.completed)
  },
  modules: {
  }
})
