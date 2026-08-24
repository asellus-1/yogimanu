"use server";
 
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
 
  return { success: true };
}
