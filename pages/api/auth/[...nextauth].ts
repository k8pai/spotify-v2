import nextAuth, { Awaitable } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';
import { JWT } from 'next-auth/jwt';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
	try {
		spotifyApi.setAccessToken(token.accessToken as string);
		spotifyApi.setRefreshToken(token.refreshToken as string);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

export default nextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '',
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at! * 1000,
				};
			}

			if (Date.now() < token.accessTokenExpires!) {
				return token;
			}

			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken as string;
			session.user.refreshToken = token.refreshToken as string;
			session.user.username = token.username as string;
			session.error = token.error!;

			return session;
		},
	},
});
