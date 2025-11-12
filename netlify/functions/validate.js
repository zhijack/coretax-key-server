exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { key } = JSON.parse(event.body || '{}');

  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Key required' })
    };
  }

  if (key === 'ZHIJACK-2025') {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Invalid key' })
    };
  }
};
