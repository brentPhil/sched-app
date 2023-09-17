"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiTrashFill } from "react-icons/pi"
import { Button } from "@nextui-org/react"
import { useViewSched } from "@/app/hooks/useSchedModal"

interface AlertDialogDemoProps {
  id: number | undefined
  description?: string
  table: string
  title?: string
  subject: string | null
}

const DeleteAlert: React.FC<AlertDialogDemoProps> = ({
  description,
  subject,
  title,
  table,
  id,
}) => {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const { onClose } = useViewSched()
  const router = useRouter()

  const deleteSubject = async () => {
    setLoading(true)
    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) {
      toast({ title: "delete unsuccessfull", description: error.message })
      setLoading(false)
    } else {
      toast({
        title: "Subject has been deleted",
      })
      onClose()
      setLoading(false)
    }
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          color="danger"
          isIconOnly={!title}
          isLoading={loading}
          endContent={<PiTrashFill size={20} />}
          variant="flat">
          {title}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {description ? (
              description
            ) : (
              <>
                This action cannot be undone. This will permanently delete
                <Badge variant="outline" className="rounded-sm capitalize">
                  {subject}
                </Badge>
                from our servers
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={deleteSubject}
            as={AlertDialogAction}
            color="danger"
            endContent={<PiTrashFill size={20} />}
            variant="flat">
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
