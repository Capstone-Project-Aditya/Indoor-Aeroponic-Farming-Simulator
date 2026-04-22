// ═══════════════════════════════════════════════════════════════════════════
// AeroFarm IEEE Paper — EQUATIONS INSERT
// ═══════════════════════════════════════════════════════════════════════════
//
// HOW TO USE:
// 1. Add the two helper functions (eq, eqLine) at the top of your main file
//    alongside the existing helper functions (body, bodyMixed, h1, h2, etc.)
//
// 2. Copy the EQUATIONS_SECTION array below and PASTE it into the children[]
//    array of Section 2, immediately AFTER the last paragraph of Section IV
//    (after the AI Vision Diagnostics body paragraphs) and BEFORE the current
//    h1("V", "System Design and Workflow").
//
// 3. Renumber all subsequent sections:
//      h1("V",    "System Design...")    →  h1("VI",   "System Design...")
//      h1("VI",   "Implementation...")   →  h1("VII",  "Implementation...")
//      h1("VII",  "Evaluation...")       →  h1("VIII", "Evaluation...")
//      h1("VIII", "Expected Results")    →  h1("IX",   "Expected Results")
//      h1("IX",   "Future Work")         →  h1("X",    "Future Work")
//      h1("X",    "Conclusion")          →  h1("XI",   "Conclusion")
//
// ═══════════════════════════════════════════════════════════════════════════

// ── STEP 1: Add these two helper functions to your file ──────────────────

function eq(text, num) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 80 },
    children: [
      new TextRun({ text, font: { name: TNR }, size: 18, italic: true }),
      new TextRun({ text: `     (${num})`, font: { name: TNR }, size: 18 }),
    ]
  });
}

function eqLine(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text, font: { name: TNR }, size: 18, italic: true }),
    ]
  });
}

// Helper for "where X = ..." variable definitions after equations
function eqWhere(runs) {
  return new Paragraph({
    alignment: AlignmentType.BOTH,
    spacing: { after: 40, line: 228, lineRule: "auto" },
    children: runs
  });
}

// ── STEP 2: Insert this content into children[] after Section IV ─────────

const EQUATIONS_SECTION = [

  // ── V. MATHEMATICAL FORMULATIONS ──────────────────────────────────────
  h1("V", "Mathematical Formulations"),

  body("This section presents the complete mathematical framework underpinning the AeroFarm simulation platform. The formulations are organized into five subsystems: biomass growth, environmental stress, success probability, resource consumption, and economic feasibility."),

  // ── V-A. Biomass Growth Model ─────────────────────────────────────────
  h2("A", "Biomass Growth Model"),

  body("The simulator employs a discrete-time logistic growth model to simulate daily per-plant biomass accumulation. Each plant is initialized at one percent of its species-specific carrying capacity. On each simulated day, the biomass increment is governed by the logistic equation:"),

  eq("\u0394B(t) = r\u2091 \u00b7 B(t) \u00b7 (1 \u2212 B(t) / K)", 1),

  eq("B(t+1) = min( K, B(t) + \u0394B(t) )", 2),

  eqWhere([
    t("where ", { italic: true }),
    t("\u0394B(t)", { italic: true }),
    t(" is the daily biomass increment in grams, ", {}),
    t("B(t)", { italic: true }),
    t(" is the per-plant biomass on day ", {}),
    t("t", { italic: true }),
    t(", ", {}),
    t("K", { italic: true }),
    t(" is the maximum biomass per plant (carrying capacity) in grams, and ", {}),
    t("r\u2091", { italic: true }),
    t(" is the stress-adjusted effective growth rate.", {}),
  ]),

  body("The initial condition is B(0) = 0.01K. The carrying capacity K is a crop-specific constant; for example, K = 300 g for lettuce and K = 600 g for tomato. The effective growth rate accounts for environmental stress:"),

  eq("r\u2091 = r \u00b7 (1 \u2212 S(t))", 3),

  eqWhere([
    t("where ", { italic: true }),
    t("r", { italic: true }),
    t(" is the intrinsic logistic growth rate constant (e.g., 0.18 for lettuce, 0.08 for strawberry), and ", {}),
    t("S(t)", { italic: true }),
    t(" is the daily composite stress factor bounded in [0, 1], described in Section V-B.", {}),
  ]),

  body("Total biomass across all plants and the final harvest yield are computed as:"),

  eq("Total Biomass (kg) = B(t) \u00b7 N / 1000", 4),

  eq("Final Yield (kg) = B(D) \u00b7 N / 1000", 5),

  eqWhere([
    t("where ", { italic: true }),
    t("N", { italic: true }),
    t(" is the total plant count and ", {}),
    t("D", { italic: true }),
    t(" is the total number of cycle days.", {}),
  ]),

  // ── V-B. Multi-Factor Environmental Stress Model ──────────────────────
  h2("B", "Multi-Factor Environmental Stress Model"),

  body("The composite stress factor quantifies how far the growing environment deviates from the crop\u2019s optimal conditions. Five individual stress components are computed, each bounded in [0, 1], and combined via a weighted linear sum."),

  bodyMixed([
    t("Temperature Stress. ", { bold: true, italic: true }),
    t("Temperature stress penalizes deviations from the crop\u2019s optimal range. If the ambient temperature T falls outside the optimal bounds [T\u2098\u1d62\u2099, T\u2098\u2090\u2093], the stress is proportional to the magnitude of deviation and clamped to unity:", {}),
  ]),

  eq("S\u209c = min(1, |T \u2212 T\u2092\u209a\u209c| / 10)", 6),

  eqWhere([
    t("where ", { italic: true }),
    t("T\u2092\u209a\u209c", { italic: true }),
    t(" denotes the nearest optimal boundary temperature. Within the optimal range, S\u209c = 0.", {}),
  ]),

  bodyMixed([
    t("Light Stress. ", { bold: true, italic: true }),
    t("Light stress is the normalized absolute deviation from the crop\u2019s optimal photoperiod:", {}),
  ]),

  eq("S\u2097 = min(1, |L \u2212 L\u2092\u209a\u209c| / 8)", 7),

  bodyMixed([
    t("CO\u2082 Stress. ", { bold: true, italic: true }),
    t("CO\u2082 stress follows the same structure with a normalization constant of 500 ppm:", {}),
  ]),

  eq("S\u2081\u2082 = min(1, |C \u2212 C\u2092\u209a\u209c| / 500)", 8),

  body("pH stress and electrical conductivity (EC) stress are computed analogously, with normalization constants of 2.0 and 1.5 mS/cm respectively. The five sub-stresses are combined as a weighted sum:"),

  eq("S\u2098 = min(1, 0.30\u00b7S\u209c + 0.25\u00b7S\u2097 + 0.20\u00b7S\u2081\u2082 + 0.15\u00b7S\u209a\u2095 + 0.10\u00b7S\u2091\u2081)", 9),

  body("The weights reflect the relative sensitivity of aeroponic crops to each environmental factor. Table V summarizes the stress weight assignments."),

  // TABLE V: Stress Weights
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 }, children: [new TextRun({ text: "TABLE V", font: { name: TNR }, size: 16, bold: true, smallCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 }, children: [new TextRun({ text: "Environmental Stress Weight Assignments", font: { name: TNR }, size: 16, italic: true })] }),
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [5060, 5060],
    rows: [
      new TableRow({ children: [tCell("Environmental Factor", { w: 5060, bold: true, shade: true }), tCell("Weight", { w: 5060, bold: true, shade: true })] }),
      new TableRow({ children: [tCell("Temperature", { w: 5060 }), tCell("0.30", { w: 5060 })] }),
      new TableRow({ children: [tCell("Light (photoperiod)", { w: 5060 }), tCell("0.25", { w: 5060 })] }),
      new TableRow({ children: [tCell("CO\u2082 concentration", { w: 5060 }), tCell("0.20", { w: 5060 })] }),
      new TableRow({ children: [tCell("Water pH", { w: 5060 }), tCell("0.15", { w: 5060 })] }),
      new TableRow({ children: [tCell("Electrical conductivity", { w: 5060 }), tCell("0.10", { w: 5060 })] }),
    ]
  }),
  new Paragraph({ spacing: { before: 40, after: 100 }, children: [] }),

  body("To introduce realistic day-to-day variability, a stochastic perturbation of \u00b15% is applied via a deterministic seeded pseudo-random hash to ensure reproducibility:"),

  eq("S(t) = clamp( S\u2098 + (\u03b5(t) \u2212 0.5) \u00b7 0.1,  0,  1 )", 10),

  eqWhere([
    t("where ", { italic: true }),
    t("\u03b5(t)", { italic: true }),
    t(" is a seeded pseudo-random value in [0, 1] generated using a sinusoidal hash function for deterministic reproducibility.", {}),
  ]),

  // ── V-C. Success Probability ──────────────────────────────────────────
  h2("C", "Success Probability"),

  body("The overall success probability of a growth cycle is defined as one minus the mean daily stress factor across the entire cycle:"),

  eq("P = clamp( 1 \u2212 (1/D) \u2211 S(t),  0,  1 )", 11),

  body("A value close to 1.0 indicates near-optimal conditions throughout the cycle, while a value approaching 0.0 indicates severe sustained environmental stress."),

  // ── V-D. Nutrient Uptake and Water Consumption ────────────────────────
  h2("D", "Nutrient Uptake and Water Consumption"),

  body("Daily nutrient uptake is modelled as proportional to the daily biomass increment, with a proportionality constant of 0.15 grams of nutrient consumed per gram of new biomass:"),

  eq("U(t) = max( 0,  \u0394B(t) \u00b7 0.15 \u00b7 N )", 12),

  body("Daily water consumption and total cycle water usage are:"),

  eq("W(t) = w \u00b7 N", 13),

  eq("W\u209c\u2092\u209c = w \u00b7 N \u00b7 D", 14),

  eqWhere([
    t("where ", { italic: true }),
    t("w", { italic: true }),
    t(" is the crop-specific water requirement per plant per day in litres.", {}),
  ]),

  // ── V-E. Economic and Financial Model ─────────────────────────────────
  h2("E", "Economic and Financial Model"),

  body("The economic engine computes itemized operational costs and derives profitability metrics from the biologically simulated yield."),

  bodyMixed([
    t("HVAC Power Estimation. ", { bold: true, italic: true }),
    t("When external ambient temperature data is available, the HVAC power draw is estimated based on the thermal differential:", {}),
  ]),

  eq("P\u2095 = 0.2 + (\u0394T \u00b7 0.05 \u00b7 N / 100)     [kW]", 15),

  eqWhere([
    t("where ", { italic: true }),
    t("\u0394T = |T\u2091\u2093\u209c \u2212 T\u1d62\u2099\u209c|", { italic: true }),
    t(" is the absolute indoor-outdoor temperature difference in \u00b0C.", {}),
  ]),

  bodyMixed([
    t("Electricity Cost. ", { bold: true, italic: true }),
    t("Total electricity cost accounts for both lighting and HVAC:", {}),
  ]),

  eq("C\u2091 = (P\u2097 \u00b7 L + P\u2095 \u00b7 24) \u00b7 D \u00b7 p\u2091", 16),

  eqWhere([
    t("where ", { italic: true }),
    t("P\u2097", { italic: true }),
    t(" is the lighting power (kW), ", {}),
    t("L", { italic: true }),
    t(" is the daily photoperiod (hours), and ", {}),
    t("p\u2091", { italic: true }),
    t(" is the electricity tariff (\u20b9/kWh).", {}),
  ]),

  bodyMixed([
    t("Labour and Nutrient Costs. ", { bold: true, italic: true }),
    t("Both follow a fixed-plus-variable structure scaled by plant count and cycle duration:", {}),
  ]),

  eq("C\u2097\u2090\u2098 = (c\u2097\u1da0 + c\u2097\u1d5b \u00b7 N) \u00b7 D", 17),

  eq("C\u2099 = (c\u2099\u1da0 + c\u2099\u1d5b \u00b7 N) \u00b7 D", 18),

  bodyMixed([
    t("Water Cost. ", { bold: true, italic: true }),
    t("Computed from total water consumption:", {}),
  ]),

  eq("C\u2098 = W\u209c\u2092\u209c \u00b7 p\u2098", 19),

  bodyMixed([
    t("Infrastructure Cost. ", { bold: true, italic: true }),
    t("Capital expenditure (CAPEX) is annualized over the payback horizon and prorated per cycle:", {}),
  ]),

  eq("C\u1d62 = (CAPEX / H) / (365 / D)", 20),

  eqWhere([
    t("where ", { italic: true }),
    t("H", { italic: true }),
    t(" is the payback horizon in years.", {}),
  ]),

  bodyMixed([
    t("Total Cost, Revenue, and Net Profit. ", { bold: true, italic: true }),
    t("The aggregate financial metrics are:", {}),
  ]),

  eq("C\u209c\u2092\u209c = C\u2091 + C\u2097\u2090\u2098 + C\u2099 + C\u2098 + C\u1d62", 21),

  eq("R = Y \u00b7 p\u2091\u2098\u2092\u209a", 22),

  eq("\u03c0 = R \u2212 C\u209c\u2092\u209c", 23),

  bodyMixed([
    t("Return on Investment and Payback Period. ", { bold: true, italic: true }),
    t("ROI is expressed as a percentage of total cost, and asset payback is derived from annualized profit:", {}),
  ]),

  eq("ROI = (\u03c0 / C\u209c\u2092\u209c) \u00b7 100    [%]", 24),

  eq("T\u209a = CAPEX / (\u03c0 \u00b7 365/D)    [years]", 25),

  body("If the annualized net profit is non-positive, the payback period is flagged as non-recoverable. Per-kilogram cost and profit metrics are additionally computed as C\u209c\u2092\u209c/Y and \u03c0/Y respectively."),

];

// ── STEP 3: Renumber subsequent sections ─────────────────────────────────
// Find and replace these exact strings in the children[] array:
//
//   h1("V",    "System Design and Workflow")   →  h1("VI",   "System Design and Workflow")
//   h1("VI",   "Implementation Overview")      →  h1("VII",  "Implementation Overview")
//   h1("VII",  "Evaluation Methodology")       →  h1("VIII", "Evaluation Methodology")
//   h1("VIII", "Expected Results")             →  h1("IX",   "Expected Results")
//   h1("IX",   "Future Work")                  →  h1("X",    "Future Work")
//   h1("X",    "Conclusion")                   →  h1("XI",   "Conclusion")
