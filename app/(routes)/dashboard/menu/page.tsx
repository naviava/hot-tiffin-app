import SearchInput from "~/components/search-input";
import CategoryFilter from "~/components/category-filter";
import MenuGrid from "~/components/menu-grid";

interface Props {}

export default function MenuPage({}: Props) {
  return (
    <article className="relative flex gap-x-6 md:mt-6">
      <section className="flex-1 space-y-8 px-4 lg:px-6">
        <div className="absolute -translate-y-10 translate-x-8 md:static md:translate-x-0 md:translate-y-0">
          <div className="flex w-full justify-between">
            <SearchInput placeholder="Search category or menu" />
            <button
              type="button"
              className="translate-x-24 md:translate-x-0 xl:hidden"
            >
              Orders
            </button>
          </div>
        </div>
        <CategoryFilter />
        <h2 className="text-2xl font-bold">Choose Items</h2>
        <MenuGrid />
      </section>
      <section className="hidden bg-slate-500 xl:flex">Order Section</section>
    </article>
  );
}
