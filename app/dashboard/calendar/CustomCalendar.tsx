"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Sched, Schedule } from "@/types/types"
import { useViewSched } from "@/app/hooks/useSchedModal"
import { useCallback, useEffect, useState } from "react"

const CustomCalendar = ({ sched }: { sched: any }) => {
  const { userid } = useViewSched()

  const [events, setEvents] = useState([])

  const { viewSched } = useViewSched()

  const vSched = (e: any) => {
    return viewSched(e.event.id)
  }

  const updateSchedData = useCallback(() => {
    const updatedSched = sched
      .map((item: Schedule) => {
        if (item.faculty_id === userid) {
          return {
            title: item.subjects.subject,
            id: item.id,
            date: "2023-09-11",
            daysOfWeek: `${item.daysOfWeek}`.split(",").map(Number),
            startTime: item.time_from,
            endTime: item.time_to,
            color: "#ff6e00",
          }
        }
      })
      .filter((item: Sched) => item !== undefined)

    setEvents(updatedSched)
  }, [sched, userid])

  useEffect(() => {
    updateSchedData()
  }, [updateSchedData]) // Call when updateSchedData changes

  return (
    <FullCalendar
      headerToolbar={{
        right: "today timeGridWeek dayGridMonth prev,next",
        left: "title",
      }}
      eventClick={vSched}
      plugins={[dayGridPlugin, timeGridPlugin]}
      events={events}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: "short",
        hour12: true,
      }}
      navLinks
      selectable
      nowIndicator
      editable
      dayMaxEvents
    />
  )
}

export default CustomCalendar
