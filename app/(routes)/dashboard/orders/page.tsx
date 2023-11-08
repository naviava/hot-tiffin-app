import { OrderStatus } from "@prisma/client";

import OrdersList from "~/components/orders-page/orders-list";
import OrdersFilter from "~/components/orders-page/orders-filter";
import OrderPaymentPanel from "~/components/orders-page/order-payment-panel";

import { serverClient } from "~/app/_trpc/server-client";

interface Props {
  searchParams: { orderStatus: OrderStatus };
}

export default async function OrdersPage({ searchParams }: Props) {
  const orders = await serverClient.order.getAllOrders({
    status: searchParams.orderStatus,
  });

  return (
    <article className="flex gap-x-6 md:mt-6">
      <section className="mt-2 flex-1 flex-shrink-0 space-y-8 bg-neutral-50 px-4 transition lg:px-6 xl:max-w-6xl">
        <OrdersFilter />
        {!!orders && orders.length > 0 ? (
          <OrdersList orders={orders} />
        ) : (
          <p>No orders found</p>
        )}
      </section>
      <OrderPaymentPanel />
    </article>
  );
}
