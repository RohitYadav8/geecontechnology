export interface ProductDetail {
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
}

export const productDetails: Record<string, ProductDetail> = {
  "global-hr": {
    name: "Global HR",
    eyebrow: "Take a tour of Global HR!",
    headline: "Powerful but simple.",
    description:
      "We strive to make our customers happy. As a team we have a long track record of delivering successful HR solutions on an international basis.",
  },
  "facewebinar": {
    name: "Facewebinar",
    eyebrow: "Take a tour of Facewebinar!",
    headline: "Web based meetings.",
    description:
      "Facewebinar is a free video conferencing tool to setup simple online meetings using web based platform. Screen sharing, online meetings and team collaboration are all fast and quick.",
  },
  "gift-aid-claims": {
    name: "Gift Aid Claims",
    eyebrow: "Take a tour of Gift Aid solution",
    headline: "Gift Aid management.",
    description:
      "Our commitment to delivering high quality, flexible and reliable solutions remains at the forefront of our business ethos. Make your donation go further with our solution.",
  },
  "invoice-made-simple": {
    name: "Invoice Made Simple",
    eyebrow: "Take a tour of Invoice Made Simple!",
    headline: "Get paid faster.",
    description:
      "Stop Stuffing. Be Professional. As a team we have a long track record of delivering successful Invoicing solutions on an international basis.",
  },
  "crm-360": {
    name: "CRM 360",
    eyebrow: "Take a tour of CRM 360",
    headline: "Manage your customers.",
    description:
      "Lead Management, Sales Force Automation, Activity Management, and Customer Service are at the core of CRM 360. However, there are plenty of other features that extend this core.",
  },
  "bulk-sms-solution": {
    name: "Bulk SMS Solution",
    eyebrow: "Take a tour of Business SMS world!",
    headline: "Bulk SMS solution.",
    description:
      "BusinessSMS is one among the leaders in providing effective, efficient and responsive bulk messaging solutions including two-way SMS integration for wireless communication.",
  },
  "my-projects": {
    name: "My Projects",
    eyebrow: "Take a tour of My Projects",
    headline: "Manage projects online.",
    description:
      "My Projects is a collaboration tool that organizes your projects into boards. In one glance, My Projects tells you what is being worked on, whos working on what, and where something is in a process.",
  },
  "cms-avatar": {
    name: "CMS Avatar",
    eyebrow: "Take a tour of CMS Avatar",
    headline: "CMS website tool.",
    description:
      "Create, manage, and deploy unlimited pages and Links. You can control your information as and when you need. Change your website when you want.",
  },
};

export const fallbackProductDetail = (name: string, tagline: string): ProductDetail => ({
  name,
  eyebrow: `Take a tour of ${name}!`,
  headline: tagline,
  description: `Discover how ${name} can help streamline your business operations with a solution built for reliability and ease of use.`,
});