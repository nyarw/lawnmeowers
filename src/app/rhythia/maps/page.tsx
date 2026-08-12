import Image from "next/image";
import Link from "next/link";

import { fetchMaps, formatLength } from "@/lib/rhythia";

export default async function MapsPage() {
	const { maps } = await fetchMaps({ limit: "20" });

	return (
		<section className="container mx-auto max-w-270 mt-16">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{maps.map((map) => (
					<Link
						href={`/rhythia/maps/${map.id}`}
						key={map.id}
						className="group relative block"
					>
						<div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-ctp-mauve">
							<Image
								src={
									map.coverUrl
										? `https://rhythia-api.nyarw.moe${map.coverUrl}`
										: "/defaults/cail.png"
								}
								alt={map.title}
								sizes="1024px"
								fill
								priority
								className="object-cover group-hover:scale-105 group-hover:brightness-55 duration-300"
							></Image>
							<div className="absolute inset-x-0 bottom-0 z-20 p-1">
								<div className="rounded-2xl border border-ctp-mauve bg-ctp-surface0/75 p-2 backdrop-blur-sm">
									<div className="line-clamp-1 text-base font-semibold text-ctp-text">
										{map.title} - {map.artist}
									</div>
									<p className="mt-0 block truncate text-sm text-ctp-text/50">
										Mapped by{" "}
										{map.mappers?.map((mapper) => mapper.name).join(", ")}
									</p>
									<div className="mt-2 flex items-center justify-between gap-2 text-sm text-ctp-text/75">
										<div className="flex items-center gap-1">
											<Image
												src="/defaults/cail.png" // replace with difficulty icon
												alt="difficulty"
												width={24}
												height={24}
											></Image>
											<span className="font-bold">{map.difficulty}</span>
										</div>
										<div className="flex items-center gap-1">
											<Image
												src="/defaults/cail.png" // replace with clock icon
												alt="clock"
												width={24}
												height={24}
											></Image>
											<span className="font-bold">
												{formatLength(map.length)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
