import { prisma } from '#db/prisma.js';

export async function emojiTranscation(work) {
  const maxAttempts = 3;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await prisma.$transaction(work, {
        isolationLevel: 'Serializable',
      });
    } catch (error) {
      const isRetryable = error.code === 'P2023' || error.code === 'P2002';
      if (!isRetryable || attempt >= maxAttempts) {
        throw error;
      }
    }
  }
}
