import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { updateGoal } from '../features/goal/goalSlice'

export default function AddGoal({
  open,
  setOpen,
  editGoal
}) {
  const dispatch = useDispatch()
  const [text, setText] = useState(editGoal?.text || '')

  const editGoalHandler = (id) => {
    dispatch(updateGoal({ id: id, text: text }));
    setOpen(false)
  }

  const inputRef = useRef(null);

  useEffect(() => {
    // Check if the inputRef is not null before calling focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(true)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Edit Your Goal
                    </Dialog.Title>
                    <div className="my-2">
                      <input
                        id="add"
                        name="add"
                        type="text"
                        value={editGoal.text}
                        placeholder='Add...'
                        readOnly
                        className="border block w-full rounded-md bg-white/5 p-2 focus:outline-none sm:leading-6"
                      />
                    </div>
                    <div>
                      <input
                        id='updategoal'
                        name='update'
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='block w-full rounded-md border focus:outline-none bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                        ref={inputRef}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    // type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => editGoalHandler(editGoal._id)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
