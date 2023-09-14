"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
                <p>Modal body text goes here.</p>
                <p>
                  <strong>Data:</strong> {JSON.stringify(data)}
                </p>
                <p><strong>Loading:</strong> {loading}</p>
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
