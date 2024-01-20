import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GoogleSigninButton from "@/components/google-signin-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default async function Signin() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/", RedirectType.replace);

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Join Atento</CardTitle>
          <CardDescription>Sign in to track your life.</CardDescription>
        </CardHeader>
        <CardContent>
          Begin your journey of self-reflection and mindfulness.
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-4">
            <Link className={buttonVariants({ variant: "link" })} href="/about">
              Learn More
            </Link>
            <GoogleSigninButton />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
