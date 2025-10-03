import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // from Render env var

const sendEmail = async () => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: { email: "bytecoder95@gmail.com", name: "DevMark App" },
    to: [{ email: "chaitanyakhandekar95@gmail.com", name: "Test User" }],
    subject: "Hello from Brevo + Render 🚀",
    htmlContent: "<p>This email is sent using Brevo API on Render free tier!</p>"
  };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", data);
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
  }
};

export { sendEmail };
