<template>
  <div class="task-list">
    <h3 class="task-list-header">Tasks</h3>
    <div
      class="tasks-box"
      >
        <span class="h6" v-if="!allTasks.length">No tasks</span>
        <div class="task d-flex flex-row justify-content-between align-items-center"
          v-for='(task,index) in allTasks'
          :key="task.id"
          draggable
          @dragstart='startDrag($event, task)'
          @dragover.prevent
          @drop='onDrop($event,index)'
          >
          <b-badge v-if="task.completed"  class="green-background white-color">
            <b-icon icon="check-circle"></b-icon>
          </b-badge>
          <b-badge v-if="!task.completed" class="black-background white-color"><span class="yellow-color">{{task.finishedIterations}}</span>/{{task.iterations}}</b-badge>
          <span>{{task.name}}</span>
          <b-badge class="red-background white-color">
            <b-icon @click.prevent='onDelete(task.id)' icon="x"></b-icon>
          </b-badge>
        </div>
    </div>
     <b-form class="task-form" @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="displayForm">
      <b-form-group
        id="input-group-1"
        label="Todo"
        label-for="todo-desc"
        description="What's you are working on"
      >
      <b-form-textarea
        id="todo-desc"
          v-model.trim="taskForm.name"
          type="textarea"
          placeholder="Do that! ..."
          required
      rows="3"
      max-rows="6"
    ></b-form-textarea>

      </b-form-group>

      <b-form-group id="input-group-2" label="Pomo Iterations Number:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model.number="taskForm.iterations"
          type='number'
          min=1
          required
        ></b-form-input>
      </b-form-group>
      <div class="task-form-actions">
      <button type="reset" class="task-form-btn task-form-btn--second" >Cancel</button>
      <button type="submit" class="task-form-btn task-form-btn--main">Add Pomo</button>
      </div>
    </b-form>
    <b-icon class="task-list-button" variant='transparent' icon='plus-circle' v-if='!displayForm' @click='toggleForm'></b-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      displayForm: false,
      taskForm: {
        name: '',
        iterations: 1
      }
    }
  },
  computed: mapGetters(['allTasks']),
  methods: {
    toggleForm () {
      this.displayForm = !this.displayForm
    },
    onReset () {
      this.toggleForm()
    },
    onDelete (taskId) {
      this.$store.dispatch('deleteTask', taskId)
    },
    onSubmit () {
      // const task = { ...this.taskForm }
      this.$store.dispatch('createTask', this.taskForm)
      this.toggleForm()
      this.taskForm = {
        name: '',
        iterations: 1
      }
    },
    startDrag: (evt, task) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('taskID', task.id)
    },
    onDrop (evt, newIndex) {
      const taskId = evt.dataTransfer.getData('taskID')
      this.$store.dispatch('updateIndex', { taskId, newIndex })
    }
  }
}
</script>
