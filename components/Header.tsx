import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🤖</span>
            <span className={styles.logoText}>Sistema Britto</span>
          </Link>
          
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/servicos" className={styles.link}>Serviços</Link>
            <Link href="/sobre" className={styles.link}>Sobre</Link>
            <Link href="https://blog.sistemabritto.com.br" target="_blank" className={styles.link}>Blog</Link>
          </div>
          
          <Link href="/contato" className="btn btn-primary">
            Fale Conosco
          </Link>
        </nav>
      </div>
    </header>
  );
}