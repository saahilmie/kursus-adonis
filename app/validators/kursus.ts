// app/validators/kursus.ts
import vine from '@vinejs/vine'

export const kursusValidator = vine.compile(
  vine.object({
    namaKursus: vine.string().minLength(2).maxLength(200),
    deskripsi: vine.string().minLength(10),
    instrukturId: vine.number().positive(),
    durasi: vine.number().positive(),
    biaya: vine.number().min(0),
    tingkatKesulitan: vine.enum(['pemula', 'menengah', 'lanjut'])
  })
)
