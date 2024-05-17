import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ICTKebabAPI from '@/lib/api/ICTKebab'
import { useGlobalContext } from '@/store'

import styles from "./PostForm.module.css"

const defaultPost = {
    title: "",
    text: ""
}

export default function PostForm({postToEdit = null}) {
    const { session } = useGlobalContext()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState(defaultPost)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (postToEdit !== null){
            setPost(postToEdit)
        }
    }, [postToEdit])

    const handleChange = (e) => {
        setError(false)
        const name = e.target.name
        const text = e.target.value
        setPost({
            ...post,
            ...{ [name]: text }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(post.title == "" || post.text == ""){
            setError(true)
            return
        }
    
        setIsLoading(true)
        post.applicationUser = session.userForSession
        if (post.id){
            post.updatedAt = new Date().toString()
            const updatedPost = await ICTKebabAPI.update(post, session.accesstoken)
            setPost(updatedPost)
            router.push(`/posts/${post.id}`)
        } else {
            const newPost = await ICTKebabAPI.create(post, session.accesstoken)
            if (newPost) {
                router.push(`/posts/${newPost.id}`)
            } else {
                post.created_at = new Date().toString()
                post.updated_at = new Date().toString()
                router.push(`/`)
            }
        }
        setIsLoading(false)
    }

    return (
        <div className={styles['form-container-styling']}>
            <form onSubmit={handleSubmit}>
                <div>
                {error && <p className={styles['error-text']}>fields can not be empty</p>}
                    <label htmlFor="title">Title</label>
                    <div>
                        <input onChange={handleChange} value={post.title} type="text" name="title" id="title" placeholder="Title" />
                    </div>
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <div>
                        <textarea onChange={handleChange} value={post.text} type="text" name="text" id="text" placeholder="Text" rows="10" />
                    </div>
                </div>

                <button className={"button"} disabled={isLoading}>
                    {isLoading ? "...is lading" : "Submit"}
                </button>
            </form>
        </div>
    )
}
