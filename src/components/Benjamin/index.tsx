import { useRef, useState } from 'react';
import arcades from '../../arcades_data/arcades.json';
import BenjaminImage from './Image';
import BenjaminText from './Text';

// Constant
const OFFSET = 7000;

// Reduce data
const { text, indexToPageNumber } = Object.entries(arcades).reduce(
  (acc, [pageNumber, entry], index) => {
    const newText = index === 0 ? ' '.repeat(OFFSET) : (acc.text += entry.text);
    return {
      text: newText,
      indexToPageNumber:
        'hasImage' in entry
          ? acc.indexToPageNumber.set(newText.length - OFFSET + 1, pageNumber)
          : acc.indexToPageNumber,
    };
  },
  { text: '', indexToPageNumber: new Map<number, string>() },
);

// Component return
const Benjamin = () => {
  // Hooks - state
  const [imagePath, setImagePath] = useState('');

  const [updateInterval] = useState(5);

  // Hooks - refs (keeping track of stuff but not updating state)
  const currentIndex = useRef<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  (() => {
    function printLetterByLetter() {
      if (interval.current) clearInterval(interval.current);
      let i = currentIndex.current;
      interval.current = setInterval(function setText() {
        let displayedText = '';
        i++;
        // Set current index ref to current index (will be useful for playing/pausing func to be added later)
        currentIndex.current = i;
        // Check map for image at current index, update image path if so
        if (indexToPageNumber.has(i))
          setImagePath(`/assets/${indexToPageNumber.get(i)}.png`);
        // Set displayed text
        if (i % 10 === 0) {
          displayedText = text.slice(i, i + OFFSET);
          if (textPathRef.current) {
            textPathRef.current.innerHTML = displayedText;
          }
        }

        if (i > text.length && interval.current) {
          currentIndex.current = 0;
          clearInterval(interval.current);
        }
      }, updateInterval);
    }
    printLetterByLetter();
  })();

  return (
    <>
      {imagePath && <BenjaminImage path={imagePath} />}
      <BenjaminText>
        {' '}
        <textPath
          id="text-path"
          xlinkHref="#benjamin"
          ref={textPathRef}
        ></textPath>
      </BenjaminText>
    </>
  );
};

export default Benjamin;
