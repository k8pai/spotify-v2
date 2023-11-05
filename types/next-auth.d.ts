import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			accessToken: string;
			refreshToken: string;
			username: string;
		} & DefaultSession['user'];
		error?: 'RefreshAccessTokenError';
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		username?: string;
		accessTokenExpires?: number;
		error?: 'RefreshAccessTokenError';
	}
}
