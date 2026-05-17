import { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    const emailAddress = "kiroo90@naver.com";
    const bgRef = useRef(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            alert('이메일 주소가 복사되었습니다. 테스트');
        } catch (err) {
            console.error('복사 에러:', err);
        }
    };

    const updateCoord = (e) => {
        if (!bgRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        bgRef.current.style.setProperty('--x', `${x}px`);
        bgRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <footer ref={ref} className={styles.footer}>
            <div className={styles.box}>
                <div className={styles.cont}>
                    <span>LET'S WORK TODAY</span>
                    <h2>LET'S MAKE IT REAL.</h2>
                    <button 
                        type='button'
                        onClick={handleCopyEmail} 
                        onMouseMove={updateCoord} 
                        onMouseLeave={updateCoord} 
                        aria-label="이메일 주소 복사하기" 
                        title="클릭하면 이메일이 복사됩니다"
                    >
                        <span ref={bgRef} className={styles.hover_bg}></span>
                        <span className={styles.btnText}>CONTACT US</span>
                    </button>
                </div>
                <p className={styles.bgTypo} aria-hidden="true">START THE NEXT</p>
            </div>
        </footer>
    ); 
});

Footer.displayName = 'Footer';

export default Footer;