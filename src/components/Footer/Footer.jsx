import { forwardRef, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = forwardRef((props, ref) => {
    const emailAddress = 'kiroo90@naver.com';

    const bgRef = useRef(null);

    // 이메일 복사
    const handleCopyEmail = async () => {
        let copied = false;

        // 최신 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(emailAddress);

                copied = true;

                alert('이메일 주소가 복사되었습니다.');

                return;
            } catch (err) {
                console.warn(
                    'Clipboard API 실패 → fallback 실행',
                    err
                );
            }
        }

        // 이미 성공했으면 fallback 방지
        if (copied) return;

        // fallback 방식
        try {
            const textArea = document.createElement('textarea');

            textArea.value = emailAddress;

            // 화면 영향 제거
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';

            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();

            // iOS 대응
            textArea.setSelectionRange(0, 99999);

            const successful = document.execCommand('copy');

            document.body.removeChild(textArea);

            if (!successful) {
                throw new Error('execCommand copy 실패');
            }

            alert('이메일 주소가 복사되었습니다.');
        } catch (err) {
            console.error('모든 복사 방식 실패:', err);

            alert(
                `복사에 실패했습니다.\n직접 복사해주세요:\n${emailAddress}`
            );
        }
    };

    // 마우스 좌표 업데이트
    const updateCoord = (e) => {
        if (!bgRef.current) return;

        // 모바일 mouseleave / touch 이벤트 보호
        if (
            typeof e.clientX !== 'number' ||
            typeof e.clientY !== 'number'
        ) {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        bgRef.current.style.setProperty('--x', `${x}px`);
        bgRef.current.style.setProperty('--y', `${y}px`);
    };

    // 마우스 이탈 시 중앙 복귀
    const handleMouseLeave = () => {
        if (!bgRef.current) return;

        bgRef.current.style.setProperty('--x', '50%');
        bgRef.current.style.setProperty('--y', '50%');
    };

    return (
        <footer ref={ref} className={styles.footer}>
            <div className={styles.box}>
                <div className={styles.cont}>
                    <span>LET&apos;S WORK TODAY</span>

                    <h2>LET&apos;S MAKE IT REAL.</h2>

                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        onMouseMove={updateCoord}
                        onMouseLeave={handleMouseLeave}
                        aria-label="이메일 주소 복사하기"
                        title="클릭하면 이메일이 복사됩니다"
                    >
                        <span
                            ref={bgRef}
                            className={styles.hover_bg}
                        />

                        <span className={styles.btnText}>
                            CONTACT US
                        </span>
                    </button>
                </div>

                <p
                    className={styles.bgTypo}
                    aria-hidden="true"
                >
                    START THE NEXT
                </p>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;