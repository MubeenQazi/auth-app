import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useController } from "react-hook-form";

import { bg_layout, inputUI } from "./UI/styles";
import Button from "./UI/Button";
import Input from "./UI/Input";

export default function Login() {
  const user = JSON?.parse(localStorage.getItem("USER_SESSION"));

  const [doesExits, setDoesExits] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const users = JSON?.parse(localStorage.getItem("users"));

    if (users) {
      const check = users.filter(
        (item) => item.email === data.email && item.password === data.password
      );

      if (check[0]?.username) {
        setDoesExits(true);
        localStorage.setItem(
          "USER_SESSION",
          JSON.stringify({ ...check[0], token: true })
        );
        navigate("/");
      } else {
        setDoesExits(true);
      }
    }
  };

  return (
    <div className={bg_layout}>
      <div className="max-w-md w-full space-y-8 shadow-lg p-9 bg-white rounded">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <Input
            control={control}
            name="email"
            rules={{ required: true }}
            type="email"
            placeholder={"Email address"}
          />

          <Input
            control={control}
            rules={{ required: true }}
            name="password"
            type="password"
            placeholder={"Password"}
          />

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have Account? Signup today
              </Link>
            </div>
          </div>

          <div>
            <Button title="Sign In" />
          </div>
        </form>
        {doesExits ? (
          <p className="text-red-800">Enter correct username or password</p>
        ) : null}
      </div>
    </div>
  );
}
