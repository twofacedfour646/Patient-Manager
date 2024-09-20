import React from 'react'

function AdminStatBox({statistic, category, iconImagePath}: {statistic: number, category: string, iconImagePath: string}) {
  return (
    <div className='bg-gradient-to-r from-gray-700 to-black p-6 rounded-lg shadow'>
        <div className='flex items-center'>
            <img src={iconImagePath} alt="" />
            <h1 className='ms-3 text-4xl font-bold'>{statistic}</h1>
        </div>

        <br />

        <p>Total number of <span className='font-bold'>{category}</span></p>
    </div>
  )
}

export default AdminStatBox