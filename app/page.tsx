"use client";
import CustomInput from "@/components/CustomInput";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth/auth_context";


export default function Home() {
  const {login} = useContext(AuthContext)

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const router = useRouter()

  // Method for handling login event
  const HandleLogin: React.FormEventHandler = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Get result from api call
    const result = await axios.post("http://localhost:8080/login", loginData);

    if (result.data["access_jwt"]) {
      login(result.data["access_jwt"]);
      router.push("/home")
    }
  }

  // Handle login input change
  const HandleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    setLoginData({
      ...loginData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <main className="h-screen flex">
      {/* Left Content */}
      <div className="flex-50">
        <div className="py-16 px-28 h-full flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl">Patient Manager</h1>

            <div className="mt-32 mb-24">
              <h1 className="font-bold text-5xl">Hi there!</h1>
              <br />
              <h1 className="text-gray-300 text-2xl">Get started with appointments</h1>
            </div>

            <div className="w-full">
              <form onSubmit={HandleLogin}>
                <CustomInput changeHandler={HandleChange} value={loginData.username} type="text" name="username" label="Username"/>
                <br />
                <CustomInput changeHandler={HandleChange} value={loginData.password} type="password" name="password" label="Password"/>
                <br />
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full" type="submit">Sign in</button>
              </form>
            </div>
          </div>

          <p className="text-sm text-gray-300">@patientmanager Copyright</p>
        </div>
      </div>

      {/* Picture */}
      <div className="flex-50 h-full">
        <img className="rounded-s-3xl h-full object-cover" src="https://github.com/adrianhajdin/healthcare/blob/main/public/assets/images/onboarding-img.png?raw=true" alt="Onboarding Picture" />
      </div>
    </main>
  );
}
