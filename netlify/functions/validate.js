const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase env vars');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { key } = JSON.parse(event.body || '{}');
  if (!key) {
    return { statusCode: 400, body: JSON.stringify({ success: false }) };
  }

  try {
    const { data, error } = await supabase
      .from('license_keys')
      .select('is_active')
      .eq('key', key.trim())
      .single();

    if (error || !data || !data.is_active) {
      return { statusCode: 401, body: JSON.stringify({ success: false }) };
    }

    await supabase
      .from('license_keys')
      .update({ used_at: new Date().toISOString() })
      .eq('key', key.trim());

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Supabase error:', err);
    return { statusCode: 500, body: JSON.stringify({ success: false }) };
  }
};
