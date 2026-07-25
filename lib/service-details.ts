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