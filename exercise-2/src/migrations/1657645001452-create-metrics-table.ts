import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createMetricsTable1657645001452 implements MigrationInterface {

    public async up(_queryRunner: QueryRunner): Promise<void> {
        await _queryRunner.createTable(
            new Table({
              name: 'metrics',
              columns: [
                {
                  name: 'id_repository',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: false,
                },
                {
                  name: 'coverage',
                  type: 'double precision',
                },
                {
                  name: 'bugs',
                  type: 'int',
                },
                {
                    name: 'vulnerabilities',
                    type: 'int',
                },
                {
                    name: 'hotspot',
                    type: 'int',
                  },    
                  {
                    name: 'code_smells',
                    type: 'int',
                  },
              ],
            }),
            true,
          );
  
          const foreignKey = new TableForeignKey({
              columnNames: ["id_repository"],
              referencedColumnNames: ["id"],
              referencedTableName: "repository",
              onDelete: "CASCADE"
          });
          await _queryRunner.createForeignKey("metrics", foreignKey);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        const table = await _queryRunner.getTable("metrics")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("id_repository") !== -1,
        )
        await _queryRunner.dropForeignKey("metrics", foreignKey)
        await _queryRunner.dropTable('metrics');
    }

}
