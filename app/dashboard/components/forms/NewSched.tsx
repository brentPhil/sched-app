"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, Select, SelectItem } from "@nextui-org/react"
import { da } from "date-fns/locale"

const Faculty = ({ option }: { option: any }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        alt={option.optionname}
        className="flex-shrink-0"
        size="sm"
        src={option.avatar_url}
      />
      <div className="flex flex-col">
        <span className="text-small">
          {option.last_name +
            ", " +
            option.first_name +
            " " +
            option.middle_initial}
        </span>
        <span className="text-tiny text-default-400">{option.email}</span>
      </div>
    </div>
  )
}

interface FormInputProps {
  form: any
  name: string
  label: string
  description?: string
  data?: any
  dataType?: string
  id?: any
}

const FormInput: React.FC<FormInputProps> = ({
  form,
  name,
  label,
  description,
  data,
  id,
  dataType,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {dataType === "faculty" ? (
              <Select
                isDisabled={id}
                items={data}
                label="Assigned to"
                defaultValue={field.value}
                onChange={field.onChange}
                defaultSelectedKeys={[id]}
                placeholder="Select faculty member"
                classNames={{
                  trigger: "min-h-unit-16",
                  listboxWrapper: "max-h-[400px]",
                }}
                renderValue={(items) => {
                  return items?.map((option: any) => (
                    <Faculty option={option.data} key={option.key} />
                  ))
                }}>
                {(data: any) => (
                  <SelectItem
                    key={data.id}
                    value={data.id}
                    textValue={data.username}>
                    {dataType === "faculty" && <Faculty option={data} />}
                  </SelectItem>
                )}
              </Select>
            ) : (
              <Select
                size="sm"
                defaultValue={field.value}
                onChange={field.onChange}
                label={label}
                className="rounded">
                {data?.map((option: any) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className=" capitalize">
                    {dataType === "sub"
                      ? option.subject
                      : dataType === "course"
                      ? option.course
                      : dataType === "room"
                      ? option.room
                      : option.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </FormControl>
          {description && <FormDescription></FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormInput
