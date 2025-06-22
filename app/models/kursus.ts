import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Instruktur from './instruktur.js'
import Pendaftaran from './pendaftaran.js'
import Materi from './materi.js'

export default class Kursus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaKursus: string

  @column()
  declare deskripsi: string  // Tambahkan ini jika belum ada

  @column()
  declare durasi: number

  @column()
  declare instrukturId: number

  @column()
  declare biaya: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Instruktur)
  declare instruktur: BelongsTo<typeof Instruktur>

  @hasMany(() => Pendaftaran)
  declare pendaftarans: HasMany<typeof Pendaftaran>

  @hasMany(() => Materi)
  declare materis: HasMany<typeof Materi>
}
