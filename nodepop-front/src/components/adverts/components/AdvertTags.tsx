import { FaTag } from 'react-icons/fa';

import { ITags } from '../../../interfaces/tags.interface';

const AdvertTags = ({ tags }: { tags: ITags[] }) => {
  return (
    <div className="categories">
      <h3 className="title">
        Tags
        <FaTag />
      </h3>
      <div className="tags">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertTags;
