import "/styles/globals.css";
import "/styles/colors.css";
import Layout from "/components/general/Layout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalContextProvider from "/store";

export default function App({Component, pageProps}) {
    return (
        <GlobalContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ToastContainer position="bottom-right" stacked={true} pauseOnFocusLoss={false}/>
        </GlobalContextProvider>
    );
}
