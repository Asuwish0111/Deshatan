import { redirect } from "next/navigation";

// The reference site uses one route for search, and so do we now. This stays
// so existing links — the hero CTA among them — keep working.
export default function BookSearchRedirect() {
  redirect("/book");
}
