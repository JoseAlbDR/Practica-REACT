import { ITags } from '../../interfaces/tags.interface';
import { useTags } from '../../context/TagsContext';
import { ErrorComponent } from '.';

interface FormRowTagsProps {
  tags?: ITags[] | undefined;
  disabled?: boolean;
}

const FormRowTags = ({ tags = undefined, disabled }: FormRowTagsProps) => {
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
              disabled={disabled}
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
