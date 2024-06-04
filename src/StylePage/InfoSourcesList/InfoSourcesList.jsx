import styles from "../StylePage.module.css"

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