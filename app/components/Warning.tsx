import Link from "next/link";

export default function Warning() {
  return (
    <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
      ⚠ Beware of crypto scams! 
      <Link href="/warning" className="underline ml-2 text-blue-800 hover:text-blue-600">
        Learn More
      </Link>
    </div>
  );
}
