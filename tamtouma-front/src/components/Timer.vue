<template>
  <div class="timer" :class="{'timer--todo':!finished,'timer--pause':finished,}">
    <div class="timer-loader" :class="{'timer-loader--todo':!finished,'timer-loader--pause':finished,}"></div>
    <h1 class="timer-counter">15:30</h1>
    <h5 class="timer-desc">Workout for 30 min</h5>
    <div class="timer-box" >
      <b-icon
        @click="redo"
        icon="arrow-clockwise"
        class="timer-button"
      ></b-icon>
      <b-icon
        @click="play"
        icon="play-circle"
        class="timer-button"
      ></b-icon>
      <b-icon
        @click="done"
        icon="check-circle"
        class="timer-button"
      ></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      playing: false,
      finished: false
    }
  },
  methods: {
    play () {
      this.playing = !this.playing
    },
    redo () {
      this.finished = false
    },
    done () {
      this.finished = true
    }
  }
}
</script>
