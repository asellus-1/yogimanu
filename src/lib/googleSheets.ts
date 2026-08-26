export async function appendToGoogleSheet(
  formType: "onsite" | "retreat" | "contact",
  data: Record<string, string>
) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    console.warn(
      `GOOGLE_SCRIPT_URL is not set. Data for "${formType}" form was not sent to Google Sheets.`
    );
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Google Apps Script returned an error.");
    }

    console.log(`Successfully appended "${formType}" form submission to Google Sheet.`);
  } catch (error) {
    console.error(`Failed to append "${formType}" form submission to Google Sheet:`, error);
  }
}
