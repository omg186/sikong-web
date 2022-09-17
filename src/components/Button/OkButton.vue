<template>
  <button
    class="ok-button min-h-40px min-w-90px py-10px px-16px"
    s:border="1px solid [#C7F7E3] rounded-40"
    s:text="white sm"
    s:font="400"
    s:bg="primary"
    s:hover="bg-[#14DC87]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.ok-button {
  @apply relative;
  &::before {
    content: '';
    @apply box-content absolute w-full h-full left-[-3px] top-[-3px] rounded-40;
    display: block;
    border: 3px solid #ddfff0;
  }
  &:hover {
    &::before {
      border: 3px solid #ddfff0;
    }
  }
}
</style>
