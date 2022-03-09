import Link from 'next/link';

const Custom404 = () => {
	return (
		<div>
			<h1>404</h1>
			<h2>hoppsan, nånting gick snett.</h2>
			<Link href="/" passHref>
			<button>gå till startsidan</button>
			</Link>
		</div>
	)
}

export default Custom404;