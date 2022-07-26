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
   * 是否是周日
   * */
  isSunday: boolean
  /**
   * 是否是周六
   */
  isSaturday: boolean
}
