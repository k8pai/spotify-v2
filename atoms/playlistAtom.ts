import { RecoilState, atom } from 'recoil';
import { PlaylistData } from '../typings';

export const playlistState: RecoilState<PlaylistData | null> =
	atom<PlaylistData | null>({
		key: 'playlistState',
		default: null,
	});

export const playlistIdState: RecoilState<string> = atom({
	key: 'playlistIdState',
	default: '11yiFLw8yKCCN6ITBBYZhk',
});
