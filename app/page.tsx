import AuthForm from './auth-form'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-full h-full bg-slate-500"></div>
      <div className=" w-2/4 p-5 grid items-center">
        <div className=' grid gap-3'>
          <h1 className="header text-xl text-center">Login</h1>
          <p className="text-sm text-center">
            Welcome back! Please enter your email and password to login.
          </p>
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
