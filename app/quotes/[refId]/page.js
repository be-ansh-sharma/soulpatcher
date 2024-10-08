import Body from 'components/quotes/quote/body/Body';
import Similar from 'components/quotes/quote/similar/Similar';
import { getAllQuotes, getQuote } from 'services/Firestore';

export default async function Page({ params }) {
  let { refId } = params;
  let quote = await getQuote(refId);

  return (
    <div>
      <Body quote={quote} />
      <Similar author={quote.author} />
    </div>
  );
}

export async function generateStaticParams() {
  let { quotes } = await getAllQuotes();
  return quotes.map((quote) => ({ refId: quote.refId }));
}
