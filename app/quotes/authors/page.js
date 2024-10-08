import { unstable_cache } from 'next/cache';
import { getAllAuthors, getAllTags } from 'services/Firestore';
import Refinements from 'components/refinements/Refinements';

const getFilterData = unstable_cache(
  async () => {
    try {
      let authors = await getAllAuthors();
      authors = authors.sort((a, b) => a.name.localeCompare(b.name));
      return {
        authors,
      };
    } catch (err) {
      console.log(err);
    }
  },
  ['author-cache'],
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
      <Refinements list={result.authors} type='authors' />
    </div>
  );
}
