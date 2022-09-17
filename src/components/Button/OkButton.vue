<template>
  <button
    class="ok-button min-h-40px min-w-90px py-10px px-16px"
    s:border="1px solid [#C7F7E3] rounded-40"
    s:text="white sm"
    s:font="400"
    s:bg="primary"
    s:hover="bg-[#14DC87]"
  >
    <slot name="icon"> </slot>
    <span><slot></slot></span>
  </button>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.ok-button {
  @apply relative flex items-center gap-x-5px;
  &::after {
    content: '';
    @apply box-content absolute w-full h-full left-[-3px] top-[-3px] rounded-40;
    display: block;
    border: 3px solid transparent;
  }
  &:hover {
    &::after {
      border: 3px solid #ddfff0;
    }
  }
}
</style>
