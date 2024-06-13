import styles from "../StylePage.module.css"

/**
 * The component with list of sources of information shown in tooltips. It's used on style page.
 * @component
 * @param {Object} props - This component accepts _infoSources_ as props.
 * @param {string[]} props.infoSources - List of URLs where I got information from.
 * @returns {React.JSX.Element} The rendered InfoSourcesList component.
 */

export default function InfoSourcesList({infoSources}) {
  return (
    <div className={styles["info-sources-list"]}>
      <h2>Источники информации</h2>
      <ul>
        {infoSources.map((item, index) => 
          <li key={`info-source-${index + 1}`}><a href={item.url}>{item.description}</a></li>
        )}
      </ul>
    </div>
  );
}