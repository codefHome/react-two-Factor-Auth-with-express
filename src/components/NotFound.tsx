import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname.startsWith('/')) {
      navigate('/');
    } else {
      navigate('/');
    }
    setTimeout(() => {
      navigate('/not-found');
    }, 1000);
  }, [navigate]);

  return <div>NotFound</div>;
};

export default NotFound;
