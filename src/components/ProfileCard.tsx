"use client";
import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import type { Types } from "use-lanyard";

import { usePresence } from "@/hooks/usePresence";
import {
	type Activity,
	type DisplayNameStyles,
	displayNameStyle,
	getActivityImageUrl,
} from "@/lib/discord";
import type { Profile } from "@/types/profile";

const AVATAR_EXTENSIONS = ["png", "gif", "webp", "jpg", "jpeg"];

const STATUS: Record<string, { color: string; label: string }> = {
	online: { color: "bg-ctp-green", label: "Online" },
	idle: { color: "bg-ctp-yellow", label: "Idle" },
	dnd: { color: "bg-ctp-red", label: "Do Not Disturb" },
	offline: { color: "bg-ctp-surface1", label: "Offline" },
};
const ACTIVITY_TYPE: Record<number, string> = {
	2: "Listening To",
	3: "Watching",
	5: "Competing in",
};

export default function ProfileCard({
	profile,
	expand,
}: {
	profile: Profile;
	expand: boolean;
}) {
	const presence = usePresence(profile.discordId);

	const nameStyle = displayNameStyle(
		(presence?.discord_user as Record<string, unknown> | undefined)
			?.display_name_styles as DisplayNameStyles,
	);

	// i am sorry for this. biome just makes it so unreadable when it puts those stupid new lines all over the html
	const mainDiv = `${
		expand
			? "w-full max-w-3xl cursor items-start"
			: "w-max min-w-120 max-w-1/2 cursor-pointer hover:scale-105 transition-transform duration-200"
	} min-h-max inline-flex m-2 flex-col items-center justify-top p-6 border-ctp-surface0 border rounded-3xl bg-ctp-base relative`;

	const layoutUpper = `${expand ? "items-start" : "items-center"} w-full gap-5 flex relative`;
	const layoutTopRight = expand
		? "flex flex-col flex-1 self-stretch"
		: "contents";

	return (
		<div className={mainDiv}>
			<div className={layoutUpper}>
				<UserIcon expand={expand} profile={profile} presence={presence} />

				<div className={layoutTopRight}>
					<UserInfo expand={expand} profile={profile} nameStyle={nameStyle} />

					<ActivityDisplay expand={expand} presence={presence} />
				</div>

				<Roles expand={expand} profile={profile} />
			</div>

			<span className="bg-ctp-surface1 w-[95%] m-4 h-px self-center" />
			<p className={expand ? "hidden" : "italic opacity-75"}>"{profile.bio}"</p>

			<Socials expand={expand} profile={profile} />
		</div>
	);
}

function Roles({ expand, profile }: { expand: boolean; profile: Profile }) {
	return expand ? (
		<ul className="flex gap-2 absolute top-0 right-0 opacity-50 text-right">
			{profile.roles.map((role) => (
				<li key={role}>
					<Image
						src={`/icons/roles/${role.toLowerCase()}.png`}
						width={16}
						height={16}
						alt={profile.roles[0]}
						className="inline-block"
					/>
					<span className="ml-1">{role}</span>
				</li>
			))}
		</ul>
	) : (
		<span className="ml-auto mb-auto">
			<p className="opacity-50" title={profile.roles.join(", ")}>
				<Image
					src={`/icons/roles/${profile.roles[0].toLowerCase()}.png`}
					width={16}
					height={16}
					alt={profile.roles[0]}
					className="inline-block"
				/>
				<span className="text-xs opacity-75 ml-1">
					{profile.roles.length <= 1 ? "" : `+${profile.roles.length - 1}`}
				</span>
			</p>
		</span>
	);
}

function UserIcon({
	expand,
	profile,
	presence,
}: {
	expand: boolean;
	profile: Profile;
	presence?: Types.Presence;
}) {
	const iconSize = expand ? 256 : 128;
	const [extIndex, setExtIndex] = useState(0);
	const extension = AVATAR_EXTENSIONS[extIndex];

	const avatar = presence?.discord_user?.avatar;

	const currentStatus =
		STATUS[presence?.discord_status ?? "offline"] ?? STATUS.offline;

	const avatarFile = `/avatars/${profile.username}.${extension}`;
	const avatarDiscord = avatar
		? `https://cdn.discordapp.com/avatars/${profile.discordId}/${avatar}.${avatar.startsWith("a_") ? "webp?animated=true" : "png"}`
		: `/avatars/${profile.username}.png`;

	const avatarSrc =
		extIndex >= AVATAR_EXTENSIONS.length ? avatarDiscord : avatarFile;

	return (
		<span className="relative">
			<Image
				src={avatarSrc}
				alt={profile.displayName}
				width={iconSize}
				height={iconSize}
				priority
				unoptimized
				onError={() =>
					setExtIndex((i) => Math.min(i + 1, AVATAR_EXTENSIONS.length))
				}
				className="flex-1 rounded-2xl border border-ctp-surface1"
			/>

			{/*{presence?.discord_user.avatar_decoration_data?.asset && (
				<Image
					src={`https://cdn.discordapp.com/avatar-decoration-presets/${presence.discord_user.avatar_decoration_data.asset}.png`}
					alt=""
					width={iconSize}
					height={iconSize}
					className="pointer-events-none absolute inset-0 z-10"
				/>
			)}*/}

			<span
				title={currentStatus.label}
				className={`${currentStatus.color} ${expand ? "size-12 border-8" : "size-8 border-6"} absolute -bottom-2 -right-2 rounded-full border-ctp-base block`}
			/>
		</span>
	);
}

function UserInfo({
	expand,
	profile,
	nameStyle,
}: {
	expand: boolean;
	profile: Profile;
	nameStyle: CSSProperties;
}) {
	const biggerOnExpand = `${expand ? `text-6xl` : "text-4xl"} text-ctp-mauve-50`;

	return (
		<div className={expand ? "flex flex-col" : "flex flex-col pr-5"}>
			<h2 className={biggerOnExpand} style={nameStyle}>
				{profile.displayName}
			</h2>
			<p className="opacity-75">@{profile.username}</p>
			<p className={expand ? "italic opacity-50 text-base" : "hidden"}>
				"{profile.bio}"
			</p>
		</div>
	);
}

function Socials({ expand, profile }: { expand: boolean; profile: Profile }) {
	return (
		<ul className={expand ? "flex-col flex w-full" : "z-10"}>
			{profile.socials.map((social) => (
				<li key={social.platform} className={expand ? "block" : "inline-block"}>
					<a
						href={social.url}
						target="_blank"
						className="bg-ctp-surface0 hover:bg-ctp-surface2 transition-background-color duration-100 hover:scale-y-104 hover:scale-x-102 rounded-full border-ctp-surface2 border m-1 p-1.5 flex gap-2 items-center"
					>
						<Image
							src={`/icons/services/${social.platform}.png`}
							alt={social.handle}
							width={32}
							height={32}
							title={`${social.handle} on ${social.platform}`}
							priority
						/>
						<span className={expand ? "" : "hidden"}>
							{`@${social.handle} on ${social.platform.slice(0, 1).toUpperCase() + social.platform.slice(1).toLowerCase()}`}
						</span>
					</a>
				</li>
			))}
		</ul>
	);
}

function getActivityTimestamp(now: number, activity?: Activity) {
	if (!activity?.timestamps) return undefined;

	const { start, end } = activity.timestamps;

	const formatTime = (ms: number) => {
		const totalSec = Math.floor(ms / 1000);
		const h = Math.floor(totalSec / 3600);
		const m = Math.floor((totalSec % 3600) / 60);
		const s = String(totalSec % 60).padStart(2, "0");

		if (h > 0) {
			const padM = String(m).padStart(2, "0");
			return `${h}:${padM}:${s}`;
		}

		return `${m}:${s}`;
	};

	// listening or watching
	if (start && end) {
		const currentMs = Math.max(0, Math.min(now - start, end - start));
		const totalMs = end - start;
		return `${formatTime(currentMs)} / ${formatTime(totalMs)}`;
	}

	// activities with elapsed time
	if (start) {
		const elapsedMs = Math.max(0, now - start);
		return `${formatTime(elapsedMs)}`;
	}

	return undefined;
}

function ActivityDisplay({
	expand,
	presence,
}: {
	expand: boolean;
	presence?: Types.Presence;
}) {
	const activity =
		presence?.activities.find((a) => a.type === 0) ??
		presence?.activities.find((a) => a.type === 2) ??
		presence?.activities.find((a) => a.type !== 4);

	const [now, setNow] = useState(Date.now());

	useEffect(() => {
		if (!activity?.timestamps?.start) return;

		const interval = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(interval);
	}, [activity?.timestamps?.start]);

	const activityImageUrl = activity ? getActivityImageUrl(activity) : null;
	const activityHeader = activity ? ACTIVITY_TYPE[activity.type] : "";
	const activityTimestamp = getActivityTimestamp(now, activity);

	if (!expand || !activity || !activityImageUrl) return null;
	return (
		<div className="border border-ctp-surface2 flex items-center mt-auto min-h-max bg-ctp-surface0 p-2 gap-2 rounded-2xl">
			<div className="relative w-32">
				<Image
					src={activityImageUrl}
					alt={activity.name}
					width={256}
					height={256}
					className="rounded-xl object-cover"
					priority
				/>
			</div>

			<div className="flex flex-col">
				<p className="text-xl text-ctp-mauve">
					{activityHeader ? `${activityHeader} ` : ""}
					{activity.name}
				</p>
				{activity.details && <p>{activity.details}</p>}
				<p>{activity.state}</p>
				{activityTimestamp !== undefined && <p>{activityTimestamp}</p>}
			</div>
		</div>
	);
}
