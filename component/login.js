import React, { useEffect, useState } from 'react'

import { signIn, useSession } from 'next-auth/react'

import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

const login = ({isOpenLogin}) => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ status: 'default', message: '' });
  const [loading, setLoading] = useState(false);
  const[pageLoading,setPageLoading]=useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      isOpenLogin(true)
    }
    else if (status == 'loading') {
      setPageLoading(true)
    } else{
      isOpenLogin(false)
    }
  }, [session, status])

  const updateUserInfo = (field, value) => {
    switch (field) {
        case 'email':
            setUserInfo({ ...userInfo, email: value });
            break;
        case 'password':
            setUserInfo({ ...userInfo, password: value });
            break;
        default:
            console.log("No field defined")
    }
}

  const signInNextAuth = async () => {
    if (validateFields()) {
        setLoading(true);
        const res = await signIn('credentials', {
            redirect: false,
            email: userInfo.email,
            password: userInfo.password,
            callbackUrl: `${window.location.origin}`,
        });
        console.log("res :",res)
        if (res?.error) {
            setFormError({
                status: 'error',
                message: res.error
            });
            setLoading(false);
        } else {
            setLoading(false);
            isOpenLogin(false)
        }
    } else {
        setFormError({
            status: 'error',
            message: "Email and Password are required!"
        });
    }

}

const validateFields = () => {
  const isValidEmail = userInfo.email && userInfo.email.length > 0;
  const isValidPassword = userInfo.password && userInfo.password.length > 0;

  return (isValidEmail && isValidPassword) ? true : false;
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
          Blog App Login
        </Text>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          type="email"
          onChange={(e) => updateUserInfo('email', e.target.value)}
          status={formError.status}
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          type="password"
          onChange={(e) => updateUserInfo('password', e.target.value)}
          status={formError.status}
        />
        <Spacer y={1} />
        <Button onClick={()=>{signInNextAuth()}}>{!loading?"Sign in":"Loading..."}</Button>

        {formError.message.length > 0 && <><Spacer y={1} />
                                <Text css={{ margin: 0 }} color="error">{formError.message}</Text>
                            </>}
      </Card>
  </div>
  )
}

export default login