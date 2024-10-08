import Quotes from 'components/quotes/Quotes';
import { getAllTags, getQuotesByTags } from 'services/Firestore';

export default async function Page({ params }) {
  const { categoryId } = params;

  const quoteList = await getQuotesByTags(categoryId);

  return <Quotes type='tag' list={quoteList} id={categoryId} />;
}

export async function generateStaticParams() {
  let tags = await getAllTags();
  return tags.map((tag) => ({
    categoryId: tag.name,
  }));
}
