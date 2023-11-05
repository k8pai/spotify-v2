import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import { PlaylistData } from '../typings';
import Songs from './Songs';

const colors = [
	'from-blue-500',
	'from-indigo-500',
	'from-red-500',
	'from-green-500',
	'from-yellow-500',
	'from-pink-500',
	'from-purple-500',
	'from-zinc-500',
];

export default function Hero() {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [color, setColor] = useState<string | undefined | null>(null);
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState<PlaylistData | null>(
		playlistState,
	);

	useEffect(() => {
		setColor(() => shuffle(colors).pop());
	}, [playlistId]);

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => setPlaylist(data.body))
			.catch((err) => console.log('something went wrong'));
	}, [spotifyApi, playlistId]);

	console.log('playlist from home=> ', playlist);

	return (
		<div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
			<header className="absolute top-5 right-8">
				<div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
					<img
						className="rounded-full w-10 h-10"
						src={session?.user?.image!}
						alt=""
					/>
					<h2>{session?.user?.name}</h2>

					<ChevronDownIcon className="h-5 w-5" />
				</div>
			</header>

			<section
				className={`flex items-end bg-gradient-to-b Oto-black ${color} h-80 text-white p-8`}
			>
				<div className="flex items-end space-x-4 h-48 ">
					<img
						src={playlist?.images?.[0]?.url}
						alt=""
						className="h-48 w-48 rounded-sm shadow-2xl"
					/>
					<div className="flex flex-col min-h-full h-full space-y-4 px-1 py-2">
						<p className="text-sm capitalize">
							{playlist?.public
								? 'public playlist'
								: 'private playlist'}
						</p>
						<h1 className="flex-grow text-2xl md:text-3xl lg:text-4xl font-bold">
							{playlist?.name}
						</h1>
						<h1 className="text-xs text-zinc-400">
							{playlist?.description}
						</h1>
						<h1 className="text-xs text-zinc-200 capitalize">
							{playlist?.owner.display_name} •{' '}
							{playlist?.tracks.items.length} songs,
						</h1>
					</div>
				</div>
			</section>
			<div>
				<Songs />
			</div>
		</div>
	);
}
