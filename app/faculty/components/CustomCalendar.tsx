"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Sched, Schedule } from "@/types/types"
import { useViewSched } from "@/app/hooks/useSchedModal"
import { useCallback, useEffect, useState } from "react"

const CustomCalendar = ({ sched }: { sched: any }) => {
  const [events, setEvents] = useState([])

  const { viewSched } = useViewSched()

  const vSched = (e: any) => {
    return viewSched(e.event.id)
  }

  const updateSchedData = useCallback(() => {
    const updatedSched = sched
      .map((item: Schedule) => {
        return {
          title: item.subjects.subject,
          id: item.id,
          date: item.date,
          daysOfWeek: `${item.daysOfWeek}`.split(",").map(Number),
          startTime: item.time_from,
          endTime: item.time_to,
          color: "#ff6e00",
        }
      })
      .filter((item: Sched) => item !== undefined)

    setEvents(updatedSched)
  }, [sched])

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
      plugins={[timeGridPlugin]}
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
