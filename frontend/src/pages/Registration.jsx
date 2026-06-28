import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import sideimg from '../assets/main.jpg'
import axios from 'axios'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";

// C:\Users\aamis\Desktop\RealEstate\frontend\utils
const Registration = () => {
  let { serverURL } = useContext(AuthContext)
  let [showPassword, setShowPassword] = useState(false)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverURL + "/api/auth/register",
        {
          name, email, password
        }, { withCredentials: true })
      console.log(result)
    } catch (err) {
      console.log({ message: err.message })
    }
  }


  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(serverURL + '/api/auth/googlelogin', {
        name, email
      }, { withCredentials: true })
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <main className="md:min-h-screen flex items-center justify-center py-4 px-4 md:px-8">
      <div
        className="w-full max-w-5xl bg-white [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden dark:bg-neutral-800">
        <div className="grid items-center w-full gap-4 md:grid-cols-2">
          <div
            className="hidden md:block bg-black relative before:absolute before:inset-0 before:bg-black/40 overflow-hidden w-full h-full">
            <img src={sideimg} className="w-full h-full object-contain" alt="login image" />
            <div className="absolute inset-0 flex items-end justify-center">
              <div
                className="w-full bg-gradient-to-t from-black/50 via-black/50 to-transparent absolute bottom-0 p-6 max-md:hidden">
                <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
                <p className="text-slate-300 text-base font-medium mt-4 leading-relaxed">Join our Online Shopping Store
                  to discover new and  good quality products delivered to your doorstep.</p>
              </div>
            </div>
          </div>

          <div className="py-6 px-6 lg:px-8 max-md:-order-1">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-slate-900 text-3xl font-bold mb-10 dark:text-slate-50">
                Create Account
              </h1>

              <form className="space-y-6 ">
                <div>
                  <label htmlFor="userName"
                    className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">User Name</label>
                  <input type="text" id="userName" name="userName" placeholder="XXXXX_XXXX" required
                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                  <label htmlFor="email"
                    className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
                  <input type="email" id="email" name="email" placeholder="john@readymadeui.com" required
                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="relative">
                  <label htmlFor="password"
                    className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
                  <input type="password" id="password" name="password" placeholder="••••••••" required
                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" onChange={(e) => setPassword(e.target.value)} value={password} />
                  {!showPassword && <FaRegEyeSlash className="absolute top-10 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded text-2xl text-white" onClick={() => setShowPassword(prev => !prev)} />}
                  {showPassword && <FaRegEye className="absolute top-10 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded text-2xl text-white" onClick={() => setShowPassword(prev => !prev)} />}
                </div>

                <div className="flex items-start flex-wrap gap-2">
                  <label className="flex items-center group has-[input:checked]:text-slate-900">
                    <input id="remember" name="remember" type="checkbox" required className="sr-only" />

                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600 bg-white dark:bg-neutral-700 group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600"
                      aria-hidden="true">

                      <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                        fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 5l3 3 7-7" />
                      </svg>
                    </span>
                    <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                      Remember me
                    </span>
                  </label>

                  <a href="#"
                    className="ml-auto text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                    Forgot password?
                  </a>
                </div>
                <button type="submit" onClick={handleSignUp}
                  className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  Create Account</button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <hr className="w-full border-slate-300 dark:border-neutral-700" />
                <p className="text-sm text-slate-700 text-center dark:text-slate-300">or</p>
                <hr className="w-full border-slate-300 dark:border-neutral-700" />
              </div>

              <div>
                <button onClick={googleLogin}
                  className="w-full flex items-center justify-center gap-2.5 py-2 px-3.5 text-sm rounded-md font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-50 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px]" viewBox="0 0 512 512" aria-hidden="true">
                    <path fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00" />
                    <path fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58" />
                    <path fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52" />
                    <path fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6" />
                    <path fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48" />
                    <path fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132" />
                  </svg>
                  Sign in with Google
                </button>
              </div>

              <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Already have an account? <Link to="/login"
                className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" onClick={() => navigate("/login")}>Sign
                in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Registration