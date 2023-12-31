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
import { SectionForm } from "../sections/Section-Form"
interface AddDailogProps {
  table: "Course" | "Subject" | "Room" | 'Section'
}
const AddDailog: React.FC<AddDailogProps> = ({ table }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="!rounded-md w-fit text-primary hover:text-primary">
          <BsDatabaseAdd size={20} className="mr-2" /> Add {table}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add {table}</DialogTitle>
          <DialogDescription>Add a new {table}.</DialogDescription>
        </DialogHeader>
        {table === "Course" ? (
          <CourseForm />
        ) : table === "Subject" ? (
          <SubjectForm />
        ) : table === "Section" ? (
          <SectionForm />
        ) : (
          table === "Room" && <RoomForm />
        )}
      </DialogContent>
    </Dialog>
  )
}
export default AddDailog
