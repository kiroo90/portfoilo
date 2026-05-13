import { forwardRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    return (
        <footer ref={ref} className={styles.footer}>
            <div className={styles.box}>
                <div className={styles.cont}>
                    <span>LET'S WORK TODAY</span>
                    <h2>LET'S MAKE IT REAL.</h2>
                    <button>CONTACT US</button>
                </div>
                <p className={styles.bgTypo}>START THE NEXT</p>
            </div>
        </footer>
    )
});
Footer.displayName = 'Footer';
export default Footer