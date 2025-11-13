const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://oshgtgtnlibwvotdkjye.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zaGd0Z3RubGlid3ZvdGRranllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NjE1NTIsImV4cCI6MjA3ODUzNzU1Mn0.oJryVG2A1X_-kVkEGe1ue7yuEXTXjProEN6nugGFYu8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { key } = JSON.parse(event.body);

  if (!key) {
    return { statusCode: 400, body: JSON.stringify({ success: false }) };
  }

  try {
    const { data, error } = await supabase
      .from('license_keys')
      .update({ device_id: null, used_at: new Date().toISOString() })
      .eq('key', key)
      .eq('is_active', true);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Reset error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
};
