
import Head from 'next/head'

const Meta = ({title, keywords, description}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta charSet='utf-8' />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	)
}

Meta.defaultProps = {
	title: 'TomaTodo',
	keywords: 'time management, student, examensarbete, pomodoro, todo list, adhd, add, npf, att göra, tidsuppfattning',
	description: '',
}

export default Meta;