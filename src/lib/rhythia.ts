import type { MapData, MapsResponse } from "@/types/map";

const API_URL = "https://rhythia-api.nyarw.moe";

export async function fetchMaps(params: Record<string, string> = {}) {
	const query = new URLSearchParams(params).toString();
	const res = await fetch(`${API_URL}/maps?${query}`, { cache: "no-store" });

	if (!res.ok) throw new Error(`Failed to fetch maps: ${res.status}`);

	const data = await res.json();
	return data as MapsResponse;
}

export async function fetchMap(id: string) {
	const res = await fetch(`${API_URL}/maps/${id}`, { cache: "no-store" });

	if (!res.ok) throw new Error(`Failed to fetch map: ${res.status}`);

	const data = await res.json();
	return data as MapData;
}

export function formatLength(length: number): string {
	const minutes = Math.floor(length / 60000);
	const seconds = Math.floor((length % 60000) / 1000);

	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
