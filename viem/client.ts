import { createPublicClient, http } from 'viem'
import { zora } from 'viem/chains'
 
export const publicClient = createPublicClient({ 
  chain: zora, 
  transport: http(), 
}) 