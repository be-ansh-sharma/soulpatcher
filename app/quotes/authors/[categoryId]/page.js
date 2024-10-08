import Quotes from 'components/quotes/Quotes';
import { getQuotesByAuthor, getAllAuthors } from 'services/Firestore';

export default async function Page({ params }) {
  const { categoryId } = params;

  const quoteList = await getQuotesByAuthor(categoryId);

  return <Quotes type='author' list={quoteList} id={categoryId} />;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ categoryId: author.name }));
}
