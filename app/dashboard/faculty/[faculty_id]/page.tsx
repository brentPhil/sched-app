import getSchedFaculty from "@/app/get/getSchedByFaculty"
import Data_table from "../../components/table/data-table"
import { UUID } from "crypto"
import NewSched from "../../calendar/modal/NewSched"
import getSub from "@/app/get/getSub"
import getSec from "@/app/get/getSec"
import getcCRS from "@/app/get/getCRS"
import getFaculty from "@/app/get/getFaculty"
import getRooms from "@/app/get/getRooms"
import getSchedClient from "@/app/get/getSchedClient"
import ViewSchedModal from "../../calendar/modal/ViewSchedModal"

interface IParams {
  faculty_id?: UUID
}

export default async function page({ params }: { params: IParams }) {
  const data = await getSchedFaculty({ params })
  const sub = await getSub()
  const sec = await getSec()
  const course = await getcCRS()
  const faculty = await getFaculty()
  const rooms = await getRooms()
  return (
    <div className="p-5">
      <ViewSchedModal />
      <NewSched
        id={params.faculty_id}
        faculty={faculty}
        sec={sec}
        sub={sub}
        course={course}
        rooms={rooms}
      />
      <Data_table sched={data} />
    </div>
  )
}
