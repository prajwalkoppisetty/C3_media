export type ServiceDetail = {
  n: string;
  group: "BUILD" | "CREATE" | "BRAND";
  icon: string;
  title: string;
  body: string;
  tags: string[];
};

/** Doc §2 service architecture rendered in reference card UI. */
export const serviceDetails: ServiceDetail[] = [
  {
    n: "01",
    group: "BUILD",
    icon: "web",
    title: "Web Development",
    body: "Fast, responsive, future-ready websites built around your brand and business goals.",
    tags: ["Custom Websites", "Responsive", "SEO"],
  },
  {
    n: "02",
    group: "BUILD",
    icon: "app",
    title: "App Development",
    body: "Mobile apps with clean flows, native feel and scalable foundations.",
    tags: ["iOS & Android", "Mobile UI", "APIs"],
  },
  {
    n: "03",
    group: "BUILD",
    icon: "webapp",
    title: "Web Applications",
    body: "Powerful web apps — dashboards, portals and tools your team can run on.",
    tags: ["Dashboards", "SaaS", "APIs"],
  },
  {
    n: "04",
    group: "BUILD",
    icon: "software",
    title: "Custom Software Solutions",
    body: "Tailored software for bookings, billing, automation and internal ops.",
    tags: ["Automation", "Integrations", "Scaling"],
  },
  {
    n: "05",
    group: "CREATE",
    icon: "video",
    title: "Professional Video Editing",
    body: "Cinematic edits that tell stories, grab attention and leave a lasting impression.",
    tags: ["Color Grading", "Motion", "Reels"],
  },
  {
    n: "06",
    group: "CREATE",
    icon: "cube",
    title: "3D Blender Cinematics",
    body: "Stylised 3D stills and motion built in Blender for launches and brands.",
    tags: ["Blender", "Motion", "Rendering"],
  },
  {
    n: "07",
    group: "BRAND",
    icon: "pen",
    title: "Logo Design",
    body: "Marks with meaning — simple, memorable logos that work everywhere.",
    tags: ["Logos", "Marks", "Guidelines"],
  },
  {
    n: "08",
    group: "BRAND",
    icon: "palette",
    title: "Brand Identity",
    body: "Palettes, type and systems that keep every touchpoint unmistakably yours.",
    tags: ["Identity", "Type", "Systems"],
  },
  {
    n: "09",
    group: "BRAND",
    icon: "image",
    title: "Portfolio Design",
    body: "Portfolios for creators and studios that show process, not just pictures.",
    tags: ["Portfolios", "Case Studies", "Web"],
  },
  {
    n: "10",
    group: "BRAND",
    icon: "heart",
    title: "Premium Wedding Invitations",
    body: "Cinematic digital invitations — motion, music and details worth keeping.",
    tags: ["Invitations", "Motion", "Premium"],
  },
];

export const whyItems = [
  {
    n: "01",
    title: "One point of contact",
    body: "The client communicates directly with C³.",
  },
  {
    n: "02",
    title: "Design + Development",
    body: "The product should both function well and look good.",
  },
  {
    n: "03",
    title: "Flexible delivery team",
    body: "Specialists are brought into projects according to requirements.",
  },
  {
    n: "04",
    title: "End-to-end execution",
    body: "Concept → Design → Development → Testing → Launch",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Tell Us",
    body: "Understand the idea, business, audience and requirements.",
  },
  {
    n: "02",
    title: "Plan",
    body: "Scope, timeline, technology, deliverables and quotation.",
  },
  {
    n: "03",
    title: "Build",
    body: "Design, development, content integration and testing.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Launch, handover and post-launch support.",
  },
];
