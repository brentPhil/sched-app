"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@nextui-org/react"
import { useViewSched } from "@/app/hooks/useSchedModal"
import useGetSchedById from "@/app/get/getSchedById"

const ViewSchedModal = () => {
  const { isOpen, id, onOpenChange } = useViewSched()
  const { data, loading } = useGetSchedById(id)
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
              <ModalHeader className="flex flex-col gap-1">
                Schedule Details
              </ModalHeader>
              <ModalBody>
                <div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt='profile'
                        className="flex-shrink-0"
                        size="sm"
                        src={data?.users.avatar_url}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
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
