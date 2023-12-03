import { OrderStatus } from "@prisma/client";

import { Skeleton } from "~/components/ui/skeleton";
import OrdersList from "~/components/orders-page/orders-list";
import OrdersFilter from "~/components/orders-page/orders-filter";
import OrderPaymentPanel from "~/components/orders-page/order-payment-panel";

import { serverClient } from "~/app/_trpc/server-client";

interface Props {
  searchParams: { orderStatus: OrderStatus };
}

export default async function OrdersPage({ searchParams }: Props) {
  const orders = await serverClient.order.getAllOrders({
    status:
      searchParams.orderStatus in OrderStatus
        ? searchParams.orderStatus
        : undefined,
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

// function OrdersListSkeleton() {
//   return (
//     <div className="space-y-6">
//       {Array(3)
//         .fill(null)
//         .map((_, idx) => (
//           <div key={idx} className="space-y-6">
//             <div className="grid flex-1 grid-cols-2 rounded-2xl bg-white p-4">
//               <div className="space-y-1">
//                 <Skeleton className="h-7 w-[12.5rem]" />
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-5 w-14" />
//               </div>
//               <div className="flex flex-col items-end justify-start gap-y-4">
//                 <Skeleton className="h-7 w-[4.5rem]" />
//                 <div className="flex items-center gap-x-4">
//                   <Skeleton className="h-7 w-16" />
//                   <Skeleton className="h-6 w-16 rounded-full" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
