import { useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Noise } from 'noisejs' // 노이즈 라이브러리 임포트

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
    
    // 노이즈 인스턴스 생성 (한 번만 생성되도록)
    const noise = useRef(new Noise(gsap.utils.random(0, 1))).current;

    const dotsState = useRef(dotItems.map(item => ({ 
        ...item, 
        currentX: 0, 
        currentY: 0, 
        currentScale: 1,
        // 각 점마다 고유한 노이즈 시작점 부여
        noiseOffset: gsap.utils.random(0, 1000) 
    })));

    useGSAP(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const mm = gsap.matchMedia();

        const resize = () => {
            if (!containerRef.current) return;
            canvas.width = containerRef.current.offsetWidth;
            canvas.height = containerRef.current.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isMobile = window.innerWidth <= 767;
            
            // 이미지 느낌을 위해 투명도는 낮추고 블러는 높게 설정
            const targetAlpha = isMobile ? 0.2 : 0.1; 
            const targetBlur = isMobile ? '40px' : '75px'; 
            
            dotsState.current.forEach(dot => {
                const vw = canvas.width / 100;
                // 노이즈 왜곡을 위해 사이즈를 기존보다 살짝 더 키움 (1.5배)
                const baseSize = dot.size * vw * dot.currentScale * 1.5;
                const centerX = (dot.left / 100) * canvas.width + dot.currentX;
                const centerY = (dot.top / 100) * canvas.height + dot.currentY;

                ctx.save();
                ctx.filter = `blur(${targetBlur})`;
                ctx.globalAlpha = targetAlpha;
                
                // 단색 채우기 (블러와 결합되어 은은하게 퍼짐)
                ctx.fillStyle = '#ffffff'; 

                ctx.beginPath();
                
                // --- 유기적 형태(Blob) 그리기 로직 ---
                const steps = 60; // 원을 60개의 점으로 쪼갬
                for (let i = 0; i <= steps; i++) {
                    const angle = (i / steps) * Math.PI * 2;
                    
                    // 시간에 따라 흐물거리는 속도 (0.0005)
                    const time = Date.now() * 0.0005; 
                    
                    // Simplex 노이즈를 이용해 반지름 왜곡값 계산
                    const n = noise.simplex3(
                        Math.cos(angle) * 1.2 + dot.noiseOffset, 
                        Math.sin(angle) * 1.2, 
                        time
                    );

                    // 기본 반지름에 노이즈 왜곡(약 30%) 추가
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
                const movementLimitX = canvas.width * 0.2; // 이동 범위 살짝 조정
                const movementLimitY = canvas.height * 0.2;

                const moveX = () => {
                    gsap.to(dot, {
                        currentX: gsap.utils.random(-movementLimitX, movementLimitX),
                        duration: gsap.utils.random(baseDuration * 1.2, baseDuration * 1.8),
                        ease: 'sine.inOut',
                        onComplete: moveX
                    });
                };

                const moveY = () => {
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
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    )
}

export default Dots;