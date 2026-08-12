import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";

import Nav from "@/components/Nav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Lawn Meowers Council",
	description: "",
};

export default function RootLayout({
	children,
	modal,
}: LayoutProps<"/"> & { modal: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-ctp-base dark:bg-ctp-crust text-ctp-text">
				<Script
					id="theme-detect"
					strategy="beforeInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: its safe cause static
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								function apply(isDark) {
									document.documentElement.classList.toggle('mocha', isDark);
								}
								var mq = window.matchMedia('(prefers-color-scheme: dark)');
								apply(mq.matches);
								mq.addEventListener('change', function(e) { apply(e.matches); });
							})();
						`,
					}}
				/>
				<Nav />
				{children}
				{modal}

				<Script
					src="/oneko.js"
					strategy="afterInteractive"
					data-cat="/oneko.gif"
				/>
			</body>
		</html>
	);
}
