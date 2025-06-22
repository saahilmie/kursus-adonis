import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kursus from './kursus.js'
import Peserta from './peserta.js'

export default class Pendaftaran extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kursusId: number

  @column()
  declare pesertaId: number

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Kursus)
  declare kursus: BelongsTo<typeof Kursus>

  @belongsTo(() => Peserta)
  declare peserta: BelongsTo<typeof Peserta>
}
