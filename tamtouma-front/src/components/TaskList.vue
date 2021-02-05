<template>
  <div class="task-list">
    <h3 class="task-list-header">Tasks</h3>
    <div class="tasks-box" :class="{'tasks-box--blur':displayForm}">
        <span class="h6" v-if="!tasks.length">No tasks</span>
        <span class="task" v-for='(task,index) in tasks' :key="index">{{task.name}}</span>
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
          v-model="taskForm.name"
          type="textarea"
          placeholder="Do that! ..."
          required
      rows="3"
      max-rows="6"
    ></b-form-textarea>

      </b-form-group>

      <b-form-group id="input-group-2" label="Pomo Number:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="taskForm.number"
          type='number'
          min='1'
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
export default {
  data: () => {
    return {
      tasks: [

      ],
      displayForm: false,
      taskForm: {
        name: '',
        number: '1'
      }
    }
  },
  methods: {
    toggleForm () {
      this.displayForm = !this.displayForm
    },
    onReset () {
      this.toggleForm()
    },
    onSubmit () {
      const task = { ...this.taskForm }
      this.tasks.push(task)
      this.toggleForm()
    }
  }
}
</script>
