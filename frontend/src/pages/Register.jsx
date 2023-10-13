import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../component/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isLoading, isSuccess, isError, message, dispatch, navigate])

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = () => {
    if (password !== password2) {
      toast.error("Password do not match")
    } else {
      let userData = { name, email, password, password2 }

      if (userData) {
        dispatch(register(userData))
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-auto mx-auto h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={submitHandler}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={name}
                    onChange={(e) => inputHandler(e)}
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border focus:outline-none bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => inputHandler(e)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border focus:outline-none bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => inputHandler(e)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border focus:outline-none bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password2" className="block text-sm font-medium leading-6">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={(e) => inputHandler(e)}
                    autoComplete="confirm-password"
                    required
                    className="block w-full rounded-md border focus:outline-none bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-400">
              If you are a member?{' '}
              <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">
                Go to login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }


}
