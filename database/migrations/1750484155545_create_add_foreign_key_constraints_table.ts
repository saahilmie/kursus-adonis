import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    // Tambah foreign key untuk tabel kursuses
    this.schema.alterTable('kursuses', (table) => {
      table.foreign('instruktur_id')
        .references('id')
        .inTable('instrukturs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })

    // Tambah foreign key untuk tabel pendaftarans
    this.schema.alterTable('pendaftarans', (table) => {
      table.foreign('kursus_id')
        .references('id')
        .inTable('kursuses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.foreign('peserta_id')
        .references('id')
        .inTable('pesertas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })

    // Tambah foreign key untuk tabel materis
    this.schema.alterTable('materis', (table) => {
      table.foreign('kursus_id')
        .references('id')
        .inTable('kursuses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    // Hapus foreign keys dalam urutan terbalik
    this.schema.alterTable('materis', (table) => {
      table.dropForeign(['kursus_id'])
    })

    this.schema.alterTable('pendaftarans', (table) => {
      table.dropForeign(['kursus_id'])
      table.dropForeign(['peserta_id'])
    })

    this.schema.alterTable('kursuses', (table) => {
      table.dropForeign(['instruktur_id'])
    })
  }
}
