import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import { Playlist, PlaylistData } from '../typings';
import SpotifyWebApi from 'spotify-web-api-node';
import Image from 'next/image';
import { convertMsToHMS } from '../lib/helpers';
import { Table } from '@radix-ui/themes';

const Song = ({
	track,
	order,
}: {
	track: Playlist['tracks'];
	order: number;
}) => {
	return (
		<Table.Row style={{ color: 'whitesmoke' }}>
			<Table.Cell>{order}</Table.Cell>
			<Table.Cell>
				<div className="flex overflow-hidden flex-nowrap items-center space-x-2">
					<Image
						src={track?.album.images?.[0].url ?? ''}
						alt={track?.name ?? ''}
						height={40}
						width={40}
						className="rounded-md shadow-sm"
					/>
					<div>
						<div>{track?.name}</div>
						<div>
							{track?.artists
								.map((artist) => artist.name)
								.join(', ')}
						</div>
					</div>
				</div>
			</Table.Cell>
			<Table.Cell className="hidden xl:block">
				<div>{track?.album.name}</div>
			</Table.Cell>
			<Table.Cell>{convertMsToHMS(track?.duration_ms!)}</Table.Cell>
		</Table.Row>
	);
};

const Songs = () => {
	const playlist = useRecoilValue<PlaylistData | null>(playlistState);

	console.log('playlist => ', playlist);

	return (
		<div className="text-white px-8 flex flex-col space-y-2 pb-28">
			<Table.Root variant="ghost" style={{ color: 'whitesmoke' }}>
				<Table.Header color="#fff">
					<Table.Row>
						<Table.ColumnHeaderCell className="text-zinc-400">
							#
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="text-zinc-400">
							Title
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="text-zinc-400 hidden xl:block">
							Album
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="text-zinc-400">
							Duration
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				{playlist?.tracks.items.map((item, _) => {
					return (
						<Song
							key={item?.track?.id}
							track={item?.track}
							order={_ + 1}
						/>
					);
				})}
			</Table.Root>
		</div>
	);
};

export default Songs;
