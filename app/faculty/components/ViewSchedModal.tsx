"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Skeleton,
  Code,
} from "@nextui-org/react"
import { useViewSched } from "@/app/hooks/useSchedModal"
import useGetSchedById from "@/app/get/getSchedById"
import { format, parse } from "date-fns"
import { BsDash } from "react-icons/bs"

const ViewSchedModal = () => {
  const { isOpen, id, onOpenChange } = useViewSched()
  const { data, loading } = useGetSchedById(id)

  const time_from = parse(`${data?.time_from}`, "HH:mm:ss", new Date())
  const time_to = parse(`${data?.time_to}`, "HH:mm:ss", new Date())
  const to_month = parse(`${data?.to_month}`, "yyyy-MM", new Date())
  const from_month = parse(`${data?.from_month}`, "yyyy-MM", new Date())
  const type = data?.sched_type

  return (
    <>
      <Modal
        backdrop="blur"
        isDismissable={false}
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
              <ModalHeader className="flex gap-1">
                <p>
                  {type === "1" ? "Class" : type === "2" ? "Event" : "Meeting"}
                </p>
                <p>Schedule Details</p>
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="space-y-3">
                    {loading ? (
                      <div className="max-w-[300px] w-full flex items-center gap-3">
                        <div>
                          <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <Skeleton className="h-4 w-3/5 rounded-md" />
                          <Skeleton className="h-4 w-4/5 rounded-md" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center py-2 px-3 bg-secondary w-fit rounded">
                        <Avatar
                          alt="profile"
                          className="flex-shrink-0"
                          size="sm"
                          src={data?.users.avatar_url}
                        />
                        <div className="flex flex-col">
                          <span className="text-small text-primary">
                            {data?.users.last_name +
                              ", " +
                              data?.users.first_name +
                              " " +
                              data?.users.middle_initial}
                          </span>
                          <span className="text-tiny text-default-400">
                            {data?.users.email}
                          </span>
                        </div>
                      </div>
                    )}
                    {loading ? (
                      <div className="max-w-[300px] w-full flex items-center gap-3">
                        <div>
                          <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <Skeleton className="h-4 w-3/5 rounded-md" />
                          <Skeleton className="h-4 w-4/5 rounded-md" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center py-2 px-3 bg-secondary w-fit rounded">
                        <Avatar
                          alt="profile"
                          className="flex-shrink-0"
                          size="sm"
                          src={data?.users.avatar_url}
                        />
                        <div className="flex flex-col">
                          <span className="text-small text-primary">
                            {data?.users.last_name +
                              ", " +
                              data?.users.first_name +
                              " " +
                              data?.users.middle_initial}
                          </span>
                          <span className="text-tiny text-default-400">
                            {data?.users.email}
                          </span>
                        </div>
                      </div>
                    )}
                    {loading ? (
                      <div className="w-full flex flex-col gap-3">
                        <Skeleton className="h-5 w-4/12 rounded-md" />
                        <Skeleton className="h-5 w-6/12 rounded-md" />
                        <Skeleton className="h-5 w-5/12 rounded-md" />
                        <Skeleton className="h-5 w-4/12 rounded-md" />
                        <Skeleton className="h-5 w-5/12 rounded-md" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex space-x-3">
                          <p>Course:</p> <p>{data?.courses.course}</p>
                        </div>
                        <div className="flex space-x-3">
                          <p>Subject:</p> <p>{data?.subjects.subject}</p>
                        </div>
                        <div className="flex space-x-3">
                          <p>Room:</p> <p>{data?.rooms.room}</p>
                        </div>
                        <div className="flex space-x-3">
                          <p>Units:</p> <p>{data?.subjects.units}</p>
                        </div>

                        {!data?.date ? (
                          <>
                            <div className="flex space-x-3">
                              <p>Duration:</p>
                              <p className="flex items-center gap-1">
                                {data && format(from_month, "MMMM yyyy")}{" "}
                                <BsDash />
                                {data && format(to_month, "MMMM yyyy")}
                              </p>
                            </div>
                            <div className="flex space-x-3 items-center">
                              <p>Time:</p>
                              <p className="flex items-center gap-1">
                                <Code>
                                  {data && format(time_from, "h:mm aa")}
                                </Code>
                                <BsDash />
                                <Code>
                                  {data && format(time_to, "h:mm aa")}
                                </Code>
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex space-x-3 items-center">
                            <p>Time:</p>
                            <p className="flex items-center gap-1">
                              <Code>{format(new Date(data?.date), "PPP")}</Code>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* <RadioGroup
                    label="Select your favorite city"
                    orientation="horizontal">
                    <Radio value="#def5e6"></Radio>
                    <Radio value="#def5e6"></Radio>
                    <Radio value="#def5e6"></Radio>
                    <Radio value="#feeed7"></Radio>
                  </RadioGroup> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ViewSchedModal
