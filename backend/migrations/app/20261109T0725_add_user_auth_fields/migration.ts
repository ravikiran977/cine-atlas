#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2371d0eca9ed1bdefee753f1e091e7c41a488749d9c356019734b7a3425b35e7/contract';
import endContract from '../../snapshots/2371d0eca9ed1bdefee753f1e091e7c41a488749d9c356019734b7a3425b35e7/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/da9918f41b52e4bda5aea9d679c6a2567c76fb97ad7a74af7e3cf3dfeee39a44/contract';
import startContract from '../../snapshots/da9918f41b52e4bda5aea9d679c6a2567c76fb97ad7a74af7e3cf3dfeee39a44/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('bio', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('profileImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('role', 'text', {
          notNull: true,
          default: lit('USER'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
