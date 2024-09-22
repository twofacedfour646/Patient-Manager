"use client";
import React, { useContext } from 'react';
import { AuthContext } from '../auth/auth_context';

function Home() {
  const {access_token} = useContext(AuthContext);

  return (
    <main className="pb-10">
        <h1>{access_token}</h1>
    </main>
  )
}

export default Home