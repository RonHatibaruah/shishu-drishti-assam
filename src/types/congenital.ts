export type AnomalyCategory = 
  | 'Cleft Lip & Palate'
  | 'Clubfoot (CTEV)'
  | 'Polydactyly / Syndactyly'
  | 'Neural Tube Defect (Spina Bifida)'
  | 'Critical Congenital Heart Disease (CCHD)'
  | 'Craniofacial / Dysmorphism';

export type SeverityTier = 'EMERGENCY' | 'CRITICAL' | 'MODERATE' | 'MILD';

export type ReferralStage = 
  | 'SCREENED_FLAGGED'
  | 'DEIC_SCHEDULED'
  | 'DEIC_CONFIRMED'
  | 'INTERVENTION_UNDERWAY'
  | 'REHABILITATION_COMPLETE'
  | 'FLAG_REFUTED';

export interface CCHDReading {
  preDuctalSpO2: number; // Right hand %
  postDuctalSpO2: number; // Foot %
  delta: number; // difference %
  heartRate: number; // bpm
  result: 'PASS' | 'FAIL' | 'REPEAT_REQUIRED';
  murmurDetected?: boolean;
}

export interface ChildRecord {
  id: string; // e.g. AS-2026-CHD-0412
  childName: string;
  motherName: string;
  fatherName: string;
  dateOfBirth: string;
  ageDays: number;
  gender: 'Male' | 'Female' | 'Other';
  district: string;
  block: string;
  villageOrPocket: string;
  pocketType: 'Tea Garden Line Basti' | 'Riverine Char Area' | 'Urban Slum' | 'Rural Agrarian' | 'Tribal Belt';
  deliveryType: 'Institutional (Medical College / CHC)' | 'Home Delivery with SBA' | 'Unassisted Home Delivery';
  deliveryPoint: string;
  screeningDate: string;
  screenerName: string;
  screenerRole: 'ASHA' | 'ANM' | 'Staff Nurse' | 'RBSK MO';
  anomalyCategory: AnomalyCategory;
  anomalySubtype: string;
  severityTier: SeverityTier;
  aiConfidence: number; // percentage 0 - 100
  anatomicalFeatures: string[];
  piraniScore?: number; // 0 - 6 for CTEV
  cchd?: CCHDReading;
  referralStage: ReferralStage;
  deicCentre: string;
  deicAppointmentDate: string;
  elapsedHours: number; // hours since screening flag
  slaBreached: boolean; // true if elapsedHours > 48 without DEIC confirmation
  targetInterventionWindow: string;
  welfareScheme: 'Smile Train / RBSK' | 'Snehasparsh Cardiac Surgery' | 'RBSK Ponseti Clinic' | 'PMJAY Ayushman';
  parentLanguage: 'Assamese' | 'Bengali' | 'Bodo' | 'Hindi';
  parentPhone: string;
  counselingSent: boolean;
  transportAssistanceRequired: boolean;
  assignedPediatrician: string;
  rchChildId: string;
  abhaId: string;
  clinicalOverrideNote?: string;
  confirmedBy?: string;
  confirmationTimestamp?: string;
  sha256AuditHash: string;
}

export interface HighRiskPocket {
  id: string;
  name: string;
  district: string;
  type: 'Tea Garden Line Basti' | 'Riverine Char Area' | 'Urban Slum' | 'Tribal Belt' | 'Rural Agrarian';
  estimatedAnnualBirths: number;
  screenedCohort: number;
  anomaliesDetected: number;
  prevalenceRate: number; // percentage
  topCondition: AnomalyCategory;
  riskLevel: 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'STANDARD';
  nearestDeicKm: number;
  nearestDeicHours: number;
  assignedRbskUnit: string;
  lat: number;
  lng: number;
}

export interface DEICFacility {
  id: string;
  name: string;
  district: string;
  type: 'Medical College DEIC' | 'District Hospital DEIC';
  leadPediatrician: string;
  activeCasesUnderCare: number;
  surgeriesConductedThisMonth: number;
  ponsetiCastingSlotsAvailable: number;
  cleftSurgeryWaitlistDays: number;
  chdEscalationToGMCH: number;
  slaAdherenceRate: number; // percentage
  lat: number;
  lng: number;
}
