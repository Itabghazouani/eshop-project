import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
            *[_type == "product"] | order(name asc)
        `);

  try {
    // Use sanity fetch to send the query
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

    // Returns the list of the products, or an empty array if none are found
    return products.data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
