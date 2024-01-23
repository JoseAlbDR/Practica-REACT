import { ITags } from '../../interfaces/tags.interface';
import { ErrorComponent, Spinner } from '.';
import { useSelector } from 'react-redux';
import { getTags, getUi } from '../../store/selectors';

interface FormRowTagsProps {
  tags?: ITags[] | undefined;
  disabled?: boolean;
}

const FormRowTags = ({ tags = undefined, disabled }: FormRowTagsProps) => {
  const renderTags = useSelector(getTags);
  const { isFetching } = useSelector(getUi);

  return (
    <div className="form-row">
      <label className="form-label">tags</label>
      {tags?.length === 0 && isFetching && (
        <ErrorComponent message="Select At Least One Tag" />
      )}
      <fieldset className="form-tags">
        {isFetching ? (
          <Spinner />
        ) : (
          renderTags?.map((tag: ITags) => (
            <label key={tag}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                className="input-check"
                disabled={disabled}
                // defaultChecked={tags && tags.includes(tag)}
              />
              {tag}
            </label>
          ))
        )}
      </fieldset>
    </div>
  );
};

export default FormRowTags;
