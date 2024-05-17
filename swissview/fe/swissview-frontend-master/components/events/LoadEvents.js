import {useTranslation} from "react-i18next";
import EventsAPI from "../../lib/api/Events";
import formStyles from "../../styles/forms.module.css";
import RequireLogin from "../auth/RequireLogin";
import Link from "next/link";
import btnStyles from "../../styles/buttons.module.css";
import styles from "./events.module.css";
import {useState, useEffect} from "react";
import CantonsAPI from "../../lib/api/Cantons";
import SingleEvent from "./SingleEvent";

export default function LoadEvents() {
    const [events, setEvents] = useState(null);
    const [cantons, setCantons] = useState(null)
    const [cantonFilter, setCantonFilter] = useState("all");
    const [sort, setSort] = useState("name+")

    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            const events = await EventsAPI.readAll();
            setEvents(events);
        };

        fetchData()
    }, [])

    useEffect(() => {
        CantonsAPI.readAll().then(setCantons);
    }, []);

    const handleChangeFilter = e => {
        setCantonFilter(e.target.value)
    }
    const handleChangeSort = e => {
        setSort(e.target.value)
    }
    if (events == null) return <></>;

    const filteredEvents = events.filter(elem => {
        return cantonFilter === "all" || elem.canton.id === cantonFilter;
    })

    switch (sort) {
        case "name+":
            filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "name-":
            filteredEvents.sort((a, b) => b.title.localeCompare(a.title)); // Assuming you want to sort by title in descending order here
            break;
        case "canton+":
            filteredEvents.sort((a, b) => a.canton.name.localeCompare(b.canton.name));
            break;
        case "canton-":
            filteredEvents.sort((a, b) => b.canton.name.localeCompare(a.canton.name));
            break;
        case "date+":
            filteredEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));
            break;
        case "date-":
            filteredEvents.sort((a, b) => b.startTime.localeCompare(a.startTime));
            break;
    }

    return (
        <>
            <div className={formStyles.headerForm}>
                <h1>{t("events:overviewTitle")}</h1>
                <RequireLogin requireAdmin={true} redirect={false}>
                    <Link className={btnStyles.editBtn} href={`/events/new`}>{t("events:createTitle")}</Link>
                </RequireLogin>
            </div>
            <select className={`${formStyles.input} ${formStyles.noMargins}`} onChange={handleChangeFilter}
                    defaultValue="all">
                <option value="all"> Alle</option>
                {
                    cantons !== null ? cantons.map(
                        canton => <option value={canton.id} key={canton.id}>{canton.name}</option>
                    ) : null
                }
            </select>
            <select className={`${formStyles.input}`} defaultValue="name+" onChange={handleChangeSort}>
                <option value="name+">Name A-Z</option>
                <option value="name-">Name Z-A</option>
                <option value="canton+">Kantons Name A-Z</option>
                <option value="canton-">Kantons Name Z-A</option>
                <option value="date+">Datum aufsteigend</option>
                <option value="date-">Datum absteigend</option>
            </select>
            {filteredEvents.length === 0 ? <h1>{t("events:noEventsFound")}</h1> :
                <div className={styles.event}>
                    <ul>
                        {filteredEvents.map((e) => <SingleEvent event={e}/>)}
                    </ul>
                </div>
            }
        </>
    );
}