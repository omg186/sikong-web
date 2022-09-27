<template>
  <Modal
    width="786px"
    v-model:visible="visible"
    title="企业培训项目"
    ok-text="确认"
    cancel-text="取消"
    :destroyOnClose="true"
    :footer="null"
    @cancel="cancel"
    @ok="onOk"
  >
    <template #closeIcon>
      <ImgIcon
        class="flex w-full h-full justify-center items-center"
        src="close.png"
        hover-src="close.png"
      ></ImgIcon>
    </template>
    <div class="grid grid-cols-6 gap-15px">
      <p
        v-for="(item, index) in props.data"
        :key="index"
        s:text="sm [#83867E]"
        class="w-110px h-40px mb-0px flex-center items-center cursor-pointer"
        s:border="1px rounded-8px dashed"
        @click="onSelect(item)"
        :class="
          data.selected.has(item.id)
            ? 'border-[#C7F7E3] !text-primary !border-solid'
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
    <div class="flex gap-x-10px justify-end">
      <CancelButton @click="cancel">取消</CancelButton>
      <OkButton @click="onOk">确定</OkButton>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { SelectItem } from '../useLogin'
import OkButton from '@/components/Button/OkButton.vue'
import CancelButton from '@/components/Button/CancelButton.vue'

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
