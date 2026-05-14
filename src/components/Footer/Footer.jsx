import { forwardRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    const emailAddress = "kiroo90@naver.com";

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            alert('이메일 주소가 복사되었습니다.');
        } catch (err) {
            alert('복사에 실패했습니다. 다시 시도해주세요.');
            console.error('복사 에러:', err);
        }
    };

    return (
        <footer ref={ref} className={styles.footer}>
            <div className={styles.box}>
                <div className={styles.cont}>
                    <span>LET'S WORK TODAY</span>
                    <h2>LET'S MAKE IT REAL.</h2>
                    <button onClick={handleCopyEmail} aria-label="이메일 주소 복사하기" title="클릭하면 이메일이 복사됩니다">CONTACT US</button>
                </div>
                <p className={styles.bgTypo} aria-hidden="true">START THE NEXT</p>
            </div>
        </footer>
    )
});

Footer.displayName = 'Footer';

export default Footer;