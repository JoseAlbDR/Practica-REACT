import { ITags } from '../../interfaces/tags.interface';
import { useTags } from '../../context/TagsContext';
import ErrorComponent from '../shared/ErrorComponent';

interface FormRowTagsProps {
  tags?: ITags[] | undefined;
}

const FormRowTags = ({ tags = undefined }: FormRowTagsProps) => {
  const { tags: renderTags } = useTags();

  return (
    <div className="form-row">
      <label className="form-label">tags</label>
      {tags?.length === 0 && (
        <ErrorComponent message="Select At Least One Tag" />
      )}
      <fieldset className="form-tags">
        {renderTags?.map((tag: ITags) => (
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
