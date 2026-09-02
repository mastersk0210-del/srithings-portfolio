/**
 * Turn the hero photo into a point cloud for the scatter effect.
 * Pure module — no React. Rasterises the image, feathers the frame so it melts
 * into the page, drops the black background, then samples the lit pixels into
 * home / scattered / colour / seed buffers. Deterministic (seeded RNG) so the
 * result can be cached.
 */

const SRCW = 420;
const VIEW_H = 3.4;

export type AvatarPoints = {
  count: number;
  /** resting positions — reconstruct the photo */
  home: Float32Array;
  /** dispersed target positions */
  cloud: Float32Array;
  /** per-point RGB from the photo */
  color: Float32Array;
  /** [phase, springStiffnessMult, phase2] per point */
  seed: Float32Array;
  /** width / height of the source image */
  imgAspect: number;
  /** graded + feathered raster, used as the rest-state texture */
  raster: HTMLCanvasElement;
  viewHeight: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cache = new Map<string, AvatarPoints>();

export function buildAvatarPoints(
  img: HTMLImageElement,
  count: number,
): AvatarPoints {
  const key = `${img.src}|${count}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const ar = img.naturalWidth / img.naturalHeight || 0.667;
  const srch = Math.round(SRCW / ar);

  const canvas = document.createElement("canvas");
  canvas.width = SRCW;
  canvas.height = srch;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");

  ctx.filter = "contrast(1.09) saturate(1.05) brightness(1.02)";
  ctx.drawImage(img, 0, 0, SRCW, srch);
  ctx.filter = "none";

  // light feather on the very frame so nothing clips hard at the canvas edge
  ctx.globalCompositeOperation = "destination-in";
  const gh = ctx.createLinearGradient(0, 0, SRCW, 0);
  gh.addColorStop(0, "rgba(0,0,0,0)");
  gh.addColorStop(0.08, "rgba(0,0,0,1)");
  gh.addColorStop(0.92, "rgba(0,0,0,1)");
  gh.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gh;
  ctx.fillRect(0, 0, SRCW, srch);
  const gv = ctx.createLinearGradient(0, 0, 0, srch);
  gv.addColorStop(0, "rgba(0,0,0,0)");
  gv.addColorStop(0.04, "rgba(0,0,0,1)");
  gv.addColorStop(0.97, "rgba(0,0,0,1)");
  gv.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gv;
  ctx.fillRect(0, 0, SRCW, srch);
  ctx.globalCompositeOperation = "source-over";

  const image = ctx.getImageData(0, 0, SRCW, srch);
  const pix = image.data;

  // knock the near-black background out to transparent so only the figure
  // sits on the page — no rectangle, at rest or mid-scatter
  for (let i = 0; i < pix.length; i += 4) {
    const lum =
      (0.299 * pix[i] + 0.587 * pix[i + 1] + 0.114 * pix[i + 2]) / 255;
    const a = lum < 0.05 ? 0 : lum < 0.13 ? (lum - 0.05) / 0.08 : 1;
    pix[i + 3] = Math.min(pix[i + 3], Math.round(a * 255));
  }
  ctx.putImageData(image, 0, 0);

  const rand = mulberry32(0x51ca9a17);

  const candidates: number[] = [];
  for (let p = 0; p < SRCW * srch; p++) {
    const i = p * 4;
    const lum =
      (0.299 * pix[i] + 0.587 * pix[i + 1] + 0.114 * pix[i + 2]) / 255;
    if (lum < 0.06 || pix[i + 3] < 140) continue;
    candidates.push(p);
  }

  const keep = Math.min(1, count / Math.max(1, candidates.length));
  const picked: number[] = [];
  for (let k = 0; k < candidates.length; k++) {
    if (rand() < keep) picked.push(candidates[k]);
  }

  const n = picked.length;
  const home = new Float32Array(n * 3);
  const cloud = new Float32Array(n * 3);
  const color = new Float32Array(n * 3);
  const seed = new Float32Array(n * 3);

  let minX = SRCW;
  let maxX = 0;
  let minY = srch;
  let maxY = 0;
  for (let k = 0; k < n; k++) {
    const p = picked[k];
    const px = p % SRCW;
    const py = (p / SRCW) | 0;
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
  }
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const scale = VIEW_H / srch;

  for (let k = 0; k < n; k++) {
    const p = picked[k];
    const i = p * 4;
    const px = p % SRCW;
    const py = (p / SRCW) | 0;

    const wx = (px - midX) * scale;
    const wy = (midY - py) * scale;
    home[k * 3] = wx;
    home[k * 3 + 1] = wy;
    home[k * 3 + 2] = 0;

    const ang = rand() * Math.PI * 2;
    const rad = 0.9 + rand() * 2.5;
    cloud[k * 3] = wx * 0.4 + Math.cos(ang) * rad;
    cloud[k * 3 + 1] = wy * 0.4 + (rand() - 0.5) * 3.2;
    cloud[k * 3 + 2] = (rand() - 0.5) * 2.4 - 0.5;

    color[k * 3] = Math.min(1, (pix[i] / 255) * 1.05 + 0.03);
    color[k * 3 + 1] = Math.min(1, (pix[i + 1] / 255) * 1.05 + 0.03);
    color[k * 3 + 2] = Math.min(1, (pix[i + 2] / 255) * 1.06 + 0.04);

    seed[k * 3] = rand() * 6.28;
    seed[k * 3 + 1] = 0.5 + rand() * 1;
    seed[k * 3 + 2] = rand() * 6.28;
  }

  const result: AvatarPoints = {
    count: n,
    home,
    cloud,
    color,
    seed,
    imgAspect: ar,
    raster: canvas,
    viewHeight: VIEW_H,
  };
  cache.set(key, result);
  return result;
}
