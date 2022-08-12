<template>
  <div>
    {{ greeting }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineProps({
  //   msg: {
  //     type: String,
  //     required: true,
  //   },
})
const greeting = ref('Vue and TDD')
</script>
