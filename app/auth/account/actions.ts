"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

function ActionError(message: string) {
  return {
    error: message,
  };
}

export async function createAccount(accountDetails: { name: string }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return ActionError("You must be signed in to perform this action.");

  let response: Response;
  try {
    response = await fetch(process.env.ACCOUNT_SERVICE as string, {
      method: "POST",
      body: JSON.stringify(accountDetails),
      headers: {
        Authorization: ("Bearer " + session.token) as string,
        "Content-Type": "application/json; utf-8",
      },
    });
  } catch (error) {
    return ActionError("Something went wrong");
  }

  if (!response.ok) {
    if (response.status === 409) return ActionError("Account already exists.");

    return ActionError("Something went wrong.");
  }

  void redirect("/", RedirectType.replace);
}
