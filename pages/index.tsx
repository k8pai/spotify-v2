import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/Hero';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import Songs from '../components/Songs';

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
};

const Home: NextPage = () => {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<main className="flex">
				<Sidebar />
				<Hero />
			</main>
			{/* <div className="playersection">
				<Songs />
			</div> */}
		</div>
	);
};

export default Home;
