import { Link } from 'react-router-dom';

const EmptyAdverts = () => {
  return (
    <h2>
      Currently there are no Adverts, do you want to{' '}
      <Link to="new" className="create-link">
        Create One?
      </Link>
    </h2>
  );
};

export default EmptyAdverts;
