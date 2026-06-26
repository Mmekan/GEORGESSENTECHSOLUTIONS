// product.js
const productsData = {
  
  water: {
    id: "water",
    number: "01 — PumpAction",
    name: "Smart Water Distribution Monitor",
    shortname: "PumpAction",
    proto: "P01",
    badge: "Prototype Ready",
    images: ["img/water1-nobg.png", "img/water2-nobg.png", "pa3.jpeg", "pa4.jpeg"], // add more paths as needed
    problem: "Pump failure and water wastage from overflows are common issues in Nigerian borehole systems, leading to costly repairs and water scarcity.",
    fullDesc: `
      <p>PumpAction is an automated borehole control device specifically designed to address all fundamental issues of borehole systems, domestic and industrial.</p>
      <p>It protects your submersible or surface pump from voltage surge and under-voltage, while guarding the system against short-circuit, overload current, and burnout.</p>
      <p>A surface-mount device that determines when it's safe to switch on your pump, fills your tank automatically, and stops — all without human intervention. It accommodates a display that shows system operations in real time, useful during repairs and maintenance.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Automatic pump on/off based on tank levels</li>
        <li>Surge and under-voltage protection</li>
        <li>Overload and short-circuit cutoff</li>
        <li>Real-time operational display</li>
        <li>Compatible with submersible & surface pumps</li>
      </ul>
    `
  },
  energy: {
    id: "energy",
    number: "02 — AutoChangeover",
    name: "Power Management System",
    shortname: "AutoChangeover",
    proto: "P02",
    badge: "Prototype Ready",
    images: ["img/pwr1-nobg.png", "img/pwr2-nobg.png"], // add paths like ["img/energy1.jpg", "img/energy2.jpg"]
    problem: "Unstable power supply & supply irregularities in Nigeria cause significant disruptions to businesses and households, costing billions in generator and consequential damages.",
    fullDesc: `
      <p>AutoChangeover is a smart power management system specifically engineered as a low-cost solution to Nigeria's erratic grid power supply. It detects outages in milliseconds and switches seamlessly between NEPA, Generator, and Inverter with zero manual intervention.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Seamless power transfer  between sources; NEPA, Gen and Inverter.</li>
        <li>Surge and under-voltage protection.</li>
        <li>Auto Generator start and off</li>
        <li>Manual remote gen stop</li>
        <li>Preset Generator stop times</li>
      </ul>
      <h3>Technical Specifications</h3>
      <ul>
        <li>Capacity: 60Amps- 120Amps</li>
        <li>Battery: Lithium & Tubular compatible</li>
        <li>Input: Single phase, 50Hz</li>
        <li>Warranty: 2 years</li>
      </ul>
    `
  },
 

  mobileshade: {
    id: "Misc",
    number: "03 — MobileShade",
    name: "Mobile Pedestrian Shade",
    shortname: "MobileShade",
    proto: "W.I.P",
    badge: "In Development",
    images: [], // add paths when available
    problem: "Automated erection and maintenance of national flagpoles in every official building remains an unsolved infrastructure gap across Nigeria.",
    fullDesc: `
    This  is a weather mitigation apparatus that enhances the  free state of the hands, head and body flexibility while the umbrella is tethered to the back. 
    It facilitates outdoor pedestrian activities under sun and rain; Vendors, sports, field operations, census, polio immunization, campaign/rallies, crusade , 
    promotional, construction etc
    It is portable, user friendly and easy to maintain.
      `
  }
};

window.productsData = productsData;
