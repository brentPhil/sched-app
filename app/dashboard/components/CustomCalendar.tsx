"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Sched } from "@/types/types"

const CustomCalendar = ({ sched }: { sched: any }) => {

  return (
    <FullCalendar
      headerToolbar={{
        right: "prev,next today dayGridMonth",
        left: "title",
      }}

      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: "short",
        hour12: true,
      }}

      plugins={[dayGridPlugin]}
      events={sched.map((item: Sched) => {
        const daysOfWeek = `${item.daysOfWeek}`.split(",").map(Number)

        return {
          date: "2023-09-11",
          daysOfWeek: daysOfWeek,
          startTime: item.time_from,
          endTime: item.time_to,
        }
      })}
      navLinks
      selectable
      nowIndicator
      editable
      dayMaxEvents
    />
  )
}

export default CustomCalendar
