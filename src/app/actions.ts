"use server";

import { appendToGoogleSheet } from "@/lib/googleSheets";
import { sendInquiryNotification } from "@/lib/email";

export interface FormResponse {
  success: boolean;
  error?: string;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function submitOnsiteInquiry(prevState: unknown, formData: FormData): Promise<FormResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name")?.toString().trim();
  const property = formData.get("property")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const propertyType = formData.get("propertyType")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Server-side validation
  if (!name || !property || !email || !propertyType || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (name.length > 100 || property.length > 200 || email.length > 254 || propertyType.length > 50 || message.length > 5000) {
    return { success: false, error: "Input exceeds maximum allowed length." };
  }

  if (!validateEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Log inquiry details on the server console (stdout) to ensure they are captured.
  console.log("==========================================");
  console.log("NEW ONSITE PARTNERSHIP INQUIRY RECEIVED:");
  console.log("------------------------------------------");
  console.log(`Name:          ${name}`);
  console.log(`Property/Org:  ${property}`);
  console.log(`Email:         ${email}`);
  console.log(`Property Type: ${propertyType}`);
  console.log(`Details:       ${message}`);
  console.log("==========================================");

  // Append to Google Sheet if configured
  await appendToGoogleSheet("onsite", {
    name,
    property,
    email,
    propertyType,
    message,
  });

  // Send Resend email notification
  await sendInquiryNotification({
    subject: `Yogi Manu - New Onsite Yoga Inquiry — ${property}`,
    replyTo: email,
    title: "New Onsite Yoga Inquiry",
    fields: [
      { label: "Contact Name", value: name },
      { label: "Property / Organization", value: property },
      { label: "Email Address", value: email },
      { label: "Property Type", value: propertyType },
      { label: "Inquiry Details", value: message },
    ],
  });

  return { success: true };
}

export async function submitRetreatInquiry(prevState: unknown, formData: FormData): Promise<FormResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name")?.toString().trim();
  const organization = formData.get("organization")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const eventType = formData.get("eventType")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const dates = formData.get("dates")?.toString().trim();
  const audienceSize = formData.get("audienceSize")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Server-side validation
  if (!name || !organization || !email || !eventType || !location || !dates || !audienceSize || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (
    name.length > 100 ||
    organization.length > 200 ||
    email.length > 254 ||
    eventType.length > 50 ||
    location.length > 200 ||
    dates.length > 100 ||
    audienceSize.length > 100 ||
    message.length > 5000
  ) {
    return { success: false, error: "Input exceeds maximum allowed length." };
  }

  if (!validateEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Log inquiry details on the server console (stdout) to ensure they are captured.
  console.log("==========================================");
  console.log("NEW RETREAT COLLABORATION INQUIRY RECEIVED:");
  console.log("------------------------------------------");
  console.log(`Name:          ${name}`);
  console.log(`Organization:  ${organization}`);
  console.log(`Email:         ${email}`);
  console.log(`Event Type:    ${eventType}`);
  console.log(`Location:      ${location}`);
  console.log(`Dates:         ${dates}`);
  console.log(`Audience Size: ${audienceSize}`);
  console.log(`Details:       ${message}`);
  console.log("==========================================");

  // Append to Google Sheet if configured
  await appendToGoogleSheet("retreat", {
    name,
    organization,
    email,
    eventType,
    location,
    dates,
    audienceSize,
    message,
  });

  // Send Resend email notification
  await sendInquiryNotification({
    subject: `Yogi Manu - New Retreat Inquiry — ${organization}`,
    replyTo: email,
    title: "New Retreat Collaboration Inquiry",
    fields: [
      { label: "Full Name", value: name },
      { label: "Organization / Retreat", value: organization },
      { label: "Email Address", value: email },
      { label: "Event Type", value: eventType },
      { label: "Location", value: location },
      { label: "Preferred Dates", value: dates },
      { label: "Expected Audience Size", value: audienceSize },
      { label: "Event Details / Message", value: message },
    ],
  });

  return { success: true };
}

export async function submitContactInquiry(prevState: unknown, formData: FormData): Promise<FormResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Server-side validation
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return { success: false, error: "Input exceeds maximum allowed length." };
  }

  if (!validateEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Log inquiry details on the server console (stdout) to ensure they are captured.
  console.log("==========================================");
  console.log("NEW GENERAL CONTACT INQUIRY RECEIVED:");
  console.log("------------------------------------------");
  console.log(`Name:          ${name}`);
  console.log(`Email:         ${email}`);
  console.log(`Message:       ${message}`);
  console.log("==========================================");

  // Append to Google Sheet if configured
  await appendToGoogleSheet("contact", {
    name,
    email,
    message,
  });

  // Send Resend email notification
  await sendInquiryNotification({
    subject: "Yogi Manu - New Contact Inquiry",
    replyTo: email,
    title: "New General Contact Inquiry",
    fields: [
      { label: "Name", value: name },
      { label: "Email Address", value: email },
      { label: "Message", value: message },
    ],
  });

  return { success: true };
}

