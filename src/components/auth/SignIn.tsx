import PropTypes from 'prop-types'
import React, { useState } from 'react'

import InputComponent from 'components/common/InputComponent'
import Button from 'components/common/button/button'
import triggerMessage from '../common/SnackBar'

import { signInHandler } from '../../firebase/functions/AuthActions'
import { googleAuthHandler } from './utils'

export interface signInProps {
  setActiveView: any
}

const SignIn: React.FC<signInProps> = ({ setActiveView }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clickHandler = async () => {
    const res = await signInHandler(email, password)
    if (res.success) {
      triggerMessage('Sign in successful', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      triggerMessage(res.error, 'fail')
    }
  }

  return (
    <div className="w-full">
      <form className="pt-6 pb-8 mb-4">
        <h1 className="font-bold text-white text-2xl">Hi, welcome back!</h1>
        <p className="text-sm text-white text-opacity-60	">
          we are happy to have you back here...
        </p>
        <br />
        <div className="mb-4">
          <InputComponent
            enterClickHandler={() => clickHandler()}
            inputType="secondary"
            id="Email"
            type="text"
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <InputComponent
            enterClickHandler={() => clickHandler()}
            inputType="secondary"
            className="text-white border-none shadow appearance-none border w-full p-3 mb-3 rounded-lg focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {/* <div className="flex justify-end">
            <a
              className="inline-block align-baseline font-bold text-white text-sm text-opacity-50"
              href="#">
              Forgot Password?
            </a>
          </div> */}
        </div>
        <br />
        <div className="flex flex-col">
          <Button onClick={clickHandler}>Sign In</Button>
          <Button onClick={googleAuthHandler} type="secondary" className="my-4">
            <div className="relative flex items-center space-x-4 justify-center">
              <img
                src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Continue with Google
              </span>
            </div>
          </Button>
          <p className="text-center text-white text-xs mt-4">
            <div onClick={() => setActiveView('signup')}>
              Not registered yet?{' '}
              <a className="text-indigo font-bold">Create a account here</a>
            </div>
          </p>
        </div>
      </form>
      <p className="text-center text-white text-xs">
        &copy;2023 Dashlit. All rights reserved.
      </p>
    </div>
  )
}

export default SignIn

SignIn.propTypes = {
  setActiveView: PropTypes.string.isRequired
}
