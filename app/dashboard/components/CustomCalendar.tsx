"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

const CustomCalendar = () => {
  return (
 
        <FullCalendar
          headerToolbar={{
            right: "prev,next today dayGridMonth",
            left: "title",
          }}
          plugins={[dayGridPlugin]}
          events={[
            {
              date: "2023-09-11",
              daysOfWeek: [1, 2, 4, 5, 7,],
              startTime: "10.00",
              endTime: "11.59",
            },
            { title: "event 2", date: "2023-09-11" },
          ]}
          navLinks
          selectable
          nowIndicator
          editable
          dayMaxEvents
        />

  )
}

export default CustomCalendar
