import { unstable_cache } from 'next/cache';
import { getAllAuthors, getAllTags } from 'services/Firestore';
import Refinements from 'components/refinements/Refinements';

const getFilterData = unstable_cache(
  async () => {
    try {
      let authors = await getAllAuthors();
      let tags = await getAllTags();
      authors = authors.sort((a, b) => a.name.localeCompare(b.name));
      tags = tags.sort((a, b) => a.name.localeCompare(b.name));
      return {
        authors,
        tags,
      };
    } catch (err) {
      console.log(err);
    }
  },
  ['filter-cache'],
  { revalidate: 184000 }
);

export default async function Page() {
  const result = await getFilterData();
  if (!result) {
    console.log('some some');
    return;
  }
  return (
    <div>
      <Refinements list={result.tags} type='tags' />
      <Refinements list={result.authors} type='authors' />
    </div>
  );
}
