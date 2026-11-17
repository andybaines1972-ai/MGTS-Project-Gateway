/* =====================================================================
   YEARLY CONFIG — change this block when Pearson releases the new theme.
   Everything theme-specific lives here: theme text, brief options,
   deadlines, idea library and the theme gateway question.
   The unit criteria (P1–D3) are fixed by the unit spec and stay below.
   ===================================================================== */
const CONFIG = {
  year: "2026–27",
  unit: "Unit 4004: Managing a Professional Engineering Project",
  qualification: "Pearson BTEC Level 4 HNC in Engineering",
  theme: "Artificial Intelligence",
  themeShort: "AI",
  source: "Pearson-set theme release, Issue 2, April 2026 · MGTS assignment brief 2026/27 (tutor D Hastings, IV P Wood)",
  themeRule: "There must be a direct link to the use of AI in the project solution.",
  themeExplainer: [
    "The theme is the lens, not the whole project. You still run a real engineering project: find a problem, plan it, build or improve something, test it and prove the result.",
    "AI has to do a job inside your solution: detect, predict, classify, optimise or recommend. You do not need to become a software developer, and you do not need a PLC.",
    "Pearson wants you to look at AI as a professional engineer would: does it work, can you trust it, what happens when it is wrong, and who stays in charge?"
  ],
  deadlines: [
    {part:"Part 1", what:"Project selection, PDS, plan, Gantt, feasibility, legislation and ethics", date:"2026-12-18"},
    {part:"Part 2", what:"Build, logbook, costs, updated Gantt, monitoring methods, plan evaluation", date:"2027-04-30"},
    {part:"Part 3", what:"Presentation, performance review, network diagram, critical analysis", date:"2027-05-21"}
  ],
  pearsonAngles: [
    "AI-driven optimisation of engineering systems or manufacturing operations",
    "Predictive analytics and digital twins to reduce downtime",
    "Algorithmic design: generative design, automated simulation, AI quality control",
    "Ethical AI and safety oversight: explainable AI, human-in-the-loop, data validation",
    "Case studies of AI successes and failures",
    "AI tools: neural networks, reinforcement learning, computer vision",
    "Strategic decisions: AI infrastructure cost against long-term gains",
    "Working across data science, IT, production and ethics"
  ],
  briefOptions: {
    a:"Investigate AI-driven optimisation of a system or operation",
    b:"Predictive or adaptive control: forecasting and digital twins to cut downtime",
    c:"Algorithmic design: generative design, simulation, AI quality control",
    d:"Improve a system at work (cost, output, energy or time). Built with AI software plus PLC, hydraulic, pneumatic, electronic or electrical parts, with data to confirm the improvement",
    e:"Design, build and test a learning, safety or monitoring device that improves workers' skills (skills learned must be evidenced)",
    f:"A new cloud-based (AI) work program that is remotely accessed, with access and control demonstrated",
    g:"New technology applied to a traditional process, with the improvement demonstrated"
  },
  avoid: [
    "\"I used ChatGPT to research my project\". That is using AI, not AI in the solution.",
    "A pure research essay about AI with nothing built, implemented or tested.",
    "Letting AI directly control a safety function (e-stops, guards, interlocks).",
    "A project where you cannot collect your own before-and-after data.",
    "Filming people without a plan for consent and data protection."
  ],
  themeQuestion: {id:"theme", must:true, q:"Does AI do a job inside your solution?", why:"Detect, predict, classify, optimise or recommend. Researching with a chatbot does not count. The brief needs a direct link to AI in the solution."}
};

/* Filters for the idea generator */
const ROLES = {any:"Any role", maint:"Maintenance", prod:"Production / operations", quality:"Quality / inspection", elec:"Electrical / controls", design:"Design / tooling"};
const EQUIP = {any:"Any equipment", rotating:"Motors, pumps, fans, gearboxes", fluid:"Hydraulics / pneumatics / compressed air", conveyor:"Conveyors / material handling", panel:"Electrical panels / distribution", cnc:"CNC / machine tools", assembly:"Assembly or inspection station", hvac:"HVAC / refrigeration", records:"Maintenance records / data only", training:"Training / workshop", personal:"Personal (car, bike, home)"};
const PROBLEMS = {any:"Any problem", breakdown:"Unplanned breakdowns", energy:"Energy waste", quality:"Defects / scrap", safety:"Safety / near misses", skills:"Skills / training gap", slow:"Slow manual checks"};

/* Idea library — tagged to the AI theme. Replace or extend for a new theme. */
const IDEAS = [
 {id:"vib", title:"Motor vibration early-warning", roles:["maint","elec"], equip:["rotating"], problems:["breakdown"], plc:"none", opt:"d", diff:"Moderate", cost:"£40–£90",
  problem:"A motor, pump or fan fails without warning and stops the line.",
  ai:"Learns the normal vibration pattern and flags changes weeks before failure.", technique:"Anomaly detection (Edge Impulse)",
  sensors:"3-axis accelerometer on the bearing housing; optional temperature probe", edge:"ESP32 or Arduino Nano 33 BLE Sense (model runs on the device)",
  comms:"Wi-Fi + MQTT to a broker, or USB serial while testing", storage:"CSV on SD card, or InfluxDB time-series database", action:"Amber/red alert on a dashboard and a work request",
  human:"The AI only raises an alert. A maintenance engineer checks the machine and decides on the repair.", data:"Breakdown history and downtime minutes before; warning time gained after"},
 {id:"thermal", title:"Thermal hotspot checker for electrical panels", roles:["elec","maint"], equip:["panel"], problems:["safety","breakdown","slow"], plc:"none", opt:"g", diff:"Moderate", cost:"£80–£180",
  problem:"Loose terminals and overloaded breakers overheat, and manual thermography is infrequent.",
  ai:"Classifies thermal images as normal, warm or hotspot and highlights where.", technique:"Image classification (computer vision)",
  sensors:"MLX90640 thermal camera module", edge:"Raspberry Pi 4/5",
  comms:"Wi-Fi to a local server or cloud folder", storage:"Timestamped images + labels in a folder or database", action:"Report listing panels to inspect",
  human:"A competent electrician confirms every hotspot under safe isolation before any work. Electricity at Work Regs apply.", data:"Inspection time and faults found per survey, before and after"},
 {id:"air", title:"Compressed air leak finder", roles:["maint","prod"], equip:["fluid"], problems:["energy"], plc:"none", opt:"d", diff:"Moderate", cost:"£50–£120",
  problem:"Air leaks waste compressor energy and money, and are hard to hear on a noisy shop floor.",
  ai:"Tells the sound of a leak apart from background factory noise.", technique:"Sound classification",
  sensors:"Ultrasonic or MEMS microphone", edge:"Arduino Nano 33 BLE Sense or ESP32",
  comms:"BLE to a phone app, or Wi-Fi", storage:"Leak log with location, size estimate and date", action:"Leak tag list for repair",
  human:"An engineer confirms each leak and prioritises repairs.", data:"Compressor run hours or kWh before and after repairs; £ saved per year"},
 {id:"hyd", title:"Hydraulic power pack health monitor", roles:["maint"], equip:["fluid"], problems:["breakdown","energy"], plc:"optional", opt:"b", diff:"Advanced", cost:"£120–£300",
  problem:"Pump wear and seal leakage creep up slowly until a press or machine stops.",
  ai:"Predicts pump efficiency drop from pressure, temperature and run-time trends.", technique:"Regression / trend forecasting",
  sensors:"Pressure transducer (4–20 mA), oil temperature, flow or motor current", edge:"Raspberry Pi with ADC, or read existing PLC values",
  comms:"Modbus TCP or OPC UA from the PLC; MQTT to the database", storage:"Time-series database with 1-second readings", action:"Predicted days-to-service on a dashboard",
  human:"The prediction informs the planned maintenance schedule. A person approves any change.", data:"Unplanned hydraulic stoppages and oil changes per year"},
 {id:"vision", title:"AI vision reject on an assembly station", roles:["quality","prod","elec"], equip:["assembly"], problems:["quality","slow"], plc:"required", opt:"d", diff:"Advanced", cost:"£150–£400",
  problem:"Missing or wrongly fitted parts reach the end of the line.",
  ai:"A camera model checks each part as pass or fail. The PLC rejects fails or stops the station.", technique:"Computer vision classification / object detection",
  sensors:"Industrial or USB camera with fixed lighting; part-present sensor", edge:"Raspberry Pi or vision PC, plus existing PLC",
  comms:"Digital I/O or Profinet/EtherNet/IP between the vision unit and PLC", storage:"Fail images saved with timestamp for review", action:"PLC diverts the part and logs the reject",
  human:"Quality reviews every reject image daily and retrains the model on mistakes. The AI never overrides guarding.", data:"Escapes per 1,000 parts and inspection time per part"},
 {id:"plcdrift", title:"Cycle-time drift prediction from PLC data", roles:["elec","maint","prod"], equip:["conveyor","cnc","assembly"], problems:["breakdown","slow"], plc:"required", opt:"b", diff:"Advanced", cost:"£0–£150",
  problem:"Machines slow down gradually before they fail, and nobody notices until they stop.",
  ai:"Learns normal cycle times and flags drift that points to wear, sticking valves or sensors.", technique:"Anomaly detection on time-series data",
  sensors:"Existing PLC signals: cycle start/end, motor current, sensor timings", edge:"PLC plus a PC or Pi reading the data",
  comms:"OPC UA or Modbus TCP from the PLC to Python", storage:"SQL or time-series database", action:"Daily drift report and alert",
  human:"Engineers investigate flagged machines. No automatic changes to the PLC program.", data:"OEE, cycle time and downtime before and after"},
 {id:"energy", title:"Energy forecasting for compressors or HVAC", roles:["maint","prod","elec"], equip:["hvac","fluid","rotating"], problems:["energy"], plc:"optional", opt:"a", diff:"Moderate", cost:"£60–£150",
  problem:"Plant runs at full output when demand is low (nights, weekends, breaks).",
  ai:"Forecasts demand from time, shift pattern and temperature so plant can be scheduled down.", technique:"Forecasting / regression",
  sensors:"Clamp-on current transformers (CTs), temperature sensors", edge:"ESP32 energy monitor or existing BMS/PLC",
  comms:"Wi-Fi + MQTT, or BACnet/Modbus from the BMS", storage:"Time-series database", action:"Recommended run schedule",
  human:"The facilities or shift lead approves schedule changes. Process needs come first.", data:"kWh per week and £ before and after"},
 {id:"tool", title:"CNC tool wear detection", roles:["prod","quality","maint"], equip:["cnc"], problems:["quality","breakdown"], plc:"none", opt:"c", diff:"Advanced", cost:"£60–£200",
  problem:"Tools are changed too early (waste) or too late (scrap and broken tools).",
  ai:"Estimates tool condition from spindle current or vibration and suggests the change point.", technique:"Classification / regression",
  sensors:"Spindle load from the controller, or CT clamp and accelerometer", edge:"ESP32 or Pi",
  comms:"MTConnect or controller data export; Wi-Fi", storage:"Per-tool log of load against parts made", action:"Tool change suggestion on the machine HMI or tablet",
  human:"The setter decides when to change the tool, and parts are still measured.", data:"Tool life, scrap rate and tooling cost"},
 {id:"belt", title:"Belt and chain wear camera check", roles:["maint"], equip:["conveyor"], problems:["breakdown","slow"], plc:"none", opt:"g", diff:"Entry", cost:"£40–£100",
  problem:"Conveyor belts and chains are checked by eye and failures are still missed.",
  ai:"A camera model rates wear (good, monitor, replace) from photos.", technique:"Image classification (Teachable Machine or Edge Impulse)",
  sensors:"Camera at a fixed point on the conveyor", edge:"Raspberry Pi",
  comms:"Wi-Fi to a shared folder or dashboard", storage:"Labelled image set and results log", action:"Weekly condition report",
  human:"A maintenance engineer confirms the rating before ordering parts.", data:"Belt/chain failures and inspection time"},
 {id:"cmms", title:"Breakdown history analyser", roles:["maint","prod"], equip:["records"], problems:["breakdown"], plc:"none", opt:"f", diff:"Entry", cost:"£0–£30",
  problem:"Planned maintenance is on fixed intervals and does not match how assets actually fail.",
  ai:"Finds repeat failures and patterns in the breakdown history and suggests better PM intervals.", technique:"Clustering / text analysis of job records",
  sensors:"None. Uses CMMS or job-card history (anonymised)", edge:"Cloud notebook or web app",
  comms:"Secure cloud access (remotely accessed, as option f requires)", storage:"Cleaned dataset in a cloud database", action:"Revised PM plan and a dashboard",
  human:"The maintenance manager approves PM changes. You must show proof of the improvement.", data:"Repeat breakdowns and PM hours before and after"},
 {id:"assist", title:"Machine maintenance assistant", roles:["maint","prod","elec"], equip:["training","records"], problems:["skills","slow","safety"], plc:"none", opt:"e", diff:"Moderate", cost:"£0–£50",
  problem:"New starters struggle to find the right procedure or manual page quickly.",
  ai:"Answers questions only from your company's own manuals and procedures, and shows the source page.", technique:"Language model with document search (retrieval)",
  sensors:"None", edge:"Tablet or PC on the shop floor",
  comms:"Company network or approved cloud service", storage:"Indexed manuals and procedures", action:"Answer plus link to the official document",
  human:"It supports, never replaces, the authorised procedure. Isolation and LOTO always follow the signed procedure.", data:"Time to find information; trainee assessment scores before and after"},
 {id:"ppe", title:"Safety zone and PPE awareness camera", roles:["prod","maint"], equip:["assembly","training"], problems:["safety"], plc:"optional", opt:"e", diff:"Advanced", cost:"£100–£300",
  problem:"People enter marked zones without the right PPE.",
  ai:"Detects people and PPE in a zone and gives a warning light or message.", technique:"Object detection (computer vision)",
  sensors:"Camera, warning beacon", edge:"Raspberry Pi with an AI accelerator",
  comms:"Local network only", storage:"Counts only. No video kept", action:"Warning light; weekly near-miss count",
  human:"Advisory only. Never part of the safety system. Needs consent, a DPIA and HR/union agreement. Strong D1 material.", data:"Near-miss reports before and after"},
 {id:"spc", title:"AI quality monitoring on measurement data", roles:["quality","prod"], equip:["cnc","assembly"], problems:["quality"], plc:"none", opt:"a", diff:"Moderate", cost:"£0–£80",
  problem:"Dimensional drift is only spotted after parts are out of tolerance.",
  ai:"Spots unusual trends in measurement data earlier than standard control-chart rules.", technique:"Anomaly detection compared against SPC",
  sensors:"Digital gauges or CMM exports", edge:"PC or cloud notebook",
  comms:"USB gauge interface or file export", storage:"Measurement database", action:"Early warning to the operator",
  human:"The operator and quality engineer decide on adjustments.", data:"Scrap rate and Cpk before and after"},
 {id:"gen", title:"Generative-design fixture or bracket", roles:["design","prod"], equip:["assembly","cnc"], problems:["quality","slow","energy"], plc:"none", opt:"c", diff:"Moderate", cost:"£30–£150",
  problem:"A jig, fixture or bracket is heavy, slow to load or causes errors.",
  ai:"Generative design creates and simulates lighter or better options for you to compare.", technique:"Generative design + automated simulation (e.g. Fusion)",
  sensors:"None. Testing uses load and fit checks", edge:"CAD workstation; 3D printer or machining",
  comms:"Not central. Explain the CAD-to-manufacture data flow", storage:"Design iterations and simulation results", action:"Manufactured, trialled fixture",
  human:"You judge every generated design for manufacturability, safety and cost. The AI only proposes.", data:"Load time, weight, error rate before and after"},
 {id:"rig", title:"AI fault-finding training rig", roles:["elec","maint"], equip:["training"], problems:["skills"], plc:"optional", opt:"e", diff:"Moderate", cost:"£80–£250",
  problem:"Apprentices get little safe practice at diagnosing electrical or sensor faults.",
  ai:"Suggests the most likely fault from the readings a learner takes, and explains why.", technique:"Classification / decision model trained on fault data",
  sensors:"Low-voltage rig with switchable faults; voltage/current readings", edge:"Arduino or Pi (or small PLC)",
  comms:"USB or Wi-Fi to a tablet", storage:"Learner attempts and fault data", action:"Hints and feedback on screen",
  human:"A tutor or supervisor signs off the learner's competence, not the AI.", data:"Time to find faults and test scores before and after"},
 {id:"cold", title:"Cold store temperature drift warning", roles:["maint","quality"], equip:["hvac"], problems:["quality","breakdown","energy"], plc:"none", opt:"b", diff:"Entry", cost:"£40–£120",
  problem:"Chillers and cold rooms drift out of range before alarms trip.",
  ai:"Predicts drift from temperature and door-opening patterns, giving earlier warnings.", technique:"Anomaly detection / forecasting",
  sensors:"Temperature probes, door switches", edge:"ESP32 nodes",
  comms:"LoRaWAN or Wi-Fi + MQTT", storage:"Time-series database", action:"Early-warning message",
  human:"The engineer decides on action. Existing alarms stay in place.", data:"Out-of-range events and stock losses"},
 {id:"home", title:"Home energy or solar forecaster", roles:["any"], equip:["personal"], problems:["energy"], plc:"none", opt:"a", diff:"Entry", cost:"£30–£80",
  problem:"Household energy is used at expensive times, or solar output is wasted.",
  ai:"Forecasts use or solar output so loads can be moved to cheaper times.", technique:"Forecasting / regression",
  sensors:"CT clamp energy monitor or smart-meter data; weather data", edge:"ESP32 or Raspberry Pi",
  comms:"Wi-Fi + MQTT", storage:"Home database or spreadsheet", action:"Daily plan for when to run appliances",
  human:"You decide what to switch. The AI only advises.", data:"kWh and £ per week before and after"},
 {id:"obd", title:"Vehicle health monitor (OBD-II)", roles:["any"], equip:["personal"], problems:["breakdown"], plc:"none", opt:"b", diff:"Moderate", cost:"£20–£60",
  problem:"Faults on your car or bike show up only when a warning light comes on.",
  ai:"Learns normal engine data and flags unusual readings early.", technique:"Anomaly detection",
  sensors:"OBD-II Bluetooth adapter (coolant temp, RPM, fuel trims)", edge:"Phone or Raspberry Pi",
  comms:"Bluetooth, then Wi-Fi upload", storage:"Trip logs", action:"Health report after each trip",
  human:"You or a mechanic decide what to check. Never a reason to ignore a warning light.", data:"Logged trips and flagged anomalies"}
];

/* Fixed gateway questions (theme question is inserted from CONFIG) */
const GATE = [
  {id:"problem", must:true, q:"Is there a real engineering or manufacturing problem you can describe in one sentence?", why:"LO1 needs an identified problem. Say who it affects and what it costs."},
  null,
  {id:"build", must:true, q:"Will you build, implement and test something that works?", why:"Brief options d to g all need something made or implemented, then tested. A report alone is not enough for P3."},
  {id:"data", must:true, q:"Can you collect your own before-and-after data?", why:"Pearson asks for primary research compared with secondary research. You need data to prove the improvement."},
  {id:"human", must:true, q:"Can you say who makes the final decision, and what happens when the AI is wrong?", why:"Human-in-the-loop is central to the theme. Plan for false alarms and missed faults."},
  {id:"safety", must:true, q:"Will the AI stay out of direct control of safety functions?", why:"E-stops, guards and interlocks must stay on proper safety-rated systems. AI can advise, not replace them."},
  {id:"time", must:true, q:"Can it be finished in about 30 weeks alongside your job?", why:"Part 1 is due first. Scope it so the build is done well before Part 2."},
  {id:"employer", must:false, q:"Does your employer support it, with access to the equipment and data?", why:"Pearson recommends employer engagement. You also need permission to fit sensors or use company data."},
  {id:"budget", must:false, q:"Do you know the budget, and has it been agreed?", why:"Part 2 needs real quotes and costs. Many AI projects can be done for under £100."},
  {id:"personal", must:false, q:"If the project records people or personal data, is there a plan for consent and data protection?", why:"Cameras or personal data bring UK GDPR into play. Choose N/A if no personal data is involved.", na:true},
  {id:"measure", must:false, q:"Have you picked one number that shows success?", why:"For example downtime minutes, kWh, scrap %, inspection time or test score."},
  {id:"skills", must:false, q:"Do you know which new skills you will need to learn?", why:"Feeds your SWOT, plan and performance review (M4)."}
];

/* Fixed unit criteria (from the unit spec / MGTS brief) */
const CRITERIA = [
 {lo:"LO1", title:"Select a project that solves an identified engineering problem", part:"Part 1", items:[
  {c:"P1", t:"Select an appropriate project, giving reasons", brief:"Tasks 1a, 1b, 1c, 1e: six ideas (4 work, 2 personal), RAG to three, advantages and disadvantages, radar diagram, weighted matrix, recommendation", ai:"Each idea should state the AI job and where it sits. Use the gateway to rule ideas in or out."},
  {c:"P2", t:"Create a project plan", brief:"Tasks 1f to 1j: logbook, PDS, 30-week plan, Gantt chart, roles and responsibilities", ai:"Put AI-specific tasks in the plan: collect training data, train, test, retrain, validate."},
  {c:"M1", t:"Undertake a feasibility study to justify selection", brief:"Tasks 1d, 1k: SWOT, SMART targets, feasibility study, cost-benefit analysis", ai:"Include AI kit cost against expected saving, and the risk that the model doesn't reach the accuracy you need."},
  {c:"D1", t:"Illustrate the effect of legislation and ethics on the plan", brief:"Task 1l: link legislation and ethical decisions directly to your plan", ai:"HASAWA, PUWER, Supply of Machinery Regs, Electricity at Work Regs, UK GDPR for any personal data. Ethics: human-in-the-loop, bias in training data, explainability, impact on jobs."}
 ], tip:"MGTS expectation for merit and distinction: use three decision-making tools to choose the problem and three to choose the solution."},
 {lo:"LO2", title:"Conduct planned project activities", part:"Part 2", items:[
  {c:"P3", t:"Conduct project activities, recording progress against the plan", brief:"Tasks 2a to 2e, 2g: costings with real quotes, updated Gantt, four or more problems and solutions, weekly logbook, build and test evidence, review meetings", ai:"Log model versions, accuracy results and every time you retrain. Problems with data quality count as real engineering problems."},
  {c:"M2", t:"Explore alternative monitoring methods and justify your choice", brief:"Task 2i: three alternative ways to monitor the project and meet milestones", ai:"For example Gantt, earned value, Kanban or a digital project tool. AI scheduling tools can be one option, critically discussed."},
  {c:"D2", t:"Critically evaluate the plan and recommend improvements", brief:"Task 2j (and 2h action plan): did the plan anticipate problems, delays and specialist support?", ai:"Was enough time planned for collecting and labelling data? This is where most AI projects slip."}
 ]},
 {lo:"LO3 / LO4", title:"Report, present and draw conclusions", part:"Parts 2 and 3", items:[
  {c:"P4", t:"Produce a project report covering each stage and analysing outcomes", brief:"Task 2f plus the Part 3 report: planned against delivered, using the PDS, logbook and witness statements", ai:"Compare the AI's results with the old method using your before-and-after data."},
  {c:"P5", t:"Present activities and outcomes to an audience", brief:"Tasks 3a, 3b: presentation (PDF) and questions", ai:"Explain the AI layer in plain terms: what data goes in, what decision comes out, who checks it."},
  {c:"M3", t:"Use critical analysis and evaluation techniques", brief:"Tasks 3e, 3f: network diagram, how the Gantt charts were used", ai:"Use the right measures: false alarms, missed detections, accuracy, payback time."},
  {c:"M4", t:"Analyse your own behaviours and performance", brief:"Tasks 3c, 3d, 3g: 500-word performance review, logbook reflection, external evidence", ai:"Reflect on the new digital skills you learned and how you checked AI output rather than trusting it."},
  {c:"D3", t:"Critically analyse outcomes and recommend further development", brief:"Task 3h: justify conclusions against the specification and give in-depth recommendations", ai:"How would this scale across the site? What would it need: data, network, cyber security, training, cost?"}
 ]}
];

/* IoT / AI stack explorer */
const LAYERS = [
 {id:"asset", n:"L1", name:"Physical asset", sum:"The machine, process or product you are improving.", body:"Everything starts here. Know how it works, how it fails and what a failure costs. The AI is only as useful as your understanding of the asset.",
  terms:[["Failure mode","How a part fails: wear, overheating, leaks, misalignment."],["FMEA","Failure mode and effects analysis: a way to rank which failures matter most."],["OEE","Overall equipment effectiveness: availability × performance × quality."]]},
 {id:"sense", n:"L2", name:"Sensing", sum:"Sensors turn physical behaviour into signals.", body:"Pick sensors that show the failure you care about, and sample fast enough to catch it. Vibration needs thousands of readings a second; temperature needs one every few seconds.",
  terms:[["4–20 mA / 0–10 V","Standard industrial analogue signals. 4 mA = zero, so a broken wire (0 mA) is detectable."],["Digital I/O","On/off signals: limit switches, prox sensors, reed switches."],["I²C / SPI","Short-distance buses used by small sensor boards."],["Sample rate (Hz)","Readings per second. Too low and you miss the event."],["Resolution","The smallest change a sensor can detect."],["IO-Link","A point-to-point link that sends sensor values and diagnostics digitally."]]},
 {id:"edge", n:"L3", name:"Edge and control", sum:"The device next to the machine that reads sensors and runs control or AI.", body:"A PLC runs control logic reliably. A microcontroller (ESP32, Arduino) or single-board computer (Raspberry Pi) is often easier for AI. Running the model here is called edge AI: fast, works offline, and data stays on site.",
  terms:[["PLC","Programmable logic controller. Industrial, robust, deterministic."],["Microcontroller","Small, cheap, low-power chip. Can run tiny AI models."],["Single-board computer","A small Linux computer. Good for cameras and larger models."],["Edge AI / inference","Running a trained model on the device to make a prediction."],["HMI","Human-machine interface: the operator screen."]]},
 {id:"comms", n:"L4", name:"Communications", sum:"How data moves from the edge to storage and between machines.", body:"Choose a protocol by distance, speed, reliability and security. Keep the machine (OT) network separate from the office (IT) network, and never expose a PLC directly to the internet.",
  terms:[["Modbus RTU / TCP","Simple, old, very common. Reads registers from devices."],["OPC UA","Modern industrial standard. Structured data with built-in security."],["MQTT","Lightweight publish/subscribe. Devices publish to a topic on a broker; anything subscribed receives it."],["Profinet / EtherNet/IP","Industrial Ethernet for fast PLC-to-device control."],["Wi-Fi / BLE / LoRaWAN","Wireless: Wi-Fi for bandwidth, BLE for short range, LoRaWAN for long range and low data."],["Latency","Delay between something happening and the data arriving."],["OT vs IT","Operational tech (machines) vs information tech (office systems). Segment them."]]},
 {id:"store", n:"L5", name:"Storage", sum:"Where the data is kept, labelled and made usable.", body:"AI needs clean, timestamped, labelled data. Decide how long you keep it, who can access it and whether any of it is personal data. Bad data gives a bad model.",
  terms:[["Time-series database","Stores values against time (e.g. InfluxDB). Ideal for sensor data."],["Historian","Industrial system that logs plant data long-term."],["CSV / SD card","Simplest option for a prototype."],["Cloud storage","Remote and accessible anywhere (Azure, AWS, Supabase). Check company policy."],["Labelling","Marking data as normal / faulty so a model can learn from it."],["Data retention","How long you keep data, and why. A UK GDPR requirement for personal data."]]},
 {id:"ai", n:"L6", name:"AI and analytics", sum:"The model that learns from the data and makes a prediction.", body:"Training uses historic data to build the model; inference uses it on live data. Test it on data it has never seen, and measure how often it is wrong in each direction.",
  terms:[["Anomaly detection","Learns normal and flags anything unusual. Needs little fault data."],["Classification","Sorts inputs into classes: pass/fail, good/worn."],["Regression / forecasting","Predicts a number: days to failure, tomorrow's kWh."],["Computer vision","AI on images or video."],["Training vs inference","Learning from data vs using the learned model."],["False positive / negative","False alarm vs missed fault. Decide which is worse for your process."],["Overfitting","Model memorises training data and fails on new data."],["Explainable AI (XAI)","Being able to show why the model made a decision."]]},
 {id:"act", n:"L7", name:"Decision and action", sum:"What happens with the result: alert, dashboard, work order or control action.", body:"Most projects should end with advice to a person, not automatic action. If the AI does trigger an action, it must be non-safety, reversible and logged.",
  terms:[["Dashboard","A live view of results (e.g. Grafana, Power BI)."],["Alert threshold","The score at which a warning is raised."],["CMMS work order","An automatic maintenance request raised from an alert."],["Closed loop","The system acts automatically. Higher risk and needs strong justification."],["Audit trail","A record of what the AI said and what people did."]]}
];

/* ---------------- state ---------------- */
const KEY = "mgts-gateway-" + CONFIG.year;
const blank = () => ({student:{name:"",employer:"",role:"maint"}, filters:{role:"any",equip:"any",problem:"any",plc:"any"}, shortlist:[], chosen:null, gateway:{title:"",problem:"",answers:{}}, stack:{}, openLayer:"ai", custom:""});
let S = blank();
try{ const raw = localStorage.getItem(KEY); if(raw) S = Object.assign(blank(), JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = s => document.querySelector(s);
const opts = (obj, sel) => Object.entries(obj).map(([k,v]) => `<option value="${k}"${k===sel?" selected":""}>${esc(v)}</option>`).join("");
const idea = id => IDEAS.find(i => i.id === id);
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.hidden=false; clearTimeout(toast.h); toast.h=setTimeout(()=>t.hidden=true,1800); }

const VIEWS = [
  {id:"theme", label:"Theme"}, {id:"ideas", label:"Ideas"}, {id:"gateway", label:"Gateway"},
  {id:"stack", label:"AI layer"}, {id:"criteria", label:"Criteria"}, {id:"summary", label:"My project"}
];
function route(){ const h = location.hash.slice(1); return VIEWS.some(v=>v.id===h) ? h : "theme"; }

/* ---------------- views ---------------- */
function vTheme(){
  const today = new Date(); today.setHours(0,0,0,0);
  const dl = CONFIG.deadlines.map(d => {
    const dt = new Date(d.date+"T00:00:00"); const days = Math.round((dt-today)/864e5);
    const left = days > 0 ? `${days} days to go` : days === 0 ? "Due today" : "Submitted / passed";
    return `<div class="deadline"><span class="eyebrow">${esc(d.part)}</span><b>${dt.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</b><span class="left">${left}</span><p class="muted" style="font-size:.88rem;margin-top:4px">${esc(d.what)}</p></div>`;
  }).join("");
  return `
  <div class="hero">
    <span class="eyebrow">${esc(CONFIG.unit)} · Pearson-set theme ${esc(CONFIG.year)}</span>
    <div class="theme">${esc(CONFIG.theme)}</div>
    <p class="rule">${esc(CONFIG.themeRule)}</p>
    <div class="grid3">${CONFIG.themeExplainer.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
    <div class="row"><a class="btn primary" href="#ideas">Find a project idea</a><a class="btn" href="#stack">Where does AI fit?</a></div>
  </div>
  <div class="deadlines">${dl}</div>
  <div class="grid2">
    <div class="panel stack"><h3>Project types in the MGTS brief</h3>
      ${Object.entries(CONFIG.briefOptions).map(([k,v])=>`<div class="opt"><span class="l">${k}</span><span>${esc(v)}</span></div>`).join("")}
      <p class="muted" style="font-size:.88rem">A PLC is listed as one option in (d), not a requirement. Hydraulic, pneumatic, electronic or electrical parts all qualify.</p>
    </div>
    <div class="stack">
      <div class="panel stack"><h3>Angles Pearson suggests</h3><ol class="plain">${CONFIG.pearsonAngles.map(a=>`<li>${esc(a)}</li>`).join("")}</ol></div>
      <div class="panel stack"><h3>Steer clear of</h3><ul class="plain avoid">${CONFIG.avoid.map(a=>`<li>${esc(a)}</li>`).join("")}</ul></div>
    </div>
  </div>
  <div class="panel stack"><h3>How to use this</h3>
    <ol class="plain">
      <li><b>Ideas</b>: filter by your job and equipment, shortlist six ideas (4 work, 2 personal) and pick one.</li>
      <li><b>Gateway</b>: answer the questions honestly. A no-go means change the idea before you write Part 1.</li>
      <li><b>AI layer</b>: map your project onto the seven layers so you can explain the data flow and who stays in charge.</li>
      <li><b>Criteria</b>: see what each grade needs and where AI shows up in it.</li>
      <li><b>My project</b>: copy your summary into your logbook and take it to your tutor.</li>
    </ol>
    <p class="muted" style="font-size:.88rem">Your answers are saved in this browser only. Nobody else can see them until you copy and share the summary.</p>
  </div>`;
}

function scoreIdea(i,f){
  if(f.plc==="no" && i.plc==="required") return -1;
  let s = 0;
  if(f.equip!=="any"){ if(i.equip.includes(f.equip)) s+=3; else if(f.equip==="personal" || i.equip.includes("personal")) return -1; }
  else if(i.equip.includes("personal")) s-=0.5;
  if(f.problem!=="any") s += i.problems.includes(f.problem) ? 3 : -1;
  if(f.role!=="any") s += (i.roles.includes(f.role)||i.roles.includes("any")) ? 1.5 : 0;
  if(f.plc==="yes") s += i.plc==="required" ? 2 : i.plc==="optional" ? 1 : 0;
  return s;
}
function ideaCard(i){
  const inList = S.shortlist.some(x=>x.id===i.id);
  const plcTxt = i.plc==="required"?"Uses a PLC":i.plc==="optional"?"PLC optional":"No PLC needed";
  return `<article class="idea${S.chosen===i.id?" isChosen":""}">
    <div class="chips"><span class="chip gold">Brief (${i.opt})</span><span class="chip">${esc(i.diff)}</span><span class="chip">${esc(i.cost)}</span><span class="chip">${plcTxt}</span></div>
    <h3>${esc(i.title)}</h3>
    <p class="muted" style="font-size:.93rem">${esc(i.problem)}</p>
    <p class="aijob"><b>AI job:</b> ${esc(i.ai)}</p>
    <details><summary>Show the full stack</summary>
      <dl><dt>Model</dt><dd>${esc(i.technique)}</dd><dt>Sense</dt><dd>${esc(i.sensors)}</dd><dt>Edge</dt><dd>${esc(i.edge)}</dd><dt>Comms</dt><dd>${esc(i.comms)}</dd><dt>Store</dt><dd>${esc(i.storage)}</dd><dt>Action</dt><dd>${esc(i.action)}</dd><dt>Human</dt><dd>${esc(i.human)}</dd><dt>Prove it</dt><dd>${esc(i.data)}</dd></dl>
    </details>
    <div class="row">
      <button class="btn small" data-act="toggleShort" data-id="${i.id}">${inList?"Remove from shortlist":"Add to shortlist"}</button>
      <button class="btn small${S.chosen===i.id?" primary":""}" data-act="choose" data-id="${i.id}">${S.chosen===i.id?"My project":"Make this my project"}</button>
    </div>
  </article>`;
}
function vIdeas(){
  const f = S.filters;
  const list = IDEAS.map(i=>({i,s:scoreIdea(i,f)})).filter(x=>x.s>=0).sort((a,b)=>b.s-a.s).map(x=>x.i);
  const work = S.shortlist.filter(x=>x.type==="work").length, pers = S.shortlist.filter(x=>x.type==="personal").length;
  return `
  <div class="intro"><span class="eyebrow">Step 2</span><h2>Idea generator</h2><p class="muted">Tell it about your job and the kit around you. Every idea shows the job AI does, the full data stack and how you'd prove it worked. Use them as starting points and adapt them to a real problem at your company.</p></div>
  <div class="panel filters">
    <label class="f">Your role<select id="fRole">${opts(ROLES,f.role)}</select></label>
    <label class="f">Equipment you work on<select id="fEquip">${opts(EQUIP,f.equip)}</select></label>
    <label class="f">Problem to solve<select id="fProb">${opts(PROBLEMS,f.problem)}</select></label>
    <label class="f">PLC available?<select id="fPlc">${opts({any:"Either",yes:"Yes, use one",no:"No PLC"},f.plc)}</select></label>
  </div>
  <div class="row"><span class="muted">${list.length} idea${list.length===1?"":"s"} match.</span><button class="btn small" data-act="surprise">Surprise me</button><button class="btn small" data-act="clearFilters">Clear filters</button></div>
  <div class="grid2" id="ideaGrid">${list.map(ideaCard).join("") || `<div class="panel">No matches. Try "Any" on one of the filters.</div>`}</div>
  <div class="panel stack">
    <div class="row" style="justify-content:space-between"><h3>Shortlist for Task 1a</h3>
      <span class="counter"><span class="${work>=4?"ok":"bad"}">Work ${work}/4</span> · <span class="${pers>=2?"ok":"bad"}">Personal ${pers}/2</span></span></div>
    <p class="muted" style="font-size:.9rem">The brief asks for six ideas (four work-based, two personal), then a RAG rating down to the best three, with at least one personal idea kept.</p>
    <div class="shortlist">${S.shortlist.length ? S.shortlist.map((x,k)=>{const i=idea(x.id); return `<div class="sl"><span class="t">${esc(i?i.title:x.id)}</span>
      <select aria-label="Work or personal" data-sl="type" data-k="${k}">${opts({work:"Work",personal:"Personal"},x.type)}</select>
      <select aria-label="RAG rating" data-sl="rag" data-k="${k}">${opts({"":"RAG…",green:"Green",amber:"Amber",red:"Red"},x.rag)}</select>
      <button class="btn small danger" data-act="rmShort" data-k="${k}">Remove</button></div>`}).join("") : `<p class="muted">Nothing shortlisted yet. Use "Add to shortlist" on an idea.</p>`}</div>
    <label class="f">Your own idea (if none of these fit)<textarea id="custom" placeholder="Describe the problem and the job you want AI to do">${esc(S.custom)}</textarea></label>
  </div>`;
}

function gateQs(){ return GATE.map(g => g || CONFIG.themeQuestion); }
function verdict(){
  const qs = gateQs(), a = S.gateway.answers;
  const answered = qs.filter(q=>a[q.id]).length;
  const mustNo = qs.filter(q=>q.must && a[q.id]==="no");
  const mustUnsure = qs.filter(q=>q.must && (a[q.id]==="unsure" || !a[q.id]));
  const shouldFlags = qs.filter(q=>!q.must && (a[q.id]==="no"||a[q.id]==="unsure"));
  let cls="pending", big="Not finished", text=`Answer all ${qs.length} questions to get a verdict.`;
  if(mustNo.length){ cls="nogo"; big="No-go"; text="This idea fails a must-have. Change the idea or the scope, then run the gateway again."; }
  else if(answered===qs.length && !mustUnsure.length){ cls="go"; big= shouldFlags.length?"Go, with actions":"Go"; text= shouldFlags.length?"All must-haves are met. Sort out the actions below before you write Part 1.":"All checks passed. Take this summary to your tutor to agree the project."; }
  else if(answered===qs.length){ cls="cond"; big="Talk to your tutor"; text="Some must-haves are unsure. Agree them with your tutor before you commit."; }
  return {cls,big,text,mustNo,mustUnsure:answered===qs.length?mustUnsure:[],shouldFlags,answered,total:qs.length};
}
function vGateway(){
  const qs = gateQs(), a = S.gateway.answers, v = verdict(), ch = S.chosen && idea(S.chosen);
  const seg = q => { const vals = q.na ? [["yes","Yes"],["unsure","Unsure"],["no","No"],["na","N/A"]] : [["yes","Yes"],["unsure","Unsure"],["no","No"]];
    return `<div class="seg" role="group" aria-label="Answer">${vals.map(([k,l])=>`<button data-gate="${q.id}" data-v="${k}" aria-pressed="${a[q.id]===k}">${l}</button>`).join("")}</div>`; };
  const list = arr => arr.map(q=>`<li>${esc(q.q)} <span class="muted">${esc(q.why)}</span></li>`).join("");
  return `
  <div class="intro"><span class="eyebrow">Step 3</span><h2>Project gateway</h2><p class="muted">Every project has to get through this gate before Part 1. Red-tagged questions are must-haves: one "No" makes it a no-go. Be honest. It's far easier to change an idea now than in March.</p></div>
  <div class="panel grid2">
    <label class="f">Project title<input type="text" id="gTitle" value="${esc(S.gateway.title)}" placeholder="${ch?esc(ch.title):"e.g. Vibration early-warning for line 3 extract fan"}"></label>
    <label class="f">The problem in one sentence<input type="text" id="gProblem" value="${esc(S.gateway.problem)}" placeholder="${ch?esc(ch.problem):"Who is affected, how often, and what it costs"}"></label>
  </div>
  <div class="panel">
    <div class="row" style="justify-content:space-between;margin-bottom:6px"><span class="mono muted">${v.answered} of ${v.total} answered</span></div>
    <div class="gaugebar"><i style="width:${Math.round(v.answered/v.total*100)}%"></i></div>
    ${qs.map(q=>`<div class="q"><div><p><span class="tag ${q.must?"must":"should"}">${q.must?"MUST":"SHOULD"}</span><b>${esc(q.q)}</b></p><p class="why">${esc(q.why)}</p></div>${seg(q)}</div>`).join("")}
  </div>
  <div class="verdict ${v.cls}" id="verdict">
    <span class="big">${v.big}</span><p>${v.text}</p>
    ${v.mustNo.length?`<div><b>Fails:</b><ul class="plain">${list(v.mustNo)}</ul></div>`:""}
    ${v.mustUnsure.length?`<div><b>Unsure must-haves:</b><ul class="plain">${list(v.mustUnsure)}</ul></div>`:""}
    ${v.shouldFlags.length && !v.mustNo.length?`<div><b>Actions:</b><ul class="plain">${list(v.shouldFlags)}</ul></div>`:""}
  </div>`;
}

function vStack(){
  const ch = S.chosen && idea(S.chosen);
  return `
  <div class="intro"><span class="eyebrow">Step 4</span><h2>Where the AI layer sits</h2><p class="muted">Almost every AI project in engineering follows the same Internet of Things (IoT) path: from the machine, through sensors and networks, to stored data, to a model, to a decision. Open each layer to learn the terms, then write what your project uses at that layer.${ch?` Pre-filled from <b>${esc(ch.title)}</b>. Edit it to match your real project.`:""}</p></div>
  <div class="stackwrap">
    <div class="layers">${LAYERS.map((L,k)=>{
      const open = S.openLayer===L.id, mine = S.stack[L.id];
      return `${k?`<div class="arrow" aria-hidden="true">data ↑</div>`:""}
      <div class="layer${L.id==="ai"?" ai":""}" role="button" tabindex="0" data-layer="${L.id}" aria-expanded="${open}">
        <span class="lv">${L.n}</span>
        <div style="min-width:0"><h3>${esc(L.name)}</h3><p class="sum">${esc(L.sum)}</p>${mine&&!open?`<p class="mine"><b>MINE</b> ${esc(mine)}</p>`:""}</div>
        ${open?`<div class="layerbody" data-stop="1"><p>${esc(L.body)}</p><div class="terms">${L.terms.map(([t,d])=>`<div class="term"><b>${esc(t)}</b>${esc(d)}</div>`).join("")}</div>
        <label class="f">In my project, this layer is…<textarea data-stackin="${L.id}" placeholder="e.g. ${esc(stackHint(L.id))}">${esc(mine||"")}</textarea></label></div>`:""}
      </div>`;}).join("")}
    </div>
    <aside class="hitl">
      <span class="eyebrow">Alongside every layer</span>
      <h3>Human in the loop</h3>
      <p style="font-size:.93rem">The AI advises. A competent person decides. Pearson's theme puts this at the centre, and so does good engineering.</p>
      <ul class="plain" style="font-size:.9rem">
        <li>Who sees the AI's output, and what do they do with it?</li>
        <li>What happens on a false alarm? On a missed fault?</li>
        <li>Can you explain why it flagged something (XAI)?</li>
        <li>Is the training data fair and representative?</li>
        <li>Safety systems stay hard-wired and safety-rated.</li>
      </ul>
      <label class="f">My human-in-the-loop plan<textarea data-stackin="human" placeholder="e.g. Alert goes to the shift engineer, who inspects within 24 h and logs the outcome to retrain the model.">${esc(S.stack.human||"")}</textarea></label>
    </aside>
  </div>`;
}
function stackHint(id){ return {asset:"Line 3 extract fan, 7.5 kW motor",sense:"Accelerometer at 1 kHz on drive-end bearing",edge:"ESP32 running the trained model",comms:"Wi-Fi, MQTT topic plant/line3/fan",store:"InfluxDB, 1 year retention",ai:"Anomaly detection trained on 2 weeks of normal running",act:"Amber alert on dashboard + CMMS request"}[id]||""; }

function vCriteria(){
  return `
  <div class="intro"><span class="eyebrow">Step 5</span><h2>Mapping to the criteria</h2><p class="muted">What each grade needs, which brief tasks cover it, and how the AI theme shows up. Pass criteria must all be met before merit counts; merit before distinction.</p></div>
  ${CRITERIA.map(L=>`<div class="panel lo"><div><span class="eyebrow">${esc(L.lo)} · ${esc(L.part)}</span><h3>${esc(L.title)}</h3></div>
    ${L.items.map(c=>`<div class="crit ${c.c[0].toLowerCase()}"><span class="code">${c.c}</span><div style="min-width:0"><p><b>${esc(c.t)}</b></p><p class="muted" style="font-size:.9rem">${esc(c.brief)}</p><p class="ai"><b>${esc(CONFIG.themeShort.toUpperCase())} ANGLE</b> ${esc(c.ai)}</p></div></div>`).join("")}
    ${L.tip?`<p class="tip">${esc(L.tip)}</p>`:""}</div>`).join("")}`;
}

function summaryText(){
  const ch = S.chosen && idea(S.chosen), v = verdict(), a = S.gateway.answers, L=[];
  L.push(`MGTS PROJECT GATEWAY · ${CONFIG.unit} · Theme ${CONFIG.year}: ${CONFIG.theme}`);
  L.push(`Learner: ${S.student.name||"—"}    Employer: ${S.student.employer||"—"}`);
  L.push("");
  L.push(`PROJECT: ${S.gateway.title || (ch?ch.title:"—")}`);
  L.push(`Problem: ${S.gateway.problem || (ch?ch.problem:"—")}`);
  if(ch){ L.push(`Based on idea: ${ch.title} (brief option ${ch.opt}, ${ch.diff}, est. ${ch.cost})`); L.push(`AI job: ${ch.ai}`); L.push(`Model type: ${ch.technique}`); L.push(`Evidence to collect: ${ch.data}`); }
  if(S.custom) L.push(`Own idea notes: ${S.custom}`);
  L.push("");
  L.push(`GATEWAY: ${v.big.toUpperCase()} (${v.answered}/${v.total} answered)`);
  gateQs().forEach(q=>L.push(`  [${(a[q.id]||"—").toUpperCase().padEnd(6)}] ${q.must?"MUST  ":"SHOULD"} ${q.q}`));
  L.push("");
  L.push("AI / IoT STACK");
  LAYERS.forEach(x=>L.push(`  ${x.n} ${x.name}: ${S.stack[x.id]||"—"}`));
  L.push(`  Human in the loop: ${S.stack.human||"—"}`);
  L.push("");
  L.push("SHORTLIST (Task 1a)");
  if(!S.shortlist.length) L.push("  —");
  S.shortlist.forEach(x=>{const i=idea(x.id); L.push(`  - ${i?i.title:x.id} [${x.type}] RAG: ${x.rag||"not rated"}`);});
  L.push("");
  L.push("Deadlines: " + CONFIG.deadlines.map(d=>`${d.part} ${new Date(d.date+"T00:00:00").toLocaleDateString("en-GB")}`).join(" · "));
  return L.join("\n");
}
function vSummary(){
  return `
  <div class="intro"><span class="eyebrow">Step 6</span><h2>My project summary</h2><p class="muted">Copy this into your logbook as your first entry and take it to your tutor to agree the project. It updates as you change anything in the other steps.</p></div>
  <div class="panel grid2">
    <label class="f">Your name<input type="text" id="sName" value="${esc(S.student.name)}"></label>
    <label class="f">Employer<input type="text" id="sEmp" value="${esc(S.student.employer)}"></label>
  </div>
  <div class="panel stack">
    <div class="row"><button class="btn primary" data-act="copy">Copy summary</button><button class="btn danger" data-act="askReset">Start again</button></div>
    <div id="resetBox"></div>
    <pre class="out" id="out"></pre>
  </div>`;
}

/* ---------------- render + events ---------------- */
function render(){
  const r = route();
  $("#themeBadge").textContent = `${CONFIG.year} · ${CONFIG.theme}`;
  $("#nav").innerHTML = VIEWS.map((v,k)=>`<a href="#${v.id}"${v.id===r?' aria-current="page"':""}><span class="n">${k+1}</span>${v.label}</a>`).join("");
  $("#app").innerHTML = `<section class="view">${({theme:vTheme,ideas:vIdeas,gateway:vGateway,stack:vStack,criteria:vCriteria,summary:vSummary})[r]()}</section>`;
  if(r==="summary") $("#out").textContent = summaryText();
  $("#foot").textContent = `Source: ${CONFIG.source}. Guidance only. The assignment brief and your tutor have the final say.`;
}
function rerenderKeepScroll(){ const y = window.scrollY; render(); window.scrollTo(0,y); }

document.addEventListener("click", e=>{
  const b = e.target.closest("[data-act],[data-gate],[data-layer]");
  if(!b) return;
  if(b.dataset.gate){ S.gateway.answers[b.dataset.gate]=b.dataset.v; save(); rerenderKeepScroll(); return; }
  if(b.dataset.layer){ if(e.target.closest("[data-stop]")) return; S.openLayer = S.openLayer===b.dataset.layer?null:b.dataset.layer; save(); rerenderKeepScroll(); return; }
  const act = b.dataset.act, id = b.dataset.id;
  if(act==="toggleShort"){ const k=S.shortlist.findIndex(x=>x.id===id); if(k>=0) S.shortlist.splice(k,1); else { const i=idea(id); S.shortlist.push({id,type:i.equip.includes("personal")?"personal":"work",rag:""}); } }
  if(act==="rmShort"){ S.shortlist.splice(+b.dataset.k,1); }
  if(act==="choose"){ S.chosen=id; const i=idea(id);
    if(!S.shortlist.some(x=>x.id===id)) S.shortlist.push({id,type:i.equip.includes("personal")?"personal":"work",rag:"green"});
    const pre={asset:i.problem,sense:i.sensors,edge:i.edge,comms:i.comms,store:i.storage,ai:`${i.technique}. ${i.ai}`,act:i.action,human:i.human};
    Object.entries(pre).forEach(([k,v])=>{ if(!S.stack[k]) S.stack[k]=v; });
    toast("Set as your project. The AI layer page is pre-filled."); }
  if(act==="surprise"){ const pool=IDEAS.filter(i=>scoreIdea(i,S.filters)>=0); const pick=pool[Math.floor(Math.random()*pool.length)]; if(pick){ save(); render(); const el=document.querySelector(`[data-id="${pick.id}"]`)?.closest(".idea"); if(el){ el.scrollIntoView({block:"center",behavior:"smooth"}); el.style.outline="2px solid var(--gold)"; setTimeout(()=>el.style.outline="",1600);} return; } }
  if(act==="clearFilters"){ S.filters={role:"any",equip:"any",problem:"any",plc:"any"}; }
  if(act==="copy"){ const txt=summaryText();
    const fallback=()=>{ const r=document.createRange(); r.selectNodeContents($("#out")); const sel=getSelection(); sel.removeAllRanges(); sel.addRange(r); toast("Text selected. Press Ctrl+C to copy"); };
    try{ navigator.clipboard.writeText(txt).then(()=>toast("Summary copied"),fallback); }catch(err){ fallback(); } return; }
  if(act==="askReset"){ $("#resetBox").innerHTML=`<div class="confirm"><span>Clear all your answers in this browser?</span><button class="btn small danger" data-act="doReset">Yes, clear everything</button><button class="btn small" data-act="noReset">Keep them</button></div>`; return; }
  if(act==="noReset"){ $("#resetBox").innerHTML=""; return; }
  if(act==="doReset"){ S=blank(); save(); toast("Cleared"); }
  save(); rerenderKeepScroll();
});
document.addEventListener("keydown", e=>{ const l=e.target.closest("[data-layer]"); if(l && e.target===l && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); l.click(); } });
document.addEventListener("change", e=>{
  const t=e.target, f=S.filters;
  if(t.id==="fRole"){ f.role=t.value; S.student.role=t.value; } else if(t.id==="fEquip") f.equip=t.value; else if(t.id==="fProb") f.problem=t.value; else if(t.id==="fPlc") f.plc=t.value;
  else if(t.dataset.sl){ S.shortlist[+t.dataset.k][t.dataset.sl]=t.value; }
  else return;
  save(); rerenderKeepScroll();
});
document.addEventListener("input", e=>{
  const t=e.target;
  if(t.id==="gTitle") S.gateway.title=t.value; else if(t.id==="gProblem") S.gateway.problem=t.value;
  else if(t.id==="sName") S.student.name=t.value; else if(t.id==="sEmp") S.student.employer=t.value;
  else if(t.id==="custom") S.custom=t.value;
  else if(t.dataset.stackin) S.stack[t.dataset.stackin]=t.value;
  else return;
  save(); const o=$("#out"); if(o) o.textContent=summaryText();
});
window.addEventListener("hashchange", ()=>{ render(); window.scrollTo(0,0); });
render();
