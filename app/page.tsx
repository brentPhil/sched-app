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
