<template>
  <Modal
    width="786px"
    v-model:visible="visible"
    title="企业培训项目"
    ok-text="确认"
    cancel-text="取消"
    :destroyOnClose="true"
    @cancel="cancel"
    @ok="onOk"
  >
    <div class="grid grid-cols-6 gap-15px">
      <p
        v-for="(item, index) in props.data"
        :key="index"
        s:text="sm [#83867E]"
        class="w-110px h-40px flex-center items-center cursor-pointer"
        s:border="1px rounded-8px dashed"
        @click="onSelect(item)"
        :class="
          data.selected.has(item.id)
            ? 'border-[#C7F7E3] !text-primary'
            : 'border-[#DBDFDD] '
        "
      >
        <img
          v-if="data.selected.has(item.id)"
          src="@/assets/images/select-icon.png"
          class="mr-5px"
        />
        {{ item.name }}
      </p>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { toArray } from 'lodash-es'
import { SelectItem } from '../useLogin'

const props = withDefaults(
  defineProps<{
    data?: Array<{ id: number; name: string }>
    visible: boolean
    selected?: Array<SelectItem>
  }>(),
  {}
)
watch(
  () => props.selected,
  val => {
    setDefaultSel(val)
  }
)
onMounted(() => {
  setDefaultSel(props.selected)
})
function setDefaultSel(val) {
  if (val && val.length) {
    props.selected.forEach(p => {
      data.selected.set(p.id, p)
    })
    //   data.selected = props.selected
  }
}
const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void
  (event: 'onOk', value: Map<number, SelectItem>): void
}>()
const data = reactive({
  visible: false,
  selected: new Map<number, SelectItem>(),
})
function cancel() {
  emits('update:visible', false)
}
function onOk() {
  emits('onOk', data.selected)
}
function onSelect(item: SelectItem) {
  if (data.selected.has(item.id)) {
    data.selected.delete(item.id)
  } else {
    data.selected.set(item.id, item)
  }
}
</script>
