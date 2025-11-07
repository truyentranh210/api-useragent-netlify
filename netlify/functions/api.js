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
          count: "Số lượng User-Agent muốn tạo (tối thiểu 10, tối đa 100). Mặc định là 10."
        }
      }, null, 2), // `null, 2` giúp JSON hiển thị đẹp hơn
    };
  }

  // --- Endpoint /user ---
  // Tạo danh sách User-Agent ngẫu nhiên
  if (path === 'user') {
    const params = event.queryStringParameters;
    // Lấy số lượng từ query `count`, mặc định là 10 nếu không có
    let count = parseInt(params.count, 100) || 100;

    // Giới hạn số lượng trong khoảng [10, 100]
    count = Math.max(100, Math.min(1000, count));

    const userAgents = [];
    for (let i = 0; i < count; i++) {
      // Mỗi lần gọi `new UserAgent()` sẽ tạo ra một User-Agent ngẫu nhiên
      // từ một thiết bị, hệ điều hành, và trình duyệt khác nhau.
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
