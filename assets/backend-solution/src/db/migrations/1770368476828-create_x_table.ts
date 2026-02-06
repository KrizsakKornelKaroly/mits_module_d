import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateXTable1770368476828 implements MigrationInterface {
    name = 'CreateXTable1770368476828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`api_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`token\` varchar(100) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`revoked_at\` timestamp NULL, \`workspace_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`billing_quotas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`limit\` decimal NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspaces\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` int NOT NULL, \`billing_quota_id\` int NULL, UNIQUE INDEX \`REL_bc02d89a5cbb742925cda902c5\` (\`billing_quota_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`cost_per_ms\` decimal NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service_usages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`duration_in_ms\` int NOT NULL, \`usage_started_at\` datetime NOT NULL, \`api_token_id\` int NOT NULL, \`service_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`api_tokens\` ADD CONSTRAINT \`FK_9c644dd21cac1a0e8fca9443373\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_78512d762073bf8cb3fc88714c1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_bc02d89a5cbb742925cda902c5b\` FOREIGN KEY (\`billing_quota_id\`) REFERENCES \`billing_quotas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_usages\` ADD CONSTRAINT \`FK_5ccd2747635edaf9f36f8bae5de\` FOREIGN KEY (\`api_token_id\`) REFERENCES \`api_tokens\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_usages\` ADD CONSTRAINT \`FK_edbd8912f285c2a423d66020061\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service_usages\` DROP FOREIGN KEY \`FK_edbd8912f285c2a423d66020061\``);
        await queryRunner.query(`ALTER TABLE \`service_usages\` DROP FOREIGN KEY \`FK_5ccd2747635edaf9f36f8bae5de\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_bc02d89a5cbb742925cda902c5b\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_78512d762073bf8cb3fc88714c1\``);
        await queryRunner.query(`ALTER TABLE \`api_tokens\` DROP FOREIGN KEY \`FK_9c644dd21cac1a0e8fca9443373\``);
        await queryRunner.query(`DROP TABLE \`service_usages\``);
        await queryRunner.query(`DROP TABLE \`services\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_bc02d89a5cbb742925cda902c5\` ON \`workspaces\``);
        await queryRunner.query(`DROP TABLE \`workspaces\``);
        await queryRunner.query(`DROP TABLE \`billing_quotas\``);
        await queryRunner.query(`DROP TABLE \`api_tokens\``);
    }

}
