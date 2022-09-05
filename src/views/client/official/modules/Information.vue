<template>
  <div
    class="p-30px pt-0px mb-30px"
    s:border="1px solid [#E8E8E8] rounded-10px"
  >
    <div class="grid grid-rows-1 gap-y-10px">
      <p class="text-sm pt-20px">学员基本信息</p>
      <div class="flex gap-x-60px">
        <TextItem title="姓名" contents="李睿曦" />
        <TextItem title="昵称" contents="Ricky" />
        <TextItem title="性别" contents="男" />
        <TextItem title="生日" contents="20017.3.25" />
      </div>

      <TextItem title="住址" contents="北京市朝阳区安贞街道安华发展大厦" />
      <TextItem title="教育阶段" contents="小学（朝阳区碑坊小学·二年级三班）" />
      <TextItem title="学校名称" contents="伊顿国际幼儿园" />
      <p class="text-sm pt-10px">联系人基本信息</p>
      <div class="flex gap-x-60px">
        <TextItem title="称呼" contents="包女士" />
        <TextItem title="与学员关系" contents="母子" />
        <TextItem title="联系方式" contents="18612317980" />
      </div>
      <p class="text-sm pt-10px">市场和运营信息</p>
      <TextItem title="客户来源" contents="上门咨询" />
      <TextItem title="顾问or教练" contents="张玲燕（猫猫）" />
      <!-- 客户状态：待开发客户 -->
      <TextItem title="客户状态" contents="待开发客户" />
      <!-- 运动发展的相关信息 -->
      <p class="text-sm pt-10px">运动发展的相关信息</p>

      <TextItem title="锻炼的目标" contents="" />
      <div class="flex gap-10px">
        <!-- 增强身体素质 -->
        <Tag contents="增强身体素质" />
        <!-- 建立自信心 -->
        <Tag contents="建立自信心" />
      </div>
      <TextItem title="性格特征" contents="" />
      <div class="flex gap-10px">
        <!-- 依赖型 -->
        <Tag contents="依赖型" />
        <!-- 表现型 -->
        <Tag contents="表现型" />
      </div>
      <TextItem title="当前的运动强度" contents="" />
      <div class="grid grid-cols-3 gap-32px">
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#2EE094] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(46, 224, 148, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">低等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色基本没变化;没汗或微出汗;能说完整句子
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>同家人散步; 收拾玩具; 遛狗; 给宠物洗澡; 户外玩耍</p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>运动频度：</span><span>3天/周</span>
            </p>
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>时间长度：</span><span>60分钟-90分钟</span>
            </p>
          </div>
        </div>
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#F3AB51] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(243, 171, 81, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">中等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色微红;满头汗;能说出简短的句子
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>
                骑车\跑步等有氧运动; 力量练习; 拉伸练习; 跳绳; 徒步;
                登山等休闲体育运动
              </p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>运动频度：</span><span>3天/周</span>
            </p>
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>时间长度：</span><span>30分钟以内</span>
            </p>
          </div>
        </div>
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#FF7C7C] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(255, 124, 124, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">高等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色红,甚至发紫;满头汗;只能说简单的词语
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>篮球\足球等比较激烈的运动和游戏; 和正式的训练</p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>运动频度：</span><span>3天/周</span>
            </p>
            <p class="text-xs mb-0 text-[#1F311F]">
              <span>时间长度：</span><span>30分钟以内</span>
            </p>
          </div>
        </div>
      </div>

      <TextItem title="有无喜欢的运动项目" contents="" />
      <div class="flex gap-10px">
        <!-- 网球 -->
        <Tag contents="网球" />
        <!-- 游泳 -->
        <Tag contents="游泳" />
        <!-- Tag 徒步 -->
        <Tag contents="徒步" />

        <!-- 登山 -->
        <Tag contents="登山" />
        <Tag contents="骑车" />
      </div>

      <TextItem title="父母运动习惯" contents="无" />
      <!-- 有无先天或遗传病史： -->
      <TextItem title="有无先天或遗传病史" contents="无" />
      <!-- 有无运动损伤或手术：无 -->
      <TextItem title="有无运动损伤或手术" contents="无" />
      <!-- 运动中惯用手：右手 -->
      <TextItem title="运动中惯用手" contents="右手" />
      <!-- 运动中惯用脚：左手 -->
      <TextItem title="运动中惯用脚" contents="左手" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextItem from '@/components/TextItem.vue'
import Tag from '@/components/Tag.vue'
</script>
