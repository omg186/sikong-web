<script lang="tsx">
import { CalendarDayItemProps, ICalendarProps } from './interface'
import dayjs from 'dayjs'
import { computed, defineComponent } from 'vue'
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
    const classes = computed(() => {
      const day = props.day
      const isToDay = props.isToDay
      return {
        'calendar-component-days-item w-40px h-40px relative flex flex-col justify-center items-center gap-y-2px text-[20px] cursor-pointer ':
          true,
        [`${pre}-current-month`]: day.isCurrentMonth,
        [`${pre}-active`]: day.isSelected,
        [`${pre}-to-day`]: isToDay,
        [`${pre}-active-item`]: day.isSelectItem,
      }
    })
    return () => {
      const { day } = props
      const html = (
        <div class={classes.value} onClick={() => onDayClick()}>
          {props.isToDay ? (
            <span class="text-sm font-bold"> 今日 </span>
          ) : (
            <span>{dayjs(day.date).format('D')}</span>
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

    &-adjust {
      border: 1px solid #2fe095;
      background-color: transparent;
    }
    &-active-item {
      > span {
        color: #2fe095;
      }
      border-radius: 23px;
      border: 3px solid #e5fff2;
      background-color: transparent;
    }
    &-active {
      > span {
        color: #fff;
      }
      background-color: #12f385;
      border-radius: 23px;
    }
    &-to-day {
      > span {
        color: #fff;
      }
      background: #ffd13c !important;
      border-radius: 23px !important;
    }
  }
}
</style>
