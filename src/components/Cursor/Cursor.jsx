import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const Cursor = () => {
    const dotRef = useRef(null); 
    const circleRef = useRef(null); 
    const hoverTargets = 'a, button';
    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            window.requestAnimationFrame(() => {
                if (dotRef.current) {
                    dotRef.current.style.transform = `translate3d(${clientX - 3}px, ${clientY - 3}px, 0)`;
                }
                if (circleRef.current) {
                    circleRef.current.style.transform = `translate3d(${clientX - 20}px, ${clientY - 20}px, 0)`;
                }
            });
        };
        const handleHover = (e) => {
            if (e.target.closest(hoverTargets)) {
                circleRef.current?.classList.add(styles.active);
                dotRef.current?.classList.add(styles.active);
            }
        };

        const handleHoverOut = (e) => {
            if (e.target.closest(hoverTargets)) {
                circleRef.current?.classList.remove(styles.active);
                dotRef.current?.classList.remove(styles.active);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mouseout', handleHoverOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mouseout', handleHoverOut);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className={styles.dot} />
            <div ref={circleRef} className={styles.circle} />
        </>
    );
};

export default Cursor;