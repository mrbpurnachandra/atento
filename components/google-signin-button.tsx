"use client";

import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

export default function GoogleSigninButton(props: ButtonProps) {
  return (
    <Button {...props} onClick={() => void signIn("google")}>
      Sign in with Google
    </Button>
  );
}
