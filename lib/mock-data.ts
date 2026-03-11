export type Severity = "Critical" | "High" | "Elevated" | "Stable";

export const crisisStats = [
  { label: "Active crisis zones", value: "24", delta: "+3", tone: "critical" },
  { label: "Children at acute risk", value: "18.2M", delta: "+1.1M", tone: "high" },
  { label: "Humanitarian partners engaged", value: "146", delta: "+12", tone: "stable" },
  { label: "AI alerts triaged today", value: "382", delta: "92% confidence", tone: "info" }
];

export const mapHotspots = [
  { name: "Sudan", x: "57%", y: "41%", severity: "Critical", pulse: 1.2 },
  { name: "Gaza", x: "59%", y: "38%", severity: "Critical", pulse: 1 },
  { name: "DRC", x: "54%", y: "50%", severity: "High", pulse: 1.4 },
  { name: "Horn of Africa", x: "60%", y: "44%", severity: "High", pulse: 1.1 },
  { name: "Bangladesh", x: "74%", y: "42%", severity: "Elevated", pulse: 0.9 },
  { name: "Haiti", x: "25%", y: "43%", severity: "High", pulse: 1.1 },
  { name: "Ukraine", x: "56%", y: "28%", severity: "Elevated", pulse: 0.8 }
] as const;

export const hotspotDetails = {
  Sudan: {
    severity: "Critical",
    affected: "8.6M affected",
    summary:
      "Urban conflict and access disruption continue to intensify around Khartoum, while displacement is spreading pressure across neighboring states.",
    needs: ["Trauma care", "Safe water", "Child protection"],
    trend: "+11 risk index this week"
  },
  Gaza: {
    severity: "Critical",
    affected: "2.1M affected",
    summary:
      "Shelter saturation and constrained humanitarian access are driving acute health and protection concerns for children and families.",
    needs: ["Emergency shelter", "Health supplies", "Psychosocial support"],
    trend: "+9 risk index this week"
  },
  DRC: {
    severity: "High",
    affected: "6.3M affected",
    summary:
      "Outbreak risk is increasing near displacement sites in eastern provinces, with child health and immunization systems under strain.",
    needs: ["Cold-chain support", "Vaccination teams", "Nutrition services"],
    trend: "+6 risk index this week"
  },
  "Horn of Africa": {
    severity: "High",
    affected: "5.4M affected",
    summary:
      "Climate-linked shocks are combining with chronic food insecurity, pushing WASH and nutrition systems into high-alert mode.",
    needs: ["WASH kits", "Nutrition screening", "Cash assistance"],
    trend: "+5 risk index this week"
  },
  Bangladesh: {
    severity: "Elevated",
    affected: "1.7M affected",
    summary:
      "Flood exposure is rising in low-lying districts, with contamination concerns around water points and temporary shelters.",
    needs: ["Water purification", "Temporary shelter", "Disease surveillance"],
    trend: "+4 risk index this week"
  },
  Haiti: {
    severity: "High",
    affected: "1.4M affected",
    summary:
      "Urban instability and climate stress are compounding barriers to basic service delivery, especially for maternal and child health.",
    needs: ["Mobile clinics", "Food assistance", "Protection casework"],
    trend: "+5 risk index this week"
  },
  Ukraine: {
    severity: "Elevated",
    affected: "3.2M affected",
    summary:
      "Damage to civilian infrastructure continues to affect winter readiness, learning continuity, and localized child protection needs.",
    needs: ["Winterization", "Learning spaces", "Mental health support"],
    trend: "+2 risk index this week"
  }
} as const;

export const incidentFeed = [
  {
    type: "Conflict",
    location: "Khartoum, Sudan",
    timestamp: "3 min ago",
    severity: "Critical",
    summary: "Escalation in urban fighting disrupted access to three child health sites and triggered new civilian displacement."
  },
  {
    type: "Flood",
    location: "Sylhet, Bangladesh",
    timestamp: "18 min ago",
    severity: "High",
    summary: "River overflow damaged shelters and contaminated water points, increasing WASH needs across low-lying communities."
  },
  {
    type: "Disease outbreak",
    location: "North Kivu, DRC",
    timestamp: "34 min ago",
    severity: "High",
    summary: "A cluster of measles cases was detected near displacement camps, with immunization teams requesting cold-chain support."
  },
  {
    type: "Displacement",
    location: "Rafah, Gaza",
    timestamp: "52 min ago",
    severity: "Critical",
    summary: "Population movement intensified overnight, with severe pressure on shelter capacity, trauma care, and child protection services."
  },
  {
    type: "Climate shock",
    location: "Port-au-Prince, Haiti",
    timestamp: "1 hr ago",
    severity: "Elevated",
    summary: "Heat index alerts and power instability are compounding food storage and health delivery constraints."
  }
] as const;

export const needsMetrics = [
  { label: "Food insecurity", value: 82, change: "+7 pts", color: "#F25F5C" },
  { label: "Health risks", value: 68, change: "+4 pts", color: "#FF8A3D" },
  { label: "Displacement levels", value: 76, change: "+11 pts", color: "#1CABE2" },
  { label: "Child protection alerts", value: 64, change: "+9 pts", color: "#7B61FF" }
];

export const needsTrend = [32, 44, 40, 52, 60, 58, 74, 70, 82, 78, 88, 91];

export const sectorCoverage = [
  { name: "Nutrition", coverage: 58, target: 74 },
  { name: "Primary health", coverage: 71, target: 84 },
  { name: "Safe water", coverage: 63, target: 79 },
  { name: "Learning continuity", coverage: 46, target: 68 }
] as const;

export const priorityPulse = [
  { region: "Sudan", severity: 94, urgency: 88, access: 26 },
  { region: "Gaza", severity: 91, urgency: 90, access: 18 },
  { region: "DRC", severity: 79, urgency: 73, access: 42 },
  { region: "Bangladesh", severity: 66, urgency: 61, access: 58 }
] as const;

export const forecastBands = [
  { label: "Now", value: 62 },
  { label: "+6h", value: 68 },
  { label: "+12h", value: 74 },
  { label: "+18h", value: 71 },
  { label: "+24h", value: 79 }
] as const;

export const regionalSnapshots = [
  { region: "Sudan", risk: 94, people: "8.6M", trend: "Rapid deterioration" },
  { region: "Gaza", risk: 91, people: "2.1M", trend: "Access severely constrained" },
  { region: "DRC", risk: 79, people: "6.3M", trend: "Outbreak risk rising" },
  { region: "Bangladesh", risk: 66, people: "1.7M", trend: "Flood exposure increasing" }
] as const;

export const mapRoutes = [
  { from: { x: 57, y: 41 }, to: { x: 60, y: 44 }, intensity: "high" },
  { from: { x: 59, y: 38 }, to: { x: 56, y: 28 }, intensity: "medium" },
  { from: { x: 54, y: 50 }, to: { x: 74, y: 42 }, intensity: "medium" },
  { from: { x: 25, y: 43 }, to: { x: 57, y: 41 }, intensity: "high" }
] as const;

export const watchlistSignals = [
  { label: "Access constraints", value: "Severe", tone: "critical" },
  { label: "Supply pressure", value: "Rising", tone: "high" },
  { label: "Field partner throughput", value: "Stable", tone: "stable" }
] as const;

export const chatPrompts = [
  "What is the humanitarian situation in Sudan?",
  "What are the highest risk regions right now?",
  "What immediate needs are being reported?",
  "Summarize the current crisis in Gaza."
];

export const chatMessages = [
  {
    role: "assistant",
    title: "UNICEF Crisis AI",
    body:
      "Sudan remains the highest-risk context in the current alert set. New fighting around Khartoum is disrupting health access, while displacement pressures are rising in Darfur and Gezira. Immediate priorities are trauma care, safe water, and child protection case management."
  },
  {
    role: "user",
    title: "Analyst",
    body: "What immediate needs are being reported across the top crisis zones?"
  },
  {
    role: "assistant",
    title: "UNICEF Crisis AI",
    body:
      "Across Sudan, Gaza, and eastern DRC, the strongest signal is convergence of shelter shortages, health service disruption, and acute WASH gaps. Child protection alerts are also trending upward where rapid displacement is underway."
  }
] as const;

export const assistantInsights = [
  { label: "Top risk region", value: "Sudan", detail: "Escalation + displacement" },
  { label: "Fastest rising need", value: "WASH", detail: "Flood and access constraints" },
  { label: "Next briefing", value: "14 min", detail: "Auto-generated executive summary" }
] as const;

export const liveSignals = [
  {
    source: "ReliefWeb",
    region: "Sudan",
    type: "Conflict escalation",
    time: "2m ago",
    confidence: 96,
    childImpact: "Very high",
    note: "Urban displacement reports indicate immediate protection and trauma care needs for children."
  },
  {
    source: "GDACS",
    region: "Bangladesh",
    type: "Flood alert",
    time: "8m ago",
    confidence: 91,
    childImpact: "High",
    note: "School disruption and contaminated water points suggest rising WASH and disease exposure risk."
  },
  {
    source: "X Monitor",
    region: "Gaza",
    type: "Displacement signal",
    time: "13m ago",
    confidence: 74,
    childImpact: "Very high",
    note: "Multiple corroborated social posts indicate shelter pressure and urgent child protection concerns."
  },
  {
    source: "Partner Feed",
    region: "DRC",
    type: "Outbreak cluster",
    time: "19m ago",
    confidence: 88,
    childImpact: "High",
    note: "Measles-related field updates point to immunization gaps near displacement camps."
  }
] as const;

export const childImpactProfiles = [
  {
    region: "Sudan",
    score: 93,
    affectedChildren: "4.1M",
    drivers: ["Displacement", "Trauma exposure", "Health service disruption"],
    immediateNeeds: ["Child protection", "Safe water", "Primary care"],
    confidence: 0.94
  },
  {
    region: "Gaza",
    score: 95,
    affectedChildren: "1.0M",
    drivers: ["Shelter saturation", "Acute stress", "Restricted access"],
    immediateNeeds: ["Psychosocial support", "Shelter", "Trauma supplies"],
    confidence: 0.92
  },
  {
    region: "DRC",
    score: 82,
    affectedChildren: "2.7M",
    drivers: ["Outbreak risk", "Nutrition strain", "Displacement"],
    immediateNeeds: ["Vaccination", "Nutrition", "WASH"],
    confidence: 0.87
  }
] as const;

export const provenanceModel = [
  { source: "ReliefWeb", weight: 0.34, status: "Verified" },
  { source: "UN partner sitreps", weight: 0.27, status: "Verified" },
  { source: "GDACS / hazard feeds", weight: 0.22, status: "Verified" },
  { source: "X social signals", weight: 0.17, status: "Corroborated" }
] as const;

export const reportCards = [
  { title: "Daily Executive Brief", detail: "Auto-generated 06:00 UTC", status: "Ready" },
  { title: "Critical Incident Digest", detail: "Last updated 12 minutes ago", status: "Live" },
  { title: "Partner Coordination Snapshot", detail: "AI-drafted from field inputs", status: "Draft" }
] as const;

export const reportTimeline = [
  { time: "06:00", title: "Executive brief generated", detail: "Leadership brief compiled from overnight alerts." },
  { time: "09:30", title: "Partner digest refreshed", detail: "Field submissions clustered and summarized by region." },
  { time: "11:52", title: "Critical incident digest published", detail: "Top 5 risk deltas pushed to command team." }
] as const;
