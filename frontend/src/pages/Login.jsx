import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../component/Spinner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
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
    if (!password) {
      toast.error("Please enter password")
    } else {
      let userData = { email, password }

      if (userData) {
        dispatch(login(userData))
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={() => submitHandler()}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => inputHandler(e)}
                    value={email}
                    autoComplete="email"
                    required
                    className="border block w-full rounded-md bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                    onChange={(e) => inputHandler(e)}
                    value={password}
                    autoComplete="current-password"
                    required
                    className="border block w-full rounded-md bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="text-white flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{' '}
              <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">
                Please create your account
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
}
