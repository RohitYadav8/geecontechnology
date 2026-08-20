"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Upload,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { StatCounter } from "../../../components/stat-counter";
import { MouseGlow } from "../../../components/mouse-glow";
import { RippleButton } from "../../../components/ripple-button";

const careerStats = [
  {
    label: "Team Members",
    value: 50,
    suffix: "+",
  },
  {
    label: "Years of Experience",
    value: 10,
    suffix: "+",
  },
  {
    label: "Client Satisfaction",
    value: 95,
    suffix: "%",
  },
];

type JobOpening = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  type?: string | null;
  description: string;
  isActive?: boolean;
  order?: number;
};

export default function CareersPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);

  /* ---------------------------------------------------------
     Parallax Image
  --------------------------------------------------------- */

  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-8%", "8%"]
  );

  /* ---------------------------------------------------------
     Fetch Job Openings
  --------------------------------------------------------- */

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        setLoadingOpenings(true);

        const response = await fetch("/api/careers/openings", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job openings");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setOpenings(data);
        } else if (Array.isArray(data.openings)) {
          setOpenings(data.openings);
        } else {
          setOpenings([]);
        }
      } catch (error) {
        console.error("Failed to fetch openings:", error);
        setOpenings([]);
      } finally {
        setLoadingOpenings(false);
      }
    };

    fetchOpenings();
  }, []);

  /* ---------------------------------------------------------
     Form Change
  --------------------------------------------------------- */

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  /* ---------------------------------------------------------
     File Upload
  --------------------------------------------------------- */

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  /* ---------------------------------------------------------
     Drag & Drop
  --------------------------------------------------------- */

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  /* ---------------------------------------------------------
     Submit
  --------------------------------------------------------- */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Career application:", {
      ...form,
      resume: fileName,
    });

    setShowToast(true);

    window.setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  /* ---------------------------------------------------------
     Scroll To Application
  --------------------------------------------------------- */

  const scrollToApplication = () => {
    document
      .getElementById("application-form")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* Background Grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
            bg-[size:48px_48px]
            opacity-20
            dark:opacity-10
          "
        />

        {/* Radial Glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]
          "
        />

        {/* Floating Blobs */}
        <FloatingBlob
          className="-right-20 top-10 h-72 w-72"
          color="bg-blue-400/10"
          duration={16}
        />

        <FloatingBlob
          className="-left-16 top-96 h-64 w-64"
          color="bg-cyan-300/10"
          duration={20}
        />

        <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-20">

          {/* =====================================================
              PAGE HEADING
          ====================================================== */}

          <AnimatedHeading
            text="Career With Us"
            as="h1"
            className="
              text-2xl
              font-semibold
              text-blue-600
              dark:text-blue-400
              sm:text-3xl
            "
          />

          {/* =====================================================
              INTRO + RIGHT SIDE IMAGE
          ====================================================== */}

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">

            {/* LEFT CONTENT */}
            <AnimateIn delay={0.15}>
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">

                <p>
                  Come on, join US. And we will help You to explore your
                  values and valuate your skills.
                </p>

                <p>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Geecon
                  </span>{" "}
                  Group has many years experience of providing software
                  solutions and affordable services for small, mid and large
                  companies &amp; corporations. We also provide services in
                  different industries like Resourcing, Corporate Training and
                  Design. We have the history of working hard to ensure the
                  customer confidence in us and have mission to continue the
                  same with the dedication to serve our customers.
                </p>

                <p>
                  The first appeal: you are the star. All we want to know is:
                  Are you capable enough to &lsquo;outcast&rsquo; the dreams
                  in you?
                </p>

                <p>
                  At Geecon Technology, we believe in &lsquo;optimism&rsquo;.
                  After lots of efforts we decided to throw out the
                  &lsquo;creative persona test&rsquo; among you.
                </p>

                <p>
                  Once you realise you have the &lsquo;stardom&rsquo; in you,
                  unleash it. The world is yours, and your career is ready to
                  go heights.
                </p>

                <p>
                  Explore yourselves with us. Valuate your skills. Take the
                  test, take the challenge. This is our work
                  &lsquo;pledge&rsquo;.
                </p>

                <p>
                  If you think you have your own rules, you are most welcome to
                  share them with us.
                </p>

                <p>
                  We want fresh or experienced candidates for our described
                  services.
                </p>
              </div>

              {/* =====================================================
                  STATISTICS
              ====================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.6,
                }}
                className="
                  mt-10
                  grid
                  grid-cols-3
                  gap-4
                  border-t
                  border-slate-100
                  pt-8
                  dark:border-slate-800
                  sm:gap-6
                "
              >
                {careerStats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="
                        text-2xl
                        font-bold
                        text-[#1a2b4a]
                        dark:text-blue-400
                        sm:text-3xl
                      "
                    >
                      <StatCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>

                    <div
                      className="
                        mt-1
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-slate-400
                        dark:text-slate-500
                        sm:text-xs
                      "
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* =====================================================
                  BUTTONS
              ====================================================== */}

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#current-openings"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-blue-500
                    hover:shadow-lg
                    hover:shadow-blue-600/20
                  "
                >
                  View Openings

                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-300
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-slate-700
                    transition-all
                    hover:border-blue-400
                    hover:bg-blue-50
                    hover:text-blue-600
                    dark:border-slate-700
                    dark:text-slate-300
                    dark:hover:border-blue-400
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-400
                  "
                >
                  Get In Touch
                </Link>
              </div>
            </AnimateIn>

            {/* =====================================================
                RIGHT SIDE CAREER IMAGE
            ====================================================== */}

            <AnimateIn
              delay={0.25}
              direction="right"
            >
              <div
                ref={imageRef}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-100
                  shadow-xl
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <div
                  className="
                    relative
                    h-[420px]
                    w-full
                    overflow-hidden
                    sm:h-[500px]
                    lg:h-[560px]
                  "
                >
                  <motion.div
                    style={{
                      y: parallaxY,
                    }}
                    className="absolute -inset-y-8 inset-x-0"
                  >
                    <Image
                      src="/careers.png"
                      alt="Careers at Geecon Technology"
                      fill
                      priority
                      sizes="
                        (max-width: 1024px) 100vw,
                        420px
                      "
                      className="
                        object-cover
                        object-center
                      "
                    />
                  </motion.div>

                  {/* Very light image overlay only for readability/finish */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/10
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Image Border */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-3
                      rounded-xl
                      border
                      border-white/30
                    "
                  />
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* =====================================================
              SUBMIT YOUR DETAILS
          ====================================================== */}

          <AnimateIn
            delay={0.35}
            className="mt-16 max-w-xl"
          >
            <h2
              className="
                text-xl
                font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              Submit Your Details
            </h2>

            <div
              className="
                mt-6
                rounded-2xl
                bg-gradient-to-br
                from-blue-400/30
                via-cyan-300/20
                to-blue-600/30
                p-[1px]
              "
            >
              <MouseGlow className="rounded-2xl">
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200/60
                    bg-white/70
                    p-6
                    backdrop-blur-xl
                    dark:border-slate-800/60
                    dark:bg-slate-900/70
                  "
                >
                  <form
                    id="application-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >

                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="
                          mb-1
                          block
                          text-sm
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange("firstName")}
                        required
                        className="
                          w-full
                          rounded-md
                          border
                          border-slate-200
                          bg-white/80
                          px-3
                          py-2.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          focus:border-[#1a2b4a]
                          focus:ring-2
                          focus:ring-blue-500/10
                          dark:border-slate-700
                          dark:bg-slate-900/80
                          dark:text-white
                        "
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="
                          mb-1
                          block
                          text-sm
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange("lastName")}
                        required
                        className="
                          w-full
                          rounded-md
                          border
                          border-slate-200
                          bg-white/80
                          px-3
                          py-2.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          focus:border-[#1a2b4a]
                          focus:ring-2
                          focus:ring-blue-500/10
                          dark:border-slate-700
                          dark:bg-slate-900/80
                          dark:text-white
                        "
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="
                          mb-1
                          block
                          text-sm
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Your email
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        required
                        className="
                          w-full
                          rounded-md
                          border
                          border-slate-200
                          bg-white/80
                          px-3
                          py-2.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          focus:border-[#1a2b4a]
                          focus:ring-2
                          focus:ring-blue-500/10
                          dark:border-slate-700
                          dark:bg-slate-900/80
                          dark:text-white
                        "
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="
                          mb-1
                          block
                          text-sm
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Phone
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        required
                        className="
                          w-full
                          rounded-md
                          border
                          border-slate-200
                          bg-white/80
                          px-3
                          py-2.5
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          focus:border-[#1a2b4a]
                          focus:ring-2
                          focus:ring-blue-500/10
                          dark:border-slate-700
                          dark:bg-slate-900/80
                          dark:text-white
                        "
                      />
                    </div>

                    {/* Resume */}
                    <div>
                      <label
                        htmlFor="resume"
                        className="
                          mb-1
                          block
                          text-sm
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Upload Resume
                      </label>

                      <motion.label
                        htmlFor="resume"
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => {
                          setIsDragging(false);
                        }}
                        onDrop={handleDrop}
                        whileHover={{
                          scale: 1.01,
                        }}
                        animate={{
                          scale: isDragging ? 1.02 : 1,
                        }}
                        className={`
                          flex
                          w-full
                          cursor-pointer
                          flex-col
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border-2
                          border-dashed
                          px-4
                          py-8
                          text-center
                          text-sm
                          font-medium
                          transition-all
                          ${
                            isDragging
                              ? "border-blue-400 bg-blue-50/60 text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400"
                              : "border-slate-300 text-slate-600 hover:border-[#1a2b4a] hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400"
                          }
                        `}
                      >
                        <motion.div
                          animate={{
                            y: isDragging ? -4 : 0,
                            scale: isDragging ? 1.1 : 1,
                          }}
                        >
                          <Upload size={20} />
                        </motion.div>

                        <span>
                          {fileName ||
                            "Drag & drop your resume, or click to browse"}
                        </span>

                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFile}
                          className="hidden"
                        />
                      </motion.label>
                    </div>

                    {/* Submit */}
                    <RippleButton
                      type="submit"
                      className="
                        rounded-full
                        bg-[#1a2b4a]
                        px-8
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-md
                        transition-all
                        hover:bg-[#0d1830]
                        hover:shadow-lg
                        dark:bg-blue-600
                        dark:hover:bg-blue-500
                      "
                    >
                      <Send size={15} />
                      Submit
                    </RippleButton>
                  </form>
                </div>
              </MouseGlow>
            </div>
          </AnimateIn>

          {/* =====================================================
              CURRENT OPENINGS
          ====================================================== */}

          <motion.div
            id="current-openings"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mt-20
              border-t
              border-slate-100
              pt-12
              dark:border-slate-800
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Current Openings
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Explore our current career opportunities and find a role that
              matches your skills and experience.
            </p>

            {/* Loading */}
            {loadingOpenings && (
              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <p
                  className="
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Loading current openings...
                </p>
              </div>
            )}

            {/* No Openings */}
            {!loadingOpenings && openings.length === 0 && (
              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <p
                  className="
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  No current openings listed right now. Please check back
                  soon, or submit your details above and we&apos;ll reach out
                  when a suitable role opens up.
                </p>
              </div>
            )}

            {/* Openings */}
            {!loadingOpenings && openings.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {openings.map((opening) => (
                  <motion.div
                    key={opening.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-6
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg
                      dark:border-slate-800
                      dark:bg-slate-900
                    "
                  >
                    {/* Title */}
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {opening.title}
                    </h3>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {opening.department && (
                        <span
                          className="
                            rounded-full
                            bg-blue-50
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-blue-700
                            dark:bg-blue-500/10
                            dark:text-blue-400
                          "
                        >
                          {opening.department}
                        </span>
                      )}

                      {opening.location && (
                        <span
                          className="
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-slate-600
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >
                          {opening.location}
                        </span>
                      )}

                      {opening.type && (
                        <span
                          className="
                            rounded-full
                            bg-cyan-50
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-cyan-700
                            dark:bg-cyan-500/10
                            dark:text-cyan-400
                          "
                        >
                          {opening.type}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className="
                        mt-4
                        whitespace-pre-line
                        text-sm
                        leading-7
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      {opening.description}
                    </p>

                    {/* Apply */}
                    <button
                      type="button"
                      onClick={scrollToApplication}
                      className="
                        group
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#1a2b4a]
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        hover:bg-[#0d1830]
                        hover:shadow-lg
                        dark:bg-blue-600
                        dark:hover:bg-blue-500
                      "
                    >
                      Apply Now

                      <ArrowRight
                        size={15}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* =====================================================
          SUCCESS TOAST
      ====================================================== */}

      {showToast && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#1a2b4a]
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-2xl
            dark:bg-blue-600
          "
        >
          <CheckCircle size={16} />
          Application submitted successfully!
        </motion.div>
      )}
    </div>
  );
}