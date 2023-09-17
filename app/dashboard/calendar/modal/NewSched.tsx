"use client"
import React, { useEffect, useState } from "react"
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
  Code,
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
import { faculty } from "@/types/types"
import { useRouter } from "next/navigation"

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
  sec: any
  id?: any
}

const NewSched: React.FC<NewSchedProps> = ({
  sub,
  course,
  faculty,
  rooms,
  sec,
  id,
}) => {
  const { isOpen, onClose, onOpenChange } = useNewSched()
  const [values, setValues] = useState<Selection>(new Set([]))
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createClientComponentClient<Database>()

  const form = useForm<SchedformPayload>({
    resolver: zodResolver(SchedformSchema),
    defaultValues: {
      weeklySched: true,
      sched_type: "1",
    },
  })
  const isSelected = form.watch("weeklySched")

  async function onSubmit(values: SchedformPayload) {
    setLoading(true)
    let { data, error } = await supabase
      .from("schedules")
      .insert({
        faculty_id: values.faculty_id,
        room_id: values.room_id,
        subject_id: values.subject_id,
        course_id: values.course_id,
        sched_type: values.sched_type,
        daysOfWeek: `${values.weeklySched && values.daysOfWeek}`,
        from_month: `${values.weeklySched && values.from_month}`,
        to_month: `${values.weeklySched && values.to_month}`,
        time_from: values.time_from,
        time_to: values.time_to,
        date: `${!values.weeklySched && values.date}`,
      })
      .select()

    if (error) {
      setLoading(false)
      toast({
        title: "error",
        description: error.message,
      })
    }
    if (data) {
      setLoading(false)
      router.refresh()
      onClose()
      toast({
        title: "Schedule has been added",
      })
    }
  }

  useEffect(() => {
    id && form.setValue("faculty_id", id)
    if (!isSelected) {
      setValues(new Set([]))
      form.resetField("daysOfWeek")
      form.resetField("from_month")
      form.resetField("to_month")
    }
  }, [isSelected, id, form])

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
                      id={id}
                      data={faculty}
                      dataType="faculty"
                    />
                    <FormInput
                      label="Course"
                      form={form}
                      name="course_id"
                      data={course}
                      dataType="course"
                    />
                    <div className="grid grid-flow-col gap-4">
                      <FormInput
                        label="Section"
                        form={form}
                        name="section_id"
                        data={sec}
                        dataType="sec"
                      />
                      <FormInput
                        label="Room"
                        form={form}
                        name="room_id"
                        data={rooms}
                        dataType="room"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              items={sub}
                              label="SubjectCode"
                              defaultValue={field.value}
                              onChange={field.onChange}
                              classNames={{
                                label:
                                  "group-data-[filled=true]:-translate-y-4",
                                trigger: "min-h-unit-15",
                              }}
                              renderValue={(items) => {
                                return items?.map((option: any) => (
                                  <div key={option.key} className="space-x-2">
                                    <Code size="sm">{option.data.subject}</Code>
                                    <span>{option.data.description}</span>
                                  </div>
                                ))
                              }}>
                              {(data: any) => (
                                <SelectItem
                                  key={data.id}
                                  value={data.id}
                                  textValue={data.subject}>
                                  <div key={data.key} className="space-x-2">
                                    <Code size="sm">{data.subject}</Code>
                                    <span>{data.description}</span>
                                  </div>
                                </SelectItem>
                              )}
                            </Select>
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
                                  defaultSelectedKeys={["1"]}
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
                    {isSelected ? (
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
                                    defaultValue={field.value}
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
                                    defaultValue={field.value}
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
                    ) : (
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                defaultValue={field.value}
                                className="w-full"
                                type="date"
                                label="End Month"
                                placeholder=" "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <div className="grid grid-flow-col gap-4 items-center w-full">
                      <FormField
                        control={form.control}
                        name="time_from"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                defaultValue={field.value}
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
                                defaultValue={field.value}
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
                    <Button isLoading={loading} color="primary" type="submit">
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
