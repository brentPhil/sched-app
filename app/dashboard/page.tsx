import getcCRS from "../get/getCRS"
import getSub from "../get/getSub"
import getFaculty from "../get/getFaculty"
import getRooms from "../get/getRooms"
import NewSched from "./calendar/modal/NewSched"
import getSec from "../get/getSec"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import getSchedClient from "@/app/get/getSchedClient"
import ViewSchedModal from "./calendar/modal/ViewSchedModal"
import CalHeader from "./calendar/Sched/calendarHeader"
import CustomCalendar from "./calendar/CustomCalendar"

export default async function page() {
  const sub = await getSub()
  const sec = await getSec()
  const course = await getcCRS()
  const faculty = await getFaculty()
  const rooms = await getRooms()
  const sched = await getSchedClient()

  return (
    <div className="p-5">
      <NewSched
        faculty={faculty}
        sec={sec}
        sub={sub}
        course={course}
        rooms={rooms}
      />

      <ViewSchedModal />
      <Card className="w-full h-full rounded border-none shadow-none">
        <CardHeader>
          <CalHeader faculty={faculty} />
        </CardHeader>
        <CardContent className="h-fit">
          <CustomCalendar sched={sched} />
        </CardContent>
      </Card>
    </div>
  )
}
