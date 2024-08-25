import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import type { DocumentHead, JSONObject } from "@builder.io/qwik-city";
import { API } from "~/constant";

const fetchLogin = async ({ email, password }: JSONObject) => {
  return await fetch(`${API}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });
};

export const useLogin = routeAction$(async (data, { sharedMap, redirect }) => {
  const resp = await fetchLogin(data);
  console.log(resp);
  if (resp.token) {
    sharedMap.set("user", {
      token: resp.token,
      ...resp.data,
    });
    return redirect(302, "/admin");
  }
  return resp;
});

export const useRegister = routeAction$(
  async (data, { sharedMap, redirect }) => {
    const res = await fetch(`${API}/auth/users/`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });
    if (res.status === 201) {
      const resp = await fetchLogin(data);
      if (resp.token) {
        sharedMap.set("user", {
          token: resp.token,
          ...resp.data,
        });
        return redirect(302, "/admin");
      }
    }
    return await res.json();
  }
);

export default component$(() => {
  const loginAction = useLogin();
  const registerAction = useRegister();
  return (
    <>
      <h1>登陆 👋</h1>
      <div class="login">
        <Form action={loginAction}>
          <input type="text" name="email" />
          <input type="password" name="password" />
          <button type="submit">登陆</button>
        </Form>
      </div>
      <div class="register">
        <Form action={registerAction}>
          <input type="text" name="name" />
          <input type="text" name="email" />
          <input type="password" name="password" />
          <input type="password" name="confirmPassword" />
          <button type="submit">注册</button>
        </Form>
        <p>{registerAction.value?.message}</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "登陆管理",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
