import { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    const emailAddress = "kiroo90@naver.com";
    const bgRef = useRef(null);

    // 요청하신 비동기(async/await) 이메일 복사 함수
    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            alert('이메일 주소가 복사되었습니다. 테스트');
        } catch (err) {
            console.error('복사 에러:', err);
            // 구형 브라우저나 일부 환경을 위한 fallback(대비책) 추가
            fallbackCopyText(emailAddress);
        }
    };

    // navigator.clipboard가 실패했을 때 실행될 복사 함수
    const fallbackCopyText = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            alert('이메일 주소가 복사되었습니다. 테스트');
        } catch {
            alert("복사에 실패했습니다.");
        }
        document.body.removeChild(textArea);
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