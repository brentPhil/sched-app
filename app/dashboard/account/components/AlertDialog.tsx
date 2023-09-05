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
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PiTrashFill } from "react-icons/pi"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface AlertDialogDemoProps {
  id: number
  description?: string
  table: string
  subject: string | null
}

const DeleteAlert: React.FC<AlertDialogDemoProps> = ({
  description,
  subject,
  table,
  id,
}) => {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
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
      setLoading(false)
    }
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="!rounded-md text-red-500 hover:text-red-500">
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
          ) : (
            <PiTrashFill size={20} />
          )}
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
          <AlertDialogAction onClick={deleteSubject}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
