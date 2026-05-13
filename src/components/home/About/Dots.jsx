import { useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Noise } from 'noisejs'

const dotItems = [
    { top: 6.53, left: 11.77, size: 14.19, duration: { desktop: 10, mobile: 8 } },
    { top: 10.34, left: 54.32, size: 16.7, duration: { desktop: 10, mobile: 8 } },
    { top: 66.59, left: 3.7, size: 16.65, duration: { desktop: 10, mobile: 8 }},
    { top: 59.52, left: 56.2, size: 20.16, duration: { desktop: 10, mobile: 8 } },
    { top: 54.73, left: 84.27, size: 14.8, duration: { desktop: 10, mobile: 8 }},
    { top: 73.18, left: 89.74, size: 10.33, duration: { desktop: 10, mobile: 8 } },
];

function Dots() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const noise = useRef(new Noise(gsap.utils.random(0, 1))).current;

    const dotsState = useRef(dotItems.map(item => ({ 
        ...item, 
        currentX: 0, 
        currentY: 0, 
        currentScale: 1,
        noiseOffset: gsap.utils.random(0, 1000) 
    })));

    useGSAP(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const mm = gsap.matchMedia();

        const resize = () => {
            if (!containerRef.current) return;
            // 1. DPR(Device Pixel Ratio) 대응으로 선명도 확보
            const dpr = window.devicePixelRatio || 1;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            
            ctx.clearRect(0, 0, width, height);
            
            const isMobile = window.innerWidth <= 767;
            const targetAlpha = isMobile ? 0.2 : 0.1; 
            const targetBlur = isMobile ? '40px' : '75px'; 
            if (canvas.style.filter !== `blur(${targetBlur})`) {
                canvas.style.filter = `blur(${targetBlur})`;
                canvas.style.webkitFilter = `blur(${targetBlur})`;
            }

            dotsState.current.forEach(dot => {
                const vw = width / 100;
                const baseSize = dot.size * vw * dot.currentScale * 1.5;
                const centerX = (dot.left / 100) * width + dot.currentX;
                const centerY = (dot.top / 100) * height + dot.currentY;

                ctx.save();
                ctx.globalAlpha = targetAlpha;
                ctx.fillStyle = '#ffffff'; 

                ctx.beginPath();
                const steps = 60;
                for (let i = 0; i <= steps; i++) {
                    const angle = (i / steps) * Math.PI * 2;
                    const time = Date.now() * 0.0005; 
                    const n = noise.simplex3(
                        Math.cos(angle) * 1.2 + dot.noiseOffset, 
                        Math.sin(angle) * 1.2, 
                        time
                    );
                    const distortion = 1 + n * 0.3; 
                    const radius = (baseSize / 2) * distortion;

                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
        };
        
        gsap.ticker.add(render);

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            const { isDesktop } = context.conditions;
            const deviceType = isDesktop ? "desktop" : "mobile";

            dotsState.current.forEach((dot) => {
                const baseDuration = dot.duration[deviceType];
                const moveX = () => {
                    const movementLimitX = containerRef.current.offsetWidth * 0.2;
                    gsap.to(dot, {
                        currentX: gsap.utils.random(-movementLimitX, movementLimitX),
                        duration: gsap.utils.random(baseDuration * 1.2, baseDuration * 1.8),
                        ease: 'sine.inOut',
                        onComplete: moveX
                    });
                };

                const moveY = () => {
                    const movementLimitY = containerRef.current.offsetHeight * 0.2;
                    gsap.to(dot, {
                        currentY: gsap.utils.random(-movementLimitY, movementLimitY),
                        duration: gsap.utils.random(baseDuration * 0.7, baseDuration * 1.1),
                        ease: 'sine.inOut',
                        onComplete: moveY
                    });
                };

                gsap.to(dot, {
                    currentScale: 1.15,
                    duration: gsap.utils.random(3, 5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                moveX();
                moveY();
            });
        });

        return () => {
            window.removeEventListener('resize', resize);
            gsap.ticker.remove(render);
            mm.revert();
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{position:'absolute',top: 0,left:0, width: '100%', height: '100%', overflow: 'hidden', background: 'transparent' }}>
            <canvas ref={canvasRef} style={{ display: 'block',willChange: 'filter, transform' }} />
        </div>
    )
}

export default Dots;