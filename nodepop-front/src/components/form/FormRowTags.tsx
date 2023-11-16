import { useLoaderData } from 'react-router-dom';
import { ITags } from '../../interfaces/tags.interface';

interface FormRowTagsProps {
  tags?: ITags[] | undefined;
}

const FormRowTags = ({ tags = undefined }: FormRowTagsProps) => {
  const renderTags = useLoaderData() as ITags[];

  return (
    <div className="form-row">
      <label className="form-label">tags</label>
      <fieldset className="form-tags">
        {renderTags.map((tag: ITags) => (
          <label key={tag}>
            <input
              type="checkbox"
              name="tags"
              value={tag}
              className="input-check"
              defaultChecked={tags && tags.includes(tag)}
            />
            {tag}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default FormRowTags;
