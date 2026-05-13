import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Project.module.css';

const projectData = [
    {
        id: 1,
        title: '라네즈',
        tags: '#Cafe24 #플랫폼 #반응형 #쇼핑몰 #이관구축',
        desc: `라네즈 공식 쇼핑몰 이관 구축 프로젝트의 퍼블리싱을 담당했습니다.
        카페24 플랫폼 환경에 맞춰 기존 기능을 유지하면서도
        시스템 구조에 적합하도록 기능을 커스터마이징하여 구축했습니다.
        웹 표준과 접근성을 고려해 안정적이고 일관된 사용자 경험을 구현했습니다.`,
        video: '/video/laneige.mp4',
        link: 'https://laneige.com/'
    },
    {
        id: 2,
        title: '프리메라',
        tags: '#Cafe24 #플랫폼 #반응형 #쇼핑몰 #이관구축',
        desc: `프리메라 공식 쇼핑몰 이관 구축 프로젝트의 퍼블리싱을 담당했습니다.
        카페24 플랫폼 환경에 맞춰 기존 기능을 유지하면서도
        시스템 구조에 적합하도록 기능을 커스터마이징하여 구축했습니다.
        웹 표준과 접근성을 고려해 안정적이고 일관된 사용자 경험을 구현했습니다.`,
        video: '/video/prmrbeauty.mp4',
        link: 'https://www.prmrbeauty.com/'
    },
    {
        id: 3,
        title: '메이크온',
        tags: '#Cafe24 #플랫폼 #반응형 #쇼핑몰 #신규구축 #GDWEB',
        desc: `메이크온 공식 쇼핑몰의 퍼블리싱을 담당했습니다.
        카페24 플랫폼 기반으로 커스터마이징을 진행해 브랜드 맞춤형 UI를 구현하고,
        웹 접근성과 SEO를 고려해 HTML/CSS 구조를 설계했습니다.
        GSAP을 활용해 메인 페이지의 핵심 인터랙션을 개발하여
        시각적 완성도와 브랜드 아이덴티티를 강화했습니다.`,
        video: '/video/makeon.mp4',
        link: 'https://make-on.com/'
    },
    {
        id: 4,
        title: '경동원 - 세라텍사업부',
        tags: '#친환경, #건설자재, #경동나비엔지주사, #단열재, #건축자재',
        desc: `경동원 공식 홈페이지의 퍼블리싱을 담당했습니다.
        반응형 웹 구조로 설계하여 다양한 디바이스 환경에서도 일관된 사용자 경험을 제공했고,
        웹 접근성과 SEO를 고려해 HTML/CSS를 최적화했습니다.
        JavaScript와 jQuery를 활용해 UI 인터랙션을 구현했으며,
        풀페이지 스크롤 라이브러리를 활용해 부드러운 전환 효과를 구현했습니다.`,
        video: '/video/kdone.mp4',
        link: 'https://ceprod.kdone.co.kr/kr/index.asp'
    },
    {
        id: 5,
        title: '한화컨버전스',
        tags: '#그린에너지, #솔루션, #한화계열사, #스마트팩토리, #IT, #GDWEB, #ESG, #AI',
        desc: `한화컨버전스 공식 웹사이트 퍼블리싱을 담당했습니다.
        웹 접근성과 브라우저 호환성을 고려해 구조를 설계하고,
        정적 페이지와 UI 인터랙션을 HTML/CSS/JavaScript로 구현했습니다.
        메인 페이지에는 제이쿼리를 활용해 직접 제작한 풀페이지 스크롤 스크립트를 적용하여,
        부드럽고 안정적인 전환 효과를 구현했습니다.`,
        video: '/video/hanwha.mp4',
        link: 'https://hanwhaconvergence.com/kr/'
    },
];

function ProjectItem(){
    const container = useRef();
    const txtContainerRef = useRef();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // 1024px보다 클 때만 실행되는 가드 (Desktop)
        mm.add("(min-width: 1025px)", () => {
            const items = gsap.utils.toArray(`.${styles.item}`);
            const txtBoxes = txtContainerRef.current
                ? gsap.utils.toArray(txtContainerRef.current.querySelectorAll(`.${styles.txtBox}`))
                : [];
            const videoBoxes = gsap.utils.toArray(`.${styles.videoBox}`);

            // 1. 메인 핀 고정 스크롤 트리거
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "bottom 75%",
                pin: txtContainerRef.current,
                pinSpacing: false,
                invalidateOnRefresh: true,
                pinType: "transform",
            });

            // 2. 개별 아이템 애니메이션 루프
            items.forEach((item, i) => {
                const videoBox = item.querySelector(`.${styles.videoBox}`);
                const targetTxt = txtBoxes[i];

                // 텍스트 등장/퇴장 (ToggleActions)
                gsap.fromTo(targetTxt, 
                    { autoAlpha: 0, zIndex: 1 },
                    {
                        autoAlpha: 1,
                        zIndex: 50,
                        duration: 0.3,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 30%",
                            end: "bottom 30%",
                            toggleActions: "play reverse play reverse", 
                            onLeave: () => gsap.set(targetTxt, { zIndex: 1 }),
                            onLeaveBack: () => gsap.set(targetTxt, { zIndex: 1 }),
                        }
                    }
                );

                // 비디오 박스 스케일 인 (Scrub)
                gsap.fromTo(videoBox, 
                    { opacity: 0.8, scale: 0.8, force3D: true }, 
                    {
                        opacity: 1,
                        scale: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        }
                    }
                );

                // 비디오 박스 스케일 아웃 (Scrub)
                gsap.fromTo(videoBox, 
                    { opacity: 1, scale: 1, force3D: true }, 
                    {
                        opacity: 0.9,
                        scale: 0.9,
                        scrollTrigger: {
                            trigger: item,
                            start: "-10% top",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );
            });
            ScrollTrigger.refresh();
            return () => {
                // GSAP이 부여한 인라인 스타일(pin, transform, opacity 등)을 모두 제거합니다.
                // pin이 걸렸던 txtContainerRef와 애니메이션 대상들을 모두 포함하세요.
                gsap.set([txtContainerRef.current, txtBoxes, videoBoxes], { 
                    clearProps: "all" 
                });
            };
        });

        // Cleanup: 컴포넌트 언마운트나 미디어 쿼리 변경 시 자동으로 모든 애니메이션 제거
        return () => mm.revert();

    }, { scope: container });

    return (
        <div className={styles.projectWrap} ref={container}>
            {/* 1. 텍스트 박스들이 모여있는 고정 컨테이너 */}
            <div className={styles.txtContainer} ref={txtContainerRef}>
                {projectData.map((item) => (
                    <div key={item.id} className={styles.txtBox}>
                        <h3>{item.title} <span className={styles.linkWrap}><a href={item.link} className={styles.linkBtn} target='_blank' rel="noreferrer">WebSite</a></span></h3>
                        <span>{item.tags}</span>
                        <p>
                            {item.desc.split('\n').map((line, idx) => (
                                <span key={idx}>
                                    {line}<br />
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
            {/* 2. 스크롤 트리거 및 비디오가 들어있는 실제 섹션들 */}
            <div className={styles.innerBox}>
                {projectData.map((item) => (
                    <div className={styles.item} key={item.id}>
                        <div className={styles.videoBox}>
                            <video autoPlay muted playsInline loop>
                                <source src={item.video} type="video/mp4" />
                            </video>
                        </div>
                        <div className={`${styles.mobileTxtBox} ${styles.txtBox}`} >
                            <h3>{item.title} <span className={styles.linkWrap}><a href={item.link} className={styles.linkBtn} target='_blank' rel="noreferrer">WebSite</a></span></h3>
                            <span>{item.tags}</span>
                            <p>
                                {item.desc.split('\n').map((line, idx) => (
                                    <span key={idx}>
                                        {line}<br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ProjectItem;  