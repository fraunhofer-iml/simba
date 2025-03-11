import { registerAs } from '@nestjs/config';
import { CronExpression } from '@nestjs/schedule';

export const NFT_SCHEDULE_CONFIG = 'nft_schedule';

export interface NftUpdateScheduleConfig {
  scheduledNftUpdateEnabled: boolean;
  scheduledNftUpdateCronJobExpression: string;
}

export default registerAs(NFT_SCHEDULE_CONFIG, () => ({
  scheduledNftUpdateEnabled: process.env['SCHEDULED_NFT_UPDATE_ENABLED'] || false,
  scheduledNftUpdateCronJobExpression: process.env['SCHEDULED_NFT_UPDATE_CRON_JOB_EXPRESSION'] || CronExpression.EVERY_HOUR,
}));
