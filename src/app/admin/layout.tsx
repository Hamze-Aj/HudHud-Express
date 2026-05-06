import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — HudHud Express',
  description: 'Admin panel for managing branch information.',
  robots: 'noindex, nofollow',
};

// This layout intentionally does NOT include Navbar/Footer
// so the admin page has its own clean shell.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
