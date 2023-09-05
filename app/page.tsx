import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from './auth-form'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { LoginForm } from './LoginForm'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-full h-full bg-slate-500"></div>
      <div className=" w-2/4 p-5 grid items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}
