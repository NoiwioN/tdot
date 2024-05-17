import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthenticationAPI from "../lib/api/Users"
import { useGlobalContext } from "../store"
import { toast } from "react-toastify"
import styles from "./login.module.css"
import Link from 'next/link'
import Head from 'next/head'

const defaultModel = {
    username: '',
    password: ''
}

export default function singUpPage() {
    const [user, setUser] = useState(defaultModel)
    const [errors, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {login} = useGlobalContext()

    const router = useRouter()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        user[name] = value
        setUser(user)
    }

    const validateUser = (user) => {
        let errors = defaultModel
        var isValid = true
        if (user.username.trim().length === 0) {
            errors.username = "Username can't be empty"
            isValid = false
        }
        if (user.password.trim().length === 0) {
            errors.password = "Password cant't be empty"
            isValid = false
        }
        return { errors, isValid }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        setErrors(defaultModel)

        const result = validateUser(user)   

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        try {
            const data = await AuthenticationAPI.signUp(user)
            console.log(data)
            toast.success("User created")
            const resp = await AuthenticationAPI.login(user)
            login(resp)
            setIsLoading(false)
            router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("Sing up failed")
            setIsLoading(false)
        }
    }
    

    return (
        <div className={styles.container}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <title>ICT-Kebab</title>
            </Head>
            <Link href="/">
                <button className={styles.back_btn}>Back</button>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={styles.form_group}>
                    <input 
                        onChange={handleChange} 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        className={errors.username ? styles.error : ''}
                    />
                </div>
    
                <div className={styles.form_group}>
                    <input 
                        onChange={handleChange} 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className={errors.password ? styles.error : ''}
                    />
                </div>
                <button className={styles.submit_btn} disabled={isLoading}>
                    {isLoading ? "...Loading" : "Sign Up"}
                </button>
                <Link className={styles.text} href={'/login'}><p>login with a user</p></Link>
            </form>
        </div>
    )
    
}