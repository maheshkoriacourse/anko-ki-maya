export const PANCHANGA_VERSION = "0.3.0" as const;

export {
  ayanamsha,
  siderealLongitude,
  siderealSunRashi,
  normalize360,
  LAHIRI_ANCHOR_J2000_DEG,
  type AyanamshaOptions,
} from "./ayanamsha";

export {
  localDayString,
  startOfLocalDayUTC,
  nextLocalDayStartUTC,
  localCivilTimeToUTC,
  validateLocation,
  riseSet,
  moonrise,
  moonset,
  sunset,
  varaAt,
  weekdayOfLocalDay,
  VARA_NAMES,
  sunriseWindow,
  pratahkala,
  purvahna,
  madhyahna,
  aparahna,
  pradosha,
  nishita,
  brahmaMuhurta,
  arunodaya,
  rahuKala,
  yamaganda,
  gulikaKala,
  abhijitMuhurta,
  dayMuhurtas,
  type DayMuhurtaWindows,
  sankrantiPunyaKala,
  type GeoLocation,
  type TimeWindow,
  type IsoWindow,
  type Vara,
} from "./time";

export {
  elongation,
  tithiAt,
  tithiBoundaries,
  nakshatraAt,
  nakshatraBoundaries,
  yogaAt,
  yogaBoundaries,
  karanaIndexAt,
  karanaAt,
  karanaName,
  karanaBoundaries,
  bhadraIntervals,
  bhadraSplit,
  newMoons,
  solarIngress,
  lunarMonth,
  TITHI_NAMES,
  NAKSHATRA_NAMES,
  YOGA_NAMES,
  MOVABLE_KARANAS,
  LUNAR_MONTH_NAMES,
  type TithiBoundaries,
  type NakshatraBoundaries,
  type YogaBoundaries,
  type KaranaBoundaries,
  type KaranaInterval,
  type BhadraVasa,
  type BhadraDetails,
  type MonthSystem,
  type LunarMonth,
} from "./elements";

// ── Grahaṇa (eclipses) ──────────────────────────────────────────────────────
export {
  lunarEclipses,
  solarEclipses,
  type LunarEclipse,
  type SolarEclipse,
  type GrahanKind,
} from "./eclipses";

// ── Daily pañcāṅga aggregator ───────────────────────────────────────────────
export {
  dailyPanchanga,
  type DailyPanchanga,
  type RunningElement,
  type DayMuhurtas,
} from "./panchanga";

// ── Jyotiṣa: grahas, kuṇḍalī, daśā ──────────────────────────────────────────
export {
  GRAHA_NAMES,
  RASHI_NAMES,
  grahaLongitude,
  grahaPosition,
  grahaPositions,
  meanNodeSidereal,
  trueNodeSidereal,
  janmaFacts,
  type Graha,
  type GrahaOptions,
  type GrahaPosition,
  type JanmaFacts,
} from "./grahas";
export {
  tropicalAscendant,
  siderealLagna,
  lagnaWindow,
  navamsaRashi,
  kundali,
  moonKundali,
  type Kundali,
  type KundaliGraha,
  type KundaliOptions,
  type LagnaWindow,
} from "./kundali";
export {
  SHODASHAVARGA,
  VARGA_NAMES,
  vargaRashi,
  shodashavarga,
  isVargottama,
  type Varga,
} from "./vargas";
export {
  VIMSHOTTARI_SEQUENCE,
  VIMSHOTTARI_TOTAL_YEARS,
  nakshatraLord,
  vimshottariDasha,
  type DashaPeriod,
  type AntardashaPeriod,
  type VimshottariOptions,
} from "./dashas";
export { gunaMilan, type GunaMilanResult, type KootaScore } from "./kootas";
export { mangalDosha, kalaSarpa, type MangalDosha, type KalaSarpa } from "./doshas";

// ── Observance-rule grammar (the keystone) ──────────────────────────────────
export type {
  Kala,
  TithiRef,
  Paksha,
  Sampradaya,
  Observance,
  FestivalRule,
  FestivalResult,
} from "./types";

// ── Observance-rule evaluator ───────────────────────────────────────────────
export {
  selectDayByPervasion,
  computeFestival,
  computeFestivals,
  type PervasionCandidate,
  type Precedence,
  type SelectOptions,
  type SelectResult,
  type ComputeOptions,
} from "./festivals";

// ── Per-festival rule data (§4 core + §4b/§4c extended generators) ──────────
export {
  CORE_RULES,
  ekadashiRules,
  sankashtiRules,
  pradoshRules,
  masikShivaratriRules,
  purnimaVratRules,
  purnimaSnanaRules,
  amavasyaRules,
  sankrantiRules,
  oneOffFestivalRules,
  regionalFestivalRules,
  CHHATH_RULE,
  allRules,
  type RuleProfile,
} from "./rules";
