ALTER TABLE `dateIdeas` MODIFY COLUMN `isSaved` boolean;--> statement-breakpoint
ALTER TABLE `dateIdeas` MODIFY COLUMN `isCustom` boolean;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `mentions` json;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `interests` json;--> statement-breakpoint
ALTER TABLE `syncMetadata` MODIFY COLUMN `syncedEntities` json;