"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default function SettingsAnchor() {
  return (
    <Button asChild className="fixed top-4 left-4 z-50">
      <Link
        href="/configure"
        className={`${buttonVariants({ variant: "secondary" })} mt-[7px]`}
      >
        ⚙️
      </Link>
    </Button>
  );
}
