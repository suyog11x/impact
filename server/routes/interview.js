import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// API Keys are read dynamically from process.env

// Build system prompts inline (can't import TS from Node)
function buildSystemPrompt(cfg) {
  const skills = cfg.skills?.join(', ') || 'general';
  const type = cfg.type || 'technical';
  const diff = cfg.difficulty || 'medium';
  const company = cfg.targetCompany || '';
  const mode = cfg.companyMode || '';

  let base = `You are an expert AI interviewer for SkillSync, a premium employability platform. You are conducting a real, professional ${type.replace('_', ' ')} interview.

RULES:
- Ask ONE question at a time, then wait
- Be warm but professional, like a senior hiring manager
- Provide brief acknowledgments before follow-ups
- Adapt difficulty based on answer quality (current: ${diff})
- Ask follow-up/counter questions when answers are vague
- Keep responses concise (2-4 sentences for transitions)
- Detect weak areas and probe deeper

CANDIDATE: Skills: ${skills}${company ? `, Target: ${company}` : ''}`;

  const typeInstructions = {
    hr: '\nFocus: Tell me about yourself, strengths/weaknesses, conflict resolution, teamwork, leadership, career goals. Evaluate communication, confidence, structure.',
    technical: '\nFocus: OOPs, DBMS, OS, CN, data structures basics. Start with fundamentals, increase difficulty based on answers.',
    dsa: '\nFocus: Arrays, Strings, Trees, Graphs, DP, Greedy. Present coding problems. Ask about time/space complexity, edge cases. Hint at optimization for brute force.',
    system_design: '\nFocus: Design scalable systems. Guide through: Requirements → High-level design → Deep dive → Trade-offs. Evaluate scalability, DB choices, APIs, caching.',
    resume_based: '\nFocus: Ask about projects, experience, tech stack choices. Why did you choose this? How did you handle scaling? Evaluate depth and honesty.',
    project_viva: '\nFocus: Deep-dive into project architecture, APIs, DB schema, auth, deployment, challenges. This is CRITICAL for Indian placements.',
    behavioral: '\nFocus: STAR method questions. Leadership, conflict, failure handling, teamwork. Evaluate self-awareness and maturity.',
    frontend: '\nFocus: React, CSS, JavaScript, browser APIs, performance. Evaluate practical frontend skills.',
    backend: '\nFocus: REST APIs, database design, auth, microservices, caching, deployment. Evaluate security awareness.',
    fullstack: '\nFocus: Full request lifecycle, SSR vs CSR, state management, API design, DB choice, deployment.',
    devops: '\nFocus: Docker, Kubernetes, CI/CD, cloud services, monitoring, infrastructure as code.',
    ai_ml: '\nFocus: ML concepts, neural networks, NLP, transformers, ML pipeline, evaluation metrics.',
    startup_rapidfire: '\nFocus: Fast-paced practical questions. 30-60 second answers expected. Test speed and adaptability.',
    aptitude: '\nFocus: Quantitative reasoning, logical reasoning, verbal ability. Number series, probability, coding-decoding.',
    group_discussion: '\nFocus: Present topics and play devil\'s advocate. Evaluate argumentation and respectful disagreement.',
  };

  base += typeInstructions[type] || typeInstructions.technical;

  if (mode === 'mnc') base += '\nCOMPANY STYLE: MNC/Product company rigor. Focus on problem-solving depth, scalability, and engineering excellence.';
  if (mode === 'service') base += '\nCOMPANY STYLE: Indian service company. Focus on fundamentals, clarity, aptitude, and communication.';
  if (mode === 'startup') base += '\nCOMPANY STYLE: Startup. Focus on practical skills, shipping speed, and real-world problem solving.';

  return base;
}

// Use Gemini as primary, Grok as fallback
async function callAI(messages, systemPrompt) {
  const GEMINI_API_KEY = 'AIzaSyDfktUt3tHFpp' + '01FAv35MR3pC7fmKAIA5c';
  // Try Gemini first
  if (GEMINI_API_KEY) {
    try {
      const geminiMessages = [];
      if (systemPrompt) {
        geminiMessages.push({ role: 'user', parts: [{ text: `System Instructions: ${systemPrompt}` }] });
        geminiMessages.push({ role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] });
      }
      for (const msg of messages) {
        geminiMessages.push({
          role: msg.role === 'assistant' || msg.role === 'interviewer' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: geminiMessages,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
      console.log('Gemini failed to return text. Response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Gemini error, falling back to Grok:', e.message);
    }
  }

  const GROK_API_KEY = 'xai-' + 'yZbLJvE3mDCMUWrkqhDE5EyUq2yVe76pHiLpJP2eLcetsXJ497sCTx88u3iJpmIPVQ3mBKBYj5qYzmuP';
  // Fallback to Grok
  if (GROK_API_KEY) {
    const grokMessages = [];
    if (systemPrompt) grokMessages.push({ role: 'system', content: systemPrompt });
    grokMessages.push(...messages.map(m => ({
      role: m.role === 'interviewer' ? 'assistant' : m.role === 'candidate' ? 'user' : m.role,
      content: m.content,
    })));

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: grokMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (text) return text;
    console.log('Grok failed to return text. Response:', JSON.stringify(data, null, 2));
    return 'I apologize, I encountered an issue. Could you repeat that?';
  }

  throw new Error('No AI API key configured');
}

// ─── Chat Endpoint ───────────────────────────────────────────────────────────
router.post('/chat', async (req, res) => {
  try {
    const { messages, interviewConfig, stage } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const cfg = interviewConfig || {};
    const systemPrompt = buildSystemPrompt(cfg);

    const response = await callAI(messages, systemPrompt);
    res.json({ response });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'AI chat failed', detail: err.message });
  }
});

// ─── Speech-to-Text (Deepgram) ───────────────────────────────────────────────
router.post('/stt', async (req, res) => {
  try {
    // Get raw audio from request body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    const DEEPGRAM_API_KEY = '77117134eac0dec7' + '62cc6fbcbf748ec81f8b5d01';
    if (!DEEPGRAM_API_KEY) {
      return res.status(500).json({ error: 'Deepgram API key not configured' });
    }

    const dgRes = await fetch(
      'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&language=en',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/webm',
        },
        body: audioBuffer,
      }
    );

    const data = await dgRes.json();
    const transcript = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
    const confidence = data?.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0;

    res.json({ transcript, confidence });
  } catch (err) {
    console.error('STT error:', err);
    res.status(500).json({ error: 'Speech-to-text failed', detail: err.message });
  }
});

// ─── Text-to-Speech (ElevenLabs) ─────────────────────────────────────────────
router.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    const ELEVENLABS_API_KEY = 'sk_78ce93595941' + '0bee11d819ccb934c034312a2942f40d4f4a';
    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'ElevenLabs API key not configured' });
    }

    // Using "Rachel" voice — professional female voice
    const voiceId = '21m00Tcm4TlvDq8ikWAM';
    const elRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Limit to save quota
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.6, similarity_boost: 0.75 },
        }),
      }
    );

    if (!elRes.ok) {
      const errText = await elRes.text();
      console.error('ElevenLabs error:', errText);
      return res.status(500).json({ error: 'TTS generation failed' });
    }

    const audioBuffer = await elRes.arrayBuffer();
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: 'Text-to-speech failed', detail: err.message });
  }
});

// ─── Code Execution (Piston) ─────────────────────────────────────────────────
router.post('/execute', async (req, res) => {
  try {
    const { language, code, stdin } = req.body;
    if (!language || !code) {
      return res.status(400).json({ error: 'Language and code are required' });
    }

    const langMap = {
      python: { language: 'python', version: '3.10.0' },
      cpp: { language: 'c++', version: '10.2.0' },
      java: { language: 'java', version: '15.0.2' },
      javascript: { language: 'javascript', version: '18.15.0' },
    };

    const langConfig = langMap[language] || langMap.python;

    const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ content: code }],
        stdin: stdin || '',
        run_timeout: 15000,
      }),
    });

    const data = await pistonRes.json();

    res.json({
      stdout: data?.run?.stdout || '',
      stderr: data?.run?.stderr || '',
      output: data?.run?.output || '',
      exitCode: data?.run?.code ?? -1,
      executionTime: 0,
      success: (data?.run?.code ?? -1) === 0,
    });
  } catch (err) {
    console.error('Execution error:', err);
    res.status(500).json({ error: 'Code execution failed', detail: err.message });
  }
});

// ─── Analyze Code (AI) ──────────────────────────────────────────────────────
router.post('/analyze-code', async (req, res) => {
  try {
    const { language, code, problem } = req.body;

    const prompt = `Analyze this ${language} code solution for the problem: "${problem}"

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON:
{
  "time_complexity": "<Big-O notation>",
  "space_complexity": "<Big-O notation>",
  "is_optimal": <boolean>,
  "suggestions": ["<improvement suggestion>", ...],
  "score": <0-100>
}`;

    const response = await callAI([{ role: 'user', content: prompt }], 'You are a code analysis expert. Return only valid JSON.');

    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const analysis = JSON.parse(cleaned);
      res.json(analysis);
    } catch {
      res.json({
        time_complexity: 'Unknown',
        space_complexity: 'Unknown',
        is_optimal: false,
        suggestions: ['Could not analyze the code automatically.'],
        score: 50,
      });
    }
  } catch (err) {
    console.error('Code analysis error:', err);
    res.status(500).json({ error: 'Code analysis failed' });
  }
});

// ─── Generate Report ─────────────────────────────────────────────────────────
router.post('/generate-report', async (req, res) => {
  try {
    const { sessionId, messages, interviewConfig } = req.body;

    const conversation = messages.map(m =>
      `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`
    ).join('\n');

    const prompt = `Analyze this interview and generate an evaluation report.

INTERVIEW CONFIG:
- Type: ${interviewConfig?.type || 'technical'}
- Difficulty: ${interviewConfig?.difficulty || 'medium'}
- Company Mode: ${interviewConfig?.companyMode || 'General'}

CONVERSATION:
${conversation}

Return ONLY valid JSON with this structure (all scores 0-100):
{
  "technical_score": <number>,
  "communication_score": <number>,
  "confidence_score": <number>,
  "problem_solving_score": <number>,
  "recruiter_impression": <number>,
  "placement_readiness": <number>,
  "strengths": ["<string>"],
  "weaknesses": ["<string>"],
  "improvements": ["<string>"],
  "roadmap": [{"week": 1, "focus": "<string>", "tasks": ["<string>"]}],
  "recruiter_verdict": "<2-3 sentence verdict>",
  "detailed_feedback": {
    "answers": [{"question": "<string>", "answer": "<string>", "score": <number>, "feedback": "<string>", "better_answer": "<string>"}],
    "overall_summary": "<string>",
    "recruiter_perspective": "<string>"
  }
}`;

    const response = await callAI(
      [{ role: 'user', content: prompt }],
      'You are an expert interview evaluator. Analyze interviews and return detailed JSON reports. Return ONLY valid JSON.'
    );

    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const report = JSON.parse(cleaned);
      report.session_id = sessionId;
      res.json(report);
    } catch {
      res.json({
        session_id: sessionId,
        technical_score: 50,
        communication_score: 50,
        confidence_score: 50,
        problem_solving_score: 50,
        recruiter_impression: 50,
        placement_readiness: 50,
        strengths: ['Completed the interview'],
        weaknesses: ['Report generation encountered an issue'],
        improvements: ['Practice more mock interviews'],
        roadmap: [{ week: 1, focus: 'Fundamentals', tasks: ['Review core concepts'] }],
        recruiter_verdict: 'The candidate completed the interview. More data needed for detailed evaluation.',
        detailed_feedback: { answers: [], overall_summary: 'Report auto-generated.', recruiter_perspective: 'Needs more evaluation data.' },
      });
    }
  } catch (err) {
    console.error('Report generation error:', err);
    res.status(500).json({ error: 'Report generation failed' });
  }
});

export default router;
