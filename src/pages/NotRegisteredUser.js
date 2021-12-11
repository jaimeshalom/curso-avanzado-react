import React, { useContext } from 'react';
import { UserContext } from '../Context';
import { UserForm } from '../components/UserForm';
import { useRegisterMutation } from '../hooks/useRegisterMutation';
import { useLoginMutation } from '../hooks/useLoginMutation';

export default function NotRegisteredUser() {
  const { activateAuth } = useContext(UserContext);
  const register = useRegisterMutation();
  const login = useLoginMutation();
  const onSubmitRegister = ({ email, password }) => {
    const input = { email, password };
    const variables = { input };
    try {
      register.register({ variables }).then(({ data }) => {
        const { signup } = data;
        activateAuth(signup);
      });
    } catch (err) {
      console.error('Error', err);
    }
  };

  const onSubmitLogin = ({ email, password }) => {
    const input = { email, password };
    const variables = { input };
    try {
      login.login({ variables }).then(({ data }) => {
        const { login } = data;
        activateAuth(login);
      });
    } catch (err) {
      console.error('Error', err);
    }
  };

  const errorMsgRegister =
    register.body.error && 'El usuario ya existe o hay un error';
  const errorMsgLogin =
    login.body.error && 'Contraseña incorrecto o usuario incorrecto';

  return (
    <>
      <UserForm
        error={errorMsgRegister}
        disabled={register.body.loading}
        onSubmit={onSubmitRegister}
        title="Registrarse"
      />
      <UserForm
        error={errorMsgLogin}
        disabled={login.body.loading}
        onSubmit={onSubmitLogin}
        title="Iniciar Sesión"
      />
    </>
  );
}
