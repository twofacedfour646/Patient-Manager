"use client";
import CustomInput from '@/components/CustomInput';
import React, { useState } from 'react';

function Register() {
    const [userRegisterInfo, setUserRegisterInfo] = useState({
        fullName: ""
    })

    const HandleUserRegisterInfoChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        setUserRegisterInfo({
            ...userRegisterInfo,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

  return (
    <main className="flex justify-between">
        <div className='py-16 px-28 flex-1'>
            <h1 className="font-bold text-3xl">Patient Manager</h1>
            
            <div className="mt-16">
              <h1 className="font-bold text-4xl mb-1">Welcome!</h1>
              <h1 className="text-gray-300 text-xl">Let us know more about yourself</h1>
            </div>

            <div className='mt-10'>
                <h1 className="font-bold text-4xl mb-3">Personal Information</h1>

                <CustomInput label='Full name' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>

                <br />

                <div className='flex flex-wrap'>
                    <div className='w-1/2 pe-2'>
                        <CustomInput label='Email' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>

                    <div className='w-1/2 ps-2'>
                        <CustomInput label='Phone number' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>
                </div>

                <br />

                <div className='flex flex-wrap'>
                    <div className='w-1/2 pe-2'>
                        <CustomInput label='Date of birth' name='fullName' type='calendar' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>

                    <div className='w-1/2 ps-2'>
                        <CustomInput label='Phone number' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>
                </div>

                <br />

                <div className='flex flex-wrap'>
                    <div className='w-1/2 pe-2'>
                        <CustomInput label='Address' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>

                    <div className='w-1/2 ps-2'>
                        <CustomInput label='Occupation' name='fullName' type='text' value={userRegisterInfo.fullName} changeHandler={HandleUserRegisterInfoChange}/>
                    </div>
                </div>
            </div>
        </div>

        <img className='h-screen w-1/3' src="https://github.com/adrianhajdin/healthcare/blob/main/public/assets/images/register-img.png?raw=true" alt="register" />
    </main>
  )
}

export default Register