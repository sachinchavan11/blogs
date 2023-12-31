import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Store from "../store";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  );
}
