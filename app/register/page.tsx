"use client";
import CustomInput from '@/components/CustomInput';
import axios from 'axios';
import React, { useState } from 'react';

function Register() {
    const [userRegisterInfo, setUserRegisterInfo] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        sex: -1,
        address: "",
        occupation: "",
        emergencyContactName: "",
        emergencyContactPhoneNumber: "",
        primaryCarePhysician: "",
        insuranceProvider: "",
        insuranceNumber: "",
        allergies: "",
        currentMedications: "",
        familyMedicalHistory: "",
        pastMedicalHistory: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [registerLoading, setRegisterLoading] = useState(false);

    const HandleUserRegisterInfoChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        setUserRegisterInfo({
            ...userRegisterInfo,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const HandleRegisterSubmit: React.FormEventHandler = async (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        // Start loading circle
        setRegisterLoading(true);

        // Call register endpoint
        const res = axios.post("http://localhost:8080/register", userRegisterInfo);

        console.log(res);
    }

  return (
    <main className="flex justify-between">
        <form onSubmit={HandleRegisterSubmit} className='py-16 px-28 flex-1 h-screen overflow-auto no-scrollbar'>
            <div>
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
                            <CustomInput label='Email' name='email' type='text' value={userRegisterInfo.email} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <CustomInput label='Phone number' name='phoneNumber' type='text' value={userRegisterInfo.phoneNumber} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>
                    </div>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <CustomInput label='Date of birth' name='dateOfBirth' type='calendar' value={userRegisterInfo.dateOfBirth} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Sex</label>
                            
                            <div className='flex items-center space-x-3'>
                                <div className="flex h-16 flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input onChange={(e) => console.log(e)} id="male-radio" type="radio" value={0} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="male-radio" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                                </div>

                                <div className="flex h-16 flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input onChange={(e) => console.log(e)} id="female-radio" type="radio" value={1} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="female-radio" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                                </div>

                                <div className="flex h-16 flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input onChange={(e) => console.log(e)} id="other-radio" type="radio" value={2} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="other-radio" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <CustomInput label='Address' name='address' type='text' value={userRegisterInfo.address} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <CustomInput label='Occupation' name='occupation' type='text' value={userRegisterInfo.occupation} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>
                    </div>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <CustomInput label='Emergency Contact Name' name='emergencyContactName' type='text' value={userRegisterInfo.emergencyContactName} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <CustomInput label='Emergency Contact Phone Number' name='emergencyContactPhoneNumber' type='text' value={userRegisterInfo.emergencyContactPhoneNumber} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='mt-10'>
                    <h1 className="font-bold text-4xl mb-3">Medical Information</h1>

                    <CustomInput label='Primary care physician' name='primaryCarePhysician' type='text' value={userRegisterInfo.primaryCarePhysician} changeHandler={HandleUserRegisterInfoChange}/>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <CustomInput label='Insurance provider' name='insuranceProvider' type='text' value={userRegisterInfo.insuranceProvider} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <CustomInput label='Insurance number' name='insuranceNumber' type='text' value={userRegisterInfo.insuranceNumber} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>
                    </div>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Allergies (if any)</label>
                            <textarea value={userRegisterInfo.allergies} onChange={(e) => setUserRegisterInfo({...userRegisterInfo, allergies: e.currentTarget.value})} placeholder='ex. Annual checkup' rows={5} className='resize-none shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2'/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Current medications</label>
                            <textarea value={userRegisterInfo.currentMedications} onChange={(e) => setUserRegisterInfo({...userRegisterInfo, currentMedications: e.currentTarget.value})} placeholder='ex. Annual checkup' rows={5} className='resize-none shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2'/>
                        </div>
                    </div>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Family medical history (if relevant)</label>
                            <textarea value={userRegisterInfo.familyMedicalHistory} onChange={(e) => setUserRegisterInfo({...userRegisterInfo, familyMedicalHistory: e.currentTarget.value})} placeholder='ex. Annual checkup' rows={5} className='resize-none shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2'/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Past medical history</label>
                            <textarea value={userRegisterInfo.pastMedicalHistory} onChange={(e) => setUserRegisterInfo({...userRegisterInfo, pastMedicalHistory: e.currentTarget.value})} placeholder='ex. Annual checkup' rows={5} className='resize-none shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2'/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='mt-10'>
                    <h1 className="font-bold text-4xl mb-3">Login Information</h1>

                    <CustomInput label='Username' name='username' type='text' value={userRegisterInfo.username} changeHandler={HandleUserRegisterInfoChange}/>

                    <br />

                    <div className='flex flex-wrap'>
                        <div className='w-1/2 pe-2'>
                            <CustomInput label='Password' name='password' type='text' value={userRegisterInfo.password} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>

                        <div className='w-1/2 ps-2'>
                            <CustomInput label='Confirm password' name='confirmPassword' type='text' value={userRegisterInfo.confirmPassword} changeHandler={HandleUserRegisterInfoChange}/>
                        </div>
                    </div>
                </div>
            </div>

            {registerLoading ? 
            <div className="loader mx-auto mt-5"></div> : 
            <button className="bg-green-500 text-white font-bold h-16 px-4 mt-9 rounded w-full" type="submit">Submit and continue</button>}
        </form>

        

        <img className='h-screen w-1/3' src="https://github.com/adrianhajdin/healthcare/blob/main/public/assets/images/register-img.png?raw=true" alt="register" />
    </main>
  )
}

export default Register