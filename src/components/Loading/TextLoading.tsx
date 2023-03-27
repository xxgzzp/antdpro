import React, { useEffect, useRef } from 'react';
import './TextLoading.less';


const TextMorph: React.FC<{
  texts: string[];
  morphTime: number;
  cooldownTime: number;
}> = ({
  texts = ['Loading...', '正在验明你的身份', '请稍后'],
  cooldownTime = 0.25,
  morphTime = 1.5,
}) => {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  let textIndex = texts.length - 1;
  let time = new Date().getTime();
  let morph = 0;
  let cooldown = cooldownTime;

  useEffect(() => {
    const elts = {
      text1: text1Ref.current!,
      text2: text2Ref.current!,
    };
    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(elts, fraction);
    }
    function setMorph(elts: { [key: string]: HTMLDivElement }, fraction: number) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }
    function doCooldown(elts: { [key: string]: HTMLDivElement }) {
      morph = 0;
      elts.text2.style.filter = '';
      elts.text2.style.opacity = '100%';
      elts.text1.style.filter = '';
      elts.text1.style.opacity = '0%';
    }
    function animate() {
      requestAnimationFrame(animate);
      let newTime = new Date().getTime();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }
        doMorph();
      } else {
        const elts = {
          text1: text1Ref.current!,
          text2: text2Ref.current!,
        };
        doCooldown(elts);
      }
    }
    animate();
    return () => cancelAnimationFrame(requestAnimationFrame(animate));
  }, []);

  return (
    <>
      <div id="container">
        <span id="text1" ref={text1Ref}></span>
        <span id="text2" ref={text2Ref}></span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
export default TextMorph;
