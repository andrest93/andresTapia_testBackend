import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createTribuTable1657643156187 implements MigrationInterface {

    public async up(_queryRunner: QueryRunner): Promise<void> {
        await _queryRunner.createTable(
          new Table({
            name: 'tribe',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'identity',
              },
              {
                name: 'id_organization',
                type: 'int',
                isUnique: true,
              },
              {
                name: 'name',
                length: '50',
                type: 'varchar',
              },
              {
                name: 'status',
                type: 'int',
              },
            ],
          }),
          true,
        );

        const foreignKey = new TableForeignKey({
            columnNames: ["id_organization"],
            referencedColumnNames: ["id"],
            referencedTableName: "organization",
            onDelete: "CASCADE"
        });
        await _queryRunner.createForeignKey("tribe", foreignKey);
      }
    
      public async down(_queryRunner: QueryRunner): Promise<void> {
        const table = await _queryRunner.getTable("tribe")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("id_organization") !== -1,
        )
        await _queryRunner.dropForeignKey("tribe", foreignKey)
        await _queryRunner.dropTable('tribe');
      }

}
