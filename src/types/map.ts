export interface Mapper {
	id: string;
	name: string;
}

export interface Map {
	id: string;
	legacyId: string | null;
	title: string;
	artist: string;
	mappers: Mapper[];
	difficulty: number;
	difficultyName: string | null;
	length: number;
	noteCount: number;
	coverKey: string | null;
	createdAt: string;
}

export interface MapsResponse {
	maps: Map[];
	total: number;
	limit: number;
	offset: number;
}
