export const enum LocalStorageKey {
  THEME = "alist-theme",
}

export interface UserSession {
  token: string;
  id: string;
  name: string;
  email: string;
  password: null;
  role: "editor" | "user" | "admin";
  plan: null;
  createdOn: number;
  updatedOn: number;
  userId: string;
}

export interface Result<T> {
  total: number;
  data: T[];
}

export interface IFeed {
  id: string;
  title: string;
  url: string;
  userId: string;
  wxUid: string;
  driver: string;
  folderId: string;
  folderName: string | null;
  regexp: string;
  createdOn: number;
  updatedOn: number;
  total: number;
}

export type FeedsResp = Result<IFeed>;

export interface ErrResp {
  message: string;
  ok: boolean;
}

export interface ILink {
  id: string;
  url: string;
  title: string;
  checked: 0 | 1;
  saved: 0 | 1;
  feedId: string;
  userId: string;
  driver: string;
  folderId: string;
  createdOn: number;
  updatedOn: number;
}

export type LinksResp = Result<ILink>;
