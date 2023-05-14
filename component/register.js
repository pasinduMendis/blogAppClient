import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
} from '@nextui-org/react';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/router';

const register = ({isOpenReg}) => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});
  const [formError, setFormError] = useState({ status: 'default', message: '' });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      isOpenReg(true)
    }
    else if (status == 'loading') {
      setPageLoading(true)
    } else{
      isOpenReg(false)
    }
  }, [session, status])

 const updateUserInfo = (field, value) => {
        switch (field) {
            case 'name':
                setUserInfo({ ...userInfo, name: value });
                break;
            case 'email':
                setUserInfo({ ...userInfo, email: value });
                break;
            case 'password':
                setUserInfo({ ...userInfo, password: value });
                break;
            case 'confirmPassword':
                setUserInfo({ ...userInfo, confirmPassword: value });
                break;
            default:
                console.log("No field defined")
        }
    }

const validateFields = () => {
        const isValidName = userInfo.name && userInfo.name.length > 0;
        const isValidEmail = userInfo.email && userInfo.email.length > 0;
        const isValidPassword = userInfo.password && userInfo.password.length > 0;
        const isValidConfirmPassword = userInfo.confirmPassword && userInfo.confirmPassword.length > 0;

        return (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword) ? true : false;
    }

    const onClickSubmitRegister = async () => {
      if(userInfo.password==userInfo.confirmPassword){
      if (validateFields()) {
          setLoading(true);
          authService.signUp(userInfo).then(async (res) => {
              if (res.status === 200 ) {
                  await onSignIn()
              } else {
                  setLoading(false);
                  setFormError({
                      status: 'error',
                      message: res.message
                  });
              }
          })
      } else {
          setLoading(false);
          setFormError({
              status: 'error',
              message: "Mandatory fields are empty!"
          });
      }
  }else {
      setLoading(false);
      setFormError({
          status: 'error',
          message: "please check password and confirm password again!"
      });
  }
  }

  const onSignIn =async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `${window.location.origin}`,
  });
  
  if (res?.error) {
      setFormError({
          status: 'error',
          message: res.error
      });
      setLoading(false);
  } else {
      setLoading(false);
      isOpenReg(false)
      router.push('/');
  }
}



  return (
    <div>
  <Card css={{ mw: 'auto', p: '40px',background:"transparent" }}>
        <Text
          size={24}
          weight="bold"
          css={{
            as: 'center',
            mb: '20px',
          }}
        >
          Blog App Register
        </Text>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="name"
          status={formError.status}
          onChange={(e) => updateUserInfo('name', e.target.value)}
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          status={formError.status}
          type="email"
          onChange={(e) => updateUserInfo('email', e.target.value)}
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          status={formError.status}
          type="password"
          onChange={(e) => updateUserInfo('password', e.target.value)}
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Re-Enter Password"
          type="password"
          status={formError.status}
          onChange={(e) => updateUserInfo('confirmPassword', e.target.value)}
        />
        <Spacer y={1} />
        <Button onClick={()=>{onClickSubmitRegister()}}>{loading?"Loading..":"Register"}</Button>

        {formError.message.length > 0 && <><Spacer y={1} />
                                <Text css={{ margin: 0 }} color="error">{formError.message}</Text>
                            </>}
      </Card>
  </div>
  )
}

export default register