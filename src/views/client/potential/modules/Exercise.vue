<template>
  <div>
    <p>
      最多可选
      {{ count }} 项锻炼目标，系统根据目标被选择的先后顺序给予从高到低的权重。
    </p>
    <div class="mt-20px">
      <div class="flex flex-wrap gap-y-15px gap-x-20px">
        <p
          v-for="(item, index) in selList"
          :key="index"
          s:text="sm [#83867E]"
          class="py-10px px-20px cursor-pointer"
          s:border="1px rounded-8px dashed"
          @click="onSelect(item)"
          :class="
            data.selected.has(item.id)
              ? 'border-[#C7F7E3] !border-solid !text-primary'
              : 'border-[#DBDFDD] '
          "
        >
          {{ item.name }}
        </p>
      </div>
    </div>
    <div class="mt-50px mb-40px flex gap-20px">
      <div
        class="w-114px h-81px grid grid-rows-3 p-10px bg-primary rounded-sm"
        s:text="sm white"
        v-for="(item, index) in data.selected.keys()"
      >
        <span class="font-bold">No.{{ index + 1 }}</span>
        <span>{{ selList.find(p => p.id === item).name }}</span>
        <span class="flex gap-2px">
          <SvgIcon
            v-for="value in 5 - index"
            name="x"
            class="w-16px h-16px fill-yellow-400"
          ></SvgIcon>
        </span>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex gap-15px">
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
  </div>
</template>

<script lang="ts" setup>
import { Button, message } from 'ant-design-vue'
import { onMounted, reactive, watch } from 'vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
const props = withDefaults(
  defineProps<{
    selected?: Array<any>
  }>(),
  {}
)
const count = 3
const selList = [
  { id: 1, name: '控制体重' },
  { id: 2, name: '促进身高' },
  { id: 3, name: '团队合作意识' },
  { id: 4, name: '优化体资体态' },
  { id: 5, name: '预防近视' },
  { id: 6, name: '增强身体素质' },
  { id: 7, name: '培养运动习惯' },
  { id: 8, name: '提高体育达标成绩' },
  { id: 9, name: '建立自信心' },
]

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
  (event: 'onCancel'): void
  (event: 'onOk', value: Map<number, any>): void
}>()
const data = reactive({
  selected: new Map<number, any>(),
})
function cancel() {
  emits('onCancel')
}
function onOk() {
  emits('onOk', data.selected)
}
function onSelect(item: any) {
  if (data.selected.has(item.id)) {
    data.selected.delete(item.id)
  } else {
    if (data.selected.size >= 3) {
      message.warning('最多可选 3 项锻炼目标.')
      return false
    }
    data.selected.set(item.id, item)
  }
}
</script>
