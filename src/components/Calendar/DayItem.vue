<script lang="tsx">
import { CalendarDayItemProps, ICalendarProps } from './interface'
import dayjs from 'dayjs'
import { computed, defineComponent } from 'vue'
import { Popover } from 'ant-design-vue'
const props = CalendarDayItemProps()

export default defineComponent({
  name: 'CalendarDayItem',
  inheritAttrs: false,
  props: props,
  emits: ['day-click'],
  setup(props, { emit }) {
    function onDayClick() {
      emit('day-click', props.day)
    }
    const pre = 'calendar-component-days-item'
    const isAdjustDesc = computed(() => {
      const day = props.day
      return day.adjustDesc?.type && day.adjustDesc?.remark != ''
    })
    const classes = computed(() => {
      const day = props.day
      const isToDay = props.isToDay
      return {
        'calendar-component-days-item w-58px h-58px relative flex flex-col justify-center items-center gap-y-10px text-[20px] cursor-pointer ':
          true,
        [`${pre}-saturday`]: day.isSaturday,
        [`${pre}--sunday`]: day.isSunday,
        [`${pre}-current-month`]: day.isCurrentMonth,
        [`${pre}-active`]: day.isSelected,
        [`${pre}-adjust`]: !!(day.adjustData?.type || day.adjustData?.type),
        [`${pre}-to-day`]: isToDay,
      }
    })
    const TooltipView = (children: JSX.Element) => {
      const { day } = props
      const { adjustDesc } = day
      if (isAdjustDesc.value) {
        return (
          <div>
            <Popover
              placement="bottom"
              trigger="hover"
              getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
              content={
                <div class="w-160px box-content p-15px text-xs">
                  {adjustDesc?.date?.map(p => (
                    <p class="font-medium">
                      {p.map(date => dayjs(date).format('hh:mma')).join('-')}
                    </p>
                  ))}
                  <p class="text-[#83867E]">{adjustDesc.remark}</p>
                </div>
              }
            >
              {children}
            </Popover>
          </div>
        )
      }
      return children
    }
    return () => {
      const { day } = props
      const html = TooltipView(
        <div class={classes.value} onClick={() => onDayClick()}>
          {day.adjustDesc && day.adjustDesc.type && (
            <span class="w-5px h-5px absolute left-8px top-10px bg-[#FFCD27] rounded-full"></span>
          )}
          {day.adjustData && day.adjustData.type && (
            <span class="w-5px h-5px absolute left-8px top-16px bg-[#B5A0FF] rounded-full"></span>
          )}
          <span>{dayjs(day.date).format('D')}</span>
          {day.festivals && day.festivals.length ? (
            <span s:text="[#C8C8C8]" class="text-xs">
              {day.festivals.join(',')}
            </span>
          ) : (
            <span s:text="[#C8C8C8]" class="text-xs">
              {day.lunar}
            </span>
          )}
        </div>
      )
      return html
    }
  },
})
</script>

<style lang="less" scoped>
.calendar-component-days {
  &-item {
    color: #83867e;
    border-radius: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    border: none;
    &-sunday,
    &-saturday {
      background: rgba(237, 239, 237, 0.5);
      opacity: 1;
    }
    &-current-month {
      color: #1f311f;
    }
    &-to-day {
      > span {
        color: #fff;
      }
      background: linear-gradient(90deg, #02fd7c 0%, #3bd89c 100%);
      box-shadow: 0px 8px 10px 0px rgba(5, 251, 126, 0.2);
    }
    &-adjust {
      border: 1px solid #2fe095;
      background-color: transparent;
    }

    &-active {
      background-color: #dbffed;
      border-color: transparent;
    }
  }
}
</style>
