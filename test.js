import { createHelia } from 'helia'
import { trustlessGateway } from '@helia/block-brokers'
import { httpGatewayRouting } from '@helia/routers'
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'
import { concat } from 'uint8arrays/concat'
import all from 'it-all'

console.log('Starting Helia with trustless gateway...')

const routing = httpGatewayRouting({
  gateways: ['https://ipfs.io', 'https://dweb.link']
})

const helia = await createHelia({
  routers: [routing],
  blockBrokers: [
    trustlessGateway({
      transformRequestInit: (requestInit) => {
        console.log('🚀 Custom headers applied!', {
          url: requestInit.url || 'unknown',
          headers: requestInit.headers
        })
        requestInit.headers = {
          ...requestInit.headers,
          'User-Agent': 'Helia Example Script'
        }
        return requestInit
      }
    })
  ]
})

console.log('✅ Helia initialized successfully')

try {
  const fs = unixfs(helia)
  const cid = CID.parse('bafkreife2klsil6kaxqhvmhgldpsvk5yutzm4i5bgjoq6fydefwtihnesa')
  
  console.log('📥 Fetching content from CID:', cid.toString())
  
  const chunks = await all(fs.cat(cid))
  const content = concat(chunks)
  
  console.log('📊 Content fetched successfully!')
  console.log('   - Length:', content.length, 'bytes')
  console.log('   - First 50 bytes:', new TextDecoder().decode(content.slice(0, 50)))
  
} catch (error) {
  console.error('❌ Error fetching content:', error.message)
} finally {
  console.log('🛑 Stopping Helia...')
  await helia.stop()
  console.log('✅ Done')
}