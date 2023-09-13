'use client'

import useNewSched from "@/app/hooks/useSchedModal"
import { CardTitle } from "@/components/ui/card"
import { Button, useDisclosure } from "@nextui-org/react"
import { PlusIcon } from "@radix-ui/react-icons"

interface CalHeaderProps {
}

const CalHeader: React.FC<CalHeaderProps> = ({ }) => {
  const { onOpen } = useNewSched()

  return (
    <div className=" flex justify-between items-center">
      <CardTitle className="text-xl">Schedules</CardTitle>
      <Button
        size="sm"
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
