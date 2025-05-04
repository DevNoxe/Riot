import fs from 'fs';
import path from 'path';

const CODES_FILE = path.join(process.cwd(), 'src', 'lib', 'codes.json');

interface CodeData {
  redeemedCodes: string[];
}

export const saveCode = async (code: string): Promise<void> => {
  try {
    const data = await fs.promises.readFile(CODES_FILE, 'utf8');
    const codeData: CodeData = JSON.parse(data);
    
    if (codeData.redeemedCodes.includes(code)) {
      throw new Error('Code already redeemed');
    }
    
    codeData.redeemedCodes.push(code);
    await fs.promises.writeFile(CODES_FILE, JSON.stringify(codeData, null, 2));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Code already redeemed') {
      throw error;
    }
    throw new Error('Failed to save code');
  }
};