import Anthropic from '@anthropic-ai/sdk'

let _anthropic: Anthropic | null = null

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set')
    }
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _anthropic
}

export async function optimizeCV(cvText: string): Promise<{
  summary: string
  experience: string[]
  skills: string[]
  education: string[]
  certifications: string[]
  fullText: string
}> {
  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `You are an expert CV/Resume writer specializing in ATS (Applicant Tracking System) optimization for the European job market (Germany, Austria, Switzerland, UK).

Given the following CV text, rewrite it to be fully ATS-optimized while maintaining all factual information. Follow these rules:
- Use clean, standard section headers (Summary, Experience, Skills, Education, Certifications)
- Include relevant industry keywords naturally
- Use bullet points with action verbs and quantifiable achievements
- Remove graphics, tables, or formatting that ATS systems cannot parse
- Keep it professional and concise (max 2 pages worth of content)
- Write in English (the standard for international applications)

CV Text:
${cvText}

Respond in JSON format:
{
  "summary": "Professional summary paragraph",
  "experience": ["Experience entry 1 with bullets", "Experience entry 2 with bullets"],
  "skills": ["Skill 1", "Skill 2", ...],
  "education": ["Education entry 1", "Education entry 2"],
  "certifications": ["Cert 1", "Cert 2"],
  "fullText": "The complete optimized CV as plain text"
}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from AI')
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Could not parse AI response')
  }

  return JSON.parse(jsonMatch[0])
}

export async function generateCoverLetter(input: {
  jobTitle: string
  companyName: string
  skills: string[]
  yearsExperience: number
  achievement: string
  language: 'en' | 'de'
}): Promise<string> {
  const langInstruction =
    input.language === 'de'
      ? 'Write the cover letter in professional German.'
      : 'Write the cover letter in professional English.'

  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are an expert cover letter writer for European job applications.

Write a professional cover letter (3-4 paragraphs) for the following:
- Target position: ${input.jobTitle}
- Company: ${input.companyName}
- Top skills: ${input.skills.join(', ')}
- Years of experience: ${input.yearsExperience}
- Key achievement: ${input.achievement}

${langInstruction}

The cover letter should:
- Open with a compelling hook mentioning the specific role
- Highlight relevant skills and experience with concrete examples
- Reference the key achievement with quantifiable impact
- Close with enthusiasm and a call to action
- Be formatted with proper salutation and sign-off (use [Your Name] as placeholder)

Return ONLY the cover letter text, no additional commentary.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from AI')
  }

  return content.text
}

export async function generateLinkedInProfile(input: {
  jobTitle: string
  industry: string
  yearsExperience: number
  skills: string[]
  background: string
}): Promise<{
  headline: string
  about: string
  experience: string[]
}> {
  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `You are a LinkedIn profile optimization expert who helps professionals stand out to recruiters and hiring managers in Europe.

Create an optimized LinkedIn profile based on:
- Current job title: ${input.jobTitle}
- Industry: ${input.industry}
- Years of experience: ${input.yearsExperience}
- Top skills: ${input.skills.join(', ')}
- Background: ${input.background}

Generate:
1. Headline (max 120 characters) - compelling, keyword-rich
2. About section (max 2600 characters) - engaging first-person narrative with keywords
3. Three experience entries - with action verbs and achievements

Respond in JSON format:
{
  "headline": "Your optimized headline",
  "about": "Your about section",
  "experience": ["Experience 1 text", "Experience 2 text", "Experience 3 text"]
}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from AI')
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Could not parse AI response')
  }

  return JSON.parse(jsonMatch[0])
}
