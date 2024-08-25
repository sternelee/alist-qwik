import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { API } from "~/constant";
import { ErrResp, FeedsResp, IFeed, LinksResp, UserSession } from "~/types";

const TOKEN = "10xrway8zbv23g7ox0lldspuezyb8hs6pvjisglt";

const fetchFeeds = async (query: string, headers) => {
  return await fetch(`${API}/api/feeds?${query}`, { headers })
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });
};
export const useFeeds = routeLoader$(
  async ({ query, sharedMap, cacheControl }) => {
    cacheControl({
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      maxAge: 60,
    });
    const { token = TOKEN } = (sharedMap.get("user") || {}) as UserSession;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await fetchFeeds(query.toString(), headers);
    return res as FeedsResp & ErrResp;
  }
);

export const useFeedsAction = routeAction$(
  async (data, { sharedMap, redirect }) => {
    const { token = TOKEN } = (sharedMap.get("user") || {}) as UserSession;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resp = await fetch(`${API}/api/feeds`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(resp);
    return resp as IFeed & { message: string };
  }
);

export const useLinksAction = routeAction$(
  async (data, { sharedMap, redirect }) => {
    const { token = TOKEN } = (sharedMap.get("user") || {}) as UserSession;
    console.log(data);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resp = await fetch(`${API}/api/links?feedId=${data.feedId}`, {
      headers,
    }).then((res) => res.json());
    console.log(resp);
    return resp as LinksResp & { message: string };
  }
);

export default component$(() => {
  const showLinks = useSignal(false);
  const feeds = useFeeds();
  const feedsAction = useFeedsAction();
  const linksAction = useLinksAction();
  return (
    <>
      <h1>订阅管理 👋</h1>
      <div class="table">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>标题</th>
              <th>链接</th>
              <th>设备</th>
              <th>目录</th>
              <th>创建时间</th>
            </tr>
          </thead>
          <tbody>
            {(feeds.value?.data || []).map((feed, index) => (
              <tr
                key={feed.id}
                class="hover"
                onClick$={() => {
                  linksAction.submit({ feedId: feed.id });
                  showLinks.value = true;
                }}
              >
                <th>{index + 1}</th>
                <td>{feed.title}</td>
                <td>{feed.url}</td>
                <td>{feed.driver}</td>
                <td>{feed.folderName}</td>
                <td>{new Date(feed.createdOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      {showLinks.value && (
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>标题</th>
                <th>链接</th>
                <th>设备</th>
                <th>目录</th>
                <th>状态</th>
                <th>更新时间</th>
              </tr>
            </thead>
            <tbody>
              {(linksAction.value?.data || []).map((link, index) => (
                <tr key={link.id} class="hover">
                  <th>{index + 1}</th>
                  <td>{link.title}</td>
                  <td>{link.url}</td>
                  <td>{link.driver}</td>
                  <td>{link.folderId}</td>
                  <td>{link.saved ? "已存" : "等待"}</td>
                  <td>{new Date(link.updatedOn).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div class="form">
        <Form action={feedsAction}>
          <input type="text" name="title" />
          <input type="text" name="url" />
          <input type="password" name="driver" />
          <input type="password" name="folderName" />
          <button type="submit">添加</button>
        </Form>
        <p>{feedsAction.value?.message}</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "订阅管理",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
