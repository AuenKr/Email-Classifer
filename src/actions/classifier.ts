import OpenAI from "openai";

export async function emailClassifier(emailBody: string, openApiKey: string) {
  const openai = new OpenAI({
    apiKey: openApiKey,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "I will provide u email html/plain text body u have to classify them into below classifier\n```\nImportant: Emails that are personal or work-related and require immediate attention.\nPromotions: Emails related to sales, discounts, and marketing campaigns.\nSocial: Emails from social networks, friends, and family.\nMarketing: Emails related to marketing, newsletters, and notifications.\nSpam: Unwanted or unsolicited emails.\nGeneral: If none of the above are matched, use General\n```\nInput: Email html text\noutput format :  must be single label like : Important, Promotions, Social, Marketing, Spam, General\n",
      },
      {
        role: "user",
        content: emailBody,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const classification: any = chatCompletion.choices[0].message.content;
  return classification;
}
