export const convertMsToHMS = (ms: number) => {
	// 1 second = 1000 milliseconds
	// 1 minute = 60 seconds
	// 1 hour = 60 minutes

	const seconds = Math.floor((ms / 1000) % 60);
	const minutes = Math.floor((ms / (1000 * 60)) % 60);
	const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

	return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
