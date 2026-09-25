export interface Mapper {
	id: string;
	name: string;
}

export interface MapData {
	id: string;
	legacyId: string | null;
	title: string;
	artist: string;
	mappers: Mapper[];
	difficulty: number;
	difficultyName: string | null;
	length: number;
	noteCount: number;
	createdAt: string;
	updatedAt: string;
	coverUrl: string | null;
	audioUrl: string | null;
	fileUrl: string;
}

export interface MapsResponse {
	maps: MapData[];
	total: number;
	limit: number;
	offset: number;
}
