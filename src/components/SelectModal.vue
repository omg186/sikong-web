<template>
  <Modal
    width="786px"
    v-model:visible="visible"
    :title="props.title"
    ok-text="确认"
    cancel-text="取消"
    :destroyOnClose="true"
    :footer="null"
    @cancel="cancel"
    @ok="onOk"
  >
    <div><slot></slot></div>
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
    <!-- 按钮 -->
    <div class="flex gap-15px mt-10px">
      <Button class="btn cancel h-40px w-90px" @click="cancel"> 取消 </Button>

      <Button
        class="rounded-40px h-40px w-90px bg-primary text-white"
        s:border="1px solid [#C7F7E3]"
        type="primary"
        @click="onOk"
      >
        保存
      </Button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { Modal, Button } from 'ant-design-vue'

const props = withDefaults(
  defineProps<{
    data?: Array<{ id: number; name: string }>
    title: string
    visible: boolean
    selected?: Array<any>
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
  (event: 'onOk', value: Map<number, any>): void
}>()
const data = reactive({
  visible: false,
  selected: new Map<number, any>(),
})
function cancel() {
  emits('update:visible', false)
}
function onOk() {
  emits('onOk', data.selected)
}
function onSelect(item: any) {
  if (data.selected.has(item.id)) {
    data.selected.delete(item.id)
  } else {
    data.selected.set(item.id, item)
  }
}
</script>
