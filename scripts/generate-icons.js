const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const pngToIco = require("png-to-ico");
let toIcoFallback = null;
try {
  toIcoFallback = require("to-ico");
} catch (e) {
  // optional fallback not installed
}

async function generate() {
  const input = path.join(__dirname, "..", "public", "logo-yayasan.jpeg");
  const out192 = path.join(__dirname, "..", "public", "favicon-192.png");
  const out512 = path.join(__dirname, "..", "public", "favicon-512.png");
  const outIco = path.join(__dirname, "..", "public", "favicon.ico");

  if (!fs.existsSync(input)) {
    console.error("Input logo not found:", input);
    process.exit(1);
  }

  try {
    await sharp(input).resize(192, 192, { fit: "cover" }).png().toFile(out192);
    console.log("Written", out192);

    await sharp(input).resize(512, 512, { fit: "cover" }).png().toFile(out512);
    console.log("Written", out512);

    // create small PNGs for ICO and write to disk
    const small16 = path.join(__dirname, "..", "public", "favicon-16.png");
    const small32 = path.join(__dirname, "..", "public", "favicon-32.png");
    const small48 = path.join(__dirname, "..", "public", "favicon-48.png");

    await sharp(input).resize(16, 16).png().toFile(small16);
    await sharp(input).resize(32, 32).png().toFile(small32);
    await sharp(input).resize(48, 48).png().toFile(small48);

    // create ICO from the small PNG files
    try {
      const icoBuffer = await pngToIco([small16, small32, small48]);
      fs.writeFileSync(outIco, icoBuffer);
      console.log("Written", outIco);
    } catch (err) {
      if (toIcoFallback) {
        const buf16 = await sharp(input).resize(16, 16).png().toBuffer();
        const buf32 = await sharp(input).resize(32, 32).png().toBuffer();
        const buf48 = await sharp(input).resize(48, 48).png().toBuffer();
        const icoBuf = await toIcoFallback([buf16, buf32, buf48]);
        fs.writeFileSync(outIco, icoBuf);
        console.log("Written (fallback)", outIco);
      } else {
        throw err;
      }
    }

    console.log("Icon generation complete.");
  } catch (err) {
    console.error("Icon generation failed:", err);
    process.exit(1);
  }
}

generate();
