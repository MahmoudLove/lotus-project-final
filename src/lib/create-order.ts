import { hygraphClient, gql } from '@/lib/hygraph-mutation';
import handleError from './handleError';

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`;

const createOrder = async (customer: any, orders: any) => {
  try {
    const data = await hygraphClient.request<any>(createOrderMutation, {
      order: {
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        note: customer.note ?? '',
        total: Number(orders.reduce((acc: any, order: any) => acc + order.itemTotal, 0)),
        orderItems: {
          create: orders.map((order: any) => ({
            productName: order?.size
              ? order.name + ' ' + order.size + ` (Quantity: ${order.quantity})` + ` (Fragrance: ${order.fragrance})`
              : order.name + ` (Quantity: ${order.quantity})`,
            quantity: Number(order.quantity),
            total: Number(order.itemTotal),
            fragrance: order?.fragrance ?? '',
            productVariant: {
              connect: {
                id: order?.id,
              },
            },
          })),
        },
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    handleError(error, 'add order');
  }
};

export default createOrder;
