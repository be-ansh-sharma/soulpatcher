import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from './Firebase';
import { cleanQuote, toSeoUrl } from 'utils/Utils';
const BATCH_SIZE = 500;

export const getUserFromRemote = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.data();
  } catch (err) {
    console.log('Error getting user from remote', err);
  }
};

export const saveUserToRemote = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user.userId);
    await setDoc(userDocRef, user);
    console.log(`User ${user.userId} saved successfully!`);
  } catch (err) {
    console.log('Error saving user from remote', err);
  }
};

export const getAllTags = async () => {
  const tags = [];
  let lastVisible = null;
  let tagsCollectionRef = collection(doc(db, 'quotes', 'tag'), 'tagList');

  try {
    // Initial query to fetch the first batch of tags
    let tagsQuery = query(tagsCollectionRef, limit(BATCH_SIZE));

    while (true) {
      const querySnapshot = await getDocs(tagsQuery);

      // Add each document to the tags array
      querySnapshot.docs.forEach((doc) => {
        tags.push({
          refId: doc.id,
          ...doc.data(),
        });
      });

      // Check if there are more documents to fetch
      if (querySnapshot.docs.length < BATCH_SIZE) {
        // If we received fewer documents than the limit, we are done
        break;
      }

      // Set the last visible document to continue fetching the next batch
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Update the query to start after the last fetched document
      tagsQuery = query(
        tagsCollectionRef,
        startAfter(lastVisible),
        limit(BATCH_SIZE)
      );
    }

    return tags;
  } catch (error) {
    console.error('Error fetching tags: ', error);
    throw new Error('Failed to fetch tags');
  }
};

export const getAllAuthors = async () => {
  const authors = [];
  let lastVisible = null;
  let authorsCollectionRef = collection(
    doc(db, 'quotes', 'author'),
    'authorList'
  );

  try {
    // Initial query to fetch the first batch of authors
    let authorsQuery = query(authorsCollectionRef, limit(BATCH_SIZE));

    while (true) {
      const querySnapshot = await getDocs(authorsQuery);

      // Add each document to the authors array
      querySnapshot.docs.forEach((doc) => {
        authors.push({
          refId: doc.id,
          ...doc.data(),
        });
      });

      // Check if there are more documents to fetch
      if (querySnapshot.docs.length < BATCH_SIZE) {
        // If we received fewer documents than the limit, we are done
        break;
      }

      // Set the last visible document to continue fetching the next batch
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Update the query to start after the last fetched document
      authorsQuery = query(
        authorsCollectionRef,
        startAfter(lastVisible),
        limit(BATCH_SIZE)
      );
    }

    return authors;
  } catch (error) {
    console.error('Error fetching authors: ', error);
    throw new Error('Failed to fetch authors');
  }
};

export const getAllQuotes = async (
  lastVisible = null, // Use lastVisible instead of start
  filterType = null,
  filterValue = null
) => {
  try {
    const quotesCollectionRef = collection(
      doc(db, 'quotes', 'quote'),
      'quoteList'
    );

    // Base query to sort quotes by likes
    let baseQuery = query(quotesCollectionRef, orderBy('likes', 'desc'));

    // If no filter type is provided, fetch all quotes in batches of 500
    if (!filterType) {
      return await fetchAllQuotes(baseQuery);
    }

    // Add filtering logic based on filterType
    if (filterType === 'author' && filterValue) {
      baseQuery = query(baseQuery, where('author', '==', filterValue));
    } else if (filterType === 'tags' && filterValue) {
      baseQuery = query(
        baseQuery,
        where('tags', 'array-contains', filterValue)
      );
    }

    // Handle pagination if 'lastVisible' is provided
    if (lastVisible) {
      baseQuery = query(baseQuery, startAfter(lastVisible), limit(20));
    } else {
      baseQuery = query(baseQuery, limit(20));
    }

    // Fetch and return the quotes based on the constructed query
    return await execiteQuery(baseQuery);
  } catch (error) {
    console.error('Error fetching quotes: ', error);
    throw new Error('Failed to fetch quotes');
  }
};

// Helper function to fetch all quotes in batches of 500
const fetchAllQuotes = async (baseQuery) => {
  let allQuotes = [];
  let lastVisible = null; // Track the last fetched document
  let hasMore = true; // To loop until all quotes are fetched

  while (hasMore) {
    let quotesQuery = baseQuery;

    if (lastVisible) {
      quotesQuery = query(quotesQuery, startAfter(lastVisible));
    }

    // Fetch the quotes
    const querySnapshot = await getDocs(quotesQuery);
    const batchQuotes = querySnapshot.docs.map((doc) => ({
      refId: doc.id,
      ...doc.data(),
    }));

    allQuotes = [...allQuotes, ...batchQuotes];

    // Get the last visible document (for pagination in the next iteration)
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    // If the batch is less than 500, we have fetched all the quotes
    hasMore = querySnapshot.docs.length === 500;
  }

  return { quotes: allQuotes, lastVisible }; // Return all fetched quotes and last visible document
};

// Helper function to fetch quotes based on the constructed query
const execiteQuery = async (query) => {
  const querySnapshot = await getDocs(query);
  const quotes = querySnapshot.docs.map((doc) => ({
    refId: doc.id, // The document ID
    ...doc.data(), // The data inside the document
  }));

  // Return quotes along with the last visible document
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Track the last document for pagination
  return { quotes, lastVisible }; // Return both quotes and last visible document
};

export const getQuotesByAuthor = async (author) => {
  try {
    const quoteCollectionRef = collection(
      doc(db, 'quotes', 'quote'),
      'quoteList'
    );
    let q = query(quoteCollectionRef, where('author', '==', author));
    const querySnapshot = await getDocs(q);
    const quoteList = querySnapshot.docs.map((doc) => ({
      refId: doc.id, // The document ID
      ...doc.data(), // The data inside the document
    }));

    return quoteList;
  } catch (err) {
    console.log(err);
  }
};

export const getQuotesByTags = async (tag) => {
  try {
    const quoteCollectionRef = collection(
      doc(db, 'quotes', 'quote'),
      'quoteList'
    );
    let q = query(quoteCollectionRef, where('tags', 'array-contains', tag));
    const querySnapshot = await getDocs(q);
    const quoteList = querySnapshot.docs.map((doc) => ({
      refId: doc.id, // The document ID
      ...doc.data(), // The data inside the document
    }));

    return quoteList;
  } catch (err) {
    console.log(err);
  }
};

export const getQuote = async (refId) => {
  try {
    // Get the reference to the specific document inside the "quotes/quote/quoteList" collection
    const quoteDocRef = doc(db, 'quotes', 'quote', 'quoteList', refId);

    // Fetch the document snapshot
    const quoteDoc = await getDoc(quoteDocRef);

    // Check if the document exists
    if (quoteDoc.exists()) {
      return quoteDoc.data(); // Return the data of the quote
    } else {
      console.log('No such document exists!');
      return null;
    }
  } catch (err) {
    console.error('Error fetching quote:', err);
    return null;
  }
};

// Temp method to add quotes
export const uploadQuotesToFirebase = async () => {
  try {
    const jsonData = await import('../content/data/data.json');

    const quoteCollectionRef = collection(
      doc(db, 'quotes', 'quote'),
      'quoteList'
    );
    const tagCollectionRef = collection(doc(db, 'quotes', 'tag'), 'tagList');
    const authorCollectionRef = collection(
      doc(db, 'quotes', 'author'),
      'authorList'
    );

    for (const quote of jsonData.quotes) {
      const { message, tags, author, friendlyName } = cleanQuote(quote);

      // Step 1: Check if the quote already exists in Firestore
      const quoteQuery = query(
        quoteCollectionRef,
        where('message', '==', message)
      );
      const quoteSnapshot = await getDocs(quoteQuery);

      if (quoteSnapshot.empty) {
        // Quote doesn't exist, so add it
        await addDoc(quoteCollectionRef, cleanQuote(quote));
        console.log(`Added new quote: "${message}"`);
      } else {
        console.log(`Quote already exists: "${message}"`);
      }

      // Step 2: Add tags, checking for duplicates
      for (const tag of tags) {
        const tagQuery = query(tagCollectionRef, where('name', '==', tag));
        const tagSnapshot = await getDocs(tagQuery);

        if (tagSnapshot.empty) {
          // Tag doesn't exist, so add it
          await addDoc(tagCollectionRef, {
            name: toSeoUrl(tag),
            friendlyName: tag,
          });
          console.log(`Added new tag: "${tag}"`);
        } else {
          console.log(`Tag already exists: "${tag}"`);
        }
      }

      // Step 3: Add author, checking for duplicates
      const authorQuery = query(
        authorCollectionRef,
        where('name', '==', author)
      );
      const authorSnapshot = await getDocs(authorQuery);

      if (authorSnapshot.empty) {
        // Author doesn't exist, so add them
        await addDoc(authorCollectionRef, {
          name: author,
          friendlyName,
        });
        console.log(`Added new author: "${author}"`);
      } else {
        console.log(`Author already exists: "${author}"`);
      }
    }
  } catch (err) {
    console.log('Error uploading quotes:', err);
  }
};
