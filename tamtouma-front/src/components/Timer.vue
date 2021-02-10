<template>
  <div
    class="timer"
    :class="{ 'timer--todo': isPomo, 'timer--pause': !isPomo }"
  >
    <b-progress :max="maxTime * 60" class="bg-transparent timer-loader-parent">
      <b-progress-bar
        class="timer-loader"
        :class="{
        'timer-loader--todo': isPomo,
        'timer-loader--pause': !isPomo
        }"
        :value="maxTime*60 - (this.time.min*60 +this.time.sec)">
      </b-progress-bar>
    </b-progress>
    <h1 class="timer-counter">
      <span class="timer-counter-separator">{{ this.time.min.toString().padStart(2, "0") }}</span>
      <span>{{
        this.time.sec.toString().padStart(2, "0")
      }}</span>
    </h1>
    <h5 class="timer-desc">{{ currentTask?currentTask.name: '* * *'}}</h5>
    <div class="timer-box">
      <b-icon
        @click="redo"
        icon="arrow-clockwise"
        class="timer-button"
      ></b-icon>
      <b-icon
        @click="play"
        :icon="!playing ? 'play-circle' : 'pause-circle'"
        class="timer-button"
      ></b-icon>
      <b-icon @click="done" icon="check-circle" class="timer-button"></b-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const POMODORO_MINUTES = 25 // default timer for one pomodoro
const SHORT_REST_MINUTES = 5 // default timer for short rest
const LONG_REST_MINUTES = 15 // default timer for long rest
export default {
  data: () => {
    return {
      isPomo: true,
      playing: false,
      finishedPomos: 0,
      maxTime: 0,
      time: {
        min: 0,
        sec: 0
      },
      interval: null
    }
  },
  mounted () {
    this.initInterval(POMODORO_MINUTES)
  },
  computed: mapGetters(['currentTask']),
  methods: {
    play () {
      this.playing = !this.playing
      if (this.playing) {
        this.startInterval()
      } else {
        this.stopInterval()
      }
    },
    redo () {
      this.stopInterval()
      this.initInterval(POMODORO_MINUTES)
    },
    done () {
      this.stopInterval()
      if (this.isPomo) {
        this.finishedPomos++
        this.$store.dispatch('increaseTaskIterations', this.currentTask.id)
        this.initInterval(this.finishedPomos === 4 ? LONG_REST_MINUTES : SHORT_REST_MINUTES)
        this.finishedPomos = this.finishedPomos === 4 ? 0 : this.finishedPomos
      } else {
        this.initInterval(POMODORO_MINUTES)
      }
      this.isPomo = !this.isPomo
    },
    initInterval (minutes) {
      this.maxTime = minutes
      this.time = {
        min: minutes,
        sec: 0
      }
    },
    startInterval () {
      this.interval = setInterval(() => {
        if (this.time.sec > 0) {
          this.time.sec--
        } else if (this.time.min > 0) {
          this.time.min--
          this.time.sec = 59
        } else {
          this.finishedPomos++
          this.stopInterval()
        }
      }, 1000)
    },
    stopInterval () {
      clearInterval(this.interval)
    }
  }
}
</script>
