import styles from "../StylePage.module.css";

/**
 * The component with list of sources. It's reusable and appears on style page.
 * @component
 * @param {Object} props - This component accepts _sources_ and _title_ as props.
 * @param {string} props.title - Title of list;
 * @param {string[]} props.sources - List of URLs where I got information from.
 * @returns {React.JSX.Element} The rendered InfoSourcesList component.
 */

export default function SourcesList({title, explanation="", sources}) {
  return (
    <div className={styles["sources-list"]}>
      <h2 tabIndex={0}>{title}</h2>
      {explanation ? 
        <span className={styles["explanation"]} tabIndex={0}>{explanation}</span>
      : ""}
      <ul>
        {sources.map((item, index) => 
          <li key={`source-${index + 1}`}><a href={item.url}>{item.description}</a></li>
        )}
      </ul>
    </div>
  );
}