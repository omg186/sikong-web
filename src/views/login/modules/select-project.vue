<template>
  <Modal
    v-model:visible="data.visible"
    title="企业培训项目"
    ok-text="确认"
    cancel-text="取消"
    @cancel="cancel"
  >
    <p v-for="(item, index) in props.data" :key="index">{{ item.name }}</p>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { Modal } from 'ant-design-vue'
const props = withDefaults(
  defineProps<{
    data: Array<{ id: number; name: string }>
    visible: boolean
  }>(),
  {}
)
watch(
  () => props.visible,
  val => {
    if (val) {
      data.visible = val
    }
  }
)
const emits = defineEmits<{ (event: 'update:visible', value: boolean): void }>()
const data = reactive({
  visible: false,
})
function cancel() {
  //   data.visible = false
  emits('update:visible', false)
}
</script>
