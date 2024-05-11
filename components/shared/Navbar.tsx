import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="mb-4 flex justify-between items-center md:px-4 py-2 shadow-md">
      <Link href="/">
        <Button variant="link">
          <h2 className="text-xl md:text-3xl">Antriya</h2>
        </Button>
      </Link>
      <div>
        <Link href="/login">
          <Button variant="link">Masuk</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
