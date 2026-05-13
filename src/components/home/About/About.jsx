import { useEffect, useRef } from 'react';
import Dots from './Dots'
import styles from './About.module.css';



function About() {
    const pBoxRef = useRef(null);
    const boxRef = useRef(null);
    
    const mousePos = useRef({ x: 0, y: 0 }); 
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    
    const isInside = useRef(false);
    const entranceFactor = useRef(0);

    useEffect(() => {
        const pBox = pBoxRef.current;
        if (!pBox) return;
        let animationId = 0;

        const handleMouseMove = (e) => {
            isInside.current = true;
            const rect = boxRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mousePos.current.y = (e.clientX - centerX) * 0.03;
            mousePos.current.x = (e.clientY - centerY) * -0.03;
        };

        const handleMouseLeave = () => {
            isInside.current = false;
        };

        const animate = (time) => {
            const goalX = isInside.current ? Math.max(-15, Math.min(15, mousePos.current.x)) : 0;
            const goalY = isInside.current ? Math.max(-15, Math.min(15, mousePos.current.y)) : 0;
            if (isInside.current) {
                entranceFactor.current += (1 - entranceFactor.current) * 0.02;
            } else {
                entranceFactor.current = 0;
            }
            const lerpSpeed = isInside.current 
                ? (0.05 * entranceFactor.current) 
                : 0.015;

            targetPos.current.x += (goalX - targetPos.current.x) * lerpSpeed;
            targetPos.current.y += (goalY - targetPos.current.y) * lerpSpeed;
            let waveX = 0;
            let waveY = 0;
            if (!isInside.current) {
                waveX = Math.sin(time * 0.001) * 4;
                waveY = Math.cos(time * 0.0005) * 5;
            }
            const finalX = targetPos.current.x + waveX;
            const finalY = targetPos.current.y + waveY;

            currentPos.current.x += (finalX - currentPos.current.x) * 0.1;
            currentPos.current.y += (finalY - currentPos.current.y) * 0.1;

            if (boxRef.current) {
                boxRef.current.style.transform = 
                `rotateX(${currentPos.current.x}deg) rotateY(${currentPos.current.y}deg)`;
            }

            animationId = requestAnimationFrame(animate);
        };

        pBox.addEventListener('mousemove', handleMouseMove);
        pBox.addEventListener('mouseleave', handleMouseLeave);
        animationId = requestAnimationFrame(animate);

        return () => {
            pBox.removeEventListener('mousemove', handleMouseMove);
            pBox.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section className={styles.visual}>
            <Dots />
            <div className={styles.pBox} ref={pBoxRef}>
                <div className={styles.card} ref={boxRef}>
                    <div className={styles.flex}>
                        <figure><img src="" alt="Lee Dong-geun" /></figure>
                        <div className={styles.wrap}>
                            <div className={styles.titBox}>
                                <h2>Lee Dong-geun<span>Sr. Web Publisher</span></h2>
                                <span>Web Publisher</span>
                            </div>
                            <ul className={styles.stats}>
                                <li>
                                    <span>TYPE</span>
                                    <p>Publisher</p>
                                </li>
                                <li>
                                    <span>XP</span>
                                    <p>6 yrs</p>
                                </li>
                                <li>
                                    <span>BASE</span>
                                    <p>Seoul</p>
                                </li>
                            </ul>
                            <div className={styles.infoBox}>
                                <p>
                                    새로운 기술과 스크립트에 관심이 많은 퍼블리셔입니다.<br />
                                    다양한 프로젝트를 통해 디자인을 웹으로 구현하며 경험을 쌓아왔습니다.<br />
                                    효율적이고 완성도 높은 퍼블리싱으로 더 나은 사용자 경험을 만들고자 합니다.
                                </p>
                                <ul>
                                    <li>
                                        <span>웹모아 - 퍼블리싱팀</span>
                                        2020.08 ~ 2024.04
                                    </li>
                                    <li>
                                        <span>위버로프트 - UX팀</span>
                                        2024.08 ~ 2026.04
                                    </li>
                                </ul>
                            </div>
                            <ul className={styles.skills}>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>jQuery</li>
                                <li>반응형웹</li>
                                <li>Cross Browsing</li>
                                <li>PHP</li>
                                <li>Figma</li>
                                <li>XD</li>
                                <li>Photoshop</li>
                                <li>GSAP</li>
                                <li>React</li>
                                <li>Cafe24</li>
                                <li>웹표준 / 웹접근성</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <span><img src="/img/icon-dot01.svg" alt="점 아이콘" /> No.001</span>
                        <span>2026 - KR</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About; 