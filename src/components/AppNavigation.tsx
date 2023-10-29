import Link from "next/link";
import styles from "@/styles/Nav.module.css";

export default function AppNavigation({ }) {
  return (
    <ul className={styles.linkArea}>
      <li>
        <Link href={"/collectibles"}>My Collection</Link>
      </li>
      <li>
        <Link href={"/index1"}>index1</Link>
      </li>
      <li>
        <Link href={"/index2"}>index2</Link>
      </li>
      <li>
        <Link href={"/index3"}>index3</Link>
      </li>
      <li>
        <Link href={"/admin"}>admin</Link>
      </li>
    </ul>
  );
}
