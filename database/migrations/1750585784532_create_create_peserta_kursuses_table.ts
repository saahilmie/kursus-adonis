import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'peserta_kursus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('peserta_id').unsigned().references('id').inTable('pesertas').onDelete('CASCADE')
      table.integer('kursus_id').unsigned().references('id').inTable('kursuses').onDelete('CASCADE')
      table.timestamp('tanggal_daftar').nullable()
      table.enum('status', ['aktif', 'selesai', 'batal']).defaultTo('aktif')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').nullable()

      // peserta ngga bisa daftar 2x
      table.unique(['peserta_id', 'kursus_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
