import React from 'react';
import Header from './Header';
import { useRouter } from 'next/router';
import Footer from './Footer';
import GlobalContextProvider from '@/store';

export default function Layout({ children }) {

  const router = useRouter();
  const isLoginPage = router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/changepassword' || router.pathname === '/404';

  return (
    <div>
      <GlobalContextProvider>
        {!isLoginPage && <Header />}
          {children}
        {!isLoginPage && <Footer />}
      </GlobalContextProvider>
    </div>
  )
}