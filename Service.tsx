import { API_URL } from './components/Constants';

import { SERVER_API_URL } from './Server_Url';

export const generateToken = async (orderId: string, amount: number) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, amt: amount }),
  };

  try {
    const response = await fetch(`${SERVER_API_URL}`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('result', result);

    return result?.body?.txnToken;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
