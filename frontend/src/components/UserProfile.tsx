import React, { useEffect }  from 'react'
import MyEvents from './events/MyEvents'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getUser } from "../slices/authSlice";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
      if (basicUserInfo) {            
      dispatch(getUser(basicUserInfo.id));
      }
  }, [basicUserInfo, dispatch]);

  return (
    <>
    <div>User Profile</div>
    {basicUserInfo ?
    <div key={basicUserInfo.id}>                
      <h4>{basicUserInfo.name}</h4>
      User Email: {basicUserInfo.email} 
    </div> : null}
    <MyEvents />
    </>

  )
}

export default UserProfile