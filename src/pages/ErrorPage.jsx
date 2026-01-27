import React from 'react'
import {Result, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
const ErrorPage = () => {
  const Navigate=useNavigate();
  return (
    <Result 
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
            <Button type="primary" onClick={()=> Navigate('/login')}>
                Go to Login
            </Button>
        }
    />
  )
}

export default ErrorPage
