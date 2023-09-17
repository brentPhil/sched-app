"use client"

import { faculty } from "@/types/types"
import { Accordion, AccordionItem, Link, User } from "@nextui-org/react"
import { BsCardList } from "react-icons/bs"

export default function SchedCategory({ faculty }: { faculty: faculty[] }) {
  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Sched Category"
        startContent={<BsCardList size={20} />}
        title="Faculty">
        {faculty.map((faculty) => {
          return (
            <Link className="py-2" key={faculty.id} href={`/dashboard/faculty/${faculty.id}`} >
              <User
                name={faculty.username}
                description={faculty.email}
                avatarProps={{
                  src: `${faculty.avatar_url}`,
                }}
              />
            </Link>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}
