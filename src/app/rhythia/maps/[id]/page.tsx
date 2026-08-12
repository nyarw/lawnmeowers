import Image from "next/image";

import { fetchMap } from "@/lib/rhythia";

export default async function MapPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const map = await fetchMap(id);

	return (
		<section className="container mx-auto max-w-270 mt-16">
			<div className="rounded-2xl border-2 border-ctp-mauve bg-ctp-surface0 overflow-hidden">
				<div className="relative isolate overflow-hidden h-64">
					<div className="absolute inset-0">
						<Image
							src={
								map.coverUrl
									? `https://rhythia-api.nyarw.moe${map.coverUrl}`
									: "/defaults/cail.png"
							}
							alt={map.title}
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
