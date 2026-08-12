import { notFound } from "next/navigation";

import Modal from "@/components/Modal";
import ProfileCard from "@/components/ProfileCard";
import profilesData from "@/data/profiles.json";
import type { Profile } from "@/types/profile";

export default async function ProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	const profile = (profilesData.profiles as Profile[]).find(
		(p) => p.username === username,
	);
	if (!profile) notFound();

	return (
		<Modal>
			<ProfileCard profile={profile} expand={true} />
		</Modal>
	);
}
