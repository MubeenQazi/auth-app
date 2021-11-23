import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Button from './UI/Button'

const bg_layout = 'min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-400 to-blue-500  h-screen'

export default function Login() {
    const [doesExits, setDoesExits] = React.useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const users = JSON?.parse(localStorage.getItem("users"))

        if (users) {
            const check = users.filter(item => item.email === data.email && item.password === data.password)

            if (check[0]?.username) {
                setDoesExits(true)
                localStorage.setItem("USER_SESSION", JSON.stringify({ ...check[0], token: true }))
                navigate('/')
            }
            else {
                setDoesExits(true)
            }
        }
    }

    return <div className={bg_layout}>
        <div className="max-w-md w-full space-y-8 shadow-lg p-9 bg-white rounded">
            <div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="remember" value="true" />

                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                        id="email-address"
                        type="email"
                        {...register("email")}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input {...register("password")} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                </div>

                <div className="flex items-center justify-center">

                    <div className="text-sm">
                        <Link to='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">
                            Don't have Account? Signup today
                        </Link>
                    </div>
                </div>

                <div>
                    <Button title="Sign In" />
                </div>
            </form>
            {doesExits ? <p className="text-red-800">Enter correct username or password</p> : null}
        </div>
    </div >
}