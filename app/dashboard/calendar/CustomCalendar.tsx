"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Sched } from "@/types/types"
import { useViewSched } from "@/app/hooks/useSchedModal"

const CustomCalendar = ({ sched }: { sched: any }) => {
  const { viewSched } = useViewSched()

  const vSched = (e: any) => {
    return viewSched(e.event.id)
  }

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
      eventClick={vSched}
      plugins={[dayGridPlugin]}
      events={sched.map((item: Sched) => {
        const daysOfWeek = `${item.daysOfWeek}`.split(",").map(Number)

        return {
          id: item.id,
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
