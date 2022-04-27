

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3Provider } from '@providers'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </>
  )
}

export default MyApp
