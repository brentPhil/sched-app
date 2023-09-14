"use client"
import React, { useEffect } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Selection,
  Textarea,
  Checkbox,
} from "@nextui-org/react"
import FormInput from "../../components/forms/NewSched"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNewSched } from "@/app/hooks/useSchedModal"
import { toast } from "@/components/ui/use-toast"
import { SchedformPayload, SchedformSchema } from "@/types/zodFormSchema"
import { Separator } from "@/components/ui/separator"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

const daysOfWeek = [
  { id: 1, day: "Sunday" },
  { id: 2, day: "Monday" },
  { id: 3, day: "Tuesday" },
  { id: 4, day: "Wednesday" },
  { id: 5, day: "Thursday" },
  { id: 6, day: "Friday" },
  { id: 7, day: "Saturday" },
]
const schedType = [
  { id: 1, type: "Class" },
  { id: 2, type: "Event" },
  { id: 3, type: "Meeting" },
  { id: 4, type: "Other" },
]

interface NewSchedProps {
  sub: any
  course: any
  faculty: any
  rooms: any
}

const NewSched: React.FC<NewSchedProps> = ({ sub, course, faculty, rooms }) => {
  const { isOpen, onOpenChange } = useNewSched()
  const [values, setValues] = React.useState<Selection>(new Set([]))

  const supabase = createClientComponentClient<Database>()

  const form = useForm<SchedformPayload>({
    resolver: zodResolver(SchedformSchema),
    defaultValues: {
      weeklySched: true,
    },
  })
  const isSelected = form.watch("weeklySched")

  async function onSubmit(values: SchedformPayload) {
    let daysOfWeek = ""
    let from_month = ""
    let to_month = ""

    if (values.weeklySched) {
      let daysOfWeek = values.daysOfWeek
      let from_month = values.from_month
      let to_month = values.to_month
    }

    let { data, error } = await supabase
      .from("schedules")
      .insert({
        faculty_id: values.faculty_id,
        room_id: values.room_id,
        subject_id: values.subject_id,
        course_id: values.course_id,
        sched_type: values.sched_type,
        daysOfWeek: daysOfWeek,
        from_month: from_month,
        to_month: to_month,
        time_from: values.time_from,
        time_to: values.time_to,
        sched_desc: values.sched_Desc,
      })
      .select()

    error &&
      toast({
        title: "error",
        description: error.message,
      })

    data &&
      toast({
        title: "Schedule has been added",
      })
  }

  useEffect(() => {
    if (!isSelected) {
      setValues(new Set([]))
      form.resetField("daysOfWeek")
      form.resetField("from_month")
      form.resetField("to_month")
    }
  }, [isSelected, form])

  return (
    <>
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1">
                    New Schedule
                  </ModalHeader>
                  <ModalBody className="space-y-4">
                    <FormInput
                      label="Assigned to"
                      form={form}
                      name="faculty_id"
                      data={faculty}
                      dataType="faculty"
                    />

                    <div className="grid grid-flow-col gap-4">
                      <FormInput
                        label="Room"
                        form={form}
                        name="room_id"
                        data={rooms}
                        dataType="room"
                      />
                      <FormInput
                        label="SubjectCode"
                        form={form}
                        name="subject_id"
                        data={sub}
                        dataType="sub"
                      />
                    </div>
                    <FormInput
                      label="Course"
                      form={form}
                      name="course_id"
                      data={course}
                      dataType="course"
                    />
                    <FormField
                      control={form.control}
                      name="sched_Desc"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              minRows={2}
                              label="Description"
                              placeholder="Schedule for"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 w-full">
                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name="sched_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  items={schedType}
                                  label="Schedule Type"
                                  defaultValue={field.value}
                                  onChange={field.onChange}>
                                  {(data: any) => (
                                    <SelectItem key={data.id} value={data.type}>
                                      {data.type}
                                    </SelectItem>
                                  )}
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full grid items-center">
                        <FormField
                          control={form.control}
                          name="weeklySched"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  defaultSelected
                                  size="sm">
                                  Weekly Schedule
                                </Checkbox>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {isSelected && (
                      <>
                        <FormField
                          control={form.control}
                          name="daysOfWeek"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  items={daysOfWeek}
                                  onSelectionChange={setValues}
                                  defaultValue={field.value}
                                  onChange={field.onChange}
                                  selectedKeys={values}
                                  label="Days Of Week"
                                  isMultiline={true}
                                  selectionMode="multiple"
                                  placeholder="Select a day"
                                  classNames={{
                                    trigger: "min-h-unit-12 py-2",
                                  }}
                                  renderValue={(items: any) => {
                                    return (
                                      <div className="flex flex-wrap gap-2 py-1">
                                        {items.map((item: any) => (
                                          <Chip radius="sm" key={item.key}>
                                            {item.data.day}
                                          </Chip>
                                        ))}
                                      </div>
                                    )
                                  }}>
                                  {(data) => (
                                    <SelectItem
                                      key={data.id}
                                      value={data.id}
                                      textValue={data.day}>
                                      {data.day}
                                    </SelectItem>
                                  )}
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-flow-col gap-4 items-center w-full">
                          <FormField
                            control={form.control}
                            name="from_month"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-full"
                                    type="month"
                                    label="Start Month"
                                    placeholder=" "
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="to_month"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-full"
                                    type="month"
                                    label="End Month"
                                    placeholder=" "
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}

                    <div className="grid grid-flow-col gap-4 items-center w-full">
                      <FormField
                        control={form.control}
                        name="time_from"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full"
                                type="time"
                                label="Start Time"
                                placeholder=" "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time_to"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full"
                                type="time"
                                label="End Time"
                                placeholder=" "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Action
                    </Button>
                  </ModalFooter>
                </form>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default NewSched
