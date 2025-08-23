
'use client'; 

import React, { useState } from 'react';
import { ProfileForm } from '../../Fields/LoginForm';
import { RegisterForm } from '../../Fields/RegisterForm';


export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const changeMode = (state) => {
    setMode(state)
  }
  return (<>
  {mode === "login" ? (
    <>
    <div className="mb-5">
        <h2 className="text-xl font-semibold text-center">Welcome Back!</h2>
        <p className="text-center text-sm">Enter your details to login.</p>
        
    </div>
    <div className="mt-5">
        <ProfileForm />
    </div>
    <div className="mt-5">
      <div className="w-full" onClick={() => setMode('register')}>
        Don't have an account? <span className="text-blue-600"> <button className="text-blue-600">Create one</button></span>
      </div>
    </div>
    </>
    ) : (
      <>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-center">Welcome Back!</h2>
        <p className="text-center text-sm">Enter your details to login.</p>
      </div>
      <div className="mt-5">
        <RegisterForm changeMode={changeMode} />
      </div>
      <div className="mt-5">
      <div className="w-full" onClick={() => setMode('login')}>
        Already have an account? <span className="text-blue-600"> <button className="text-blue-600">Login</button></span>
      </div>
      </div>
      </>
    )}
    </>);
}