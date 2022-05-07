import '../styles/globals.scss';
import { StoreProvider } from '../context/UserStore';
import Layout from '../components/Layout';
import { TodoWrapper } from '../context/TodoContext';

function MyApp({ Component, pageProps }) {
  return (
	  <StoreProvider>
		<TodoWrapper>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</TodoWrapper>
	  </StoreProvider>
  )
}

export default MyApp;
