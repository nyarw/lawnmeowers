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
			<div className="rounded-2xl border-2 border-ctp-mauve bg-ctp-base overflow-hidden">
				<div className="relative isolate overflow-hidden h-64">
					<div className="absolute inset-0">
						<Image
							src={
								map.coverUrl
									? `https://rhythia-api.nyarw.moe${map.coverUrl}`
									: "/defaults/cail.png"
							}
							alt={map.title}
							sizes="1024px"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-ctp-base via-ctp-base/40 to-transparent" />
					</div>
					<div className="relative px-4 py-4 sm:px-6 sm:py-6">
						<div className="flex flex-col gap-4">
							<div className="flex items-start justify-between gap-4">
								<div className="flex flex-1 flex-col items-start gap-4 sm:flex-row">
									<div className="relative aspect-video w-full shrink-0 rounded-2xl border-2 border-ctp-mauve overflow-hidden sm:h-36 sm:w-36 sm:aspect-auto">
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
									<div className="flex w-full flex-col items-center gap-2 pt-0.5 text-center sm:w-auto sm:items-start sm:text-left">
										<h1 className="pb-1.5 text-2xl font-bold font-['gg_sans'] leading-tight sm:truncate sm:text-4xl">
											{map.title}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
