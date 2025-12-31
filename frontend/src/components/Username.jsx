import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
import { registerUser } from '../helper/helper'
import toast from 'react-hot-toast'

const avatar = 'https://i.ibb.co/4pDNDk1/avatar.png'
const containerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const glassStyle = { paddingTop: '3em', width: '30%', background: 'rgba(255,255,255,0.06)', borderRadius: 12 }
const textboxStyle = { width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb' }
const btnStyle = { backgroundColor: '#f97316', color: '#fff', padding: '8px 16px', borderRadius: 9999, cursor: 'pointer' }

export default function Username() {
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues: { username: '' },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let registerPromise = registerUser(values.username)
      toast.promise(registerPromise, { loading: 'Checking...', success: <b>Registered Successfully...!</b>, error: <b>Unable to Register!</b> })
    }
  })

  function onUpload(e) { const file = e.target.files[0]; setFile(file) }

  return (
    <div style={containerStyle}>
      <div style={glassStyle}>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '2rem', fontWeight: 700 }}>Hello Again!</h4>
          <span style={{ color: '#6b7280' }}>Explore More by connecting with us.</span>
        </div>

        <form onSubmit={formik.handleSubmit} style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <label htmlFor='file'>
              <img src={avatar} alt="avatar" style={{ borderRadius: 9999, width: 80, height: 80 }} />
            </label>
            <input onChange={onUpload} type='file' id='file' name='file' />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <input {...formik.getFieldProps('username')} style={textboxStyle} type="text" placeholder='Username' />
            <button style={btnStyle} type='submit'>Let's Go</button>
          </div>
        </form>
      </div>
      <Toaster position='top-center' />
    </div>
  )
}
 