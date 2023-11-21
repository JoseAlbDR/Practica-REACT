import { useLoaderData } from 'react-router-dom';
import { ITags } from '../interfaces/tags.interface';
import { createContext, useContext, ReactNode } from 'react';

interface TagContextValues {
  tags: ITags[];
}

const TagsContext = createContext<TagContextValues | undefined>(undefined);

const TagsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { tags } = useLoaderData() as TagContextValues;

  return (
    <TagsContext.Provider value={{ tags }}>{children}</TagsContext.Provider>
  );
};

const useTags = () => {
  const context = useContext(TagsContext);

  if (context === undefined)
    throw new Error('TagsContext was used outsie TagsProvider');

  return context;
};

export { TagsProvider, useTags };
