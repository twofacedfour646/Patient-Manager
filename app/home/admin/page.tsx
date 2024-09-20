"use client";
import React, { useState } from 'react';
import AdminStatBox from "@/components/AdminStatBox";
import AppointmentModal from '@/components/AppointmentModal';

function AdminHome() {
    const [modalState, setModalState] = useState(false);

    const testEntries = [
        {
            patient: "Michael Gubler",
            date: "09/09/2024",
            status: 100,
            doctor: "Doctor Kelly"
        }, {
            patient: "Bruce Wayne",
            date: "09/12/2024",
            status: 100,
            doctor: "Doctor Kelly"
        }, {
            patient: "Dylan Kelly",
            date: "11/17/2024",
            status: 200,
            doctor: "Doctor Shultz"
        },

        {
            patient: "Jacob Hetzel",
            date: "12/08/2024",
            status: 300,
            doctor: "Doctor Wong"
        },
    ]

  return (
    <main className="pb-10">
        {/* Navbar */}
        <nav className='bg-black px-10 py-5 m-2 rounded-xl flex justify-between items-center'>
            <h3 className='text-lg'>Patient Manager</h3>
            <div className='flex items-center'>
                <img className='w-10' src="https://github.com/adrianhajdin/healthcare/blob/main/public/assets/images/admin.png?raw=true" alt="Admin" />
                <h3 className='ms-2'>Admin</h3>
            </div>
        </nav>

        <div className='container px-24 mt-10'>
            {/* Welcome */}
            <div>
                <h1 className='text-4xl font-bold'>Welcome, <span className="text-green-500">Admin</span></h1>
                <br />
                <p className='text-sm text-gray-300'>Start your day by managing new appointments</p>
            </div>

            {/* Stat Group */}
            <div className='flex justify-between items-center mt-10'>
                {/* Scheduled Appointments */}
                <AdminStatBox statistic={94} category='scheduled appointments' iconImagePath='https://raw.githubusercontent.com/adrianhajdin/healthcare/40091655f83c04c851758595788dbdb955f8b846/public/assets/icons/appointments.svg'/>

                {/* Pending appointments */}
                <AdminStatBox statistic={32} category='pending appointments' iconImagePath='https://raw.githubusercontent.com/adrianhajdin/healthcare/40091655f83c04c851758595788dbdb955f8b846/public/assets/icons/pending.svg'/>

                {/* Canceled Appointments */}
                <AdminStatBox statistic={56} category='canceled appointments' iconImagePath='https://raw.githubusercontent.com/adrianhajdin/healthcare/40091655f83c04c851758595788dbdb955f8b846/public/assets/icons/cancelled.svg'/>
            </div>
            
            {/* Dashboard table */}
            <div className='mt-10'>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-black text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Patient
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {testEntries.map(entry => (
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {entry.patient}
                                    </th>
                                    <td className="px-6 py-4">
                                        {entry.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {entry.status == 100 ? (
                                            <span className='bg-green-600 border font-semibold border-green-500 py-1 px-4 rounded-full text-green-500'>Scheduled</span>
                                        ) : entry.status == 200 ? (
                                            <span className='bg-blue-600 border font-semibold border-blue-500 py-1 px-4 rounded-full text-blue-500'>Pending</span>
                                        ) : (
                                            <span className='bg-red-600 border font-semibold border-red-500 py-1 px-4 rounded-full text-red-500'>Canceled</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 flex items-center">
                                        <img className='w-10 me-3' src="https://github.com/adrianhajdin/healthcare/blob/main/public/assets/images/admin.png?raw=true" alt="Doctor" />
                                        {entry.doctor}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a onClick={() => setModalState(true)} href="#" className="font-medium text-green-500 hover:underline me-5">Schedule</a>
                                        <a href="#" className='font-medium text-white hover:underline'>Cancel</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <AppointmentModal modalState={modalState} setModalState={setModalState}/>
    </main>
  )
}

export default AdminHome