"use client";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				className="absolute inset-0 bg-black/25 backdrop-blur-lg transition-all duration-250 starting:opacity-0 starting:backdrop-blur-none"
				onClick={() => router.back()}
				type="button"
				aria-label="Close"
			/>
			<div className="relative transition-all duration-400 starting:opacity-0 starting:scale-75 starting:blur-sm">
				{children}
			</div>
		</div>
	);
}
