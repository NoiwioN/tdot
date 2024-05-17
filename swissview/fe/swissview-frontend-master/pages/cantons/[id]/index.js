import {useGlobalContext} from "/store";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import error404Page from "/pages/404";
import CantonsAPI from "/lib/api/Cantons";
import Canton from "/components/general/Canton";
import CantonComments from "/components/comments/CantonComments";
import styles from "./index.module.css";
import CantonFeedbacks from "/components/feedbacks/CantonFeedbacks";

export default function cantonPage() {
    const router = useRouter();
    const [canton, setCanton] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState([]);
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        if (router.query.id === undefined) return;

        const fetchCanton = async () => {
            const cantonInfo = await CantonsAPI.read(router.query.id);
            if (cantonInfo === null) {
                setNotFound(true);
            } else {
                setCanton(cantonInfo);
            }
        };
        fetchCanton();

        const fetchUserCount = async () => {
            const count = await CantonsAPI.getUserCount(router.query.id);
            if (count === null || count === undefined) {
                console.log("canton userCount not found")
            } else {
                setUserCount(count);
            }
        };
        fetchUserCount();
        const fetchCantonsData = async () => {
            const response = await fetch('/cantons.json');
            const jsonData = await response.json();
            const cantonData = jsonData.find(data => data.canton === router.query.id)
            setData(cantonData);
        };
        fetchCantonsData();
    }, [router.query.id]);

    return (
        <>
            {
                notFound ? (
                    <>
                        {error404Page()}
                    </>
                ) : (
                    <>
                        {
                            canton === null ? (
                                <>
                                    <p>Kantonsinfos werden geladen...</p>
                                </>
                            ) : (
                                <>
                                    <Canton canton={canton} data={data} userCount={userCount}/>
                                    <div className={styles.feedbackCommentsContainer}>
                                        <CantonFeedbacks canton={canton}/>
                                        <CantonComments canton={canton} />
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    );
}
