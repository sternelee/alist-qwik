import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <ul
      class="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0 justify-center"
      role="tablist"
    >
      <li role="presentation">
        <Link
          href="/admin"
          class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          role="tab"
          aria-controls="tabs-home"
          aria-selected="true"
        >
          帐号
        </Link>
      </li>
      <li role="presentation">
        <Link
          href="/admin/drivers"
          class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          role="tab"
          aria-controls="tabs-messages"
          aria-selected="false"
        >
          云盘
        </Link>
      </li>
      <li role="presentation">
        <Link
          href="/admin/feeds"
          class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          role="tab"
          aria-controls="tabs-contact"
          aria-selected="false"
        >
          订阅
        </Link>
      </li>
    </ul>
  );
});
