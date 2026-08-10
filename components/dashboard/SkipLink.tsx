import s from "./dashboard.module.css";

/* Every page opens with the same nav; without this a keyboard user tabs
   through all of it before reaching content, on every page. */
export default function SkipLink() {
  return (
    <a className={s.skipLink} href="#main">
      Skip to content
    </a>
  );
}
