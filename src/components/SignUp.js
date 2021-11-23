import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bg_layout, inputUI } from "./UI/styles";
import Button from "./UI/Button";

export default function SignUp() {
  const user = JSON?.parse(localStorage.getItem("USER_SESSION"));

  const navigate = useNavigate();

  const [doesExits, setDoesExits] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (data) => {
    const users = JSON?.parse(localStorage.getItem("users"));
    if (!users) {
      setDoesExits(false);
      let user = JSON.stringify([data]);
      localStorage.setItem("users", user);
      localStorage.setItem(
        "USER_SESSION",
        JSON.stringify({ ...data, token: true })
      );
      navigate("/");
    } else {
      const check = users.filter((item) => item.email === data.email);
      if (check[0]?.username) {
        setDoesExits(true);
      } else {
        setDoesExits(false);
        const grant = JSON.stringify([...users, data]);
        localStorage.setItem("users", grant);
        localStorage.setItem(
          "USER_SESSION",
          JSON.stringify({ ...data, token: true })
        );
        navigate("/");
      }
    }
  };

  return (
    <div className={bg_layout}>
      <div className="max-w-md w-full space-y-8 shadow-lg p-9 bg-white rounded">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 ">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div>
            <label htmlFor="username" className="sr-only">
              Enter username
            </label>
            <input
              {...register("username")}
              name="username"
              type="text"
              autoComplete="text"
              required
              className={inputUI}
              placeholder="Email username"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              {...register("email")}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputUI}
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register("password")}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputUI}
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have account? Signin
              </Link>
            </div>
          </div>

          <div>
            <Button title="Sign Up" />
          </div>
          {doesExits ? (
            <p className="text-red-800">This username Already exist</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
