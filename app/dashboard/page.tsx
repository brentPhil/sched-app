import getcCRS from "../get/getCRS"
import getSub from "../get/getSub"
import CalHeader from "./Sched/calendarHeader"
import CustomCalendar from "./components/CustomCalendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import NewSched from "./components/modal/NewSched"
import getFaculty from "../get/getFaculty"
import getRooms from "../get/getRooms"
import getSched from "../get/getSched"

export default async function page() {
  const sub = await getSub()
  const course = await getcCRS()
  const faculty = await getFaculty()
  const rooms = await getRooms()
  const sched = await getSched()
  console.log(sched)

  return (
    <div className="p-5 grid grid-flow-col w-full h-full">
      <NewSched faculty={faculty} sub={sub} course={course} rooms={rooms} />
      <Card className="w-full h-full rounded">
        <CardHeader>
          <CalHeader />
        </CardHeader>
        <CardContent className="h-fit">
          <CustomCalendar sched={sched} />
        </CardContent>
      </Card>
    </div>
  )
}
