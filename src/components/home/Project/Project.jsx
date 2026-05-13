import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectItem from './ProjectItem';
import styles from './Project.module.css';

function Project(){
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const h2Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const h2 = h2Ref.current;
            const text = "featured works";
            const chars = "qwertyuiopasdfghjklzxcvbnm";
            h2.innerHTML = text.split("").map(char => 
                `<span class="char" style="display:inline-block; opacity:0; min-width: ${char === " " ? "0.3em" : "auto"}">${char}</span>`
            ).join("");

            const charElements = h2.querySelectorAll(".char");

            const playTextAnim = () => {
                if (h2.dataset.animated === "true") return;
                h2.dataset.animated = "true";

                gsap.to(charElements, {
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out"
                });

                charElements.forEach((el, i) => {
                    const finalChar = text[i];
                    if (text[i] !== " ") {
                        el.textContent = chars[Math.floor(Math.random() * chars.length)];
                    }
                    
                    gsap.to(el, {
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: "power2.out",
                        onUpdate: function() {
                            const progress = this.progress();
                            const frameGap = 1; 
                            const currentFrame = Math.floor(this.time() * 60);
                            
                            if (progress < 0.65) {
                                if (currentFrame % frameGap === 0) {
                                    el.textContent = chars[Math.floor(Math.random() * chars.length)];
                                }
                            } else {
                                el.textContent = finalChar;
                            }
                        },
                    });
                });
            };

            const mm = gsap.matchMedia();
            mm.add({
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)"
            }, (context) => {
                const { isMobile } = context.conditions;
                ScrollTrigger.create({
                    trigger: titleRef.current,
                    start: isMobile ? "-100% top" : "-50% top", 
                    onEnter: () => playTextAnim(),
                });
            });
            ScrollTrigger.create({
                trigger: titleRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: false,
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div ref={mainRef}>
            <div className={styles.secTit} ref={titleRef}>
                <h2 ref={h2Ref}>favbewnm hatua</h2>
            </div>
            <ProjectItem />
        </div>
    )
}

export default Project;  