import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // FormData read karo
    const formData = await request.formData();

    const getValue = (name: string) => {
      const value = formData.get(name);

      return typeof value === "string" ? value.trim() : "";
    };

    const fullName = getValue("fullName");
    const email = getValue("email");
    const phone = getValue("phone");

    const dob = getValue("dob");
    const qualification = getValue("qualification");
    const qualificationYear = getValue("qualificationYear");
    const pursuingDegree = getValue("pursuingDegree");

    const position = getValue("position");
    const totalExperience = getValue("totalExperience");
    const relevantExperience = getValue("relevantExperience");

    const currentLocation = getValue("currentLocation");
    const relocate = getValue("relocate");
    const travelAbroad = getValue("travelAbroad");

    const passport = getValue("passport");
    const visa = getValue("visa");

    const currentlyWorking = getValue("currentlyWorking");
    const reasonForChange = getValue("reasonForChange");

    const currentCtc = getValue("currentCtc");
    const inHandSalary = getValue("inHandSalary");
    const expectedCtc = getValue("expectedCtc");
    const expectedInHand = getValue("expectedInHand");

    const noticePeriod = getValue("noticePeriod");
    const earliestJoinDate = getValue("earliestJoinDate");

    const dependents = getValue("dependents");
    const readyOnCurrentCtc = getValue("readyOnCurrentCtc");

    // Resume
    const resume = formData.get("resume");

    // -----------------------------
    // Required fields
    // -----------------------------

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Email validation
    // -----------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Resume validation
    // -----------------------------

    if (!(resume instanceof File)) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    if (resume.size === 0) {
      return NextResponse.json(
        { error: "Uploaded resume is empty." },
        { status: 400 }
      );
    }

    // Maximum 5 MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume size must be less than 5 MB." },
        { status: 400 }
      );
    }

    // -----------------------------
    // File type validation
    // -----------------------------

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        {
          error: "Please upload your resume in PDF, DOC, or DOCX format.",
        },
        { status: 400 }
      );
    }

    /*
     * IMPORTANT:
     *
     * Abhi hum resume ko database mein directly save nahi kar rahe.
     *
     * Resume upload/storage ke liye Cloudinary/S3/etc. connect
     * kar sakte hain.
     *
     * Filhaal database mein resumeUrl null rahega.
     */

    const resumeUrl = null;

    // -----------------------------
    // Create candidate
    // -----------------------------

    const candidate =
      await prisma.candidateSubmission.create({
        data: {
          fullName,
          email,
          phone,

          dob: dob || null,
          qualification: qualification || null,
          qualificationYear:
            qualificationYear || null,
          pursuingDegree:
            pursuingDegree || null,

          position: position || null,
          totalExperience:
            totalExperience || null,
          relevantExperience:
            relevantExperience || null,

          currentLocation:
            currentLocation || null,

          relocate: relocate || null,
          travelAbroad:
            travelAbroad || null,

          passport: passport || null,
          visa: visa || null,

          currentlyWorking:
            currentlyWorking || null,

          reasonForChange:
            reasonForChange || null,

          currentCtc:
            currentCtc || null,

          inHandSalary:
            inHandSalary || null,

          expectedCtc:
            expectedCtc || null,

          expectedInHand:
            expectedInHand || null,

          noticePeriod:
            noticePeriod || null,

          earliestJoinDate:
            earliestJoinDate || null,

          dependents:
            dependents || null,

          readyOnCurrentCtc:
            readyOnCurrentCtc || null,

          resumeUrl,
        },
      });

    // -----------------------------
    // Success
    // -----------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Candidate application submitted successfully.",

        candidate: {
          id: candidate.id,
          fullName: candidate.fullName,
          email: candidate.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Candidate submission error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to submit candidate application.",
      },
      { status: 500 }
    );
  }
}