import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createRepositoryTable1657644398485 implements MigrationInterface {

    public async up(_queryRunner: QueryRunner): Promise<void> {
        await _queryRunner.createTable(
            new Table({
              name: 'repository',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'identity',
                },
                {
                  name: 'id_tribe',
                  type: 'int',
                },
                {
                  name: 'name',
                  length: '50',
                  type: 'varchar',
                },
                {
                  name: 'state',
                  length: '1',
                  type: 'varchar',
                  },
                {
                  name: 'status',
                  type: 'varchar',
                },
                {
                  name: 'create_time',
                  type: 'timestamp',
                },
              ],
            }),
            true,
          );
  
          const foreignKey = new TableForeignKey({
              columnNames: ["id_tribe"],
              referencedColumnNames: ["id"],
              referencedTableName: "tribe",
              onDelete: "CASCADE"
          });
          await _queryRunner.createForeignKey("repository", foreignKey);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        const table = await _queryRunner.getTable("repository")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("id_tribe") !== -1,
        )
        await _queryRunner.dropForeignKey("repository", foreignKey)
        await _queryRunner.dropTable('repository');
    }

}
