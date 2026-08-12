import ProfileCard from "@/components/ProfileCard";
import Section from "@/components/Section";
import profilesData from "@/data/profiles.json";
import type { Profile } from "@/types/profile";

export default function Members({ active }: { active: boolean }) {
	return (
		<Section id="members" active={active}>
			<h2 className="text-3xl m-5 mb-auto">Our Members</h2>
			<ul className="m-5 flex flex-wrap justify-center max-w-[90vw] w-4/5 min-w-2xl">
				{(profilesData.profiles as Profile[]).map((profile) => (
					<ProfileCard
						key={profile.username}
						profile={profile}
						expand={false}
					/>
				))}
			</ul>
		</Section>
	);
}
