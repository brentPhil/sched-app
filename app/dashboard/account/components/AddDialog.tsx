import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BsDatabaseAdd } from "react-icons/bs"
import React from "react"
import { CourseForm } from "../courses/Course-Form"
import { SubjectForm } from "../subjects/Subject-Form"
import { RoomForm } from "../rooms/Room-Form"
interface AddDailogProps {
  table: "Course" | "Subject" | "Room"
}
const AddDailog: React.FC<AddDailogProps> = ({ table }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          className="!rounded-md w-fit text-primary hover:text-primary">
          <BsDatabaseAdd size={20} className="mr-2" /> Add {table}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add profile</DialogTitle>
          <DialogDescription>
            Make changes to your Subjects here.
          </DialogDescription>
        </DialogHeader>
        {table === "Course" ? (
          <CourseForm />
        ) : table === "Subject" ? (
          <SubjectForm />
        ) : (
          table === "Room" && <RoomForm />
        )}
      </DialogContent>
    </Dialog>
  )
}
export default AddDailog
