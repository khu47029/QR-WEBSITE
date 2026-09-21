import { constructNoIndexMetadata } from "@/lib/seo/metadata";

export const metadata = constructNoIndexMetadata("Create Free Account");

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
