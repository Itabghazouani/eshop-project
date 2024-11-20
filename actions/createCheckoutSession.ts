'use server';

import { imageUrl } from '@/lib/imageUrl';
import stripe from '@/lib/stripe';
import { IBasketItem } from '@/store/store';

export type TMetadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type TGroupedBasketItem = {
  product: IBasketItem['product'];
  quantity: number;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_BASE_URL;

export const createCheckoutSession = async (
  items: TGroupedBasketItem[],
  metadata: TMetadata,
) => {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Some items do not have a price');
    }

    // Search for existing customer
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || 'Unnamed product',
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout blalbla session: ', error);
    throw error;
  }
};
