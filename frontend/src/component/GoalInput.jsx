import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goal/goalSlice'

const GoalInput = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const textHandler = () => {
    if (text) {
      dispatch(createGoal({ text }))
      setText('')
    }
  }

  return (
    <div className='flex items-center justify-between p-8 px-10 bg-white rounded'>
      <div className='w-4/5'>
        <input
          id="add"
          name="add"
          type="text"
          placeholder='Add...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-0 block w-full rounded-md bg-white/5 pl-5 focus:outline-none sm:leading-6"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={textHandler}
          className="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default GoalInput