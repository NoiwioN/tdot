import React, { useState, useEffect } from 'react';
import WeatherAPI from "../../lib/api/Weather";
import styles from "./WeatherPopUp.module.css";

export default function WeatherPopUp({ canton }) {
    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const dataRaw = await WeatherAPI.read(canton.capital);
                setWeatherInfo(dataRaw);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [canton.capital]); // Fetch data when `canton.capital` changes

    return (
        <div className={styles.weatherPopUp}>
            {weatherInfo ? (
                <>

                    <img src={weatherInfo.condition.icon_url} alt={`Weather icon`}/>
                    <div className={styles.infoContainer}>
                        <div className={styles.cityName}>
                            {canton.capital}
                        </div>
                        <div className={styles.temperature}>
                            <p>{Math.round(weatherInfo.temperature.current)} °C</p>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
