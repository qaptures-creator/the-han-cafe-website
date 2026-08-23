import fs from "node:fs";
import path from "node:path";

/** Whether a file exists under /public. Path is relative to /public, e.g. "images/foo.png". */
export function assetExists(publicRelativePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicRelativePath));
}

/**
 * Reads real width/height straight from a PNG's IHDR chunk (no dependency).
 * Used to size logo/wordmark images without ever guessing or distorting
 * their aspect ratio. Returns null if the file is missing or not a PNG.
 */
export function getPngDimensions(
  publicRelativePath: string
): { width: number; height: number } | null {
  const filePath = path.join(process.cwd(), "public", publicRelativePath);
  if (!fs.existsSync(filePath)) return null;

  try {
    const buffer = Buffer.alloc(24);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);

    const isPng =
      buffer.readUInt32BE(0) === 0x89504e47 && buffer.readUInt32BE(4) === 0x0d0a1a0a;
    if (!isPng || buffer.toString("ascii", 12, 16) !== "IHDR") return null;

    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } catch {
    return null;
  }
}
