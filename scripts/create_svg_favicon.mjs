import fs from 'fs';

const png192 = fs.readFileSync('public/favicon-192x192.png');
const base64 = png192.toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <defs>
    <clipPath id="circleClip">
      <circle cx="96" cy="96" r="95.5" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="192" height="192" clip-path="url(#circleClip)" />
</svg>
`;

fs.writeFileSync('public/favicon.svg', svgContent.trim());
console.log('Generated public/favicon.svg with size:', svgContent.length);

