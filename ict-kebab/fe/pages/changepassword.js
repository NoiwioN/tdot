import React, { useState } from 'react'
import Link from 'next/link'
import styles from './changepassword.module.css'
import { useGlobalContext } from '@/store'
import AuthenticationAPI from '@/lib/api/Users'
import { toast } from 'react-toastify'

export default function changepassword() {

    const { session } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (password !== confirmPassword) {
            setIsLoading(false)
            toast.error("Passwörter stimmen nicht überein")
            return
        } else{
        let user = await AuthenticationAPI.getUserPerUsername(userJWT.sub, session.accesstoken)
        
        user.password = password
        AuthenticationAPI.changePassword(user, session.accesstoken)
        setIsLoading(false)
        toast.success("Password changed")
        }
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className={styles.container}>
            <Link href="/profil">
                <button className={styles.back_btn}>Back</button>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Change Password</h2>
                <div className={styles.form_group}>
                    <input 
                        onChange={handleChangePassword} 
                        type="password" 
                        name="new password" 
                        placeholder="neues Passwort" 
                    />
                </div>
                <div className={styles.form_group}>
                    <input 
                        onChange={handleChangeConfirmPassword} 
                        type="password" 
                        name="confirm password" 
                        placeholder="Passwort bestätigen" 
                    />
                </div>
                <button className={styles.submit_btn} disabled={isLoading}>
                    {isLoading ? "...Lädt" : "Passwort ändern"}
                </button>
            </form>
        </div>
    )
}
