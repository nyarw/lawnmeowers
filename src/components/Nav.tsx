"use client";

import Link from "next/link";

import { useHash } from "@/hooks/useHash";

export default function Nav() {
	const animBottom =
		"before:absolute before:-z-1 before:w-full before:bottom-0 before:left-0 before:h-0 hover:before:h-1 before:transition-h before:duration-200 before:bg-ctp-mauve";
	const topbarThingButton = `relative z-0 w-1/8 min-w-max h-max hover:bg-ctp-base transition-border duration-100 ${animBottom}`; // let me tell you how much I HATE tailwind
	const a = "size-full p-5 block";

	const hash = useHash();
	const isActive = (name: string) =>
		(name === "#about" && hash === "") || hash === name;
	const thing = (name: string) =>
		`${topbarThingButton} ${isActive(name) ? "text-ctp-mauve before:h-1" : ""}`;

	return (
		<nav className="text-xl big-font bg-ctp-mantle flex justify-center">
			<ul className="flex w-full justify-center text-center gap-5 text-4xl max-w-4/5">
				<li className={thing("#about")}>
					<Link href="/#about" className={a}>
						about
					</Link>
				</li>
				<li className={thing("#members")}>
					<Link href="/#members" className={a}>
						members
					</Link>
				</li>
				<li className={thing("#founders")}>
					<Link href="/#founders" className={a}>
						founders
					</Link>
				</li>
				<li className={thing("/rhythia/maps")}>
					<Link href="/rhythia/maps" className={a}>
						maps
					</Link>
				</li>
				<li className={thing("#discord")}>
					<Link href="/#discord" className={a}>
						discord
					</Link>
				</li>
			</ul>
		</nav>
	);
}
