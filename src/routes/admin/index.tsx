import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import AdminTabs from "~/components/AdminTabs";
import { API, TOKEN } from "~/constant";
import type { UserSession, User } from "~/types";

export const useUser = routeLoader$(async ({ sharedMap, cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 60,
  });
  const { token = TOKEN } = (sharedMap.get("user") || {}) as UserSession;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${API}/auth/verify`, {
    headers,
  });

  const user = (await response.json()) as {
    authenticated: {
      user: User;
    };
  };
  return user.authenticated.user;
});

export default component$(() => {
  const user = useUser();
  console.log("user: ", user.value);
  return (
    <>
      <h1 class="text-lg ml-10">Hi 👋</h1>
      <AdminTabs />
      <div class="flex flex-col max-w-[18rem] rounded-lg mt-20 m-auto text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
        <ul class="w-full">
          <li class="w-full border-b-2 border-neutral-100 border-opacity-100 px-4 py-3  dark:border-white/10">
            {user.value.name}
          </li>
          <li class="w-full border-b-2 border-neutral-100 border-opacity-100 px-4 py-3  dark:border-white/10">
            {user.value.email}
          </li>
          <li class="w-full border-b-2 border-neutral-100 border-opacity-100 px-4 py-3  dark:border-white/10">
            {user.value.role}
          </li>
        </ul>
        <div class="rounded-lg border-neutral-100 bg-zinc-50 p-4 dark:border-white/10 dark:bg-neutral-700">
          更新
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Alist admin",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
