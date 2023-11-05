export type PlaylistType = SpotifyApi.PlaylistObjectSimplified[];
export type PlaylistData = SpotifyApi.SinglePlaylistResponse;

export type Playlist = {
	data: SpotifyApi.SinglePlaylistResponse;
	tracks: SpotifyApi.TrackObjectFull | null;
	owner: SpotifyApi.SinglePlaylistResponse['owner'];
};
