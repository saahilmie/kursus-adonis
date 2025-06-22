import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pendaftarans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('kursus_id').unsigned()
      table.integer('peserta_id').unsigned()
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.unique(['kursus_id', 'peserta_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
