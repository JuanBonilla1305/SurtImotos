/**
 * Banco de marcas y líneas para sugerir al registrar una moto.
 *
 * Es una ayuda de escritura, NO una validación: el formulario acepta cualquier
 * texto. Si llega una moto que no está en la lista, se escribe y ya.
 *
 * No pretende ser un catálogo histórico completo: cubre el mercado colombiano,
 * incluyendo modelos descontinuados que todavía se compran y venden. Lo que
 * falte lo aporta el propio inventario, porque el formulario suma las marcas y
 * líneas ya registradas a estas sugerencias.
 */

export const MOTO_CATALOG: Record<string, string[]> = {
  AKT: [
    "AK 100", "AK 110", "AK 110 S", "AK 125", "AK 125 NKD", "AK 125 SL", "AK 150",
    "AK 180", "AK 200", "Dynamic 125", "Dynamic Pro 125", "Dynamic R 125", "Evo 125",
    "Evo R 125", "Flex 125", "Special 100", "Special 125", "TT 125", "TT 150",
    "TTR 180", "TTR 200", "RTX 125", "RTX 150", "RTX 200", "Jet 4", "Jet 5",
    "CR4 125", "CR5 180", "XM 180", "XM 200", "Gemini 150", "NKD 125", "NKD 125 Pro",
    "Onda 110", "Vision 100", "Naked 125", "SL 125", "SM 125", "Kronos 150",
  ],
  Aprilia: ["RS 660", "Tuono 660", "SR 160", "STX 150"],
  Ayco: ["Bull 125", "Explorer 150", "Trooper 125", "GT 150"],
  Bajaj: [
    "Boxer 100", "Boxer BM 100", "Boxer BM 150", "Boxer CT 100", "Boxer CT 125",
    "Boxer S 150", "Discover 100", "Discover 125", "Discover 125 ST", "Discover 135",
    "Discover 150", "Platina 100", "Platina 110", "Pulsar 135 LS", "Pulsar 150",
    "Pulsar 180", "Pulsar 200 NS", "Pulsar 200 AS", "Pulsar 220F", "Pulsar NS 125",
    "Pulsar NS 160", "Pulsar NS 200", "Pulsar NS 400", "Pulsar N150", "Pulsar N160",
    "Pulsar N250", "Pulsar RS 200", "Pulsar AS 150", "Dominar 250", "Dominar 400",
    "Avenger 150", "Avenger 220 Cruise", "Avenger 220 Street", "Vikrant 150",
    "Rouser 135", "Rouser 200", "CT 100", "CT 110", "XCD 125", "Kratos 3000",
    "Chetak", "Freedom 125",
  ],
  Benelli: ["TNT 15", "TNT 25", "TNT 300", "Leoncino 250", "Leoncino 500", "TRK 251", "TRK 502", "Imperiale 400"],
  BMW: ["G 310 R", "G 310 GS", "F 750 GS", "F 850 GS", "R 1250 GS", "S 1000 RR", "G 650 GS"],
  CFMoto: ["150 NK", "250 NK", "300 NK", "400 NK", "650 NK", "250 SR", "700 CL-X"],
  Ducati: ["Monster 797", "Scrambler Icon", "Panigale V2", "Multistrada 950", "Hypermotard 950"],
  Hero: [
    "Eco Deluxe 100", "Splendor 100", "Splendor Plus 110", "Dash 110", "Ignitor 125",
    "Hunk 150", "Hunk 160R", "Xpulse 200", "Xpulse 200 4V", "Xtreme 160R",
    "Xtreme 200S", "Thriller 200R", "Glamour 125", "Passion Pro 110", "Destini 125",
    "Maestro 125", "HF Deluxe 100", "Karizma 210",
  ],
  Honda: [
    "C 90", "CGL 125", "CG 125 Titan", "CG 150 Titan", "Storm 125", "Splendor 100",
    "Eco Deluxe 100", "Biz 100", "Biz 125", "Wave 110", "Dio 110", "Navi 110",
    "Elite 125", "Vision 110", "PCX 150", "Activa 125", "CB 1", "CB 110", "CB 125E",
    "CB 125F", "CB 160F", "CB 190R", "CB 250 Twister", "CB 300F", "CB 300R",
    "CB 500F", "CB 500X", "CB 650R", "CB 1000R", "CBF 125", "CBF 150", "CBR 150R",
    "CBR 250R", "CBR 300R", "CBR 500R", "CBR 600RR", "CBR 650R", "CBR 1000RR",
    "XL 125", "XL 185", "XL 200", "XR 125L", "XR 150L", "XR 190L", "XR 250 Tornado",
    "XRE 190", "XRE 300", "XRE 190 Rally", "Falcon 400", "Transalp 750",
    "Africa Twin 1100", "Rebel 300", "Rebel 500", "Shadow 750", "NC 750X",
    "Invicta 150", "Twister 250",
  ],
  Husqvarna: ["Svartpilen 250", "Vitpilen 250", "Svartpilen 401", "Norden 901"],
  Jialing: ["JH 125", "Sport 150"],
  Kawasaki: ["Ninja 400", "Ninja 300", "Ninja 650", "Z400", "Z650", "Z900", "Versys 300", "Versys 650", "KLR 650", "KLX 150"],
  Keeway: ["RKS 125", "RKV 200", "Superlight 200", "K-Light 202", "TX 200"],
  KTM: [
    "Duke 125", "Duke 200", "Duke 250", "Duke 390", "Duke 790", "RC 125", "RC 200",
    "RC 390", "Adventure 250", "Adventure 390", "Adventure 790", "Adventure 890",
    "EXC 250", "EXC 300", "SX 125", "SX-F 250", "Enduro 690",
  ],
  Kymco: ["Agility 125", "Agility 150", "Like 150", "People S 150", "Downtown 300"],
  Lifan: ["KP 150", "KPR 200", "CityR 150", "LF 125"],
  "Royal Enfield": [
    "Classic 350", "Bullet 350", "Meteor 350", "Hunter 350", "Himalayan 411",
    "Scram 411", "Interceptor 650", "Continental GT 650",
  ],
  Starker: ["Vento 150", "Rider 200", "Titan 125"],
  Suzuki: [
    "AX 100", "AX 115", "Best 125", "Viva 115", "Viva R 115", "GN 125", "GN 125H",
    "EN 125", "GS 125", "GS 150", "GSX 125", "GSX 150", "GSX-S 150", "GSX-R 150",
    "GSX-R 600", "GSX-R 750", "GSX-R 1000", "Gixxer 150", "Gixxer SF 150",
    "Gixxer 250", "Gixxer SF 250", "Katana 125", "TS 125", "TS 185", "DR 200",
    "DR 650", "DR-Z 400", "V-Strom 250", "V-Strom 650", "V-Strom 1050",
    "Address 110", "Burgman 125", "Burgman 200", "Avenis 125", "Hayabusa 1300",
    "Intruder 150", "Boulevard M50", "Freewind 650",
  ],
  Triumph: ["Trident 660", "Street Triple", "Tiger 900", "Bonneville T100", "Scrambler 400X"],
  TVS: [
    "Sport 100", "Sport 110", "Neo 110", "Neo NX 110", "Star City 110", "Raider 125",
    "Stryker 125", "Stryker 150", "Apache RTR 150", "Apache RTR 160",
    "Apache RTR 160 4V", "Apache RTR 180", "Apache RTR 200 4V", "Apache RR 310",
    "Ronin 225", "Jupiter 110", "Ntorq 125", "Radeon 110", "Victor 110", "Max 125",
  ],
  UM: ["Renegade Sport 200", "Renegade Commando 125", "DSR Adventure 200", "Xtreet 125"],
  Vento: ["Screamer 200", "Rebellian 250", "Nitrox 150"],
  Victory: [
    "One 100", "One R 100", "Bomber 150", "Bomber Classic 150", "Bomber Sport 150",
    "MRX 125", "MRX 150", "MRX 200", "Advance 125", "Advance 150", "Switch 150",
    "Venture 250", "Zeus 150", "Nitro 125", "Sprint 125",
  ],
  Yamaha: [
    "RX 100", "RX 115", "RX 135", "DT 125", "DT 175", "Libero 110", "Libero 125",
    "Crypton 105", "Crypton 110", "Crypton FI 115", "Crypton T110", "YBR 125",
    "YBR 125Z", "YBR 125 SS", "Fazer 150", "Fazer 250", "FZ 16", "FZ 2.0", "FZ 2.5",
    "FZ 15", "FZ 25", "FZ-S FI", "FZ-X", "SZ 150", "SZR 150", "XTZ 125", "XTZ 150",
    "XTZ 250 Lander", "XTZ 250 Ténéré", "XTZ 660 Ténéré", "Ténéré 700", "XT 600",
    "MT-03", "MT-07", "MT-09", "MT-10", "MT-15", "YZF R1", "YZF R3", "YZF R6",
    "YZF R15", "BWS 100", "BWS 125", "BWS X", "Fino 115", "Ray ZR 125", "NMAX 155",
    "XMAX 300", "Aerox 155", "TTR 125", "TTR 230", "WR 250", "YZ 125", "YZ 250",
    "Virago 250", "Bolt 950", "V-Star 250", "Tracer 900", "Super Ténéré 1200",
  ],
  Yumbo: ["GS 125", "City 125", "Max 110"],
  Zontes: ["155 U", "310 R", "310 T", "350 X"],
};

export const MOTO_BRANDS = Object.keys(MOTO_CATALOG).sort((a, b) =>
  a.localeCompare(b, "es")
);

/** Quita tildes y pasa a minúscula para que "ténéré" encuentre "tenere". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/** Recorta y colapsa espacios repetidos. */
export function cleanText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Devuelve la marca con la escritura del banco cuando la reconoce.
 * Así "yamaha ", "YAMAHA" y "Yamaha" acaban guardados igual y no aparecen como
 * marcas distintas en el filtro del catálogo.
 */
export function canonicalBrand(input: string): string {
  const cleaned = cleanText(input);
  const target = normalize(cleaned);
  return MOTO_BRANDS.find((brand) => normalize(brand) === target) ?? cleaned;
}

/** Pares marca/línea ya registrados en el inventario. */
export type KnownPair = { brand: string; model: string };

/** Une listas sin repetir, comparando sin tildes ni mayúsculas. */
function mergeUnique(...lists: string[][]): string[] {
  const seen = new Map<string, string>();
  for (const list of lists) {
    for (const item of list) {
      const key = normalize(item);
      if (key && !seen.has(key)) seen.set(key, item);
    }
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, "es"));
}

/**
 * Marcas sugeridas: el banco más las que ya existen en el inventario.
 * Lo que el banco no traiga lo aporta el uso real del negocio.
 */
export function brandOptions(known: KnownPair[] = []): string[] {
  return mergeUnique(MOTO_BRANDS, known.map((k) => k.brand));
}

/**
 * Líneas sugeridas para una marca: las del banco más las ya registradas para
 * esa misma marca. Si la marca no está en el banco, quedan solo las del
 * inventario; nunca se inventan líneas.
 */
export function modelsForBrand(brand: string, known: KnownPair[] = []): string[] {
  const target = normalize(brand);
  if (!target) return [];

  const key = Object.keys(MOTO_CATALOG).find((b) => normalize(b) === target);
  const fromCatalog = key ? MOTO_CATALOG[key] : [];
  const fromInventory = known
    .filter((k) => normalize(k.brand) === target)
    .map((k) => k.model);

  return mergeUnique(fromCatalog, fromInventory);
}
