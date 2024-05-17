import React from 'react';
import styles from './404.module.css';
import Head from "next/head";

/**
 * 404 page
 * @returns {JSX.Element}
 */
export default function error404Page()
{
    return (
        <div className={styles.errorPage}>
            <Head>
                <title>404 (Not Found) - GradeM8</title>
            </Head>
            <h2>404 - Not found</h2>
            <p>We really looked for this page, we promise!</p>
            <div className={styles.imgContainer}>
                <img className={styles.img404} src="/404.svg" alt="404 illustration; purely decorative"/>
            </div>
        </div>
    );
}
