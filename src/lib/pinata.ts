import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

export async function uploadToPinata(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
}