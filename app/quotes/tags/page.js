import { unstable_cache } from 'next/cache';
import { getAllAuthors, getAllTags } from 'services/Firestore';
import Refinements from 'components/refinements/Refinements';

const getFilterData = unstable_cache(
  async () => {
    try {
      let tags = await getAllTags();
      tags = tags.sort((a, b) => a.name.localeCompare(b.name));
      return {
        tags,
      };
    } catch (err) {
      console.log(err);
    }
  },
  ['tag-cache'],
  { revalidate: 184000 }
);

export default async function Page() {
  const result = await getFilterData();
  if (!result) {
    return;
  }
  return (
    <div>
      <Refinements list={result.tags} type='tags' />
    </div>
  );
}
