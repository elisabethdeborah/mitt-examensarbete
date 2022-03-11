import '../styles/globals.scss';
import Layout from '../components/Layout';
import {TodoWrapper} from '../context/TodoContext';

function MyApp({ Component, pageProps }) {
  return (
	  <TodoWrapper>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	  </TodoWrapper>
  )
}

export default MyApp;
