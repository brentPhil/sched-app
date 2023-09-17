"use client"

import React, { ChangeEvent, Key, useCallback, useMemo, useState } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  SelectItem,
  Select,
  useDisclosure,
} from "@nextui-org/react"

import { columns } from "./columns"
import { capitalize } from "./utils"
import { BsChevronDown, BsThreeDotsVertical } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { useNewSched, useViewSched } from "@/app/hooks/useSchedModal"
import { PiPlus } from "react-icons/pi"
import { Schedule } from "@/types/types"

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  cancelled: "danger",
  postponed: "warning",
}
interface SchedProps {
  id: number
  name: string | null
  course: string | null
  subject: string | null
  days: string | null
  room: string | null
  time: string | null
  email: string | null
  avatar: string | undefined
}

const INITIAL_VISIBLE_COLUMNS = ["name", "subject", "days", "room", "actions"]
interface Data_tableProps {
  sched: Schedule[]
}

const Data_table: React.FC<Data_tableProps> = ({ sched }) => {
  const { onOpen } = useNewSched()
  const [filterValue, setFilterValue] = useState("")
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  // const [statusFilter, setStatusFilter] = useState<Selection>("all")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  })
  const { viewSched } = useViewSched()

  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    const schedule: SchedProps[] = []

    sched?.forEach((item) => {
      const daysArray = item?.daysOfWeek?.split(",")!
      let convertedDays = []

      for (let i = 0; i < daysArray!.length; i++) {
        switch (parseInt(daysArray[i])) {
          case 1:
            convertedDays.push("Su")
            break
          case 2:
            convertedDays.push("Mo")
            break
          case 3:
            convertedDays.push("Tu")
            break
          case 4:
            convertedDays.push("We")
            break
          case 5:
            convertedDays.push("Th")
            break
          case 6:
            convertedDays.push("Fr")
            break
          case 7:
            convertedDays.push("Sa")
            break
          default:
            convertedDays.push("Invalid input")
        }
      }

      schedule.push({
        id: item.id,
        avatar: item.users.avatar_url,
        name: item.users.last_name + " " + item.users.first_name,
        course: item.courses.course,
        subject: item.subjects.subject,
        days: convertedDays.join(", ").replace(/,(?=[^,]*$)/, " and"),
        room: item.rooms.room,
        time: item.time_from + " - " + item.time_to,
        email: item.users.email,
      })
    })
    let filteredUsers = [...schedule]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((schedule) =>
        schedule?.name?.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== subjects.length
    // ) {
    //   filteredUsers = filteredUsers.filter(() =>
    //     Array.from(statusFilter).includes("")
    //   )
    // }

    return filteredUsers
  }, [filterValue, sched, hasSearchFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: SchedProps, b: SchedProps) => {
      const first = a[sortDescriptor.column as keyof SchedProps] as number
      const second = b[sortDescriptor.column as keyof SchedProps] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback(
    (schedule: SchedProps, columnKey: Key) => {
      const cellValue = schedule[columnKey as keyof SchedProps]

      switch (columnKey) {
        case "subject":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small truncate capitalize">
                {cellValue}
              </p>
              <p className="text-bold text-tiny line-clamp-1 capitalize text-default-400">
                {schedule.course}
              </p>
            </div>
          )
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: schedule.avatar }}
              description={schedule.email}
              name={cellValue}>
              {schedule.email}
            </User>
          )
        case "days":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small truncate capitalize">
                {cellValue}
              </p>
              <p className="text-bold text-tiny truncate text-default-400">
                {schedule.time}
              </p>
            </div>
          )
        case "room":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small truncate capitalize">
                {cellValue}
              </p>
            </div>
          )
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[""]}
              size="sm"
              variant="flat">
              {cellValue}
            </Chip>
          )
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <BsThreeDotsVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => viewSched(`${schedule.id}`)}>
                    View
                  </DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    [viewSched]
  )

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {/* <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<BiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          /> */}

          <User
            name={sched[0]?.users.last_name + " " + sched[0]?.users.first_name}
            description={sched[0]?.users.email}
            avatarProps={{
              src: `${sched[0]?.users.avatar_url}`,
            }}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BsChevronDown className="text-small" />}
                  variant="flat">
                  Subject
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}>
                {subjects.map((subject: Subjects) => (
                  <DropdownItem key={subject.id} className="capitalize">
                    {capitalize(subject.subject)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BsChevronDown className="text-small" />}
                  variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}>
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* //Add Button */}
            {/* {
              <Button
                startContent={<PiPlus />}
                onPress={onOpen}
                color="primary">
                Assign Schedule
              </Button>
            } */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {items.length} Subject
          </span>
          <Select
            label="Rows per page:"
            labelPlacement="outside-left"
            defaultSelectedKeys={["10"]}
            size="sm"
            className="outline-none truncate flex items-center text-sm w-44"
            onChange={onRowsPerPageChange}>
            <SelectItem key={5} value="5">
              5
            </SelectItem>
            <SelectItem key={10} value="10">
              10
            </SelectItem>
            <SelectItem key={15} value="15">
              15
            </SelectItem>
          </Select>
        </div>
      </div>
    )
  }, [
    // filterValue,
    sched,
    // onOpen,
    visibleColumns,
    // onSearchChange,
    onRowsPerPageChange,
    // onClear,
    items,
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}>
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    )
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ])

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "h-[65vh]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      selectionBehavior="replace"
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onRowAction={(key: any) => viewSched(key)}
      onSortChange={setSortDescriptor}>
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Data_table
