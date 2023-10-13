import React from 'react'
import AddGoal from './AddGoal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goal/goalSlice'

const GoalListing = ({ data }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [editGoal, setEditGoal] = useState(null)
  const editHandler = (item) => {
    setEditGoal(item)
    setOpen(true)
  }

  const deleteHandler = (id) => {
    dispatch(deleteGoal(id))
  }

  return (
    <div className='pt-3'>
      {data && data.length > 0 &&
        data.map((item) => {
          return (
            <>
              {editGoal && <AddGoal open={open} setOpen={setOpen} editGoal={editGoal} />}
              <div className='flex items-center bg-white p-5 rounded my-2 gap-2'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>

                </div>
                <div className='w-full'>
                  <p className='pl-5 text-sm pointer-events-none'>{item.text}</p>
                </div>
                <div className='flex justify-between items-center gap-3 text-xs'>
                  <p>created at: {item.createdAt.split('T')[0]}</p>
                  <p>updated at: {item.updatedAt.split('T')[0]}</p>
                </div>
                <div className='flex justify-between items-center gap-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => { editHandler(item) }} className="w-5 h-5 stroke-indigo-600 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => deleteHandler(item._id)} className="w-5 h-5 stroke-red-600 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
            </>)
        })
      }
    </div>
  )
}

export default GoalListing