// const SETU_BASE_URL = process.env.SETU_BASE_URL;
// const SETU_CLIENT_ID = process.env.SETU_CLIENT_ID;
// const SETU_CLIENT_SECRET = process.env.SETU_CLIENT_SECRET;
// const SETU_PRODUCT_INSTANCE_ID = process.env.SETU_PRODUCT_INSTANCE_ID;

// const setuHeaders = {
//   'Content-Type': 'application/json',
//   'x-client-id': SETU_CLIENT_ID,
//   'x-client-secret': SETU_CLIENT_SECRET,
//   'x-product-instance-id': SETU_PRODUCT_INSTANCE_ID,
// };

// const setuFetch = async (endpoint, options = {}) => {
//   const res = await fetch(`${SETU_BASE_URL}${endpoint}`, {
//     ...options,
//     headers: { ...setuHeaders, ...options.headers },
//   });
//   const data = await res.json();
//   return { ok: res.ok, status: res.status, data };
// };

// export { setuFetch, SETU_PRODUCT_INSTANCE_ID };

const setuFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-client-id': process.env.SETU_CLIENT_ID,
    'x-client-secret': process.env.SETU_CLIENT_SECRET,
    'x-product-instance-id': process.env.SETU_PRODUCT_INSTANCE_ID,
  };

  const res = await fetch(`${process.env.SETU_BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

export { setuFetch };