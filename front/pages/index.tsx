import { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import songService from '../service/app.service';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import { FaPen } from "react-icons/fa";

function App() {
  const [songList, setSongList] = useState<any[]>([]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await songService.getAllSong();
        setSongList(data);
      } catch (error) {
        console.error('Failed to fetch song data:', error);
      }
    };
    fetchSong();
  }, []);

  return (
    <div className={styles['table-container']}>
      <div className={styles.headingRow}>
      <ThemeToggle/>
        <h2 className={styles.heading}>Lista de Músicas</h2>
        <Link href={`/song`} className={styles.linkHeading}>
          Criar música
        </Link>
      </div>      
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr} style={{width: "100%"}}>
            <th className={styles.th}>Artista</th>
            <th className={styles.th}>Nome</th>
            <th className={styles.th} style={{width: "15%", textAlign: "center"}}>Editar Letra</th>
          </tr>
        </thead>
        <tbody className={styles.tb}>
          {songList.length > 0 ? (
            songList.map((song) => (
              <tr key={song.id} className={styles.tr}>
                <td className={styles.td}>
                  <Link href={`/${song.id}`} className={styles.link}>
                    {song.artist}
                  </Link>
                </td>
                <td className={styles.td}>
                  <Link href={`/${song.id}`} className={styles.link}>
                    {song.name}
                  </Link>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link href={`/song/${song.id}`}>
                    <FaPen/>
                  </Link>   
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.tr}/>            
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;