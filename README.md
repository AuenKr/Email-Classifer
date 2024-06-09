## Gmail Classifier with LLM

**1. Multi-class Classification:**

- Classify emails into categories like Important, Promotions, Social, Marketing, and Spam based on LLM insights and keywords.

**2. General Fallback:**

- If the LLM analysis is inconclusive, categorize the email as "General."

### To start Project locally

#### Pre-requisites:

1. Node or Docker
2. Google OAuth account setup with scope [more detail](https://developers.google.com/gmail/api/auth/scopes)
   ```
     - openid
     - email
     - profile
     - https://www.googleapis.com/auth/gmail.readonly
     - https://www.googleapis.com/auth/gmail.addons.current.message.readonly
   ```
3. OpenAi API key

#### Steps

**copy .env.sample to .env and get all environmental variable**

###### Using Docker

For Linux user run `docker compose up`

For Windows/Mac `docker-compose up`

###### Mannual Install

Change postgres connection string also

```
npm install
npm run db:generate && npm run db:migrate
npm run dev
```
