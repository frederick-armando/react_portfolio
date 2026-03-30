import { useEffect, useRef, useState } from 'react';
import { IconArchive, IconHome } from '../components/icons.jsx';
import Button from '../components/Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useTheme } from '../theme/ThemeContext.jsx';
import '../styles/pages.css';

const LEGO_COLORS = ['#18a853', '#1f7bc7', '#e96db4', '#df3030', '#f2cd2e'];
const GOLD_BRICK_COLOR = '#c8a02e';
const DIGIT_PATTERNS = {
  4: [
    '1000001',
    '1000001',
    '1000001',
    '1000001',
    '1111111',
    '0000001',
    '0000001',
    '0000001',
    '0000001',
    '0000001',
  ],
  0: [
    '0111110',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '0111110',
  ],
};

const notFoundContent = {
  fr: {
    chip: 'Erreur 404',
    title: 'Ce prototype\na un bug.',
    body: "On dirait que le parcours utilisateur s'arrête ici. Pas de panique, même les meilleurs systèmes ont besoin d'une petite itération.",
    primaryCta: "Retourner à l'accueil",
    secondaryCta: 'Voir mes projets',
  },
  en: {
    chip: 'Error 404',
    title: 'This prototype\nhas a bug.',
    body: "It looks like the user journey ends here. Don't panic, even the best systems need a little iteration.",
    primaryCta: 'Back to Home',
    secondaryCta: 'View my projects',
  },
};

const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function shiftHexColor(hex, amount) {
  const clean = hex.replace('#', '');
  const value = Number.parseInt(clean, 16);
  const red = clamp((value >> 16) + amount, 0, 255);
  const green = clamp(((value >> 8) & 0xff) + amount, 0, 255);
  const blue = clamp((value & 0xff) + amount, 0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function drawRoundedRect(context, x, y, width, height, radius) {
  const corner = Math.min(radius, width * 0.45, height * 0.45);
  context.beginPath();
  context.moveTo(x + corner, y);
  context.arcTo(x + width, y, x + width, y + height, corner);
  context.arcTo(x + width, y + height, x, y + height, corner);
  context.arcTo(x, y + height, x, y, corner);
  context.arcTo(x, y, x + width, y, corner);
  context.closePath();
}

function createPatternBricks(pattern, originX, originY, cellSize, digitIndex, startIndex) {
  const bricks = [];
  let index = startIndex;

  for (let rowIndex = 0; rowIndex < pattern.length; rowIndex += 1) {
    const row = pattern[rowIndex];
    let column = 0;
    while (column < row.length) {
      if (row[column] !== '1') {
        column += 1;
        continue;
      }

      let runEnd = column;
      while (runEnd < row.length && row[runEnd] === '1') runEnd += 1;

      let cursor = column;
      while (cursor < runEnd) {
        const remaining = runEnd - cursor;
        const span = remaining >= 4 ? 2 : remaining;
        const width = span * cellSize - cellSize * 0.14;
        const height = Math.max(14, cellSize * 0.74);
        const x = originX + cursor * cellSize + cellSize * 0.07;
        const y = originY + rowIndex * cellSize + cellSize * 0.15;

        bricks.push({
          id: `brick-${index}`,
          x,
          y,
          w: width,
          h: height,
          color: LEGO_COLORS[Math.floor(Math.random() * LEGO_COLORS.length)],
          vx: 0,
          vy: 0,
          rotation: 0,
          vr: 0,
          isGolden: false,
          digitIndex,
          rowIndex,
          colIndex: cursor,
        });
        index += 1;
        cursor += span;
      }

      column = runEnd;
    }
  }

  return { bricks, nextIndex: index };
}

function buildInitialBricks(sceneWidth, sceneHeight) {
  const isMobile = sceneWidth <= 767;
  const digitRows = DIGIT_PATTERNS[4].length;
  const digitCols = DIGIT_PATTERNS[4][0].length;
  const digitGapCols = 1.6;
  const totalCols = digitCols * 3 + digitGapCols * 2;
  const maxWidth = Math.min(sceneWidth * 0.6, 720);
  const maxHeight = Math.min(sceneHeight * (isMobile ? 0.36 : 0.42), 300);
  const cellSize = Math.min(maxWidth / totalCols, maxHeight / digitRows);
  const usedWidth = totalCols * cellSize;
  const usedHeight = digitRows * cellSize;
  const stageX = sceneWidth - usedWidth - Math.max(sceneWidth * 0.04, 18);
  const stageY = isMobile
    ? Math.min(
      Math.max(44, sceneHeight * 0.14),
      sceneHeight - usedHeight - 132,
    )
    : Math.min(
      Math.max(68, sceneHeight * 0.23),
      sceneHeight - usedHeight - 96,
    );

  const digitOrder = [4, 0, 4];
  const bricks = [];
  let index = 0;

  digitOrder.forEach((digit, digitIndex) => {
    const originX = stageX + digitIndex * (digitCols + digitGapCols) * cellSize;
    const result = createPatternBricks(
      DIGIT_PATTERNS[digit],
      originX,
      stageY,
      cellSize,
      digitIndex,
      index,
    );
    bricks.push(...result.bricks);
    index = result.nextIndex;
  });

  const goldenBrick = bricks.find(
    (brick) => brick.digitIndex === 2 && brick.rowIndex >= 4 && brick.rowIndex <= 6,
  );
  if (goldenBrick) {
    goldenBrick.id = 'golden-trigger';
    goldenBrick.color = GOLD_BRICK_COLOR;
    goldenBrick.isGolden = true;
  } else if (bricks.length > 0) {
    const fallback = bricks[Math.floor(bricks.length * 0.72)];
    fallback.id = 'golden-trigger';
    fallback.color = GOLD_BRICK_COLOR;
    fallback.isGolden = true;
  }

  return bricks;
}

function drawBrick(context, brick) {
  context.save();
  context.translate(brick.x + brick.w / 2, brick.y + brick.h / 2);
  context.translate(-brick.w / 2, -brick.h / 2);

  drawRoundedRect(context, 0, 0, brick.w, brick.h, 3.6);
  context.fillStyle = brick.color;
  context.fill();

  context.globalAlpha = 0.17;
  drawRoundedRect(context, 1, 1, brick.w - 2, brick.h * 0.52, 3);
  context.fillStyle = shiftHexColor(brick.color, 18);
  context.fill();
  context.globalAlpha = 1;

  const studs = Math.max(2, Math.round(brick.w / 17));
  const spacing = brick.w / (studs + 1);
  const studRadius = Math.min(3.5, brick.h * 0.21);

  for (let i = 0; i < studs; i += 1) {
    const studX = spacing * (i + 1);
    const studY = brick.h * 0.3;
    context.beginPath();
    context.arc(studX, studY, studRadius, 0, Math.PI * 2);
    context.fillStyle = shiftHexColor(brick.color, 26);
    context.fill();
    context.beginPath();
    context.arc(studX, studY + 0.4, studRadius * 0.55, 0, Math.PI * 2);
    context.fillStyle = shiftHexColor(brick.color, -16);
    context.fill();
  }

  if (brick.isGolden) {
    context.globalAlpha = 0.35;
    context.strokeStyle = '#fff4c6';
    context.lineWidth = 1.5;
    drawRoundedRect(context, -2, -2, brick.w + 4, brick.h + 4, 4.2);
    context.stroke();
    context.globalAlpha = 1;
  }

  context.restore();
}

function hitTestBrick(brick, pointX, pointY) {
  return pointX >= brick.x && pointX <= brick.x + brick.w && pointY >= brick.y && pointY <= brick.y + brick.h;
}

export default function NotFound() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const content = notFoundContent[language];
  const backgroundRef = useRef(null);
  const canvasRef = useRef(null);
  const bricksRef = useRef([]);
  const bricksBrokenRef = useRef(false);
  const figureSpawnedRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [figure, setFigure] = useState(null);
  const [bricksBroken, setBricksBroken] = useState(false);

  useEffect(() => {
    const backgroundElement = backgroundRef.current;
    const canvasElement = canvasRef.current;
    if (!backgroundElement || !canvasElement) return undefined;

    let animationFrame = 0;
    let resizeObserver;
    let sceneWidth = 0;
    let sceneHeight = 0;
    let context = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastTime = performance.now();

    const breakBricks = (originX, originY) => {
      for (const brick of bricksRef.current) {
        const centerX = brick.x + brick.w * 0.5;
        const centerY = brick.y + brick.h * 0.5;
        const distance = Math.hypot(centerX - originX, centerY - originY);
        const spread = clamp(1 - distance / 280, 0.25, 1);
        brick.vx = rand(-120, 120) * spread + (centerX - originX) * 0.9;
        brick.vy = rand(-340, -110) * spread;
      }
    };

    const applyPointerForce = (x, y, deltaX, deltaY, forceScale = 1) => {
      if (!bricksBrokenRef.current) return;
      for (const brick of bricksRef.current) {
        const centerX = brick.x + brick.w * 0.5;
        const centerY = brick.y + brick.h * 0.5;
        const offsetX = centerX - x;
        const offsetY = centerY - y;
        const distance = Math.hypot(offsetX, offsetY);
        if (distance > 96) continue;
        const influence = (1 - distance / 96) * forceScale;
        const safeDistance = Math.max(distance, 1);
        brick.vx += (offsetX / safeDistance) * 58 * influence + deltaX * 16 * influence;
        brick.vy += (offsetY / safeDistance) * 44 * influence + deltaY * 14 * influence;
      }
    };

    const updateCanvasSize = () => {
      const bounds = backgroundElement.getBoundingClientRect();
      sceneWidth = Math.max(320, Math.floor(bounds.width));
      sceneHeight = Math.max(420, Math.floor(bounds.height));
      canvasElement.width = Math.floor(sceneWidth * dpr);
      canvasElement.height = Math.floor(sceneHeight * dpr);
      canvasElement.style.width = `${sceneWidth}px`;
      canvasElement.style.height = `${sceneHeight}px`;
      context = canvasElement.getContext('2d', { alpha: true });
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      bricksRef.current = buildInitialBricks(sceneWidth, sceneHeight);
      bricksBrokenRef.current = false;
      figureSpawnedRef.current = false;
      setFigure(null);
      setBricksBroken(false);
    };

    const handlePointerMove = (event) => {
      const bounds = canvasElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const deltaX = x - pointerRef.current.x;
      const deltaY = y - pointerRef.current.y;
      pointerRef.current = { x, y };
      applyPointerForce(x, y, deltaX, deltaY, 0.45);
    };

    const handlePointerDown = (event) => {
      const bounds = canvasElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointerRef.current = { x, y };
      const clickedBrick = bricksRef.current.find((brick) => hitTestBrick(brick, x, y));
      if (!bricksBrokenRef.current) {
        if (!clickedBrick) return;
        bricksBrokenRef.current = true;
        setBricksBroken(true);
        breakBricks(x, y);
        return;
      }

      applyPointerForce(x, y, 0, 0, 1.3);

      const goldenBrick = bricksRef.current.find((brick) => brick.isGolden && hitTestBrick(brick, x, y));
      if (!goldenBrick || figureSpawnedRef.current) return;

      figureSpawnedRef.current = true;
      setFigure({
        id: performance.now(),
        x: goldenBrick.x + goldenBrick.w * 0.5,
        y: goldenBrick.y + goldenBrick.h * 0.65,
      });
      goldenBrick.vy -= 230;
      goldenBrick.vx += rand(-24, 24);
    };

    const stepPhysics = (deltaTime) => {
      if (!bricksBrokenRef.current) return;
      const bricks = bricksRef.current;
      const floor = sceneHeight - 12;
      const gravity = 1750;

      for (let subStep = 0; subStep < 2; subStep += 1) {
        const dt = deltaTime * 0.5;

        for (const brick of bricks) {
          brick.vy += gravity * dt;
          brick.vx *= 0.997;
          brick.x += brick.vx * dt;
          brick.y += brick.vy * dt;

          if (brick.x < -8) {
            brick.x = -8;
            brick.vx = Math.abs(brick.vx) * 0.28;
          } else if (brick.x + brick.w > sceneWidth + 8) {
            brick.x = sceneWidth + 8 - brick.w;
            brick.vx = -Math.abs(brick.vx) * 0.28;
          }

          if (brick.y + brick.h > floor) {
            brick.y = floor - brick.h;
            if (brick.vy > 0) {
              brick.vy *= -0.23;
            }
            brick.vx *= 0.94;
            if (Math.abs(brick.vy) < 9) {
              brick.vy = 0;
            }
          }
        }

        for (let i = 0; i < bricks.length; i += 1) {
          const a = bricks[i];
          for (let j = i + 1; j < bricks.length; j += 1) {
            const b = bricks[j];
            const aRight = a.x + a.w;
            const aBottom = a.y + a.h;
            const bRight = b.x + b.w;
            const bBottom = b.y + b.h;
            if (aRight <= b.x || bRight <= a.x || aBottom <= b.y || bBottom <= a.y) continue;

            const overlapX = Math.min(aRight - b.x, bRight - a.x);
            const overlapY = Math.min(aBottom - b.y, bBottom - a.y);
            if (overlapX < overlapY) {
              const shift = overlapX * 0.5;
              if (a.x < b.x) {
                a.x -= shift;
                b.x += shift;
              } else {
                a.x += shift;
                b.x -= shift;
              }
              const velocitySwap = (a.vx - b.vx) * 0.22;
              a.vx -= velocitySwap;
              b.vx += velocitySwap;
            } else {
              const shift = overlapY * 0.5;
              if (a.y < b.y) {
                a.y -= shift;
                b.y += shift;
              } else {
                a.y += shift;
                b.y -= shift;
              }
              const velocitySwap = (a.vy - b.vy) * 0.2;
              a.vy -= velocitySwap;
              b.vy += velocitySwap;
              a.vx *= 0.996;
              b.vx *= 0.996;
            }
          }
        }
      }
    };

    const render = (time) => {
      if (!context) return;
      context.clearRect(0, 0, sceneWidth, sceneHeight);
      const bricks = [...bricksRef.current].sort((a, b) => a.y - b.y);

      for (const brick of bricks) {
        drawBrick(context, brick);
        if (brick.isGolden && bricksBrokenRef.current && !figureSpawnedRef.current) {
          context.save();
          context.globalAlpha = 0.18 + Math.sin(time * 0.012) * 0.08;
          context.strokeStyle = '#ffe59e';
          context.lineWidth = 2;
          drawRoundedRect(context, brick.x - 5, brick.y - 5, brick.w + 10, brick.h + 10, 8);
          context.stroke();
          context.restore();
        }
      }
    };

    const animate = (time) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.032);
      lastTime = time;
      stepPhysics(deltaTime);
      render(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    updateCanvasSize();
    canvasElement.addEventListener('pointermove', handlePointerMove);
    canvasElement.addEventListener('pointerdown', handlePointerDown);
    resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(backgroundElement);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      canvasElement.removeEventListener('pointermove', handlePointerMove);
      canvasElement.removeEventListener('pointerdown', handlePointerDown);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="not-found">
      <div className="not-found__background" ref={backgroundRef} aria-hidden="true">
        <div className="not-found__bg-code">404</div>
        <canvas
          className={`not-found__lego-canvas ${!bricksBroken ? 'not-found__lego-canvas--ready' : ''}`}
          ref={canvasRef}
        />
        {figure && (
          <div
            className={`lego-figure ${theme === 'dark' ? 'lego-figure--dark' : 'lego-figure--light'}`}
            style={{ left: `${figure.x}px`, top: `${figure.y}px` }}
          >
            <span className="lego-figure__head" />
            <span className="lego-figure__torso" />
            <span className="lego-figure__arm lego-figure__arm--left" />
            <span className="lego-figure__arm lego-figure__arm--right" />
            <span className="lego-figure__legs" />
            <span className="lego-figure__saber" />
          </div>
        )}
      </div>

      <div className="not-found__inner">
        <div className="not-found__header">
          <span className="chip not-found__chip">{content.chip}</span>
        </div>

        <h1 className="not-found__title">
          {content.title.split('\n').map((line, i) => (
            <span key={i} className="not-found__title-line">{line}</span>
          ))}
        </h1>

        <p className="not-found__body">{content.body}</p>

        <div className="not-found__actions">
          <Button variant="secondary" to="/projets" icon={IconArchive}>
            {content.secondaryCta}
          </Button>
          <Button variant="primary" to="/" icon={IconHome}>
            {content.primaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
