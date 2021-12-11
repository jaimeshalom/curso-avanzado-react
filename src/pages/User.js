import React, { useContext } from 'react';
import { UserContext } from '../Context';
import { SubmitButton } from '../components/SubmitButton';

export default function User() {
  const { removeAuth } = useContext(UserContext);
  return (
    <>
      <h1>User</h1>
      <SubmitButton onClick={removeAuth}>Cerrar Sesión</SubmitButton>
    </>
  );
}
