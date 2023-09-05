import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BiEdit } from "react-icons/bi"
import React from "react"
import { SubjectUpdateForm } from "../subjects/SubjectUpdateForm"
import { CourseUpdateForm } from "../courses/CourseUpdateForm"
import { RoomUpdateForm } from "../rooms/RoomUpdateForm"
import { FacultyUpdateForm } from "../faculty/FacultyUpdateForm"
interface EditDailogProps {
  id: number
  table: "courses" | "subjects" | "rooms" | "faculty"
}
const EditDailog: React.FC<EditDailogProps> = ({ id, table }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="!rounded-md text-primary hover:text-primary">
          <BiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your Subjects here.
          </DialogDescription>
        </DialogHeader>
        {table === "subjects" ? (
          <SubjectUpdateForm id={id} />
        ) : table === "courses" ? (
          <CourseUpdateForm id={id} />
        ) : table === "rooms" ? (
          <RoomUpdateForm id={id} />
        ) : (
          <FacultyUpdateForm id={id} />
        )}
      </DialogContent>
    </Dialog>
  )
}
export default EditDailog
