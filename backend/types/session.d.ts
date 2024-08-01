import "express-session";

declare module "express-session" {
  interface Session {
    redirect?: string | undefined;
  }
}

export interface Session {
  redirect?: string;
}
