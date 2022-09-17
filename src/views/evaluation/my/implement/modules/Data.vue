<template>
  <div>
    <div class="grid grid-cols-[150px,auto]">
      <div class="flex flex-col gap-y-20px pt-10px pb-30px bg-[#FBFCFB]">
        <div class="px-10px">
          <p>已完成(2/8)</p>
          <Input
            key="2"
            class="w-full box-border rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
            placeholder="记录单编号"
          >
            <template #prefix>
              <ImgIcon
                width="18px"
                class="w-[18px] h-20px"
                :src="'serach.png'"
                hover-src="serach-hover.png"
              >
              </ImgIcon>
            </template>
          </Input>
        </div>
        <div class="flex flex-col">
          <div
            v-for="(person, index) in personData"
            :key="index"
            class="flex gap-x-15px items-center justify-center cursor-pointer min-h-50px"
            :class="{ 'bg-[#E5FFF2]': index === selIndex }"
            @click="onChangeIndex(index)"
          >
            <img
              src="@/assets/images/avatar-boy.png"
              class="w-30px h-30px rounded-full"
              s:border="2px solid white"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span>李睿曦</span>
            <span class="min-w-20px">
              <SvgIcon
                v-if="person === 'waring'"
                name="waring"
                class="w-3px h-11px fill-[#E02B51]"
              ></SvgIcon>
              <SvgIcon
                v-else-if="person === 'success'"
                name="success"
                class="w-12px h-10px fill-primary"
              ></SvgIcon>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div
          class="flex justify-between py-15px px-20px"
          s:border="1px solid [#F9F9F9]"
        >
          <div class="flex items-center gap-x-12px">
            <img
              src="@/assets/images/avatar-boy.png"
              class="w-30px h-30px rounded-full"
              s:border="2px solid white"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span>李睿曦</span>
          </div>
          <div class="flex items-center">
            <RadioGroup v-model:value="status">
              <Radio :value="0">正常</Radio>
              <Radio :value="1">缺席</Radio>
              <Radio :value="2">数据丢失</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="flex flex-col gap-y-10px p-15px">
          <div class="grid grid-cols-6 gap-x-20px font-bold" s:text=" center">
            <span>测评项目名称</span>
            <span>测评状态</span>
            <span>测试一数据</span>
            <span>测试二数据</span>
            <span>测试结果数据</span>
            <span>测试等级</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>体重</span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>kg</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>身高</span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>身高标准体重</span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <InputNumber
                class="w-full"
                type="text"
                :controls="false"
                :disabled="disabled"
              >
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>双脚连续跳</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-[#62A1FF]">良好</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>坐位体前屈</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>10米折返跑</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>走平衡木</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>s</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-[#F3AB51]">合格</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>立定跳远</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>cm</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-primary">优秀</span>
            <span v-else>-</span>
          </div>
          <div
            class="grid grid-cols-6 gap-x-20px items-center"
            s:text=" center"
          >
            <span>网球掷远</span>
            <span>
              <Checkbox :disabled="disabled">无法测试</Checkbox>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>m</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>m</span>
                </template>
              </InputNumber>
            </span>
            <span>
              <InputNumber type="text" :controls="false" :disabled="disabled">
                <template #addonAfter>
                  <span>m</span>
                </template>
              </InputNumber>
            </span>
            <span v-if="!disabled" class="text-[#62A1FF]">良好</span>
            <span v-else>-</span>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="flex gap-15px justify-end pr-40px pt-20px">
          <Button class="btn cancel h-40px w-90px"> 取消 </Button>

          <Button
            class="rounded-40px h-40px w-90px bg-primary text-white"
            s:border="1px solid [#C7F7E3]"
            type="primary"
            @click="visibleConfirm = true"
          >
            提交
          </Button>
        </div>
      </div>
    </div>
    <Modal v-model:visible="visibleConfirm" title="已完成(8/8)" :footer="null">
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <p class="pt-20px font-bold text-sm">
        本次受试者的测评数据已经回填完毕，点击“确定”，系统将
        自动设置本次测评状态为完成，并生成报告
      </p>
      <div s:text="xs" class="flex gap-x-10px">
        <p><span>李睿曦</span><span class="text-[#F4274E]">（缺席）</span></p>
        <p>
          <span>李睿曦</span><span class="text-[#F4274E]">（数据丢失）</span>
        </p>
      </div>
      <div class="flex gap-15px justify-start pt-20px">
        <Button
          class="btn cancel h-40px w-90px"
          @click="visibleConfirm = false"
        >
          取消
        </Button>

        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="visibleConfirm = false"
        >
          提交
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import {
  Input,
  InputNumber,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
  Modal,
} from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { computed, ref, unref } from 'vue'
import ImgIcon from '@/components/ImgIcon.vue'

const personData: Array<'waring' | 'success' | ''> = [
  'success',
  'success',
  'success',
  'waring',
  'success',
  '',
  '',
  '',
  '',
  '',
]
const visibleConfirm = ref(false)
const selIndex = ref(0)
const status = ref(0)
const disabled = computed(() => {
  return unref(status) !== 0
})
function onChangeIndex(index: number) {
  selIndex.value = index
}
</script>
