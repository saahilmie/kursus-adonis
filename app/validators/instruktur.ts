import vine from '@vinejs/vine'

export const instrukturValidator = vine.compile(
  vine.object({
    nama: vine.string().minLength(2).maxLength(100),
    email: vine.string().email(),
    telepon: vine.string().minLength(10).maxLength(15).optional(),
    keahlian: vine.string().minLength(2).maxLength(255),
    pengalaman: vine.string().optional()
  })
)
