// File: netlify/functions/api.js

const UserAgent = require('user-agents');

exports.handler = async (event, context) => {
  // Lấy đường dẫn từ yêu cầu, ví dụ: /home, /user
  const path = event.path.replace('/.netlify/functions/api', '').replace(/^\//, '');

  // Định tuyến dựa trên đường dẫn
  if (path === 'home') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        message: "Chào mừng đến với API tạo User-Agent",
        usage: {
          home: "/api/home - Hiển thị hướng dẫn này.",
          user_agents: "/api/user?count={số_lượng} - Tạo danh sách User-Agent.",
        },
        parameters: {
          count: "Số lượng User-Agent muốn tạo (từ 10 đến 100). Mặc định là 10 nếu không được cung cấp."
        }
      }, null, 2), // `null, 2` để JSON hiển thị đẹp hơn
    };
  }

  if (path === 'user') {
    const params = event.queryStringParameters;
    let count = parseInt(params.count, 10) || 10; // Mặc định là 10 nếu không có hoặc không phải là số

    // Giới hạn số lượng từ 10 đến 100
    if (count < 10) {
      count = 10;
    }
    if (count > 100) {
      count = 100;
    }

    const userAgents = [];
    for (let i = 0; i < count; i++) {
      const userAgent = new UserAgent();
      userAgents.push(userAgent.toString());
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        count: userAgents.length,
        user_agents: userAgents,
      }, null, 2),
    };
  }

  // Nếu không có đường dẫn nào khớp
  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Endpoint not found." }),
  };
};
