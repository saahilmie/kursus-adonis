import vine from '@vinejs/vine'

export const pesertaValidator = vine.compile(
  vine.object({
    nama: vine.string().minLength(2).maxLength(100),
    email: vine.string().email(),
    telepon: vine.string().minLength(10).maxLength(15).optional(),
    alamat: vine.string().minLength(5).optional(),
    tanggalLahir: vine.date().optional()
  })
)
