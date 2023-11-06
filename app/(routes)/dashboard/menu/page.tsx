import MenuGrid from "~/components/menu-grid";
import SearchInput from "~/components/search-input";
import OrderPanel from "~/components/orders/order-panel";
import CategoryFilter from "~/components/category-filter";
import MobileOrderCheckout from "~/components/orders/mobile-order-checkout";

export default function MenuPage() {
  return (
    <article className="relative flex gap-x-6 md:mt-6">
      <section className="flex-1 flex-shrink-0 space-y-8 bg-neutral-50 px-4 transition lg:px-6 xl:max-w-6xl">
        <div className="absolute -translate-y-10 translate-x-8 md:static md:translate-x-0 md:translate-y-0">
          <div className="flex w-full justify-between">
            <SearchInput placeholder="Search by item name..." />
            <MobileOrderCheckout />
          </div>
        </div>
        <CategoryFilter />
        <h2 className="text-2xl font-bold">Choose Items</h2>
        <MenuGrid />
      </section>
      <OrderPanel />
    </article>
  );
}
