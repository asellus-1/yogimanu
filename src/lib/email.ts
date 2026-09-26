import { Resend } from "resend";

const NOTIFICATION_RECIPIENT = "hello@yogimanu.com";
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "Yogi Manu <notifications@onsiteyogaandrestore.com>";

export interface EmailField {
  label: string;
  value: string;
}

export interface SendNotificationParams {
  subject: string;
  replyTo: string;
  title: string;
  fields: EmailField[];
}

export async function sendInquiryNotification({
  subject,
  replyTo,
  title,
  fields,
}: SendNotificationParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured. Email notification skipped.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const resend = new Resend(apiKey);

    // Format plain text content
    const textLines = [
      title,
      "=".repeat(40),
      ...fields.map((f) => `${f.label}: ${f.value}`),
      "=".repeat(40),
      `Reply-To: ${replyTo}`,
    ];
    const textContent = textLines.join("\n");

    // Format HTML content with clean, elegant styling
    const tableRowsHtml = fields
      .map(
        (f) => `
          <tr>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e8e1d7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; color: #6d6d6d; width: 160px; vertical-align: top; text-transform: uppercase; letter-spacing: 0.5px;">
              ${escapeHtml(f.label)}
            </td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e8e1d7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #262626; line-height: 1.5; white-space: pre-wrap; vertical-align: top;">
              ${escapeHtml(f.value)}
            </td>
          </tr>
        `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${escapeHtml(subject)}</title>
        </head>
        <body style="margin: 0; padding: 24px; background-color: #fcfaf7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #262626;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e8e1d7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <tr>
              <td style="background-color: #262626; padding: 24px 32px; border-bottom: 2px solid #d79b42;">
                <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #d79b42; font-weight: 600; display: block; margin-bottom: 6px;">Yogi Manu Notification</span>
                <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 300; color: #fcfaf7; letter-spacing: 0.5px;">
                  ${escapeHtml(title)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 20px;">
                  ${tableRowsHtml}
                </table>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #8c827a; line-height: 1.5; border-top: 1px solid #f0ebe4; padding-top: 16px;">
                  You can reply directly to this email to reach the sender at <a href="mailto:${escapeHtml(replyTo)}" style="color: #d79b42; text-decoration: none;">${escapeHtml(replyTo)}</a>.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [NOTIFICATION_RECIPIENT],
      replyTo: replyTo,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API error while sending notification:", error.message || error);
      return { success: false, error: error.message };
    }

    console.log(`Successfully sent Resend notification: "${subject}"`);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Unexpected error in sendInquiryNotification:", message);
    return { success: false, error: message };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
