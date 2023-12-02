"use client";
import React, { useState, useEffect } from "react";
import { RegistrationInfo } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { userRegistration } from "@/lib/clientAction";
import { isAuthenticated } from "@/lib/authenticate";
import { removeErrMsg } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
const Registration = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<RegistrationInfo>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    errorMsg: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInfo((prev: RegistrationInfo) => {
      return {
        ...prev,
        errorMsg: "",
        [event.target.name]: event.target.value,
      };
    });
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(removeErrMsg());
    const res = await userRegistration(userInfo);
    setUserInfo((prev: RegistrationInfo) => {
      return {
        ...prev,
        ...res,
      };
    });
    if (res.errorMsg === "") {
      router.push("/");
    }
  }

  useEffect(function () {
    dispatch(removeErrMsg());
    const auth = isAuthenticated();
    if (auth) {
      router.push("/");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 justify-center w-1/2 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        <h1 className="text-lg text-black text-center">User Registration</h1>
        <input
          value={userInfo.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Name"
          className="w-full px-2 py-3 text-black text-base border  shadow-none outline-none  "
        />

        <input
          value={userInfo.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-2 py-3 text-black text-base border  shadow-none outline-none  "
        />
        <input
          value={userInfo.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-2 py-3 text-black text-base border  shadow-none outline-none  "
        />
        <input
          value={userInfo.passwordConfirm}
          onChange={handleChange}
          name="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          className="w-full px-2 py-3 text-black text-base border  shadow-none outline-none  "
        />
        <p>{userInfo.errorMsg !== "" ? userInfo.errorMsg : ""} </p>

        <input
          type="submit"
          value="Registration"
          className="text-base font-[500] text-[#1F2B6C] uppercase  hover:text-[#2f3d8f] cursor-pointer border rounded-full px-2 py-3 w-[25%] mx-auto"
        />
      </form>
    </div>
  );
};

export default Registration;
