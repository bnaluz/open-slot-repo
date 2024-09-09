import { useSelector } from 'react-redux';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

const Home = () => {
  const user = useSelector((state) => state.session.user);

  return <div>{user ? <LoggedIn /> : <NotLoggedIn />}</div>;
};

export default Home;
