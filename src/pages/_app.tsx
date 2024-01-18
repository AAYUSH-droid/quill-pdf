import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { cn } from "~/lib/utils";
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Component
      {...pageProps}
      className={cn(
        "grainy min-h-screen font-sans antialiased",
        inter.className,
      )}
    />
  );
};

export default api.withTRPC(MyApp);
