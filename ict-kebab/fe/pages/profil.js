import { useGlobalContext } from '@/store'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styles from './profil.module.css'
import AuthenticationAPI from '@/lib/api/Users'
import { toast } from 'react-toastify'

export default function profil() {

  const { logout, session } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/noaccess')
    }
  }, [])
    
    const parseJwt = (token) => {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }

    let userJWT = {
      sub: "error"
    }

    try {
      userJWT = parseJwt(session.accesstoken);
    } catch { 
      console.log('Session or access token is null');
    }


    const handleLogout = () => {
        logout()
        router.push('/')
    }

    const handleDeleteUser = async () => {
      let user = await AuthenticationAPI.getUserPerUsername(userJWT.sub, session.accesstoken)
      logout()
      router.push('/')
      AuthenticationAPI.deleteUser(user, session.accesstoken)
      toast.success("Account deleted")
    }

    const handleChangePassword = () => {
        router.push('/changepassword')
    }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Profil</h1>
        <p className={styles.text}>Benutzername: {session && session.accesstoken ? userJWT.sub : "error"}</p>  

        <button onClick={handleChangePassword} className={`${styles.btn} ${styles.btnChange}`}>Change Password</button>
        <button onClick={handleLogout} className={`${styles.btn} ${styles.btnLogout}`}>Logout</button>
        <button onClick={handleDeleteUser} className={`${styles.btn} ${styles.btnDelete}`}>Delete Account</button>
    </div>
  )
}
