# File: netlify.toml

[build]
  # Thư mục chứa các Netlify Functions
  functions = "netlify/functions"

# Cấu hình chuyển hướng (redirect) để API có đường dẫn đẹp hơn
[[redirects]]
  # Chuyển hướng tất cả các yêu cầu từ /api/*
  from = "/api/*"
  # Đến function có tên là 'api'
  to = "/.netlify/functions/api/:splat"
  # Trả về mã trạng thái 200 (OK) vì đây là một proxy, không phải chuyển hướng thực sự
  status = 200
