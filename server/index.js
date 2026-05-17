import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

// ─── Validate LeetCode Username ───────────────────────────────────────────────
app.post('/api/validate-leetcode', async (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ valid: false, error: 'Username is required' });
  }

  const query = `
    query getUser($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    const data = await response.json();

    if (data?.data?.matchedUser) {
      const user = data.data.matchedUser;
      return res.json({
        valid: true,
        username: user.username,
        avatar: user.profile?.userAvatar || null,
        realName: user.profile?.realName || null,
        ranking: user.profile?.ranking || null,
        reputation: user.profile?.reputation || null,
      });
    } else {
      return res.json({ valid: false, error: 'User not found on LeetCode' });
    }
  } catch (err) {
    console.error('LeetCode validate error:', err);
    return res.status(500).json({ valid: false, error: 'Failed to reach LeetCode API' });
  }
});

// ─── Fetch Full LeetCode Stats ────────────────────────────────────────────────
app.get('/api/leetcode-stats/:username', async (req, res) => {
  const { username } = req.params;

  const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
          starRating
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
        activeBadge {
          displayName
          icon
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
      recentAcSubmissionList(username: $username, limit: 10) {
        id
        title
        titleSlug
        timestamp
        lang
        runtime
        memory
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    const json = await response.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Parse submission stats
    const acStats = user.submitStats?.acSubmissionNum || [];
    const totalSolved = acStats.find(s => s.difficulty === 'All')?.count || 0;
    const easySolved = acStats.find(s => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = acStats.find(s => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = acStats.find(s => s.difficulty === 'Hard')?.count || 0;

    // Parse submission calendar
    let submissionCalendar = {};
    try {
      submissionCalendar = JSON.parse(user.userCalendar?.submissionCalendar || '{}');
    } catch (_) {}

    return res.json({
      username: user.username,
      avatar: user.profile?.userAvatar,
      realName: user.profile?.realName,
      ranking: user.profile?.ranking,
      reputation: user.profile?.reputation,
      school: user.profile?.school,
      country: user.profile?.countryName,
      skillTags: user.profile?.skillTags || [],
      solved: {
        total: totalSolved,
        easy: easySolved,
        medium: mediumSolved,
        hard: hardSolved,
      },
      streak: user.userCalendar?.streak || 0,
      totalActiveDays: user.userCalendar?.totalActiveDays || 0,
      submissionCalendar,
      badges: user.badges || [],
      activeBadge: user.activeBadge,
      languages: user.languageProblemCount || [],
      topTags: {
        advanced: user.tagProblemCounts?.advanced?.slice(0, 5) || [],
        intermediate: user.tagProblemCounts?.intermediate?.slice(0, 5) || [],
        fundamental: user.tagProblemCounts?.fundamental?.slice(0, 5) || [],
      },
      recentSubmissions: json?.data?.recentAcSubmissionList || [],
      contest: json?.data?.userContestRanking || null,
    });
  } catch (err) {
    console.error('LeetCode stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Impact API server running at http://localhost:${PORT}`);
});
