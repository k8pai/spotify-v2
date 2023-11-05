import { signIn } from 'next-auth/react';
import React from 'react';

const login = () => {
	return (
		<div>
			<button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
				login
			</button>
		</div>
	);
};

export default login;
