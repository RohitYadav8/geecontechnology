import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";
import { FaqAccordion } from "../../../../components/faq-accordion";

// NOTE: update this path to wherever your actual CRM360 banner image lives in /public.
const BANNER_SRC = "/crm-banner.png";

const faqItems = [
    {
        question: "Sales and marketing features",
        answer:
            "A Lead represents a company or a representative of a company that may have an interest in your products or services. A Potential is a lead that does have an interest in your products or services. An Account is either a customer or a prospect that has an attached Potential. A Contact is a person that is connected to an Account. Multi-channel lead and account management is an integral part of CRM and is firmly supported by CRM 360. You can capture leads from your website, enter them after a conference, etc. and CRM 360 will help you work on those leads and track them until they become business opportunities and then paying accounts. You can filter the lead view with custom filters so you can have visibility to specific segments of your lead pool, such as location, number of employees, revenue, sales stage, and so on.",
    },
    {
        question: "Contact Management",
        answer:
            "CRM 360 shows you a complete history of your relationship with leads and customers. In their contact record you'll find their personal information, notes you've written, and emails and calls you've exchanged with them. And if you've attached a file, sent them a quote, or engaged with them in any other way, you'll find it there too, so that you can learn about them faster and take action sooner. Create a task to follow up with them later. Or if you've already scheduled a meeting, create a calendar event. Tasks and events are linked to the contact's record so that their information is just a click away.",
    },
    {
        question: "Activity Management",
        answer:
            "CRM 360 allows your team to manage their appointments on a shared calendar as well as schedule and assign tasks. You can choose to see your appointments on a calendar view or you can look at them in list fashion if you prefer.",
    },
    {
        question: "Customer Service / Support",
        answer:
            "A critical piece of CRM is customer service/support. Full support for this is built into CRM 360. Two features in particular contribute to a successful customer relationship: email management and ticket management. E-mail management: CRM 360 has a nice feature where you can send emails directly from the CRM and they'll be recorded in the lead/account details. Ticket management: resolving customer questions and issues is also a key to CRM success — CRM 360 features a trouble ticket module that provides full help desk or call center functionality.",
    },
    {
        question: "Inventory Management",
        answer:
            "CRM 360's inventory management system stores all of your products and services, including quantities, descriptions, pictures, prices, serial numbers and more, while price books help you develop different pricing strategies for various customer scenarios. You can add vendors as product sources and use low inventory warnings as a reminder to create purchase orders to order new product. Or you can create quotes, sales orders, and invoices that automatically deduct from available stock, for which you can request online payments from customers that are tracked against their outstanding invoices.",
    },
    {
        question: "Reporting",
        answer: "It features a very powerful custom reporting tool that allows you to slice and dice your CRM data.",
    },
    {
        question: "Document Management",
        answer:
            "Sales people love attachments. Well, at least it seems like they do. Did you ever get an email from a sales rep and there are about 12 PDF's attached? CRM 360 tries to make their life a little easier by incorporating document management. Any user who is given access can create their own folders and upload any file type for storage on the server. They can even attach documents to outgoing emails to customers. This can help with document versioning and unify a sales team's efforts.",
    },
];

export default function Crm360Page() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="CRM360"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-lime-500/40 via-green-400/30 to-slate-300/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="CRM360"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <div className="mt-8 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        CRM360 is a web-based and Customer Relationship Management (CRM) system. With
                                        its enormous flexibility, its functions and modules, CRM360 is especially
                                        suitable for the use in critical environments of your enterprise. It can be
                                        easily integrated into your business processes profitably and with
                                        significant lower initial investment! It offers companies a server-based
                                        Customer Relationship Management (CRM) system, which allows you to enter,
                                        manage and process database records through any web browser.
                                    </p>
                                    <p>
                                        Lead Management, Sales Force Automation, Activity Management, and Customer
                                        Service are at the core of CRM 360. However, there are plenty of other
                                        features that extend this core. There are also billing, inventory, email
                                        integration, and calendaring features that really start to build out the
                                        full-featured CRM that CRM 360° is.
                                    </p>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.2} className="mt-8">
                                <FaqAccordion items={faqItems} />
                            </AnimateIn>
                        </div>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <BrochureForm />
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
