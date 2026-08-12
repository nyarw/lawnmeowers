"use client";
import { useRouter } from "next/navigation";

import ProfileCard from "@/components/ProfileCard";
import Section from "@/components/Section";
import profilesData from "@/data/profiles.json";
import type { Profile } from "@/types/profile";

export default function Members({ active }: { active: boolean }) {
	const router = useRouter();

	return (
		<Section id="members" active={active}>
			<h2 className="text-3xl m-5 mb-auto">Members</h2>
			<ul className="m-5 flex flex-wrap justify-center max-w-3/4 min-w-2xl">
				{(profilesData.profiles as Profile[]).map((profile) => (
					<ProfileCard
						key={profile.username}
						profile={profile}
						expand={false}
						action={() =>
							router.push(`/${profile.username}#members`, { scroll: false })
						}
					/>
				))}
			</ul>
		</Section>
	);
}
