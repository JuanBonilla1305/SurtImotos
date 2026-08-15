/**
 * Banco de marcas y líneas para sugerir al registrar una moto.
 *
 * Es una ayuda de escritura, NO una validación: el formulario acepta cualquier
 * texto. Si llega una moto que no está en la lista, se escribe y ya.
 * Está orientado al mercado colombiano.
 */

export const MOTO_CATALOG: Record<string, string[]> = {
  AKT: [
    "AK 125 NKD", "AK 110 S", "AK 125 SL", "Dynamic 125", "Dynamic R 125", "Evo 125",
    "Flex 125", "Special 100", "TT 125", "TT 150", "TTR 180", "RTX 150", "RTX 200",
    "Jet 5", "CR4 125", "CR5 180", "XM 180", "Gemini 150",
  ],
  Aprilia: ["RS 660", "Tuono 660", "SR 160", "STX 150"],
  Ayco: ["Bull 125", "Explorer 150", "Trooper 125", "GT 150"],
  Bajaj: [
    "Boxer CT 100", "Boxer CT 125", "Boxer S 150", "Discover 125", "Discover 150",
    "Platina 100", "Pulsar 135", "Pulsar 180", "Pulsar 220F", "Pulsar NS 125",
    "Pulsar NS 160", "Pulsar NS 200", "Pulsar N250", "Pulsar RS 200", "Pulsar N160",
    "Dominar 250", "Dominar 400", "Avenger 220", "Vikrant 150",
  ],
  Benelli: ["TNT 15", "TNT 25", "TNT 300", "Leoncino 250", "Leoncino 500", "TRK 251", "TRK 502", "Imperiale 400"],
  BMW: ["G 310 R", "G 310 GS", "F 750 GS", "F 850 GS", "R 1250 GS", "S 1000 RR", "G 650 GS"],
  CFMoto: ["150 NK", "250 NK", "300 NK", "400 NK", "650 NK", "250 SR", "700 CL-X"],
  Ducati: ["Monster 797", "Scrambler Icon", "Panigale V2", "Multistrada 950", "Hypermotard 950"],
  Hero: [
    "Eco Deluxe 100", "Splendor 100", "Dash 110", "Ignitor 125", "Hunk 150", "Hunk 160R",
    "Xpulse 200", "Xtreme 160R", "Thriller 200R", "Glamour 125",
  ],
  Honda: [
    "CB 110", "CB 125F", "CB 160F", "CB 190R", "CB 250 Twister", "CB 300F", "CB 500F",
    "CBR 250R", "CBR 500R", "CBR 650R", "XR 150L", "XR 190L", "XRE 190", "XRE 300",
    "Navi 110", "Dio 110", "Elite 125", "Wave 110", "Eco Deluxe 100", "Biz 125",
    "Tornado 250", "Africa Twin 1100", "Rebel 500",
  ],
  Husqvarna: ["Svartpilen 250", "Vitpilen 250", "Svartpilen 401", "Norden 901"],
  Jialing: ["JH 125", "Sport 150"],
  Kawasaki: ["Ninja 400", "Ninja 300", "Ninja 650", "Z400", "Z650", "Z900", "Versys 300", "Versys 650", "KLR 650", "KLX 150"],
  Keeway: ["RKS 125", "RKV 200", "Superlight 200", "K-Light 202", "TX 200"],
  KTM: ["Duke 125", "Duke 200", "Duke 250", "Duke 390", "RC 200", "RC 390", "Adventure 250", "Adventure 390", "EXC 300"],
  Kymco: ["Agility 125", "Agility 150", "Like 150", "People S 150", "Downtown 300"],
  Lifan: ["KP 150", "KPR 200", "CityR 150", "LF 125"],
  "Royal Enfield": [
    "Classic 350", "Bullet 350", "Meteor 350", "Hunter 350", "Himalayan 411",
    "Scram 411", "Interceptor 650", "Continental GT 650",
  ],
  Starker: ["Vento 150", "Rider 200", "Titan 125"],
  Suzuki: [
    "Best 125", "GN 125", "GS 150", "Gixxer 150", "Gixxer 250", "Gixxer SF 250",
    "V-Strom 250", "V-Strom 650", "DR 200", "DR 650", "Address 110", "Burgman 125",
    "GSX 150", "GSX-R 750", "EN 125", "Viva 115", "Viva R 115",
  ],
  Triumph: ["Trident 660", "Street Triple", "Tiger 900", "Bonneville T100", "Scrambler 400X"],
  TVS: [
    "Sport 100", "Neo 110", "Raider 125", "Stryker 125", "Apache RTR 160",
    "Apache RTR 160 4V", "Apache RTR 180", "Apache RTR 200 4V", "Ronin 225", "Jupiter 110",
  ],
  UM: ["Renegade Sport 200", "Renegade Commando 125", "DSR Adventure 200", "Xtreet 125"],
  Vento: ["Screamer 200", "Rebellian 250", "Nitrox 150"],
  Victory: ["One 100", "Bomber 150", "Bomber Classic", "MRX 150", "MRX 200", "Advance 150", "Switch 150", "Venture 250"],
  Yamaha: [
    "Crypton 110", "Crypton FI 115", "YBR 125", "YBR 125Z", "FZ 2.0", "FZ 2.5", "FZ 15",
    "FZ 25", "FZ-S FI", "XTZ 125", "XTZ 150", "XTZ 250 Lander", "XTZ 250 Ténéré",
    "MT-03", "MT-07", "MT-09", "MT-15", "YZF R3", "YZF R15", "BWS 125", "BWS X",
    "NMAX 155", "Fino 115", "Ray ZR 125", "SZR 150", "TTR 125", "WR 250",
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

/** Líneas sugeridas para una marca. Si no se reconoce, devuelve todas. */
export function modelsForBrand(brand: string): string[] {
  const target = normalize(brand);
  if (!target) return [];

  const key = Object.keys(MOTO_CATALOG).find((b) => normalize(b) === target);
  if (key) return MOTO_CATALOG[key];

  // Marca desconocida: no se inventan líneas.
  return [];
}
