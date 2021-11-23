import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";


const bg_layout = 'min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-400 to-blue-500  h-screen'

export default function SignUp() {
    const navigate = useNavigate()
    const [doesExits, setDoesExits] = React.useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const users = JSON?.parse(localStorage.getItem("users"))
        if (!users) {
            setDoesExits(false)
            let user = JSON.stringify([data]);
            localStorage.setItem("users", user)
            localStorage.setItem("USER_SESSION", JSON.stringify({ ...data, token: true }))
            navigate('/')
        }
        else {
            const check = users.filter(item => item.email === data.email)
            if (check[0]?.username) {
                setDoesExits(true)
            }
            else {
                setDoesExits(false)
                const grant = JSON.stringify([...users, data]);
                localStorage.setItem("users", grant)
                localStorage.setItem("USER_SESSION", JSON.stringify({ ...data, token: true }))
                navigate('/')
            }
        }
    };


    return <div className={bg_layout}>
        <div className="max-w-md w-full space-y-8 shadow-lg p-9 bg-white rounded">
            <div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Sign Up
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} >
                <input type="hidden" name="remember" value="true" />
                <div>
                    <label htmlFor="username" className="sr-only">Enter username</label>
                    <input {...register("username")} name="username" type="text" autoComplete="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email username" />
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input {...register("email")} name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input {...register("password")} name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                </div>

                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have account? Signin
                        </Link>
                    </div>
                </div>

                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                    </button>
                </div>
                {doesExits ? <p className="text-red-800">This username Already exist</p> : null}
            </form>
        </div>
    </div>
}