// File: netlify/functions/api.js

const UserAgent = require('user-agents');

exports.handler = async (event, context) => {
  // Lấy đường dẫn yêu cầu (ví dụ: "/home", "/user") và bỏ dấu "/" ở đầu
  const path = event.path.replace(/^\//, '');

  // --- Endpoint /home ---
  // Hiển thị thông tin và hướng dẫn sử dụng
  if (path === 'home') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        message: "Chào mừng đến với API tạo User-Agent ngẫu nhiên",
        usage: {
          home: "/home - Hiển thị hướng dẫn này.",
          user_agents: "/user?count={số_lượng} - Tạo danh sách User-Agent.",
        },
        parameters: {
          // --- THAY ĐỔI Ở ĐÂY ---
          count: "Số lượng User-Agent muốn tạo (tối thiểu 100, tối đa 200). Mặc định là 100."
        }
      }, null, 2),
    };
  }

  // --- Endpoint /user ---
  // Tạo danh sách User-Agent ngẫu nhiên
  if (path === 'user') {
    const params = event.queryStringParameters;
    
    // --- THAY ĐỔI Ở ĐÂY ---
    // Lấy số lượng từ query `count`, mặc định là 100 nếu không có
    let count = parseInt(params.count, 10) || 100;

    // --- THAY ĐỔI Ở ĐÂY ---
    // Giới hạn số lượng trong khoảng [100, 200]
    count = Math.max(100, Math.min(200, count));

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

  // Nếu không có đường dẫn nào khớp, trả về lỗi 404
  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Endpoint not found. Vui lòng sử dụng /home hoặc /user." }),
  };
};
