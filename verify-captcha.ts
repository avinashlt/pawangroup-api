import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Get secret key from environment variable
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
      return res.status(500).json({ success: false, error: 'Server configuration error' });
    }

    // Verify the token with Google's reCAPTCHA API
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // Check if verification was successful
    // For v3, also check score threshold; for v2, just check success
    const isValid = data.success && (data.score ? data.score > 0.5 : true);

    return res.status(200).json({
      success: isValid,
      score: data.score || null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error verifying CAPTCHA:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify CAPTCHA'
    });
  }
}
