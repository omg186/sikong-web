<template>
  <div class="org-modules-table">
    <div>
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
})
</script>
