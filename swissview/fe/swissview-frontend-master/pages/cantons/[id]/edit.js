import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import error404Page from "../../404";
import CantonsAPI from "/lib/api/Cantons";
import RequireLogin from "/components/auth/RequireLogin";
import CantonEditForm from "/components/CantonEditForm";
import headerStyles from "/styles/forms.module.css";
import Link from "next/link";
import btnStyles from "/styles/buttons.module.css";
import {useTranslation} from "react-i18next";

export default function cantonEditPage() {

    const router = useRouter();
    const [canton, setCanton] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        if (router.query.id === undefined) return;

        (async () => {
            const cantonInfo = await CantonsAPI.read(router.query.id);
            if (cantonInfo === null) {
                setNotFound(true);
            } else {
                setCanton(cantonInfo);
            }
        })();
    }, [router.query.id]);

    return (
        <RequireLogin requireAdmin={true} redirect={true}>
            {
                notFound ? (
                    error404Page()
                ) : (
                    <>
                        {
                            canton === null ? (
                                <p>Kantonsinfos werden geladen...</p>
                            ) : (
                                <>
                                    <div className={headerStyles.headerForm}>
                                        <h1>{t("cantonDetails:editCanton")}: {canton.id}</h1>
                                        <Link className={btnStyles.cancelBtn}
                                              href={`/cantons/${canton.id}`}>{t("cantonDetails:cancel")}</Link>
                                    </div>
                                    <CantonEditForm canton={canton}/>
                                </>
                            )
                        }
                    </>
                )
            }
        </RequireLogin>
    );
}
