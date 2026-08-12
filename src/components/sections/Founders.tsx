import { useRouter } from "next/navigation";

import Section from "@/components/Section";
import profilesData from "@/data/profiles.json";
import type { Profile } from "@/types/profile";

import ProfileCard from "../ProfileCard";

export default function Founders({ active }: { active: boolean }) {
	const router = useRouter();

	return (
		<Section id="founders" active={active}>
			<h2 className="text-3xl m-5 mb-auto">Founders</h2>
			<ul className="m-5 flex flex-wrap justify-center max-w-[90vw] w-4/5 min-w-2xl">
				{(profilesData.profiles as Profile[])
					.filter((w) => w.roles.includes("Founder"))
					.map((profile) => (
						<ProfileCard
							key={profile.username}
							profile={profile}
							expand={false}
							action={() =>
								router.push(`/${profile.username}#founders`, { scroll: false })
							}
						/>
					))}
			</ul>
		</Section>
	);
}
