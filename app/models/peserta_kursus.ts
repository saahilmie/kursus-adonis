import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Peserta from './peserta.js'
import Kursus from './kursus.js'

export default class PesertaKursus extends BaseModel {
  public static table = 'peserta_kursus'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pesertaId: number

  @column()
  declare kursusId: number

  @column.dateTime()
  declare tanggalDaftar: DateTime | null

  @column()
  declare status: 'aktif' | 'selesai' | 'batal'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Peserta, {
    foreignKey: 'pesertaId'
  })
  declare peserta: BelongsTo<typeof Peserta>

  @belongsTo(() => Kursus, {
    foreignKey: 'kursusId'
  })
  declare kursus: BelongsTo<typeof Kursus>
}
