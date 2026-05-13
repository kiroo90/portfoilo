import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './List.module.css';

const leftProject = ['LightKeeper', 'illiyoon', 'AnyCasting', 'Sulwhasoo', 'Laneige', 'Make-On', 'Stans', 'AP Middleware Admin', 'Mslifix', 'Hanwha Convergence', 'YIPL', 'AnyCasting-AnyDesign', 'Webmoa', 'KUMHO ELECTRIC,INC.', 'UrbanPort', 'TSD Life Sciences', 'Myung-Il Foamtec.', 'Kyeong An Industry', 'Paratus Investment', 'JCFTechnology ', 'AnyCasting-3DP', 'Joil Ent.', 'Dasarang Hospital', 'Reply Cafe24 StoreApp', 'AyunchePro Mall Maint.', 'FirstLaw P.C', 'SNU-hongcheon', 'RedCap Career','Krafton Web Maint.', 'MonasPump', 'SMPMC Career', 'SoRimTech', 'MalgnSoft', 'Geneall Bio', 'ENC Tech', 'Scotra', 'ITRC', 'RedCap'];

const rightProject = ['B.Ready', 'AutoSeed', 'Stop Hunger', 'Curiosis', 'NextLab', 'Abise', 'Curiox', 'PriceBot Cafe24 StoreApp', 'Kdone', 'Korea Shipping Cor.', 'Saenu', 'INHA UNIVERSITY', 'Qucell', 'Innovotherapeutics', 'ICM Bio', 'SatComForum', 'BYD AJ Rental', 'Arun Ltd.', 'DaeHeungWood', 'AmosPro Mall Maint.', 'Chung-Ryong Ent.', 'AyunchePro Mall Maint.', 'LogenSoft', 'Prompt Hub Admin', 'inmarkasset', 'Medicoson', 'Buwon Service', 'DesignWu-Dio', 'hiperWall', 'AP Color Station', 'Avalostx', 'KoreaHoist', 'JS-Interger', 'The N Corp.', 'JinoMotors', 'Biltech'];

const leftLogoImg = [
    '/img/img-logo01.png','/img/img-logo02.png','/img/img-logo03.png','/img/img-logo04.png','/img/img-logo05.png','/img/img-logo06.png','/img/img-logo07.png','/img/img-logo08.png',
]

const rightLogoImg = [
    '/img/img-logo09.png','/img/img-logo10.png','/img/img-logo11.png','/img/img-logo12.png','/img/img-logo13.png','/img/img-logo14.png','/img/img-logo15.png','/img/img-logo16.png',
]

const leftRollingLogoImg = [...leftLogoImg, ...leftLogoImg, ...leftLogoImg, ...leftLogoImg];
const rightRollingLogoImg = [...rightLogoImg, ...rightLogoImg, ...rightLogoImg, ...rightLogoImg];

function List(){
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isMobile } = context.conditions;
            const moveAmount = isMobile ? 40 : 60;

            const leftItems = gsap.utils.toArray(`.${styles.left} li`);
            leftItems.forEach((li, i) => {
                gsap.fromTo(li,
                    { opacity: 0, x: i * -15 },
                    {
                        opacity: 1,
                        force3D: true,
                        x: 0,
                        scrollTrigger: {
                            trigger: li,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1.2,
                            invalidateOnRefresh: true,
                        }
                    }
                );
            });

            const rightItems = gsap.utils.toArray(`.${styles.right} li`);
            rightItems.forEach((li, i) => {
                gsap.fromTo(li,
                    { opacity: 0, x: i * 20 },
                    {
                        opacity: 1,
                        x: 0,
                        force3D: true,
                        scrollTrigger: {
                            trigger: li,
                            start: "top 95%",
                            end: "top 65%",
                            scrub: 1.2,
                            invalidateOnRefresh: true,
                        }
                    }
                );
            });

            gsap.to(leftRef.current, {
                y: -moveAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    force3D: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });

            gsap.to(rightRef.current, {
                y: moveAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    force3D: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
        });
        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <>
            <div className={styles.listWrap} ref={containerRef}>
                <h2>INDEX</h2>
                <div className={styles.listBox}>
                    <ul className={styles.left} ref={leftRef}>
                        {leftProject.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <ul className={styles.right} ref={rightRef}>
                        {rightProject.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.rollingLogo}>
                    <div className={`${styles.logoWrap} ${styles.logoWrapLeft}`}>
                        {leftRollingLogoImg.map((item, idx) => (
                            <figure key={`${item}-${idx}`}><img src={item} alt="" /></figure>
                        ))}
                    </div>
                    <div className={`${styles.logoWrap} ${styles.logoWrapRight}`}>
                        {rightRollingLogoImg.map((item, idx) => (
                            <figure key={`${item}-${idx}`}><img src={item} alt="" /></figure>
                        ))}
                    </div>
            </div>
        </>
    )
}

export default List 