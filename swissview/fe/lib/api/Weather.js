import {getJSON} from "."
import {toast} from "react-toastify";



const WeatherAPI = {
    read(city) {
        const time = new Date();
        const timeStr = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${Math.floor(time.getMinutes() / 12)}`

        const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=4613db0503oft500e5a773c6cc4abff1&units=metric&_cache_date=${timeStr}`
        return getJSON(url, {
            cache: "force-cache"
        }).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    }
}
export default WeatherAPI
