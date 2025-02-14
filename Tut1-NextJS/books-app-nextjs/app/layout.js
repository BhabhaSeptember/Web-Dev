import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bhabha's Book List",
  description: "A list of read books and future reads",
  keyword: "tech books, tech tutorials, web developer, self-improvement"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {/*================== NAVIGATION BAR ================== */}

<div className="navbar bg-base-100">
  <div className="flex-1">
    <Link href="/" className="btn btn-ghost normal-case text-xl">Bhabha's Book List</Link>
  </div>
  <div className="flex-none gap-2">
  <ul className="menu menu-horizontal px-1"> <li><Link
href="/about">About</Link></li> <li><Link href="/about/contact">Contact</Link></li>
<li><Link href="/githubusers">GitHub Users</Link></li> </ul>
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>


        {children}
      </body>
    </html>
  );
}
