import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bg_layout, inputUI } from "./UI/styles";
import Button from "./UI/Button";
import Input from "./UI/Input";

export default function SignUp() {
  const user = JSON?.parse(localStorage.getItem("USER_SESSION"));

  const navigate = useNavigate();

  const [doesExits, setDoesExits] = useState(false);

  const {
    register,
    handleSubmit,
    control,
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
          <Input
            control={control}
            rules={{ required: true }}
            name="username"
            type="text"
            placeholder={"Enter username"}
          />
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
