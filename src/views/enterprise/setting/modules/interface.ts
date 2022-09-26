import { UploadFile } from 'ant-design-vue'

export interface RoomDto {
  fileList?: UploadFile[]
  calendarTemplate?: Array<any>
  endTime?: string
  startTime?: string
  calendarName?: string
  roomName?: string
  // 所属校区
  schoolId?: string
  // 室内室外
  roomType?: number
  // 场地面积
  area?: number
  //有无立柱
  isPillar?: number
  // 场地层高
  floorHeight?: number
  //场地备注
  remark?: string
  // 教师/场地经营日历
  isCalendar?: number
}
