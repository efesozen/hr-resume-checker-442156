import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateAnalysisreportTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'analysis_reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'resume_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'report_data',
            type: 'jsonb',
            isNullable: false,
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
      'analysis_reports',
      new TableForeignKey({
        name: 'fk_analysis_reports_resume_id',
        columnNames: ['resume_id'],
        referencedTableName: 'resumes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'analysis_reports',
      new TableIndex({
        name: 'idx_analysis_reports_resume_id',
        columnNames: ['resume_id'],
      })
    );

    await queryRunner.createIndex(
      'analysis_reports',
      new TableIndex({
        name: 'idx_analysis_reports_resume_id',
        columnNames: ['resume_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('analysis_reports', 'idx_analysis_reports_resume_id');
    await queryRunner.dropForeignKey('analysis_reports', 'fk_analysis_reports_resume_id');
    await queryRunner.dropTable('analysis_reports');
  }
}
