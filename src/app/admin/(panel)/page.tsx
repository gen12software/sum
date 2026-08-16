import { redirect } from "next/navigation";

/** El panel tiene una sola sección: se entra directo a ella. */
export default function AdminHomePage() {
  redirect("/admin/novedades");
}
