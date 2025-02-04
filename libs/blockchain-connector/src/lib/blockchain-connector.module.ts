import { Module } from '@nestjs/common';
import { BlockchainConnectorService } from './blockchain-connector.service';
import { DataIntegrityModule, TokenModule } from '@fraunhofer-iml/nft-folder-blockchain-connector';

@Module({
  imports: [DataIntegrityModule, TokenModule],
  providers: [BlockchainConnectorService],
  exports: [BlockchainConnectorService],
})
export class BlockchainConnectorModule {}
