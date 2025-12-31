import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import Navbar from './Navbar/Navbar';
import { ReactTyped } from 'react-typed'

const avatar = 'https://via.placeholder.com/80';

const containerStyle = { minHeight: '100vh', backgroundImage: "url('https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_1280.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }
const glassStyle = { width: '30%', height: '85%', paddingTop: '3em', background: 'rgba(255,255,255,0.06)', borderRadius: 12 }
const textboxStyle = { width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb' }
const btnStyle = { backgroundColor: '#f97316', color: '#fff', padding: '8px 16px', borderRadius: 9999, cursor: 'pointer' }

export default function Password() {
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : { password : '' },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let loginPromise = verifyPassword({ username, password : values.password, role : values.role })
      toast.promise(loginPromise, { loading: 'Checking...', success : <b>Login Successfully...!</b>, error : <b>Password Not Match!</b> });

      loginPromise.then(res => {
        let { token } = res.data; localStorage.setItem('token', token);
        if(res.data.role === 'admin') navigate('/admin/dashboard/user'); else navigate('/');
      })
    }
  })

  if(isLoading) return <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Loading...</h1>;
  if(serverError) return <h1 style={{ color: '#ef4444' }}>{serverError.message}</h1>

  return (
    <div style={containerStyle}>
      <Navbar/>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={glassStyle}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '2rem', fontWeight: 700 }}>Hello {apiData?.firstName || apiData?.username}</h4>
            <p style={{ color: '#6b7280' }}>Explore More by connecting with us.</p>
            <ReactTyped className='md:text-3xl sm:text-4xl font-bold text-3xl text-red-500' strings={['WORKOUT', 'EXERCISE', 'GETFIT']} typeSpeed={120} backSpeed={140} loop />
          </div>

          <form style={{ paddingTop: 8 }} onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <img src={apiData?.profile || avatar} alt="avatar" style={{ borderRadius: 9999, width: 80, height: 80 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <input {...formik.getFieldProps('password')} style={textboxStyle} type="password" placeholder='Password' />
              <button style={btnStyle} type='submit'>Sign In</button>
            </div>

            <div style={{ textAlign: 'center', paddingTop: 12 }}>
              <span style={{ color: '#6b7280' }}>Forgot Password? <Link style={{ color: '#ef4444' }} to="/recovery">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
