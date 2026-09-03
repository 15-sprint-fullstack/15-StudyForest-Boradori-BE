import { isDevelopment } from '#config';

// 프엔에서 사용될 url 들 집어넣으면 됩니다.
const developmentWhitelist = [];
const productionWhitelist = [];
export const cors = (req, res, next) => {
  const whitelist = isDevelopment ? developmentWhitelist : productionWhitelist;

  const origin = req.get('origin');
  res.vary('origin');

  // 포스트맨과 같은 브라우더 아닌 도구로 확인용으로 존재.
  if (!origin) {
    return next();
  }

  if (!whitelist.includes(origin)) {
    return res.status(403).json({
      message: '허용되지 않은 출처입니다.',
    });
  }

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
};
