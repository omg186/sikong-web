import { Dayjs } from 'dayjs'
import { PropType } from 'vue'

export interface ICalendarProps {
  /**
   * 时间字符串
   */
  date: string
  /**
   * 阴历日期Day
   * */
  lunar: string
  /**
   * 节日
   */
  festivals?: string[]
  isCurrentMonth: boolean
  /**
   * 被调整的日期
   */
  adjustData?: Adjust
  /**
   * 调整说明
   */
  adjustDesc?: Adjust
  /**
   * 是否是周日
   * */
  isSunday: boolean
  /**
   * 是否是周六
   */
  isSaturday: boolean
  /**
   * 是否选中
   */
  isSelected: boolean
  /**
   * 是否默认选中日期
   */
  isSelectItem: boolean
}
export interface Adjust {
  key?: string
  type?: string
  date?: string[][]
  remark: string
}
export type ICalendarAdjustProps = Map<string, Adjust>
export const CalendarDayItemProps = () => {
  return {
    day: {
      type: Object as PropType<ICalendarProps>,
      require: true,
    },
    isToDay: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  }
}

export const CalendarProps = () => {
  return {
    selectDate: {
      type: String as PropType<string>,
      default: '',
    },
    // 被调整的日期
    adjustDate: {
      type: Array as PropType<ICalendarAdjustProps[]>,
      default: () => [],
    },
  }
}
