import React, { useState } from 'react';
import UserInfo from './UserInfo';
import Calendar from './Calendar';
import dayjs from 'dayjs';


const defaultLife = {
  DOB: dayjs('2020-01-01'),
  lifespan: 32
};

const test = {
  DOB: dayjs('1990-04-16'),
  lifespan: 100
};


export default function App() {
  const [userInfo, setUserInfo] = useState({ name: '', gender: '' });
  const [life, setLife] = useState(test);

  return (    
    <div className='App'>
      <UserInfo setUserInfo={setUserInfo} setLife={setLife}/>
      <Calendar life={life} userInfo={userInfo}/>
    </div>
  );
};