import { Theme } from '@radix-ui/themes';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

const Provider = ({
	session,
	children,
}: {
	session: Session;
	children: ReactNode;
}) => {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Theme accentColor="mint" grayColor="gray">
					{children}
				</Theme>
			</RecoilRoot>
		</SessionProvider>
	);
};

export default Provider;
