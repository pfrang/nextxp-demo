import React from 'react'
import styles from './Header.module.css';
import { getUrl, MetaData } from '@enonic/nextjs-adapter';
import { useRouter } from 'next/router';

export interface HeaderProps {
  title: string;
  logoUrl: string;
  meta: MetaData;
}


const Header = ({ title, logoUrl, meta }: HeaderProps) => {
  const router = useRouter()
  return <header className={styles.header}>
    <div className={styles.wrapper}>
      {title && (
        <h1>
          <a href={getUrl('/', meta)}>{title}</a>
        </h1>
      )}
      {logoUrl && (
        <img src={logoUrl}
          width={33}
          height={40}
          alt={"Enonic XP logo"}
        />
      )}
      <button onClick={() => router.push('/logg-inn')}>Logg inn</button>
    </div>
  </header>
};

export default Header
