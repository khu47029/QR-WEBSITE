import { constructNoIndexMetadata } from "@/lib/seo/metadata";

export const metadata = constructNoIndexMetadata("Sign In");

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
