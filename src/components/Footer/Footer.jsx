import { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    const emailAddress = "kiroo90@naver.com";
    const bgRef = useRef(null);

    // 모바일 및 인앱 브라우저 호환성을 위한 하이브리드 복사 함수
    const handleCopyEmail = async () => {
        // 1. 최신 navigator.clipboard 기능이 지원되는지 확인
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(emailAddress);
                alert('이메일 주소가 복사되었습니다...');
                return; // 성공 시 함수 종료
            } catch (err) {
                console.warn('Navigator clipboard 실패, 대체 방식으로 전환합니다:', err);
                // 실패 시 아래의 fallback(구형 방식) 코드로 넘어감
            }
        }

        // 2. [Fallback] 구형 방식 및 인앱 브라우저용 (textarea 생성)
        const textArea = document.createElement("textarea");
        textArea.value = emailAddress;
        
        // 화면이 튀지 않도록 스타일 고정
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        
        // 텍스트 선택 및 복사 실행
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999); // 모바일 iOS 대응

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('이메일 주소가 복사되었습니다.');
            } else {
                throw new Error('복사 명령 실패');
            }
        } catch (err) {
            alert('복사에 실패했습니다. 직접 복사해주세요: ' + emailAddress);
            console.error('모든 복사 방식 실패:', err);
        } finally {
            document.body.removeChild(textArea); // 생성했던 요소 제거
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
                        onClick={handleCopyEmail} 
                        onMouseMove={updateCoord} 
                        onMouseLeave={updateCoord} 
                        aria-label="이메일 주소 복사하기" 
                        title="클릭하면 이메일이 복사됩니다"
                        type='button'
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