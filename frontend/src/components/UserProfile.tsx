import React, { useEffect }  from 'react'
import MyEvents from './events/MyEvents'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getUser } from "../slices/authSlice";
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledEventBox = styled(Box)`
    padding: 0.5rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;

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
    {basicUserInfo ?
      <StyledEventBox key={basicUserInfo.id}> 
      <Typography variant="h3" >               
      {basicUserInfo.name}
      </Typography>
      <Typography variant="body1">
      <div>User Email: {basicUserInfo.email} </div>
      </Typography>
      </StyledEventBox>
      : null}
    <MyEvents />
    </>

  )
}

export default UserProfile