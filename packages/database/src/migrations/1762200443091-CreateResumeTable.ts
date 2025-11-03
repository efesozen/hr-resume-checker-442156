import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateResumeTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'file_path',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'parsed_data',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'analysis_feedback',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'resumes',
      new TableForeignKey({
        name: 'fk_resumes_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'resumes',
      new TableIndex({
        name: 'idx_resumes_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'resumes',
      new TableIndex({
        name: 'idx_resumes_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('resumes', 'idx_resumes_user_id');
    await queryRunner.dropForeignKey('resumes', 'fk_resumes_user_id');
    await queryRunner.dropTable('resumes');
  }
}
