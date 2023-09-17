"use client"

import { useNewSched, useViewSched } from "@/app/hooks/useSchedModal"
import { faculty } from "@/types/types"
import {
  Avatar,
  Button,
  Select,
  SelectItem,
  SelectedItems,
} from "@nextui-org/react"
import { PlusIcon } from "@radix-ui/react-icons"

interface CalHeaderProps {
  faculty: any
}

const CalHeader: React.FC<CalHeaderProps> = ({ faculty }) => {
  const { onOpen } = useNewSched()
  const { onSelectUser } = useViewSched()

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectUser(e.target.value)
  }

  const Faculty = ({ option }: { option: any }) => {
    return (
      <div className="flex gap-2 items-center">
        <Avatar
          alt={option.avatar_url}
          className="flex-shrink-0"
          size="sm"
          src={option.avatar_url}
        />
        <div className="flex flex-col">
          <span className="text-medium font-medium">
            {option.last_name + ", " + option.first_name +
              " " +
              option.middle_initial}
          </span>
          <span className="text-tiny text-default-400">{option.email}</span>
        </div>
      </div>
    )
  }

  return (
    <div className=" flex justify-between items-center">
      <Select
        items={faculty}
        onChange={handleSelectionChange}
        placeholder="Filter faculty member"
        size="sm"
        color="primary"
        variant='underlined'
        className="max-w-xs"
        classNames={{
          trigger: "min-h-unit-12",
          listboxWrapper: "max-h-[200px]",
        }}
        renderValue={(items: SelectedItems<faculty>) => {
          return items?.map((option: any) => (
            <Faculty option={option.data} key={option.key} />
          ))
        }}>
        {(data: any) => (
          <SelectItem key={data.id} value={data.id} textValue={data.username}>
            <Faculty option={data} />
          </SelectItem>
        )}
      </Select>
      <Button
        endContent={<PlusIcon />}
        variant="solid"
        onPress={onOpen}
        className="bg-primary">
        New Schedule
      </Button>
    </div>
  )
}

export default CalHeader
