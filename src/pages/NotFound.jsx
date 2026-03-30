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

function createLightningBolt(startX, startY, endX, endY) {
  const segments = 6;
  const points = [{ x: startX, y: startY }];
  const baseDx = endX - startX;
  const baseDy = endY - startY;
  const normalLength = Math.hypot(baseDx, baseDy) || 1;
  const normalX = -baseDy / normalLength;
  const normalY = baseDx / normalLength;

  for (let i = 1; i < segments; i += 1) {
    const t = i / segments;
    const baseX = startX + baseDx * t;
    const baseY = startY + baseDy * t;
    const jitter = (Math.random() * 2 - 1) * (1 - Math.abs(t - 0.5)) * 28;
    points.push({
      x: baseX + normalX * jitter,
      y: baseY + normalY * jitter,
    });
  }

  points.push({ x: endX, y: endY });
  return points;
}

export default function NotFound() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const content = notFoundContent[language];
  const backgroundRef = useRef(null);
  const canvasRef = useRef(null);
  const bricksRef = useRef([]);
  const destroyedBricksRef = useRef([]);
  const effectsRef = useRef([]);
  const grabbedRef = useRef(null);
  const goldenLockRef = useRef({ locked: false, id: null, x: 0, y: 0 });
  const bricksBrokenRef = useRef(false);
  const figureSpawnedRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0, t: 0 });
  const themeModeRef = useRef(theme);
  const [figure, setFigure] = useState(null);
  const [bricksBroken, setBricksBroken] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    themeModeRef.current = theme;
  }, [theme]);

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

    const getTopBrickAt = (x, y) => {
      let selected = null;
      let maxDepth = -Infinity;
      for (const brick of bricksRef.current) {
        if (!hitTestBrick(brick, x, y)) continue;
        const depth = brick.y + brick.h;
        if (depth > maxDepth) {
          maxDepth = depth;
          selected = brick;
        }
      }
      return selected;
    };

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

    const activateGoldenBrick = (goldenBrick) => {
      if (!goldenBrick || figureSpawnedRef.current) return;
      goldenLockRef.current = {
        locked: true,
        id: goldenBrick.id,
        x: goldenBrick.x,
        y: goldenBrick.y,
      };
      goldenBrick.vx = 0;
      goldenBrick.vy = 0;
      figureSpawnedRef.current = true;
      setFigure({
        id: performance.now(),
        x: goldenBrick.x + goldenBrick.w * 0.5,
        y: goldenBrick.y + goldenBrick.h * 0.65,
      });
    };

    const triggerLightPropulsion = (x, y) => {
      const radius = 186;
      effectsRef.current.push({
        type: 'burst',
        start: performance.now(),
        duration: 460,
        x,
        y,
        radius,
      });

      for (const brick of bricksRef.current) {
        if (goldenLockRef.current.locked && brick.id === goldenLockRef.current.id) continue;
        const centerX = brick.x + brick.w * 0.5;
        const centerY = brick.y + brick.h * 0.5;
        const distance = Math.hypot(centerX - x, centerY - y);
        if (distance > radius) continue;
        const influence = 1 - distance / radius;
        const safeDistance = Math.max(distance, 1);
        const dirX = (centerX - x) / safeDistance;
        const dirY = (centerY - y) / safeDistance;
        brick.vx += dirX * (640 * influence) + rand(-140, 140) * influence;
        brick.vy += dirY * (460 * influence) - (340 * influence + rand(60, 190) * influence);
      }
    };

    const triggerDarkLightning = (x, y) => {
      const radius = 176;
      const targets = [];

      for (const brick of bricksRef.current) {
        if (brick.isGolden) continue;
        const centerX = brick.x + brick.w * 0.5;
        const centerY = brick.y + brick.h * 0.5;
        const distance = Math.hypot(centerX - x, centerY - y);
        if (distance <= radius) {
          targets.push({ brick, centerX, centerY, distance });
        }
      }

      targets.sort((a, b) => a.distance - b.distance);
      const selected = targets.slice(0, 9);
      if (selected.length === 0) {
        effectsRef.current.push({
          type: 'lightning',
          start: performance.now(),
          duration: 230,
          points: createLightningBolt(x, y, x + rand(-36, 36), y - rand(24, 92)),
        });
        return;
      }

      const destroyedIds = new Set();
      const startedAt = performance.now();

      for (const target of selected) {
        destroyedIds.add(target.brick.id);
        effectsRef.current.push({
          type: 'lightning',
          start: startedAt + rand(0, 45),
          duration: 220 + rand(0, 80),
          points: createLightningBolt(x, y, target.centerX, target.centerY),
        });
      }

      const removed = [];
      bricksRef.current = bricksRef.current.filter((brick) => {
        if (destroyedIds.has(brick.id)) {
          removed.push(brick);
          return false;
        }
        return true;
      });
      if (removed.length) {
        destroyedBricksRef.current.push(...removed);
      }
      if (grabbedRef.current && destroyedIds.has(grabbedRef.current.id)) {
        grabbedRef.current = null;
        setIsGrabbing(false);
      }
    };

    const restoreDestroyedBricks = (goldenBrick) => {
      if (!goldenBrick || destroyedBricksRef.current.length === 0) return false;

      const restored = destroyedBricksRef.current.splice(0, destroyedBricksRef.current.length);
      const restoredAt = performance.now();
      for (const brick of restored) {
        const spreadX = rand(-92, 92);
        const spreadY = rand(26, 138);
        brick.x = clamp(goldenBrick.x + spreadX, -8, sceneWidth + 8 - brick.w);
        brick.y = clamp(goldenBrick.y - spreadY, -8, sceneHeight - brick.h - 12);
        brick.vx = rand(-220, 220);
        brick.vy = rand(-360, -140);
      }

      bricksRef.current.push(...restored);
      effectsRef.current.push({
        type: 'revive',
        start: restoredAt,
        duration: 620,
        x: goldenBrick.x + goldenBrick.w * 0.5,
        y: goldenBrick.y + goldenBrick.h * 0.5,
        radius: 156,
      });
      return true;
    };

    const triggerThemePower = (x, y) => {
      if (!figureSpawnedRef.current || !bricksBrokenRef.current) return;
      if (themeModeRef.current === 'dark') {
        triggerDarkLightning(x, y);
      } else {
        triggerLightPropulsion(x, y);
      }
    };

    const startGrab = (brick, x, y, time) => {
      grabbedRef.current = {
        id: brick.id,
        offsetX: x - brick.x,
        offsetY: y - brick.y,
        startX: x,
        startY: y,
        downAt: time,
        moved: false,
      };
      setIsGrabbing(true);
    };

    const releaseGrab = (releaseX, releaseY, releaseTime) => {
      const grabbed = grabbedRef.current;
      if (!grabbed) return;

      if (figureSpawnedRef.current && !grabbed.moved && releaseTime - grabbed.downAt < 220) {
        triggerThemePower(releaseX, releaseY);
      }

      grabbedRef.current = null;
      setIsGrabbing(false);
    };

    const applyPointerForce = (x, y, deltaX, deltaY, forceScale = 1) => {
      if (!bricksBrokenRef.current) return;
      for (const brick of bricksRef.current) {
        if (goldenLockRef.current.locked && brick.id === goldenLockRef.current.id) continue;
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
      destroyedBricksRef.current = [];
      effectsRef.current = [];
      grabbedRef.current = null;
      goldenLockRef.current = { locked: false, id: null, x: 0, y: 0 };
      bricksBrokenRef.current = false;
      figureSpawnedRef.current = false;
      pointerRef.current = { x: 0, y: 0, t: performance.now() };
      setFigure(null);
      setBricksBroken(false);
      setIsGrabbing(false);
    };

    const handlePointerMove = (event) => {
      const now = performance.now();
      const bounds = canvasElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const deltaX = x - pointerRef.current.x;
      const deltaY = y - pointerRef.current.y;
      const grabbed = grabbedRef.current;

      if (grabbed) {
        const brick = bricksRef.current.find((item) => item.id === grabbed.id);
        if (brick) {
          if (goldenLockRef.current.locked && brick.id === goldenLockRef.current.id) {
            brick.x = goldenLockRef.current.x;
            brick.y = goldenLockRef.current.y;
            brick.vx = 0;
            brick.vy = 0;
            grabbedRef.current = null;
            setIsGrabbing(false);
            pointerRef.current = { x, y, t: now };
            return;
          }
          const dt = Math.max((now - pointerRef.current.t) / 1000, 1 / 240);
          brick.x = clamp(x - grabbed.offsetX, -8, sceneWidth + 8 - brick.w);
          brick.y = clamp(y - grabbed.offsetY, -8, sceneHeight - brick.h - 8);
          brick.vx = clamp((deltaX / dt) * 0.4, -720, 720);
          brick.vy = clamp((deltaY / dt) * 0.4, -720, 720);
          if (!grabbed.moved && (Math.abs(x - grabbed.startX) > 4 || Math.abs(y - grabbed.startY) > 4)) {
            grabbed.moved = true;
          }
        } else {
          grabbedRef.current = null;
          setIsGrabbing(false);
        }
        pointerRef.current = { x, y, t: now };
        return;
      }

      applyPointerForce(x, y, deltaX, deltaY, 0.45);
      pointerRef.current = { x, y, t: now };
    };

    const handlePointerDown = (event) => {
      const now = performance.now();
      const bounds = canvasElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointerRef.current = { x, y, t: now };
      const clickedBrick = getTopBrickAt(x, y);

      if (!bricksBrokenRef.current) {
        if (!clickedBrick) return;
        bricksBrokenRef.current = true;
        setBricksBroken(true);
        breakBricks(x, y);
        startGrab(clickedBrick, x, y, now);
        try {
          canvasElement.setPointerCapture(event.pointerId);
        } catch {}
        return;
      }

      if (clickedBrick) {
        if (clickedBrick.isGolden) {
          if (!figureSpawnedRef.current) {
            activateGoldenBrick(clickedBrick);
            return;
          }
          if (themeModeRef.current === 'dark') {
            restoreDestroyedBricks(clickedBrick);
          }
          return;
        }
        startGrab(clickedBrick, x, y, now);
        try {
          canvasElement.setPointerCapture(event.pointerId);
        } catch {}
        return;
      }

      if (figureSpawnedRef.current) {
        triggerThemePower(x, y);
        return;
      }

      applyPointerForce(x, y, 0, 0, 1.3);
    };

    const handlePointerUp = (event) => {
      const now = performance.now();
      const bounds = canvasElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      releaseGrab(x, y, now);
      pointerRef.current = { x, y, t: now };
      try {
        if (canvasElement.hasPointerCapture(event.pointerId)) {
          canvasElement.releasePointerCapture(event.pointerId);
        }
      } catch {}
    };

    const stepPhysics = (deltaTime) => {
      if (!bricksBrokenRef.current) return;
      const bricks = bricksRef.current;
      const floor = sceneHeight - 12;
      const gravity = 1750;
      const grabbedId = grabbedRef.current?.id;
      const lockedGoldenId = goldenLockRef.current.locked ? goldenLockRef.current.id : null;

      for (let subStep = 0; subStep < 2; subStep += 1) {
        const dt = deltaTime * 0.5;

        for (const brick of bricks) {
          if (brick.id === grabbedId) continue;
          if (brick.id === lockedGoldenId) {
            brick.x = goldenLockRef.current.x;
            brick.y = goldenLockRef.current.y;
            brick.vx = 0;
            brick.vy = 0;
            continue;
          }
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
            const aIsGrabbed = a.id === grabbedId;
            const bIsGrabbed = b.id === grabbedId;
            const aIsLockedGolden = a.id === lockedGoldenId;
            const bIsLockedGolden = b.id === lockedGoldenId;
            const aRight = a.x + a.w;
            const aBottom = a.y + a.h;
            const bRight = b.x + b.w;
            const bBottom = b.y + b.h;
            if (aRight <= b.x || bRight <= a.x || aBottom <= b.y || bBottom <= a.y) continue;

            const overlapX = Math.min(aRight - b.x, bRight - a.x);
            const overlapY = Math.min(aBottom - b.y, bBottom - a.y);
            if (overlapX < overlapY) {
              if (aIsLockedGolden || bIsLockedGolden) {
                const locked = aIsLockedGolden ? a : b;
                const dynamic = aIsLockedGolden ? b : a;
                const direction = dynamic.x < locked.x ? -1 : 1;
                dynamic.x += direction * overlapX;
                dynamic.vx += direction * 90;
                dynamic.vy -= 12;
              } else if (aIsGrabbed || bIsGrabbed) {
                const kinematic = aIsGrabbed ? a : b;
                const dynamic = aIsGrabbed ? b : a;
                const direction = dynamic.x < kinematic.x ? -1 : 1;
                dynamic.x += direction * overlapX;
                dynamic.vx += direction * (Math.abs(kinematic.vx) * 0.55 + 70);
                dynamic.vy -= 18;
              } else {
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
              }
            } else {
              if (aIsLockedGolden || bIsLockedGolden) {
                const locked = aIsLockedGolden ? a : b;
                const dynamic = aIsLockedGolden ? b : a;
                const direction = dynamic.y < locked.y ? -1 : 1;
                dynamic.y += direction * overlapY;
                dynamic.vy += direction * 84;
                dynamic.vx += (dynamic.x < locked.x ? -1 : 1) * 14;
              } else if (aIsGrabbed || bIsGrabbed) {
                const kinematic = aIsGrabbed ? a : b;
                const dynamic = aIsGrabbed ? b : a;
                const direction = dynamic.y < kinematic.y ? -1 : 1;
                dynamic.y += direction * overlapY;
                dynamic.vy += direction * (Math.abs(kinematic.vy) * 0.45 + 66);
                dynamic.vx += kinematic.vx * 0.12;
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
      }
    };

    const drawEffects = (time) => {
      const alive = [];
      for (const effect of effectsRef.current) {
        const elapsed = time - effect.start;
        if (elapsed < 0) {
          alive.push(effect);
          continue;
        }
        if (elapsed >= effect.duration) continue;
        const progress = elapsed / effect.duration;
        alive.push(effect);

        if (effect.type === 'burst') {
          const radius = 10 + effect.radius * progress;
          context.save();
          context.globalAlpha = (1 - progress) * 0.65;
          context.strokeStyle = themeModeRef.current === 'dark'
            ? 'rgba(137, 177, 255, 0.96)'
            : 'rgba(105, 154, 255, 0.92)';
          context.lineWidth = 2.6 - progress * 1.5;
          context.beginPath();
          context.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
          context.stroke();
          context.restore();
        }

        if (effect.type === 'lightning') {
          context.save();
          context.globalAlpha = (1 - progress) * 0.9;
          context.strokeStyle = '#c6dcff';
          context.lineWidth = 2.4;
          context.beginPath();
          context.moveTo(effect.points[0].x, effect.points[0].y);
          for (let i = 1; i < effect.points.length; i += 1) {
            context.lineTo(effect.points[i].x, effect.points[i].y);
          }
          context.stroke();
          context.globalAlpha = (1 - progress) * 0.5;
          context.strokeStyle = '#79a8ff';
          context.lineWidth = 4.8;
          context.stroke();
          context.restore();
        }

        if (effect.type === 'revive') {
          const pulse = Math.sin(progress * Math.PI);
          const radius = 18 + effect.radius * progress;
          context.save();
          context.globalAlpha = (1 - progress) * 0.76;
          context.strokeStyle = '#ffd86b';
          context.lineWidth = 3.2 - progress * 1.4;
          context.beginPath();
          context.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
          context.stroke();
          context.globalAlpha = (1 - progress) * 0.34;
          context.fillStyle = '#ffe28a';
          context.beginPath();
          context.arc(effect.x, effect.y, 14 + pulse * 12, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }
      }
      effectsRef.current = alive;
    };

    const render = (time) => {
      if (!context) return;
      context.clearRect(0, 0, sceneWidth, sceneHeight);
      const bricks = [...bricksRef.current].sort((a, b) => a.y - b.y);
      const nonGoldenCount = bricks.reduce(
        (count, brick) => (brick.isGolden ? count : count + 1),
        0,
      );
      const shouldPulseGolden = bricksBrokenRef.current && (
        !figureSpawnedRef.current ||
        (themeModeRef.current === 'dark' && nonGoldenCount === 0)
      );

      for (const brick of bricks) {
        drawBrick(context, brick);
        if (brick.isGolden && shouldPulseGolden) {
          context.save();
          context.globalAlpha = 0.18 + Math.sin(time * 0.012) * 0.08;
          context.strokeStyle = '#ffe59e';
          context.lineWidth = 2;
          drawRoundedRect(context, brick.x - 5, brick.y - 5, brick.w + 10, brick.h + 10, 8);
          context.stroke();
          context.restore();
        }
      }

      drawEffects(time);
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
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(backgroundElement);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      canvasElement.removeEventListener('pointermove', handlePointerMove);
      canvasElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="not-found">
      <div className="not-found__background" ref={backgroundRef} aria-hidden="true">
        <div className="not-found__bg-code">404</div>
        <canvas
          className={`not-found__lego-canvas ${!bricksBroken ? 'not-found__lego-canvas--ready' : ''} ${isGrabbing ? 'not-found__lego-canvas--grabbing' : ''}`}
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
