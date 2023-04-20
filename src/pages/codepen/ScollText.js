import React, { useState, useEffect } from 'react';
import './ScollText.scss';
const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Typescript',
  'Tailwind',
  'React',
  'Next.js',
  'Gatsby',
  'UI/UX',
  'SVG',
  'animation',
  'webdev',
];
const DURATION = 15000;
const ROWS = 5;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal',
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

const App = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const rows = [...new Array(ROWS)];
    const newTags = rows.map((_, i) => {
      return {
        duration: random(DURATION - 5000, DURATION + 5000),
        reverse: i % 2,
        tags: shuffle(TAGS).slice(0, TAGS_PER_ROW),
      };
    });
    setTags(newTags);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Infinite Scroll Animation</h1>
        <p>CSS only, content independent, bi-directional, customizable</p>
      </header>
      <div className="tag-list">
        {tags.map((tagGroup, index) => (
          <InfiniteLoopSlider key={index} duration={tagGroup.duration} reverse={tagGroup.reverse}>
            {tagGroup.tags.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </InfiniteLoopSlider>
        ))}
        <div className="fade" />
      </div>
    </div>
  );
};

export default App;
