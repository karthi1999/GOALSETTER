import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoal } from '../features/goal/goalSlice';
import GoalInput from '../component/GoalInput';
import GoalListing from '../component/GoalListing';
import { toast } from 'react-toastify';
import { reset } from '../features/goal/goalSlice';
import Spinner from '../component/Spinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = user ? typeof user === 'string' ? JSON.parse(user).token : user.token : null
  const { data, isLoading, isError, message } = useSelector((state) => state.goal);


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isError) {
      toast.error(message);
    }
    dispatch(getGoal(token));
    dispatch(reset());
  }, [user, navigate, dispatch, isError, message, token]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="relative top-0 left-0">
        <div className="pt-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">Set Your Goals</h1>
            </div>
          </header>
          <main className="">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="bg-gray-100 rounded p-10 h-full">
                <div>
                  <GoalInput />
                </div>
                <div className="border-t border-gray-400 my-4 mt-6">
                </div>
                <div className="h-[300px] overflow-auto">
                  <GoalListing data={data} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Dashboard;
