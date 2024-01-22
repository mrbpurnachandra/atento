import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateAccountForm from "@/components/create-account-form";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

export default async function CreateAccount() {
  const session = await getServerSession(authOptions);

  if (session?.account) redirect("/", RedirectType.replace);

  return (
    <div className="mt-8 flex flex-col items-center justify-between">
      <h1 className="font-semibold text-4xl">
        How would you like to be addressed?
      </h1>

      <p className="mt-4">
        The name you provide here will be used as a display name.
      </p>

      <div className="mt-8">
        <CreateAccountForm name={session?.user?.name} />
        <div className="mt-4 text-sm text-muted-foreground">
          Don&apos;t want to create account?
          <a href="#" className="ml-1 font-semibold underline">
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}
