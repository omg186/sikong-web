<template>
  <div
    class="p-30px pt-26px mb-30px"
    s:border="1px solid [#E8E8E8] rounded-10px"
  >
    <div>
      <!-- timeline -->
      <div class="">
        <TimeLineTitle contents="2022.3.2"></TimeLineTitle>
        <TimeLineItem title="测评申请">
          <p class="mb-0 flex flex-col gap-y-8px pb-20px" s:text="[#6C766E]">
            <span> 3.18 15:25 李浩 申请《国民体质测定标准测评(幼儿版)》</span>
          </p>
        </TimeLineItem>
        <TimeLineTitle contents="2022.3.18"> </TimeLineTitle>
        <TimeLineItem title="跟进记录">
          <p class="mb-0 flex flex-col gap-y-8px pb-19px" s:text="[#6C766E]">
            <span>3.22 15:25 李浩 发表了跟进记录</span>
          </p>
          <div
            class="col-span-2 bg-[#FBFCFB] py-15px px-20px text-[#9E9E9E] mb-25px"
          >
            跟会员沟通了，介绍了产品，会员目前主要担心的还是效果问题，约了时间给孩子做一个测试，还需要考虑一下，加了微信，一会将公司的测试报告发给他，再跟会员约时间沟通
          </div>
        </TimeLineItem>
        <TimeLineTitle contents="2022.3.16"> </TimeLineTitle>
        <TimeLineItem title="修改个人资料">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:23 李浩 修改客户资料</span>
            <span> 客户生日:<span class="text-primary">2017.3.25</span></span>
          </p>
        </TimeLineItem>
        <TimeLineItem title="修改客户成熟度">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:13 李浩 修改客户成熟度</span>
            <span>
              客户成熟度变更为:<span class="text-primary">意向客户 </span>
            </span>
          </p>
        </TimeLineItem>
        <TimeLineItem title="跟进记录">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:13 李浩 发表了跟进记录</span>
          </p>
          <div
            class="col-span-2 bg-[#FBFCFB] py-15px px-20px text-[#9E9E9E] mb-25px"
          >
            与客户母亲沟通的不错，了解到孩子更多的情况，例如年龄、家庭住址等信息，计划这两天准备一下公司资料，介绍一下我们的产品和服务，客户的意向还是比较明确的
          </div>
        </TimeLineItem>

        <TimeLineTitle contents="2022.3.14"> </TimeLineTitle>
        <TimeLineItem title="修改客户成熟度">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:13 李浩 修改客户成熟度</span>
            <span>
              客户成熟度变更为:<span class="text-primary">有效新客户 </span>
            </span>
          </p>
        </TimeLineItem>
        <TimeLineItem title="跟进记录">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:13 李浩 发表了跟进记录</span>
          </p>
          <div
            class="col-span-2 bg-[#FBFCFB] py-15px px-20px text-[#9E9E9E] mb-25px"
          >
            客户留的是母亲电话，现在正忙，约了明天上午10点的时间，初步介绍了一下产品和服务。
          </div>
        </TimeLineItem>
        <TimeLineItem title="客户流转">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:23 张玲燕 分配客户</span>
            <span>
              客户跟进人变更为:<span class="text-primary">李浩 </span>
            </span>
          </p>
        </TimeLineItem>
        <TimeLineTitle contents="2022.3.12"> </TimeLineTitle>
        <TimeLineItem title="创建客户">
          <p class="mb-0 flex flex-col gap-y-8px pb-25px" s:text="[#6C766E]">
            <span> 3.16 17:23 蓉蓉 通过 市场活动 创建客户</span>
          </p>
          <div class="col-start-2 grid grid-cols-1 gap-y-10px mb-25px">
            <span>
              添加客户 姓名:<span class="text-primary">李睿曦 </span>
            </span>
            <span> 添加客户 性别:<span class="text-primary">男 </span> </span>
            <span>
              添加客户 联系人:<span class="text-primary">包女士（母亲） </span>
            </span>
            <span>
              添加客户 联系方式:<span class="text-primary">
                手机18611345279
              </span>
            </span>
          </div>
        </TimeLineItem>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import TimeLineItem from '@/components/TimeLine/TimeLineItem.vue'
import TimeLineTitle from '@/components/TimeLine/TimeLineTitle.vue'
</script>
