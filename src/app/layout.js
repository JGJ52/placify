import {Fredoka, Poppins, Rubik} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import {query} from "@/instrumentation";

const poppins = Poppins({
    variable: "--poppins",
    weight: ["400"],
    subsets: ["latin"],
});

const fredoka = Fredoka({
    variable: "--fredoka",
    weight: ["400"],
    subsets: ["latin"],
});

const rubik = Rubik({
    variable: "--rubik",
    weight: ["400"],
    subsets: ["latin"],
})

export const metadata = {
  title: "Placify",
  description: "A music player",
};

export default async function RootLayout({ children }) {
    const { rows } = await query(`SELECT * FROM settings`);
    const settings = Object.fromEntries(
        rows.map(row => [row.skey, row.svalue])
    );
    // noinspection JSValidateTypes
    return (
        <html
            lang="en"
            className={`${poppins.variable} ${fredoka.variable} ${rubik.variable} h-full antialiased`}
            style={{
                "--navbar-content-font": `var(--${settings["navbar-content-font"]})`,
                "--background": settings["background-color"],
                "--nav-border": settings["nav-border-color"],
                "--nav-bg": settings["nav-bg-color"],
                "--nav-button-background": settings["nav-button-background-color"],
                "--nav-button-color": settings["nav-button-color"],
                "--nav-button-color-hover": settings["nav-button-color-hover"],
            }}
        >
            <body className="min-h-full flex flex-col">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
