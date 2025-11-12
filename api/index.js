export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false });
  if (['ZHIJACK-2025'].includes(key)) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false });
}
