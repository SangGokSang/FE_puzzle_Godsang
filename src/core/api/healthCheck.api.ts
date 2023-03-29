import api from './api';

export async function healthCheckApi() {
  await api({
    url: '/health',
    method: 'get',
  });
}
