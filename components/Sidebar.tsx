import {
	HomeIcon,
	MagnifyingGlassIcon,
	BuildingLibraryIcon,
	PlusCircleIcon,
	HeartIcon,
	RssIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import SpotifyWebApi from 'spotify-web-api-node';
import { PlaylistType } from '../typings';

// type Playlist = {
// 	items: SpotifyApi.PlaylistObjectSimplified[];
// };

export default function Sidebar() {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [playlist, setPlaylist] = useState<PlaylistType>([]);
	const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi
				.getUserPlaylists()
				.then((data) => setPlaylist(data.body.items));
		}
	}, [session, spotifyApi]);

	// console.log(playlistId);

	return (
		<div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray h-screen overflow-y-scroll scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem]">
			<div className="space-y-4">
				<button className="flex items-center space-x-2 hover:text-white">
					<HomeIcon className={'h-5 w-5'} />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<MagnifyingGlassIcon className={'h-5 w-5'} />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<BuildingLibraryIcon className={'h-5 w-5'} />
					<p>Library</p>
				</button>
				<hr />
				<button className="flex items-center space-x-2 hover:text-white">
					<PlusCircleIcon className={'h-5 w-5'} />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className={'h-5 w-5'} />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className={'h-5 w-5'} />
					<p>Your Episodes</p>
				</button>
				<hr />

				{playlist.map(({ id, name }, _) => {
					return (
						<p
							key={id}
							onClick={() => setPlaylistId(id)}
							className="space-y-2 cursor-pointer hover:text-white"
						>
							{name}
						</p>
					);
				})}
			</div>

			{session ? (
				<div>
					<div>{session.user?.name}</div>
					<button onClick={() => signOut()}>Sign Out</button>
				</div>
			) : (
				<button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
					login
				</button>
			)}
		</div>
	);
}
