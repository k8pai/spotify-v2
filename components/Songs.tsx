import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import { Playlist, PlaylistData } from '../typings';
import SpotifyWebApi from 'spotify-web-api-node';
import Image from 'next/image';
import { convertMsToHMS } from '../lib/helpers';
import { Box, Card, Flex, Grid, Table, Text } from '@radix-ui/themes';

const Song = ({
	track,
	order,
}: {
	track: Playlist['tracks'];
	order: number;
}) => {
	return (
		<Grid columns="2" gap="6">
			<Box className="p-2 w-full box-border truncate">
				<Flex className="items-center justify-around">
					<Text as="div" size="2" className="w-6">
						{order}
					</Text>
					<div className="box-border ">
						<Flex gap="3" align="center">
							<Image
								src={track?.album.images?.[0]?.url ?? ''}
								alt={track?.name ?? ''}
								height={40}
								width={40}
								className="rounded-md shadow-sm"
							/>
							<Box>
								<Text
									as="div"
									size="2"
									weight="bold"
									className="text-white w-full truncate"
								>
									{track?.name}
								</Text>
								<Text
									as="div"
									size="2"
									className="text-inherit"
								>
									{track?.artists
										.map((artist) => artist.name)
										.join(', ')}
								</Text>
							</Box>
						</Flex>
					</div>
				</Flex>
			</Box>
			<Box className="p-2">
				<Flex
					align={'center'}
					justify={'between'}
					className="items-center lg:justify-between justify-between"
				>
					<div className=" ">
						<div>{track?.album.name}</div>
					</div>
					<div className="">
						{convertMsToHMS(track?.duration_ms!)}
					</div>
				</Flex>
			</Box>
		</Grid>
	);
};

const Songs = () => {
	const playlist = useRecoilValue<PlaylistData | null>(playlistState);

	console.log('playlist => ', playlist);
	return (
		<div className="px-8 text-zinc-500">
			{playlist?.tracks.items.map((item, _) => {
				return (
					<Song
						key={item?.track?.id}
						track={item?.track}
						order={_ + 1}
					/>
				);
			})}
		</div>
	);
};

export default Songs;
