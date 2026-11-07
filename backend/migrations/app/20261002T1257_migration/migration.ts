#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/91e7f9f035806fa2789a4d726ef7724cad434fd6b00014d47ebf12d6e6bb784e/contract';
import startContract from '../../snapshots/91e7f9f035806fa2789a4d726ef7724cad434fd6b00014d47ebf12d6e6bb784e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/da9918f41b52e4bda5aea9d679c6a2567c76fb97ad7a74af7e3cf3dfeee39a44/contract';
import endContract from '../../snapshots/da9918f41b52e4bda5aea9d679c6a2567c76fb97ad7a74af7e3cf3dfeee39a44/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.createTable({
        schema: 'public',
        table: 'Actor',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profilePath', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('tmdbId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Location',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('latitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('longitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'LocationSubmission',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('latitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('locationId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('longitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Movie',
        columns: [
          col('backdropPath', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('originalTitle', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('overview', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('posterPath', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('releaseDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tmdbId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'MovieActor',
        columns: [
          col('actorId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('characterName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('movieId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'MovieLocation',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('filmingDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('locationId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('movieId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('sceneDescription', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Actor',
        constraint: 'Actor_tmdbId_key',
        columns: ['tmdbId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Movie',
        constraint: 'Movie_tmdbId_key',
        columns: ['tmdbId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'MovieActor',
        constraint: 'MovieActor_movieId_actorId_key',
        columns: ['movieId', 'actorId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'MovieLocation',
        constraint: 'MovieLocation_movieId_locationId_key',
        columns: ['movieId', 'locationId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'LocationSubmission',
        index: 'LocationSubmission_locationId_idx_7aae3038',
        columns: ['locationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'LocationSubmission',
        index: 'LocationSubmission_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieActor',
        index: 'MovieActor_actorId_idx_a58f6b4b',
        columns: ['actorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieActor',
        index: 'MovieActor_movieId_idx_8cb9f9db',
        columns: ['movieId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieLocation',
        index: 'MovieLocation_locationId_idx_7aae3038',
        columns: ['locationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MovieLocation',
        index: 'MovieLocation_movieId_idx_8cb9f9db',
        columns: ['movieId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'LocationSubmission',
        foreignKey: {
          name: 'LocationSubmission_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'LocationSubmission',
        foreignKey: {
          name: 'LocationSubmission_locationId_fkey',
          columns: ['locationId'],
          references: { schema: 'public', table: 'Location', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieActor',
        foreignKey: {
          name: 'MovieActor_movieId_fkey',
          columns: ['movieId'],
          references: { schema: 'public', table: 'Movie', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieActor',
        foreignKey: {
          name: 'MovieActor_actorId_fkey',
          columns: ['actorId'],
          references: { schema: 'public', table: 'Actor', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieLocation',
        foreignKey: {
          name: 'MovieLocation_movieId_fkey',
          columns: ['movieId'],
          references: { schema: 'public', table: 'Movie', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MovieLocation',
        foreignKey: {
          name: 'MovieLocation_locationId_fkey',
          columns: ['locationId'],
          references: { schema: 'public', table: 'Location', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
