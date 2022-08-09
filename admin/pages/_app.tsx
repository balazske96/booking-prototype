import "../styles/_globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { UserSettingsProvider } from "../hooks/useUserSettings";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserSettingsProvider>
      <Component {...pageProps} />
    </UserSettingsProvider>
  );
}

export default MyApp;
