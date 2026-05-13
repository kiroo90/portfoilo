import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import About from '../components/home/About/About'
import Project from '../components/home/Project/Project';
import List from '../components/home/List/List';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, TextPlugin);

function Home() {
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    

    useLayoutEffect(() => {
        const resetScroll = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        resetScroll();
        requestAnimationFrame(resetScroll);
        const timerId = window.setTimeout(resetScroll, 0);

        window.addEventListener('beforeunload', resetScroll);

        return () => {
            window.clearTimeout(timerId);
            window.removeEventListener('beforeunload', resetScroll);
        };
    }, []);

    useGSAP(() => {
        const existingSmoother = ScrollSmoother.get();
        if (existingSmoother) {
            existingSmoother.kill();
        }

        ScrollTrigger.clearScrollMemory();
        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1.8,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
            ignoreMobileResize: false,
        });
        const refresh = () => ScrollTrigger.refresh();
        smoother.scrollTo(0, false);

        window.scrollTo(0, 0);
        window.addEventListener('resize', refresh);
        window.addEventListener('orientationchange', refresh);

        return () => {
            window.removeEventListener('resize', refresh);
            window.removeEventListener('orientationchange', refresh);
            smoother.kill();
        };
    }, []);

    return (
        <div id="smooth-wrapper" ref={wrapperRef}>
            <main id="smooth-content" ref={contentRef} >
                <div style={{ background: '#f9f9f9'}}>
                    <About />
                    <Project />
                    <List />
                </div>
                <div style={{ 
                    height: 'var(--footer-height)', 
                    width: '100%', 
                    pointerEvents: 'none'
                }} />
            </main>
        </div>
    )
}

export default Home; 