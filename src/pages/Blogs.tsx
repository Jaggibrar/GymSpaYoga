
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new blog list page
    navigate('/blogs', { replace: true });
  }, [navigate]);

  return null;
};

export default Blogs;
