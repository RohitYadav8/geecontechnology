


export interface ServiceDetail {
  title: string;
  gradient: string;
  bannerImage?: string;
  intro: string[];
  challenges: string[];
  middle: string[];
  benefits: string[];
  closing: string;
  coverage: string[];
  qa: string[];
}
export interface ServiceDetail {
  title: string;
  gradient: string;
  intro: string[];
  challenges: string[];
  middle: string[];
  benefits: string[];
  closing: string;
  coverage: string[];
  qa: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {

  "cloud-services": {
    title: "Cloud Services",
    gradient: "from-sky-500 to-teal-300",
    intro: [
      "One of the most powerful technological evolution of our times has been the rollout of cloud computing. With time cloud computing has continued to mature as a useful technology and most organisations are reaping its rewards.",
      "Cloud technologies can be an organisation's greatest and most reliable resource when it comes to solving some of the modern business IT related challenges. At Geecon, we have been involved with cloud computing from its infant stages. Using our end to end cloud solution we have been able to transform our client's capacity and efficiency for the better.",
      "Using a combination of our cloud solutions, we have helped organisations to attain significant cons on many areas:",
    ],
    challenges: [
      "Reduced IT costs",
      "Increased enterprise mobility",
      "Unlimited growth capacity",
      "High real-time availability of resources",
      "Increased Agility",
      "Increased collaboration",
      "Increased business continuity",
      "High availability of ICT support",
    ],
    middle: [
      "We have built our cloud solutions based on a continuous research and refinement model to ensure that our solutions in this area remains to be on the cutting edge.",
      "We can help you move to the cloud with confidence and ensure you achieve evidence based advantages that we are providing to many businesses.",
      "Our cloud solutions include:",
    ],
    benefits: [
      "Cloud Hosting",
      "Cloud Storage",
      "Cloud Infrastructure (Servers & Virtual Desktops)",
      "Cloud Development platforms",
      "Cloud Analytics",
    ],
    closing:
      "One of the undoubted challenges facing cloud computing is that of security. At Geecon, we value our customers and we know the unprecedented value of data and information to an organisation. Our Cloud solutions are provided with the highest security features. We continue to invest in Cloud computing security. In addition to using high ingenuity and the latest analytics technology to combat cloud related cybercrime, we have teamed up with other specialists to continue enhancing security for cloud computing technologies across the globe. Our Cloud security solutions helps businesses to confidently embrace cloud technology and protect against associated risks for all solutions of cloud computing. With our available cloud security services, we help businesses better manage, monitor and control access to critical Cloud business resources.",
    coverage: [],
    qa: [],
  },
 "vps-servers": {
    title: "VPS/Dedicated Servers",
    gradient: "from-slate-700 to-slate-500",
    bannerImage: "/vps.png",
    intro: [
      "We provide dedicated servers and VPS hosting services that can be matched to fit your needs. Whether you are an individual looking for a basic shared hosting package or your small business needs a scalable dedicated web hosting solution, we are willing and able to meet your web hosting needs.",
    ],
    challenges: [],
    middle: [
      "VPS Hosting: Our VPS hosting as a cost-efficient solution comes right in the middle of dedicated and webspace hosting product ranges and provides you with the advantages of both of these types. We use a virtualization solution based on KVM and hardware that corresponds to the latest state of the art. Furthermore you are provided with guaranteed RAM and disk space. Customize your virtual private server to suit your needs and select the operating system (Linux or Windows Server 2012 and Windows Server 2008) of your choice. To manage and administer your virtual machine, you can optionally choose between Parallels Plesk, cPanel/WHM and Webmin. Decide now and rely on high-quality, powerful VPS hosting solutions.",
      "Dedicated Servers: Our entire fleet of dedicated servers is 100% managed, so you do not have to worry about running your servers or fixing any problems. What we mean by Dedicated Servers, is that we will take care of the setup of your dedicated web hosting account, troubleshooting with your dedicated server, and everything in between.",
    ],
    benefits: [],
    closing: "Other services we provide.",
    coverage: [],
    qa: [],
  },

  "custom-development": {
    title: "Customised Software Development",
    gradient: "from-indigo-600 to-blue-400",
    intro: [
      "Off-the-shelf software rarely fits every business perfectly. Every organisation has its own workflows, data structures, and operational quirks, and forcing a generic tool to accommodate them often creates more friction than it solves. We build custom software that is designed around how your business actually works, not the other way around.",
      "Our engineering team works closely with you to understand your processes before writing a single line of code. From there, we design, build, and deploy applications that are scalable, secure, and maintainable — covering everything from internal tools and client-server systems to full-scale web and intranet applications.",
    ],
    challenges: [
      "Custom application architecture designed around your specific workflows",
      "Database design optimised for your data and reporting needs",
      "Client-server and internet/intranet application development",
      "Integration with your existing tools, APIs, and third-party systems",
      "Ongoing iteration based on real user feedback, not fixed assumptions",
    ],
    middle: [
      "We follow an agile development process, which means you see working software early and often, rather than waiting months for a single big reveal. This allows us to course-correct quickly, keep costs predictable, and ensure the final product actually solves the problem it was built for.",
      "Every project is assigned a dedicated team with the right mix of frontend, backend, and database expertise, so you are never working with generalists trying to cover every discipline at once.",
    ],
    benefits: [
      "Software built around your business, not the other way around",
      "Full ownership of source code and architecture — no vendor lock-in",
      "Transparent, milestone-based development process",
      "Post-launch support to handle scaling, bugs, and new feature requests",
    ],
    closing:
      "Whether you need a single internal tool or a full suite of connected applications, our team can scope, build, and support the solution from the first conversation through to long-term maintenance.",
    coverage: [
      "Custom web applications",
      "Internal business tools",
      "Client-server systems",
      "Database design & architecture",
      "API development & integration",
      "Legacy system modernisation",
    ],
    qa: [],
  },
  "website-development": {
    title: "Website Development",
    gradient: "from-blue-700 to-cyan-300",
    intro: [
      "\"Design is thinking made visual\". That's where we step in. We believe in designing a website, that influences the user to take certain actions based on how the user feels about the website. Desktop, smartphone, or tablet …you name it, our team helps plan, design and develop visually appealing websites that will help increase conversion rates and overall traffic. You dream it…we will execute it!",
      "Geecon Systems specializes in professional Website development in India that are focused on your objectives and business goals. From custom informational websites to data-rich applications or online stores, our Mumbai based in-house team have the latest technology at their disposal to create actionable results and create a return on your investment. Of the myriad services, some of the key website design services are:",
    ],
    challenges: [
      "Customized and superbly unique web design templates.",
      "Thorough expertise in HTML & .net website design.",
      "Ability to re-design and change the visual outlook of the client's existing website.",
      "A dedicated team of professional web designers catered to design your website as per your requirement.",
      "Though site construction times vary as per project specifics, once we have all of your provided information, we'll agree on a schedule and stick to it.",
    ],
    middle: [
      "Our job does not end here. In fact, we'll help market your website. We will help build your site with search engine optimisation in mind. This means more people will find your site via search engines and thereby lead to an increase in visitors. Search engines are the best way to gain website viewers for free. We can also work with you to create a paid online marketing campaign.",
    ],
    benefits: [],
    closing: "Other Services we provide.",
    coverage: [],
    qa: [],
  },
  "software-support": {
    title: "Software Support & Maintenance",
    gradient: "from-blue-500 to-cyan-400",
    intro: [
      "If ICT is not planned and managed properly, it can be a restriction to the achievements of a business. To allow business stability and growth, your ICT support team has to be carefully structured and well equipped but most times even the most well planned support structure is not enough to sustain the ambitions of your organisation. The many challenges include:",
    ],
    challenges: [
      "The need for reduced service and support costs within a controlled budget",
      "The need for less systems downtime",
      "The need to invest in compliance and complicated regulations",
      "The need for better quality service from ICT professionals",
      "The need for clearly defined and achieved SLAs",
      "Reduced risk of prominent employees leaving the organisation with their knowledge",
      "The need for round-the-clock access to a help desk services",
    ],
    middle: [
      "Outsourcing your support and maintenance functions with us will not only help you stay afloat with your ICT demands, it will also add significant value to the operations of your organisations.",
      "We carefully analyse your solutions and deploy the right engineers with the relevant experience and skill set to manage your outsourced area to us. All our engineers are qualified and professionally certified in their respective field of expertise.",
      "Using our Support and Maintenance services organisations are able to achieve high levels of ICT availability and when we talk with businesses using our technical helpdesk service to support and maintain their ICT systems, a couple of points stands out about our service:",
    ],
    benefits: [
      "Using our distributed helpdesk resources, we help organisations to reduce their costs",
      "We work to complement organisation's internal resources",
      "We fill the gap for expert resources not available in-house",
      "We allow businesses to focus on their real core objectives",
      "We allow help businesses utilise latest technologies and grow their capability",
    ],
    closing:
      "Our support and maintenance services Software support & maintenance subscriptions can be opted for an agreed length of time to suit your business requirements.",
    coverage: [
      "New software releases",
      "Software updates",
      "Maintenance updates",
      "Installation support",
      "License key management",
      "Technical Support by phone and email",
      "Server and network management",
    ],
    qa: [
      "A software quality assurance services test service is an independent third-party group hired by a software development company to perform software testing in-house. Quality assurance services can identify and resolve potential software bugs, defects, or errors. The benefits of employing a software testing company include:",
      "Assurance – Quality assurance services can help you make sure that the final product you sell uses the highest quality possible. By ensuring that the final product runs smoothly, customers will trust that the website and apps you sell will always work as advertised. In addition to quality assurance testing, software companies may conduct audits, source code audits, bug hits, performance, security, refactoring, and maintenance on your websites and apps to make sure everything was done right. When you build an online business, it is imperative that the website and apps you create are run smoothly and effectively for your customers. Many website development companies offer quality assurance services for both web testing and mobile testing. When using a third-party testing company to perform software testing, you have the benefit of a dedicated team that knows how your application works and will be the most effective in fixing any problems. While quality assurance services for software testing services companies provide many benefits to small businesses, there are a few things you should consider before hiring one of these services. While some businesses have chosen to perform testing and bug fixes in-house, it is much more cost-effective to contract with a quality assurance services because it allows you to save money on having to pay staff to do the job in-house.",
    ],
  },
};


export const fallbackDetail = (title: string, description: string): ServiceDetail => ({
  title,
  gradient: "from-blue-500 to-cyan-400",
  intro: [description],
  challenges: [],
  middle: [],
  benefits: [],
  closing: "",
  coverage: [
    "Dedicated project management",
    "Regular progress updates",
    "Post-delivery support",
    "Flexible engagement models",
  ],
  qa: [],
});