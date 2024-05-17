import styles from "./FeedbackFlag.module.css";
import React from 'react'
const FeedbackFlag = (points) => {
    return (
        <div className={styles.container}>
            {[...Array(10)].map((_, index) => (
                <React.Fragment key={index}>
                    <img
                        src={`/HalfSwissFlag.png`}
                        alt={`Swiss Flag for you`}
                        style={{transform: index % 2 === 1 ? 'scaleX(-1)' : 'none',
                            filter: index >= points.points ? 'grayscale(100%) brightness(2.5)' : 'none'}}
                        className={styles.flag}
                    />
                    {index % 2 === 1 && index < 9 && <div style={{ width: '1rem', display: 'inline-block' }} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FeedbackFlag;