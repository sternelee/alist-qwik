import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { DocumentHead } from "@builder.io/qwik-city";
import { API } from '~/constant';

export const useFeeds = routeLoader$(async ({ sharedMap }) => {
	const { token = '10xrway8zbv23g7ox0lldspuezyb8hs6pvjisglt' } = sharedMap.get("user") || {};
	const headers = {
		Authorization: `Bearer ${token}`,
	};
  const response = await fetch(`${API}/v1/api/feeds`, {
    headers,
  });

  const feeds = await response.json();
  return feeds;
});

export default component$(() => {
  const feeds =  useFeeds()
  console.log('feeds: ', feeds.value)
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        准备登陆了!
        <br />
        Happy coding.
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
