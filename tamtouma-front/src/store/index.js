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
    tasks: []

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
    reorderTasks (state, updatedTasks) {
      state.tasks = updatedTasks
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
      hash.write(Object.values(task).toString())
      hash.end()
    },
    // delete a task
    deleteTask ({ commit }, taskId) {
      commit('removeTask', taskId)
    },
    // increase the iterations of a task
    increaseTaskIterations ({ commit }, taskId) {
      commit('increaseIteration', taskId)
    },
    updateIndex ({ commit, state }, { taskId, newIndex }) {
      const oldIndex = state.tasks.indexOf(task => task.id === taskId)
      const task = state.tasks.find(task => task.id === taskId)
      let updatedTasks = state.tasks.splice(oldIndex, 1)
      updatedTasks = [...updatedTasks.slice(0, newIndex), task, ...updatedTasks.slice(newIndex)]
      commit('reorderTasks', updatedTasks)
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
