import React from 'react'
import Modal from "@mui/material/Modal"
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, TextField } from '@mui/material';

function AppointmentModal({modalState, setModalState}: {modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/12 bg-dark-400 shadow-2xl rounded-2xl p-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl'>Schedule Appointment</h1>
                <button onClick={() => setModalState(false)} className='bg-none border-none'>
                    <CloseIcon />
                </button>
            </div>

            <br />

            <p className='text-gray-300'>Please full in the following details to schedule</p>

            <br />

            <label className="block text-gray-300 text-sm font-bold mb-2">Doctor</label>
            <input className="shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2" placeholder='Doctor'/>

            <br />
            <br />

            <label className="block text-gray-300 text-sm font-bold mb-2">Reason for appointment</label>
            <textarea placeholder='ex. Annual checkup' rows={5} className='resize-none shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2'/>

            <br />
            <br />

            <label className="block text-gray-300 text-sm font-bold mb-2">Expected appointment date</label>
            <input className="shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2" placeholder='Select your appointment date'/>

            <br />
            <br />

            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full" type="submit">Schedule appointment</button>
        </div>
    </Modal>
  )
}

export default AppointmentModal